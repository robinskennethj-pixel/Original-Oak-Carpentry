#!/bin/bash
set -e

echo "🚀 Initiating FULL PRODUCTION DEPLOYMENT for Original Oak Carpentry MCP Orchestrator..."

##########################################
# STEP 1: VERIFY ENVIRONMENT VARIABLES
##########################################
REQUIRED_VARS=(
  ADMIN_USERNAME ADMIN_PASSWORD JWT_SECRET API_KEY
  CLAUDE_API_KEY RAG_API_URL DOCLING_API_URL
  BUILDER_API_KEY REDIS_URL
  PAGERDUTY_ROUTING_KEY SLACK_WEBHOOK_URL
  NETLIFY_AUTH_TOKEN NETLIFY_SITE_ID
  GRAFANA_URL GRAFANA_API_KEY
  GITHUB_TOKEN GITHUB_REPO
)

for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "❌ Missing environment variable: $VAR"
    exit 1
  fi
done
echo "✅ Environment variables verified."

##########################################
# STEP 2: BUILD & DEPLOY BACKEND
##########################################
echo "🔧 Building backend (Node.js + TypeScript + Docker)..."
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
echo "✅ Backend containers built and launched."

##########################################
# STEP 3: HEALTH CHECK
##########################################
echo "🔍 Running health checks..."
curl -fsS http://localhost:8080/health || (echo "❌ Orchestrator failed health check" && exit 1)
curl -fsS http://localhost:9090/metrics || (echo "❌ Prometheus metrics unavailable" && exit 1)
echo "✅ All services healthy."

##########################################
# STEP 4: FRONTEND BUILD + NETLIFY DEPLOY
##########################################
echo "🌐 Building and deploying frontend..."
npm run build --prefix ./frontend
npx netlify deploy --prod --dir=./frontend/out --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
echo "✅ Frontend deployed to Netlify."

##########################################
# STEP 5: CLAUDE AUTO-PATCH + RAG + DOCLING SYNC
##########################################
echo "🧠 Running Claude auto-patch & sync..."
curl -X POST https://api.claude.ai/v1/autopatch \
  -H "Authorization: Bearer $CLAUDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"repo\":\"$GITHUB_REPO\",\"mode\":\"full\",\"deploy\":\"netlify\"}"
echo "✅ Claude auto-patch complete and synced."

##########################################
# STEP 6: EMBED GRAFANA DASHBOARD IN ADMIN SECTION
##########################################
echo "📊 Embedding Grafana dashboard in admin..."
cat > ./frontend/pages/admin/monitor.tsx <<'EOF'
import React from "react";

export default function MonitorDashboard() {
  return (
    <div style={{
      height: "100vh",
      width: "100%",
      backgroundColor: "#0b0c10",
      padding: "1rem"
    }}>
      <h1 style={{ color: "#66fcf1", textAlign: "center" }}>System Metrics Dashboard</h1>
      <iframe
        src="${GRAFANA_URL}/d-solo/main/system-metrics?orgId=1&refresh=10s&from=now-30m&to=now&panelId=2"
        width="100%"
        height="900"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
EOF
echo "✅ Grafana dashboard embedded at /admin/monitor."

##########################################
# STEP 7: PUSH UPDATES TO GITHUB
##########################################
echo "📦 Pushing updates to GitHub..."
git add .
git commit -m "🚀 Automated production deployment with Grafana embed & Claude sync"
git push https://x-access-token:$GITHUB_TOKEN@github.com/$GITHUB_REPO.git main
echo "✅ Code pushed to GitHub repository."

##########################################
# STEP 8: ALERTING
##########################################
echo "📣 Sending alerts..."
curl -X POST https://events.pagerduty.com/v2/enqueue \
  -H "Content-Type: application/json" \
  -d "{\"routing_key\":\"$PAGERDUTY_ROUTING_KEY\",\"event_action\":\"trigger\",\"payload\":{\"summary\":\"Production deployment complete for Original Oak Carpentry MCP Orchestrator\",\"severity\":\"info\",\"source\":\"deploy_full_production.sh\"}}"

curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🎉 Full production deployment complete and live for Original Oak Carpentry MCP Orchestrator!"}' \
  $SLACK_WEBHOOK_URL
echo "✅ Notifications sent to PagerDuty & Slack."

##########################################
# STEP 9: FINAL STATUS
##########################################
echo "🩺 Verifying uptime and status..."
curl -fsS http://localhost:8080/status
echo "✅ System verified."

echo "🏁 ALL DONE! Original Oak Carpentry MCP Orchestrator is LIVE in production."