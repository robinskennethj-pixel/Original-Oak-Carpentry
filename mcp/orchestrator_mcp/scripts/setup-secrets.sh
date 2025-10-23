#!/bin/bash
# GitHub CLI required: gh auth login
# This script sets up all required GitHub secrets for the Enterprise Ops Suite

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up GitHub Secrets for Enterprise Ops Suite${NC}"

# Check if GitHub CLI is installed and authenticated
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI is not installed. Please install it first.${NC}"
    echo -e "${YELLOW}Install from: https://cli.github.com/${NC}"
    exit 1
fi

# Check if user is authenticated with GitHub CLI
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI is not authenticated. Please run: gh auth login${NC}"
    exit 1
fi

# Get repository information
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")
if [ -z "$REPO" ]; then
    echo -e "${YELLOW}⚠️  Could not detect repository. Please enter repository (owner/repo):${NC}"
    read -r REPO
fi

echo -e "${GREEN}📁 Repository: $REPO${NC}"

# Function to generate secure random strings
generate_secret() {
    openssl rand -hex 32
}

# Function to check if secret already exists
check_secret() {
    gh secret list -R "$REPO" | grep -q "^$1$"
}

# Function to set secret with confirmation
set_secret() {
    local key=$1
    local value=$2
    local description=$3

    if check_secret "$key"; then
        echo -e "${YELLOW}⚠️  Secret $key already exists. Skipping...${NC}"
        return
    fi

    echo -e "${GREEN}🔐 Setting $description ($key)${NC}"
    echo "$value" | gh secret set "$key" -R "$REPO"
    echo -e "${GREEN}✅ $key set successfully${NC}"
}

# Function to prompt for user input
prompt_for_input() {
    local prompt=$1
    local default=$2
    local input

    if [ -n "$default" ]; then
        echo -e "${YELLOW}$prompt [$default]:${NC}"
        read -r input
        if [ -z "$input" ]; then
            input=$default
        fi
    else
        echo -e "${YELLOW}$prompt:${NC}"
        read -r input
    fi

    echo "$input"
}

# Function to read SSH key
read_ssh_key() {
    local ssh_key_file="$HOME/.ssh/id_rsa"
    if [ -f "$ssh_key_file" ]; then
        echo -e "${GREEN}🔑 Found SSH key at $ssh_key_file${NC}"
        if [ -f "$ssh_key_file.pub" ]; then
            echo -e "${YELLOW}⚠️  Make sure your public key is added to the deployment server${NC}"
        fi
        cat "$ssh_key_file"
    else
        echo -e "${YELLOW}⚠️  SSH key not found at $ssh_key_file${NC}"
        echo -e "${YELLOW}Please enter your SSH private key manually:${NC}"
        echo -e "${YELLOW}(Copy and paste your private key, then press Ctrl+D)${NC}"
        cat
    fi
}

# Generate secure secrets
echo -e "${GREEN}🔑 Generating secure secrets...${NC}"

JWT_SECRET=$(generate_secret)
ADMIN_API_KEY=$(generate_secret)
TRUSTED_WEBHOOK_SECRET=$(generate_secret)

# Prompt for deployment configuration
echo -e "${GREEN}🌐 Deployment Configuration${NC}"
DEPLOY_HOST=$(prompt_for_input "Enter deployment host (e.g., your-server.com or IP address)" "")
DEPLOY_USER=$(prompt_for_input "Enter deployment user" "deploy")

# Prompt for external service configuration
echo -e "${GREEN}📱 External Service Configuration${NC}"
PAGERDUTY_SERVICE_KEY=$(prompt_for_input "Enter PagerDuty service key (optional)" "")
SLACK_WEBHOOK_URL=$(prompt_for_input "Enter Slack webhook URL (optional)" "")

# Read SSH key
echo -e "${GREEN}🗝️  SSH Configuration${NC}"
DEPLOY_SSH_KEY=$(read_ssh_key)

# Secret configuration map
declare -A secrets
secrets=(
    [JWT_SECRET]="$JWT_SECRET"
    [ADMIN_API_KEY]="$ADMIN_API_KEY"
    [TRUSTED_WEBHOOK_SECRET]="$TRUSTED_WEBHOOK_SECRET"
    [DEPLOY_HOST]="$DEPLOY_HOST"
    [DEPLOY_USER]="$DEPLOY_USER"
    [DEPLOY_SSH_KEY]="$DEPLOY_SSH_KEY"
)

# Add optional secrets if provided
if [ -n "$PAGERDUTY_SERVICE_KEY" ]; then
    secrets[PAGERDUTY_SERVICE_KEY]="$PAGERDUTY_SERVICE_KEY"
fi

if [ -n "$SLACK_WEBHOOK_URL" ]; then
    secrets[SLACK_WEBHOOK_URL]="$SLACK_WEBHOOK_URL"
fi

# Set all secrets
echo -e "${GREEN}📦 Setting GitHub secrets...${NC}"
for key in "${!secrets[@]}"; do
    case "$key" in
        "JWT_SECRET")
            set_secret "$key" "${secrets[$key]}" "JWT Secret for authentication"
            ;;
        "ADMIN_API_KEY")
            set_secret "$key" "${secrets[$key]}" "Admin API Key"
            ;;
        "TRUSTED_WEBHOOK_SECRET")
            set_secret "$key" "${secrets[$key]}" "Trusted Webhook Secret"
            ;;
        "DEPLOY_HOST")
            set_secret "$key" "${secrets[$key]}" "Deployment Host"
            ;;
        "DEPLOY_USER")
            set_secret "$key" "${secrets[$key]}" "Deployment User"
            ;;
        "DEPLOY_SSH_KEY")
            set_secret "$key" "${secrets[$key]}" "Deployment SSH Private Key"
            ;;
        "PAGERDUTY_SERVICE_KEY")
            set_secret "$key" "${secrets[$key]}" "PagerDuty Service Key"
            ;;
        "SLACK_WEBHOOK_URL")
            set_secret "$key" "${secrets[$key]}" "Slack Webhook URL"
            ;;
    esac
done

# Verify secrets
echo -e "${GREEN}🔍 Verifying secrets...${NC}"
echo -e "${GREEN}📋 Current secrets in repository:$NC"
gh secret list -R "$REPO"

# Create environment file for local development
echo -e "${GREEN}📝 Creating .env.production file...${NC}"
cat > .env.production << EOF
NODE_ENV=production
TRUSTED_WEBHOOK_SECRET=$TRUSTED_WEBHOOK_SECRET
JWT_SECRET=$JWT_SECRET
ADMIN_API_KEY=$ADMIN_API_KEY
DEPLOY_HOST=$DEPLOY_HOST
DEPLOY_USER=$DEPLOY_USER
REDIS_URL=redis://redis:6379
RAG_API_URL=http://rag-service:8001
DOCLING_API_URL=http://docling-service:8000
METRICS_ENABLED=true
SECURITY_ENABLED=true
LOG_LEVEL=info
EOF

echo -e "${GREEN}✅ .env.production file created${NC}"

# Instructions
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "1. Review the .env.production file that was created"
echo -e "2. Ensure your deployment server has your SSH public key"
echo -e "3. Configure PagerDuty integration (if service key was provided)"
echo -e "4. Configure Slack webhook (if URL was provided)"
echo -e "5. Test the deployment workflow by pushing to the main branch"
echo -e ""
echo -e "${YELLOW}🔧 To deploy to staging:${NC}"
echo -e "kubectl apply -k k8s/overlays/staging"
echo -e ""
echo -e "${YELLOW}🚀 To deploy to production:${NC}"
echo -e "kubectl apply -k k8s/overlays/production"
echo -e ""
echo -e "${GREEN}✨ Your Enterprise Ops Suite is ready!${NC}"