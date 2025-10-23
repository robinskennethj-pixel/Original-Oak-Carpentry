# Core Orchestrator MCP Service

This is the central nervous system for your MCP (Model Context Protocol) integration, providing real-time orchestration, monitoring, and self-healing capabilities for your Builder.io + RAG + Docling stack.

## 🚀 Features

- **Builder.io Webhook Integration** - Receives content updates and triggers automatic reindexing
- **Docker Container Monitoring** - Watches container events and health status
- **Event-Driven Architecture** - Redis-based pub/sub for real-time coordination
- **Claude MCP Integration** - Provides diagnostics and receives commands
- **Self-Healing Automation** - Auto-restarts failed containers and services
- **Comprehensive Diagnostics** - Health checks, logs, and metrics collection
- **Version Rollback Support** - Git/Docker-based rollback capabilities
- **Live Content Sync Testing** - Verifies Builder.io → Frontend → RAG pipeline

## 📁 Architecture

```
orchestrator_mcp/
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.template
└── src/
    ├── index.ts          # Main server entry point
    ├── builderWebhook.ts # Builder.io webhook handler
    ├── dockerWatcher.ts  # Docker container monitoring
    ├── ragBridge.ts      # RAG/Docling coordination
    ├── claudeClient.ts   # Claude MCP diagnostics
    └── eventBus.ts       # Redis event bus
```

## 🔧 Quick Start

### 1. Environment Setup

```bash
# Copy environment template
cp .env.template .env

# Edit .env with your actual values
PORT=9000
RAG_API_URL=http://rag_service:8001
DOCLING_API_URL=http://docling_service:8000
WEB_API_URL=http://web:3000
TRUSTED_WEBHOOK_SECRET=your_secure_webhook_secret
REDIS_URL=redis://redis:6379
```

### 2. Build & Run

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Run in production mode
npm run start
```

### 3. Docker Compose Integration

Add to your main `docker-compose.yml`:

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - mcp_network

  orchestrator:
    build: ./mcp/orchestrator_mcp
    container_name: orchestrator
    ports:
      - "9000:9000"
    environment:
      - PORT=9000
      - RAG_API_URL=${RAG_API_URL}
      - DOCLING_API_URL=${DOCLING_API_URL}
      - WEB_API_URL=${WEB_API_URL}
      - TRUSTED_WEBHOOK_SECRET=${TRUSTED_WEBHOOK_SECRET}
      - REDIS_URL=redis://redis:6379
      - DOCKER_SOCKET_PATH=/var/run/docker.sock
    depends_on:
      - web
      - rag_service
      - docling_service
      - redis
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock   # dev only; powerful permission
    restart: unless-stopped
    networks:
      - mcp_network

volumes:
  redis_data:
```

## 📡 API Endpoints

### Health Check
```bash
curl http://localhost:9000/health
```

### Builder.io Webhook
```bash
curl -X POST http://localhost:9000/webhook/builder \
  -H "Content-Type: application/json" \
  -H "x-builder-secret: your_secure_webhook_secret" \
  -d '{"model":"page","id":"abc123","data":{"title":"New Page"}}'
```

### System Diagnostics
```bash
curl -X POST http://localhost:9000/diagnose \
  -H "Content-Type: application/json" \
  -d '{
    "services": ["web", "rag_service", "docling_service"],
    "actions": ["health", "logs", "rebuild"]
  }'
```

## 🔄 Event Flow

1. **Builder.io publishes content** → Webhook received
2. **Orchestrator processes webhook** → Publishes to Redis event bus
3. **Docling service** → Re-ingests documents
4. **RAG service** → Re-indexes embeddings
5. **Docker watcher** → Monitors container health
6. **Claude integration** → Receives status updates
7. **Self-healing** → Auto-restarts failed containers

## 🛡️ Security & Production Checklist

### ⚠️ CRITICAL SECURITY NOTES

1. **Docker Socket Mount** - `/var/run/docker.sock` gives root-level host access
   - **NEVER** mount in production on public/untrusted hosts
   - Use private networks or VPN only
   - Consider Docker-in-Docker for production isolation

2. **Webhook Secret** - Replace `TRUSTED_WEBHOOK_SECRET` with strong secret
   - Use HMAC-signed webhooks for production (Builder.io supports this)
   - Rotate secrets regularly

3. **Network Security**
   - Orchestrator and Redis should not be publicly accessible
   - Use internal Docker networks or VPN
   - Add authentication to `/diagnose` and other endpoints

### 🔒 Production Security

```bash
# Generate strong webhook secret
openssl rand -hex 32

# Use Builder.io HMAC webhooks
# In Builder.io: Space Settings → Webhooks → Add webhook
# URL: https://yourdomain.com/webhook/builder
# Header: x-builder-signature (HMAC)
# Secret: your_generated_secret
```

### 🏗️ Production Deployment

1. **Use CI/CD pipelines** for container rebuilds instead of direct Docker restarts
2. **Add monitoring** (Prometheus/Grafana or hosted service)
3. **Implement log rotation** and centralized logging
4. **Use secrets management** (Docker secrets, Kubernetes secrets, etc.)
5. **Add health checks** and alerting
6. **Implement backup strategies** for Redis and important data

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:9000/health

# Test Builder webhook (simulate)
curl -X POST http://localhost:9000/webhook/builder \
  -H "x-builder-secret: your_secret" \
  -d '{"test":"payload"}'

# Test diagnostics
curl -X POST http://localhost:9000/diagnose \
  -H "Content-Type: application/json" \
  -d '{"services":["web"],"actions":["health"]}'
```

## 📊 Monitoring

The orchestrator provides:
- Real-time health checks every 30 seconds
- Docker container event monitoring
- Builder.io content sync verification
- Comprehensive diagnostics endpoint
- WebSocket support for real-time updates

## 🔧 Troubleshooting

### Common Issues

1. **Docker socket not accessible**
   - Ensure Docker is running
   - Check socket permissions
   - Verify volume mount in docker-compose

2. **Redis connection failed**
   - Check Redis container is running
   - Verify REDIS_URL environment variable
   - Test Redis connection separately

3. **Webhook secret mismatch**
   - Verify secret in both Builder.io and .env
   - Check header name (x-builder-secret)
   - Test with curl first

4. **Container health checks failing**
   - Check individual service health endpoints
   - Verify network connectivity between containers
   - Review service logs for errors

## 🚀 Advanced Features

### Self-Healing Automation
- Auto-restart failed containers
- Version rollback on failures
- Health check monitoring with alerts
- Content sync validation

### Real-time Monitoring
- WebSocket connections for live updates
- Event-driven architecture with Redis
- Comprehensive metrics collection
- Docker container lifecycle tracking

### Builder.io Integration
- Automatic content reindexing
- Webhook-based content sync
- Live content validation tests
- Error reporting and recovery

## 📞 Support

For issues or questions:
1. Check the logs: `docker logs orchestrator`
2. Test health endpoints
3. Verify environment variables
4. Check Docker container status

The orchestrator provides the central nervous system for your MCP integration, enabling Claude Code to have real-time visibility and control over your entire infrastructure.