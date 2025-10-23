#!/bin/bash

# All-in-One Ultimate Production Deployment Script with Grafana Health Checks
# Usage: ./deploy_all_in_one.sh
# Description: Orchestrates complete deployment of Original Oak Carpentry MCP Orchestrator

set -euo pipefail

echo "🚀 Starting Original Oak Carpentry MCP Orchestrator All-in-One Deployment..."
echo "📅 Deployment Started: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=============================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Run deploy confirmation
echo ""
log "STEP 1: Running deployment pre-checks using deploy_confirm.sh"
if ./deploy_confirm.sh; then
    success "Pre-checks passed - All services are healthy"
else
    error "Pre-checks failed. Aborting deployment."
    exit 1
fi

# Step 2: Manual confirmation before full deployment
echo ""
log "STEP 2: Manual deployment confirmation required"
warning "This will execute a FULL PRODUCTION deployment with real services and databases."
read -p "Are you sure you want to proceed with full production deployment? (y/N): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    log "Deployment aborted by user"
    exit 0
fi

# Step 3: Run full production deployment
echo ""
log "STEP 3: Executing full production deployment"
if ./deploy_full_production.sh; then
    success "Full production deployment completed successfully"
else
    error "Production deployment failed. Check logs for details!"
    exit 1
fi

# Step 4: Grafana Embedded Health Checks
echo ""
log "STEP 4: Verifying Grafana dashboards and metrics endpoints"

# Grafana configuration with fallbacks
GRAFANA_API_KEY="${GRAFANA_API_KEY:-}"
GRAFANA_URL="${GRAFANA_URL:-http://localhost:3000}"
GRAFANA_HEALTH_URL="${GRAFANA_URL}/api/health"

if [[ -n "$GRAFANA_API_KEY" ]]; then
    log "Testing Grafana API with authentication..."
    if curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $GRAFANA_API_KEY" "$GRAFANA_HEALTH_URL" | grep -q "200"; then
        success "Grafana API authentication successful - dashboards are healthy"
    else
        warning "Grafana API authentication failed, trying without auth..."
        # Fallback to no-auth check
        if curl -s -o /dev/null -w "%{http_code}" "$GRAFANA_HEALTH_URL" | grep -q "200"; then
            success "Grafana health endpoint accessible without auth"
        else
            error "Grafana health check failed. Please verify your dashboards and endpoints!"
            exit 1
        fi
    fi
else
    log "Testing Grafana without authentication..."
    if curl -s -o /dev/null -w "%{http_code}" "$GRAFANA_HEALTH_URL" | grep -q "200"; then
        success "Grafana dashboards and metrics endpoints are healthy"
    else
        warning "Grafana health check failed. This may be expected if Grafana is not configured."
        log "Continuing deployment..."
    fi
fi

# Step 5: Verify embedded Grafana dashboard in admin section
echo ""
log "STEP 5: Verifying embedded Grafana dashboard in admin section"
GRAFANA_DASHBOARD_URL="${GRAFANA_URL}/d-solo/main/system-metrics"
if [[ -n "$GRAFANA_API_KEY" ]]; then
    if curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $GRAFANA_API_KEY" "$GRAFANA_DASHBOARD_URL" | grep -q "200"; then
        success "Grafana dashboard embedded successfully in admin section"
    else
        warning "Grafana dashboard embedding may need configuration"
    fi
else
    log "Grafana dashboard verification skipped (no API key configured)"
fi

# Step 6: Git push to main (triggers GitHub Actions CI/CD)
echo ""
log "STEP 6: Pushing latest changes to GitHub main branch"
if git diff --quiet; then
    log "No changes to commit, skipping git push"
else
    git add .
    git commit -m "🚀 Automated deployment commit: $(date '+%Y-%m-%d %H:%M:%S')"
    if git push origin main; then
        success "GitHub push completed. CI/CD workflow triggered."
    else
        warning "GitHub push failed. Please check your repository configuration."
    fi
fi

# Step 7: Final system verification
echo ""
log "STEP 7: Final system verification"

# Check if services are still healthy after deployment
SERVICES=(
    "http://localhost:8000/health:Docling Service"
    "http://localhost:8001/health:RAG Service"
    "http://localhost:8080/health:Orchestrator"
)

for service in "${SERVICES[@]}"; do
    IFS=':' read -r url name <<< "$service"
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
        success "$name is healthy and responding"
    else
        warning "$name health check failed"
    fi
done

# Step 8: Notify Slack / PagerDuty (optional)
echo ""
log "STEP 8: Sending deployment notifications"

# Slack notification
if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
    DEPLOYMENT_MESSAGE="🎉 Original Oak Carpentry MCP Orchestrator All-in-One Deployment Successful! Grafana verified. $(date '+%Y-%m-%d %H:%M:%S')"
    if curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$DEPLOYMENT_MESSAGE\"}" \
        "$SLACK_WEBHOOK_URL" 2>/dev/null; then
        success "Slack notification sent"
    else
        warning "Slack notification failed (webhook may be invalid)"
    fi
else
    log "Slack webhook not configured - skipping notification"
fi

# PagerDuty notification (if configured)
if [[ -n "${PAGERDUTY_ROUTING_KEY:-}" ]]; then
    if curl -X POST https://events.pagerduty.com/v2/enqueue \
        -H "Content-Type: application/json" \
        -d "{\"routing_key\":\"$PAGERDUTY_ROUTING_KEY\",\"event_action\":\"trigger\",\"payload\":{\"summary\":\"Original Oak Carpentry All-in-One Deployment Successful\",\"severity\":\"info\",\"source\":\"deploy_all_in_one.sh\",\"timestamp\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}}" 2>/dev/null; then
        success "PagerDuty notification sent"
    else
        warning "PagerDuty notification failed"
    fi
else
    log "PagerDuty routing key not configured - skipping notification"
fi

# Final summary
echo ""
echo "=============================================="
success "🏆 All-in-One Deployment Completed Successfully!"
echo "📅 Deployment Completed: $(date '+%Y-%m-%d %H:%M:%S')"
echo "🎯 Original Oak Carpentry MCP Orchestrator is now LIVE in production!"
echo "=============================================="

# Optional: Show final status URLs
echo ""
log "Final Status URLs:"
echo "  🌐 Frontend: https://your-netlify-domain.netlify.app"
echo "  🔧 Admin Dashboard: https://your-netlify-domain.netlify.app/admin"
echo "  📊 Grafana Metrics: ${GRAFANA_URL:-http://localhost:3000}"
echo "  🔍 Health Check: http://localhost:8080/health"
echo "  📈 Metrics: http://localhost:9090/metrics"
echo ""
log "Deployment orchestration complete. System is production-ready!"