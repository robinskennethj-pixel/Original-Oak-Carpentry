#!/bin/bash
# Automated backup script for Orchestrator MCP system
# Creates backups of Redis data, patches, and configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP=$(date +'%Y%m%d_%H%M%S')
RETENTION_DAYS="${RETENTION_DAYS:-30}"
S3_BUCKET="${S3_BUCKET:-}"
COMPRESSION_LEVEL="${COMPRESSION_LEVEL:-9}"

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Create backup directory
mkdir -p "$BACKUP_DIR"
log "Backup directory: $BACKUP_DIR"

# Function to check if service is running
check_service() {
    local service=$1
    if docker ps --format "table {{.Names}}" | grep -q "^${service}$"; then
        return 0
    else
        return 1
    fi
}

# Function to backup Redis data
backup_redis() {
    log "Starting Redis backup..."

    if check_service "redis"; then
        log "Creating Redis snapshot..."
        docker exec -t redis redis-cli save

        log "Copying Redis data..."
        docker cp redis:/data/dump.rdb "$BACKUP_DIR/redis_${TIMESTAMP}.rdb"

        success "Redis backup completed: redis_${TIMESTAMP}.rdb"
    else
        warning "Redis container not found, skipping Redis backup"
    fi
}

# Function to backup application data
backup_app_data() {
    log "Starting application data backup..."

    # Backup patches data if it exists
    if [ -d "./patches_data" ]; then
        log "Backing up patches data..."
        tar -czf "$BACKUP_DIR/patches_${TIMESTAMP}.tar.gz" -C . patches_data/
        success "Patches backup completed: patches_${TIMESTAMP}.tar.gz"
    else
        warning "Patches data directory not found, skipping"
    fi

    # Backup configuration files
    log "Backing up configuration files..."
    CONFIG_BACKUP="$BACKUP_DIR/config_${TIMESTAMP}.tar.gz"
    tar -czf "$CONFIG_BACKUP" \
        --exclude='node_modules' \
        --exclude='.git' \
        --exclude='*.log' \
        --exclude='dist' \
        --exclude='backups' \
        docker-compose.yml \
        docker-compose.prod.yml \
        stack.yml \
        package.json \
        tsconfig.json \
        .env.production \
        monitoring/ \
        k8s/ \
        scripts/ 2>/dev/null || true

    success "Configuration backup completed: config_${TIMESTAMP}.tar.gz"
}

# Function to backup Docker volumes
backup_docker_volumes() {
    log "Starting Docker volumes backup..."

    # Backup Redis volume
    if docker volume ls | grep -q "redis_data"; then
        log "Backing up Redis volume..."
        docker run --rm \
            -v redis_data:/data \
            -v "$BACKUP_DIR":/backup \
            alpine tar -czf "/backup/redis_volume_${TIMESTAMP}.tar.gz" -C /data .
        success "Redis volume backup completed: redis_volume_${TIMESTAMP}.tar.gz"
    else
        warning "Redis volume not found, skipping"
    fi

    # Backup patches volume
    if docker volume ls | grep -q "patches_data"; then
        log "Backing up patches volume..."
        docker run --rm \
            -v patches_data:/data \
            -v "$BACKUP_DIR":/backup \
            alpine tar -czf "/backup/patches_volume_${TIMESTAMP}.tar.gz" -C /data .
        success "Patches volume backup completed: patches_volume_${TIMESTAMP}.tar.gz"
    else
        warning "Patches volume not found, skipping"
    fi
}

# Function to create backup manifest
create_manifest() {
    log "Creating backup manifest..."

    MANIFEST_FILE="$BACKUP_DIR/backup_manifest_${TIMESTAMP}.json"
    cat > "$MANIFEST_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "backup_type": "orchestrator_mcp",
  "files": [
EOF

    # Add files to manifest
    FIRST=true
    for file in "$BACKUP_DIR"/*_${TIMESTAMP}.*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            size=$(stat -c%s "$file" 2>/dev/null || stat -f%z "$file" 2>/dev/null || echo "0")
            checksum=$(sha256sum "$file" 2>/dev/null | cut -d' ' -f1 || shasum -a 256 "$file" 2>/dev/null | cut -d' ' -f1 || echo "unknown")

            if [ "$FIRST" = true ]; then
                FIRST=false
            else
                echo "," >> "$MANIFEST_FILE"
            fi

            cat >> "$MANIFEST_FILE" << EOF
    {
      "filename": "$filename",
      "size": $size,
      "checksum": "$checksum",
      "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    }
EOF
        fi
    done

    cat >> "$MANIFEST_FILE" << EOF
  ],
  "system_info": {
    "hostname": "$(hostname)",
    "docker_version": "$(docker --version | cut -d' ' -f3 | cut -d',' -f1)",
    "backup_script_version": "1.0.0"
  }
}
EOF

    success "Backup manifest created: backup_manifest_${TIMESTAMP}.json"
}

# Function to upload to S3 (if configured)
upload_to_s3() {
    if [ -n "$S3_BUCKET" ]; then
        log "Uploading backups to S3 bucket: $S3_BUCKET"

        # Check if AWS CLI is available
        if command -v aws > /dev/null 2>&1; then
            aws s3 cp "$BACKUP_DIR" "s3://$S3_BUCKET/orchestrator-backups/$TIMESTAMP/" --recursive
            success "Backups uploaded to S3"
        else
            error "AWS CLI not found. Please install AWS CLI to enable S3 uploads."
        fi
    fi
}

# Function to clean up old backups
cleanup_old_backups() {
    log "Cleaning up backups older than $RETENTION_DAYS days..."

    # Local cleanup
    find "$BACKUP_DIR" -name "*_*" -type f -mtime +$RETENTION_DAYS -delete 2>/dev/null || true

    # S3 cleanup (if configured)
    if [ -n "$S3_BUCKET" ] && command -v aws > /dev/null 2>&1; then
        log "Cleaning up S3 backups older than $RETENTION_DAYS days..."
        aws s3 ls "s3://$S3_BUCKET/orchestrator-backups/" | \
        awk '{print $2}' | \
        while read -r dir; do
            dir_date=$(echo "$dir" | sed 's|/$||')
            if [[ "$dir_date" =~ ^[0-9]{8}_[0-9]{6}$ ]]; then
                dir_timestamp=$(date -d "${dir_date:0:8} ${dir_date:9:2}:${dir_date:11:2}:${dir_date:13:2}" +%s 2>/dev/null || echo 0)
                current_timestamp=$(date +%s)
                days_diff=$(( (current_timestamp - dir_timestamp) / 86400 ))

                if [ $days_diff -gt $RETENTION_DAYS ]; then
                    log "Deleting S3 backup: $dir_date"
                    aws s3 rm "s3://$S3_BUCKET/orchestrator-backups/$dir_date/" --recursive
                fi
            fi
        done
    fi

    success "Cleanup completed"
}

# Function to send notifications
send_notification() {
    local status=$1
    local message=$2

    # Slack notification (if webhook configured)
    if [ -n "$SLACK_WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🔄 Orchestrator Backup: $status - $message\"}" \
            "$SLACK_WEBHOOK_URL" > /dev/null 2>&1 || true
    fi

    # PagerDuty notification for failures
    if [ "$status" = "FAILED" ] && [ -n "$PAGERDUTY_SERVICE_KEY" ]; then
        curl -X POST \
            -H "Content-Type: application/json" \
            -d "{
                \"service_key\": \"$PAGERDUTY_SERVICE_KEY\",
                \"event_type\": \"trigger\",
                \"description\": \"Orchestrator Backup Failed: $message\",
                \"details\": {
                    \"hostname\": \"$(hostname)\",
                    \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
                }
            }" \
            https://events.pagerduty.com/v2/enqueue > /dev/null 2>&1 || true
    fi
}

# Main backup function
main() {
    log "Starting Orchestrator MCP backup process..."

    local start_time=$(date +%s)
    local backup_status="SUCCESS"
    local backup_message="Backup completed successfully"

    # Trap to handle errors
    trap 'backup_status="FAILED"; backup_message="Backup failed at line $LINENO"; error "$backup_message"' ERR

    try {
        # Perform backups
        backup_redis
        backup_app_data
        backup_docker_volumes
        create_manifest
        upload_to_s3
        cleanup_old_backups

        local end_time=$(date +%s)
        local duration=$((end_time - start_time))

        success "Backup process completed in ${duration}s"
        backup_message="Backup completed successfully in ${duration}s. Files created in $BACKUP_DIR"

        # List backup files
        log "Backup files created:"
        ls -la "$BACKUP_DIR"/*_${TIMESTAMP}.* 2>/dev/null || true

    } catch {
        backup_status="FAILED"
        backup_message="Backup process failed: $?"
        error "$backup_message"
        exit 1
    }

    # Send notifications
    send_notification "$backup_status" "$backup_message"

    # Return appropriate exit code
    if [ "$backup_status" = "SUCCESS" ]; then
        exit 0
    else
        exit 1
    fi
}

# Help function
show_help() {
    cat << EOF
Usage: $0 [OPTIONS]

Automated backup script for Orchestrator MCP system

OPTIONS:
    -d, --backup-dir DIR        Backup directory (default: ./backups)
    -r, --retention-days DAYS   Retention period in days (default: 30)
    -s, --s3-bucket BUCKET      S3 bucket for remote storage (optional)
    -h, --help                  Show this help message

ENVIRONMENT VARIABLES:
    BACKUP_DIR                  Backup directory
    RETENTION_DAYS              Retention period in days
    S3_BUCKET                   S3 bucket for remote storage
    SLACK_WEBHOOK_URL           Slack webhook for notifications
    PAGERDUTY_SERVICE_KEY       PagerDuty service key for alerts

EXAMPLES:
    $0                          # Run with default settings
    $0 -d /var/backups -r 7     # Use custom directory and 7-day retention
    $0 -s my-backup-bucket      # Upload to S3 bucket

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--backup-dir)
            BACKUP_DIR="$2"
            shift 2
            ;;
        -r|--retention-days)
            RETENTION_DAYS="$2"
            shift 2
            ;;
        -s|--s3-bucket)
            S3_BUCKET="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Run main function
main "$@""C:\Users\Kenneth\Documents\OGUN CARPENTRY\mcp\orchestrator_mcp\scripts\backup.sh