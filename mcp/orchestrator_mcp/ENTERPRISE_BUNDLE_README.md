# Enterprise Expansion Bundle

This comprehensive bundle implements production-grade enhancements for your Orchestrator MCP system, including rollback CI, persistent volumes, observability, production deployment manifests, and security features.

## 🚀 Features

### 1. **GitHub Actions CI + Rollback & Redeploy**
- **File**: `.github/workflows/rollback-and-redeploy.yml`
- Automated CI pipeline with build, test, and health checks
- Automatic rollback on failure with git revert strategy
- Automated redeployment after rollback
- SSH-based deployment to production servers

### 2. **Persistent Volumes & Production Docker Compose**
- **File**: `docker-compose.prod.yml`
- Redis persistent storage with volume mounts
- Application patches persistence
- Production-optimized service configurations
- Network isolation with external orchestrator network

### 3. **Observability Stack (Prometheus + Grafana)**
- **Files**: `monitoring/prometheus.yml`, metrics endpoint
- Prometheus metrics collection from all services
- Grafana dashboard ready for visualization
- Custom metrics for patches, webhooks, and request duration
- Health monitoring and alerting capabilities

### 4. **Production Deployment Manifests**
- **Files**: `k8s/` directory
- Kubernetes deployments for all services
- Load balancer services for external access
- Persistent volume claims for data retention
- Secrets management for sensitive configuration
- Resource limits and health probes

### 5. **Docker Swarm Stack Configuration**
- **File**: `stack.yml`
- Production-ready Docker Swarm deployment
- Service replication and restart policies
- Resource constraints and limits
- Config and secret management
- Network security with external networks

### 6. **Security Layer**
- **Files**: `src/security.ts`, `.env.production.template`
- JWT-based authentication for API endpoints
- API key authentication for admin operations
- Role-based and permission-based access control
- Environment variable template for secure configuration

## 📦 Files Created

```
mcp/orchestrator_mcp/
├── .github/workflows/rollback-and-redeploy.yml
├── docker-compose.prod.yml
├── monitoring/prometheus.yml
├── src/metrics.ts
├── src/security.ts
├── .env.production.template
├── stack.yml
├── k8s/
│   ├── orchestrator-deployment.yaml
│   ├── rag-deployment.yaml
│   ├── docling-deployment.yaml
│   ├── redis-deployment.yaml
│   └── secrets.yaml
└── ENTERPRISE_BUNDLE_README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Kubernetes cluster (for K8s deployment)
- Docker Swarm cluster (for Swarm deployment)
- GitHub repository with secrets configured

### 1. Setup Environment
```bash
# Copy and configure production environment
cp .env.production.template .env.production
# Edit .env.production with your actual values

# Create required networks
docker network create orchestrator_net
```

### 2. GitHub Secrets Configuration
Add these secrets to your GitHub repository:
- `DEPLOY_HOST`: Your production server hostname/IP
- `DEPLOY_USER`: SSH user for deployment
- `DEPLOY_SSH_KEY`: Private SSH key for deployment access

### 3. Local Production Testing
```bash
# Build and start production stack
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

# Verify services are running
curl http://localhost:4000/health
curl http://localhost:8001/health
curl http://localhost:8000/health

# Check metrics
curl http://localhost:4000/metrics

# Access monitoring dashboards
# Grafana: http://localhost:3000
# Prometheus: http://localhost:9090
```

### 4. Kubernetes Deployment
```bash
# Apply secrets first
kubectl apply -f k8s/secrets.yaml

# Deploy all services
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

### 5. Docker Swarm Deployment
```bash
# Initialize swarm (if not already done)
docker swarm init

# Deploy stack
docker stack deploy -c stack.yml orchestrator

# Check service status
docker stack services orchestrator
docker service ls
```

## 🔒 Security Configuration

### Environment Variables
Update these values in `.env.production`:

```bash
TRUSTED_WEBHOOK_SECRET=your_very_secure_webhook_secret
JWT_SECRET=your_very_secure_jwt_secret_key
ADMIN_API_KEY=your_very_secure_admin_api_key
```

### API Security
Protect critical endpoints with security middleware:

```typescript
// Apply JWT authentication
app.get('/admin/diagnose', requireJwt, requireRole('admin'), diagnoseHandler);

// Apply API key authentication
app.post('/admin/auto-patch', requireApiKey, autoPatchHandler);
```

## 📊 Monitoring & Observability

### Prometheus Metrics
Available at `http://localhost:4000/metrics`:
- `orchestrator_patches_total`: Number of patches applied
- `orchestrator_webhooks_total`: Total webhooks received (labeled by status/source)
- `orchestrator_request_duration_seconds`: Request duration histogram
- `orchestrator_active_connections`: Active connection count

### Grafana Dashboard
Access at `http://localhost:3000`:
- Pre-configured Prometheus data source
- Custom dashboards for orchestrator metrics
- Service health monitoring
- Performance visualization

## 🔧 Rollback Strategy

The GitHub Actions workflow implements a conservative rollback strategy:

1. **Failure Detection**: CI pipeline fails on test/build/health check failures
2. **Automatic Revert**: Creates a rollback commit using `git revert` or `git reset`
3. **Redeployment**: Automatically redeploys the previous working version
4. **Notification**: Provides rollback completion status

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Redeploy
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 🏗️ Production Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │    │  Docker Swarm   │    │  Kubernetes     │
│                 │    │   / K8s Cluster │    │   Cluster       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ CI/CD                  │                      │
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Production Environment                       │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │Orchestrator │  │RAG Service  │  │Docling Svc  │            │
│  │  Port 4000  │  │ Port 8001   │  │ Port 8000   │            │
│  └─────┬───────┘  └─────┬───────┘  └─────┬───────┘            │
│        │                │                │                     │
│        └────────────────┴────────────────┘                     │
│                      Shared Network                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Redis     │  │ Prometheus  │  │   Grafana   │            │
│  │  Port 6379  │  │ Port 9090   │  │ Port 3000   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## 🔍 Troubleshooting

### Common Issues

1. **Network Connectivity**
   ```bash
   # Check network status
   docker network ls
   docker network inspect orchestrator_net
   ```

2. **Service Health**
   ```bash
   # Check service logs
   docker compose logs orchestrator
   docker compose logs rag_service
   docker compose logs docling_service
   ```

3. **Kubernetes Issues**
   ```bash
   # Check pod status
   kubectl get pods
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

4. **Metrics Issues**
   ```bash
   # Test metrics endpoint
   curl http://localhost:4000/metrics

   # Check Prometheus targets
   curl http://localhost:9090/api/v1/targets
   ```

## 📈 Performance Tuning

### Resource Limits
Adjust resource limits in deployment files based on your workload:

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "200m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

### Scaling Strategy
- **Horizontal Scaling**: Increase replica counts in deployment files
- **Vertical Scaling**: Adjust resource requests/limits
- **Auto-scaling**: Configure HPA (Horizontal Pod Autoscaler) for Kubernetes

## 🔄 Maintenance

### Regular Updates
1. Update base images regularly
2. Apply security patches
3. Monitor resource usage
4. Review and rotate secrets
5. Backup persistent data

### Monitoring Checklist
- [ ] All services healthy
- [ ] Metrics collection working
- [ ] Alerting rules configured
- [ ] Log aggregation enabled
- [ ] Backup procedures tested

## 📞 Support

For issues or questions:
1. Check logs: `docker compose logs <service-name>`
2. Verify health endpoints
3. Check GitHub Actions workflow status
4. Review monitoring dashboards
5. Consult deployment manifests for configuration

---

**Note**: This bundle provides a production-ready foundation. Adapt configurations based on your specific requirements, scale, and security policies. Regular security audits and updates are recommended for production deployments.