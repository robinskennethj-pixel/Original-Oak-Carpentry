# MCP Orchestrator Service

This orchestrator service provides centralized management and diagnostics for the MCP (Model Context Protocol) integration system.

## Features

- **Webhook Integration**: Receives webhooks from Builder.io and triggers service updates
- **Health Monitoring**: Checks health status of all MCP services
- **Log Collection**: Aggregates logs from Docker containers for debugging
- **Service Management**: Can restart services when they become unhealthy
- **Diagnostics**: Comprehensive diagnostic endpoint for troubleshooting

## API Endpoints

### Health Check
```bash
GET /health
```
Returns service health status and timestamp.

### Webhook Receiver (Builder.io)
```bash
POST /webhook/builder
Headers: x-builder-secret: {TRUSTED_WEBHOOK_SECRET}
```
Receives webhooks from Builder.io and triggers:
- Document re-ingestion via Docling service
- RAG service warming
- Log collection for debugging

### Diagnostics
```bash
POST /diagnose
Body: {
  "services": ["web", "rag_service", "docling_service"],
  "actions": ["health", "logs", "rebuild"]
}
```
Performs comprehensive diagnostics including:
- Health checks for specified services
- Log collection
- Service rebuilding/restarting

## Environment Variables

- `PORT`: Service port (default: 9000)
- `RAG_API_URL`: RAG service endpoint
- `DOCLING_API_URL`: Docling service endpoint
- `TRUSTED_WEBHOOK_SECRET`: Secret for webhook authentication

## Development

```bash
# Install dependencies
npm ci

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Run in production mode
npm run start
```

## Docker Integration

The orchestrator requires Docker socket access for container management:
```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

## Security Notes

- The Docker socket mount provides significant host access - use only in trusted environments
- Replace the simple webhook secret with signed webhooks (HMAC) for production
- Use network-level controls to restrict access to the orchestrator
- Consider CI/CD pipelines for production rebuilds instead of direct container restarts

## Usage Examples

### Test Health
```bash
curl http://localhost:9000/health
```

### Run Diagnostics
```bash
curl -X POST http://localhost:9000/diagnose \
  -H "Content-Type: application/json" \
  -d '{"services":["web","rag_service","docling_service"],"actions":["health","logs"]}'
```

### Restart a Service
```bash
curl -X POST http://localhost:9000/diagnose \
  -H "Content-Type: application/json" \
  -d '{"services":["rag_service"],"actions":["rebuild"]}'
```

## Builder.io Webhook Setup

1. In Builder.io: Space Settings → Webhooks → Add webhook
2. URL: `http://your-host:9000/webhook/builder`
3. Header: `x-builder-secret` with your `TRUSTED_WEBHOOK_SECRET` value
4. Events: Publish, Unpublish, Content updated