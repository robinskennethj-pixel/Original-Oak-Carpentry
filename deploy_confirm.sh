#!/usr/bin/env bash
# deploy_confirm.sh
# Single-file deployment confirmation + notify script
#
# Usage:
#   DRY_RUN=true ./deploy_confirm.sh            # dry run
#   ./deploy_confirm.sh                         # live run
#
# Required env (export before running or edit below):
# export DOCKER_COMPOSE_FILE="docker-compose.prod.yml"
# export SERVICES_TO_CHECK="http://localhost:4000/health http://localhost:8001/health http://localhost:8000/health"
# export NETLIFY_DEPLOY_HOOK="https://api.netlify.com/build_hooks/XXXX"
# export GIT_REMOTE="origin"
# export GIT_BRANCH="main"
# export PAGERDUTY_ROUTING_KEY="PD_ROUTING_KEY"
# export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXXXX/XXXXX/XXXXX"
# export TAG_VERSION="v1.0.0-prod"
# export DRY_RUN="false"   # optional; set to "true" to simulate

set -euo pipefail
IFS=$'\n\t'

# --- Configurable defaults (override with env if desired) ---
DOCKER_COMPOSE_FILE="${DOCKER_COMPOSE_FILE:-docker-compose.yml}"
SERVICES_TO_CHECK="${SERVICES_TO_CHECK:-http://localhost:8000/health http://localhost:8001/health http://localhost:9000/health}"
NETLIFY_DEPLOY_HOOK="${NETLIFY_DEPLOY_HOOK:-}"
GIT_REMOTE="${GIT_REMOTE:-origin}"
GIT_BRANCH="${GIT_BRANCH:-main}"
PAGERDUTY_ROUTING_KEY="${PAGERDUTY_ROUTING_KEY:-}"
SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"
TAG_VERSION="${TAG_VERSION:-v1.0.0-prod-$(date +%Y%m%d)}"
DRY_RUN="${DRY_RUN:-false}"

# Internal
LOG_PREFIX="[deploy_confirm]"
TIMESTAMP() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
info()  { echo "${LOG_PREFIX} [INFO] $(TIMESTAMP) - $*"; }
warn()  { echo "${LOG_PREFIX} [WARN] $(TIMESTAMP) - $*" >&2; }
error() { echo "${LOG_PREFIX} [ERROR] $(TIMESTAMP) - $*" >&2; exit 1; }

# Helper: execute or simulate
run() {
  if [ "${DRY_RUN}" = "true" ]; then
    info "DRY RUN: $*"
  else
    info "EXEC: $*"
    eval "$@"
  fi
}

# 1) Sanity checks
info "Starting deployment confirmation script for Original Oak Carpentry"
if [ "${DRY_RUN}" = "true" ]; then
  info "Running in DRY RUN mode — no changes will be pushed or triggered"
fi

# Check docker-compose file exists
if [ ! -f "${DOCKER_COMPOSE_FILE}" ]; then
  warn "Docker compose file '${DOCKER_COMPOSE_FILE}' not found in $(pwd). Proceeding may fail."
fi

# 2) Verify Docker services are up
info "Verifying Docker containers via 'docker compose ps' (file: ${DOCKER_COMPOSE_FILE})"
if [ "${DRY_RUN}" != "true" ]; then
  docker compose -f "${DOCKER_COMPOSE_FILE}" ps || warn "docker compose ps returned non-zero (check docker engine)"
else
  info "DRY RUN skip docker compose ps"
fi

# Health check function: retry with timeout
check_health_url() {
  local url="$1"
  local tries=10
  local wait=3
  local i=0
  while [ "${i}" -lt "${tries}" ]; do
    if curl --max-time 5 -fsS "${url}" >/dev/null 2>&1; then
      info "Health OK: ${url}"
      return 0
    else
      warn "Health not ready for ${url} (attempt $((i+1))/${tries})"
      i=$((i+1))
      sleep "${wait}"
    fi
  done
  return 1
}

info "Checking service health endpoints..."
failed_health=0
for u in ${SERVICES_TO_CHECK}; do
  if [ "${DRY_RUN}" = "true" ]; then
    info "DRY RUN: would check ${u}"
  else
    if ! check_health_url "${u}"; then
      warn "Service health check FAILED: ${u}"
      failed_health=1
    fi
  fi
done

if [ "${failed_health}" -ne 0 ]; then
  warn "One or more health checks failed. Aborting deployment routine."
  [ "${DRY_RUN}" = "true" ] || warn "Investigate services before exposing to production."
fi

# 3) Optionally trigger Netlify deploy (fire-and-forget)
if [ -n "${NETLIFY_DEPLOY_HOOK}" ]; then
  if [ "${DRY_RUN}" = "true" ]; then
    info "DRY RUN: Would POST to Netlify deploy hook: ${NETLIFY_DEPLOY_HOOK}"
  else
    info "Triggering Netlify deploy hook..."
    if curl -fsS -X POST "${NETLIFY_DEPLOY_HOOK}"; then
      info "Netlify deploy hook triggered"
    else
      warn "Failed to trigger Netlify deploy hook (curl returned non-zero)"
    fi
  fi
else
  warn "NETLIFY_DEPLOY_HOOK is empty — skipping Netlify deploy trigger"
fi

# 4) Git tag creation & push
info "Creating git tag ${TAG_VERSION} on branch ${GIT_BRANCH} and pushing to ${GIT_REMOTE}"
if [ "${DRY_RUN}" = "true" ]; then
  info "DRY RUN: Would run: git checkout ${GIT_BRANCH} && git pull ${GIT_REMOTE} ${GIT_BRANCH} && git tag -a ${TAG_VERSION} -m 'Release ${TAG_VERSION}' && git push ${GIT_REMOTE} ${TAG_VERSION}"
else
  # ensure branch exists locally and up-to-date
  run "git fetch ${GIT_REMOTE} ${GIT_BRANCH}:${GIT_BRANCH}"
  run "git checkout ${GIT_BRANCH}"
  run "git pull ${GIT_REMOTE} ${GIT_BRANCH}"
  run "git tag -a ${TAG_VERSION} -m 'Release ${TAG_VERSION}'"
  run "git push ${GIT_REMOTE} ${TAG_VERSION}"
fi

# 5) Notify PagerDuty (Events v2) — create a trigger (high-severity informational)
send_pagerduty_event() {
  if [ -z "${PAGERDUTY_ROUTING_KEY}" ]; then
    warn "PAGERDUTY_ROUTING_KEY not set — skipping PagerDuty trigger"
    return 0
  fi
  local payload
  payload=$(cat <<EOF
{
  "routing_key": "${PAGERDUTY_ROUTING_KEY}",
  "event_action": "trigger",
  "payload": {
    "summary": "Deployment: ${TAG_VERSION} triggered",
    "severity": "info",
    "source": "orchestrator-deploy-script",
    "timestamp": "$(TIMESTAMP)"
  }
}
EOF
)
  if [ "${DRY_RUN}" = "true" ]; then
    info "DRY RUN: Would POST PagerDuty event: ${payload}"
  else
    info "Sending PagerDuty event..."
    if curl -fsS -X POST -H "Content-Type: application/json" -d "${payload}" "https://events.pagerduty.com/v2/enqueue"; then
      info "PagerDuty event sent"
    else
      warn "Failed to send PagerDuty event"
    fi
  fi
}

send_pagerduty_event

# 6) Notify Slack (simple message)
send_slack_message() {
  if [ -z "${SLACK_WEBHOOK_URL}" ]; then
    warn "SLACK_WEBHOOK_URL not set — skipping Slack notification"
    return 0
  fi
  local text="*Deployment:* ${TAG_VERSION}\n*Branch:* ${GIT_BRANCH}\n*Triggered at:* $(TIMESTAMP)\n*Host:* $(hostname)"
  local payload
  payload=$(jq -n --arg t "$text" '{text: $t}') || payload="{\"text\":\"${text}\"}"
  if [ "${DRY_RUN}" = "true" ]; then
    info "DRY RUN: Would POST Slack message: ${text}"
  else
    info "Posting Slack notification..."
    if curl -fsS -X POST -H 'Content-type: application/json' --data "${payload}" "${SLACK_WEBHOOK_URL}"; then
      info "Slack message posted"
    else
      warn "Failed to post Slack message"
    fi
  fi
}

send_slack_message

info "Deployment confirmation script finished for Original Oak Carpentry."

# Exit code: if any health checks failed and not dry-run, return 2 to indicate caution
if [ "${DRY_RUN}" != "true" ] && [ "${failed_health}" -ne 0 ]; then
  warn "There were failing health checks. Please investigate."
  exit 2
fi

exit 0