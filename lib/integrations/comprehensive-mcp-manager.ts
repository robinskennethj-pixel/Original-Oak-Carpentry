'use client';

import axios from 'axios';

// RULE: ALWAYS USE ALL AVAILABLE MCP SERVERS FOR BUILDING AND ERROR FIXING
// This manager will automatically discover, start, and utilize ALL MCP servers

interface MCPServer {
  name: string;
  image: string;
  port: number;
  status: 'running' | 'stopped' | 'available';
  baseUrl?: string;
  description: string;
  capabilities: string[];
  health?: () => Promise<boolean>;
}

interface MCPManagerConfig {
  autoStartStoppedServers: boolean;
  useAllServersForErrors: boolean;
  useAllServersForBuilding: boolean;
  fallbackToAvailableImages: boolean;
  continuousHealthCheck: boolean;
}

class ComprehensiveMCPManager {
  private servers: Map<string, MCPServer> = new Map();
  private config: MCPManagerConfig = {
    autoStartStoppedServers: true,
    useAllServersForErrors: true,
    useAllServersForBuilding: true,
    fallbackToAvailableImages: true,
    continuousHealthCheck: true
  };

  constructor() {
    this.initializeAllServers();
    this.startHealthMonitoring();
  }

  // RULE IMPLEMENTATION: Always use ALL available MCP servers
  private initializeAllServers() {
    // RUNNING SERVERS
    this.servers.set('langchain', {
      name: 'LangChain MCP',
      image: 'langchain-mcp-server-langchain-mcp',
      port: 3000,
      status: 'running',
      baseUrl: 'http://localhost:3000',
      description: 'AI content generation and analysis',
      capabilities: ['text-generation', 'image-analysis', 'content-creation', 'data-processing'],
      health: async () => await this.checkHealth('http://localhost:3000/health')
    });

    this.servers.set('port-conflict-resolver', {
      name: 'Port Conflict Resolver',
      image: 'mcp/docker:latest',
      port: 3001,
      status: 'running',
      baseUrl: 'http://localhost:3001',
      description: 'Resolves port conflicts and manages Docker networking',
      capabilities: ['port-management', 'network-resolution', 'docker-networking'],
      health: async () => await this.checkHealth('http://localhost:3001/health')
    });

    this.servers.set('bullmq', {
      name: 'BullMQ MCP',
      image: 'bullmq-mcp-server-bullmq-mcp',
      port: 3002,
      status: 'running',
      baseUrl: 'http://localhost:3002',
      description: 'Background job processing and queue management',
      capabilities: ['job-queue', 'background-processing', 'task-scheduling'],
      health: async () => await this.checkHealth('http://localhost:3002/health')
    });

    this.servers.set('performance-monitor', {
      name: 'Performance Monitor',
      image: 'mcp/grafana:latest',
      port: 3007,
      status: 'running',
      baseUrl: 'http://localhost:3007',
      description: 'Performance monitoring and metrics visualization',
      capabilities: ['performance-monitoring', 'metrics', 'visualization', 'analytics'],
      health: async () => await this.checkHealth('http://localhost:3007/health')
    });

    this.servers.set('port-manager', {
      name: 'Port Manager',
      image: 'mcp/docker:latest',
      port: 3009,
      status: 'running',
      baseUrl: 'http://localhost:3009',
      description: 'Docker container and port management',
      capabilities: ['docker-management', 'container-orchestration', 'port-allocation'],
      health: async () => await this.checkHealth('http://localhost:3009/health')
    });

    this.servers.set('build-automation', {
      name: 'Build Automation',
      image: 'mcp/node-code-sandbox:latest',
      port: 3010,
      status: 'running',
      baseUrl: 'http://localhost:3010',
      description: 'Code sandbox and build automation',
      capabilities: ['code-execution', 'build-automation', 'sandbox-environment', 'testing'],
      health: async () => await this.checkHealth('http://localhost:3010/health')
    });

    // STOPPED SERVERS (Available for restart)
    this.servers.set('security-scanner-ramparts', {
      name: 'Security Scanner (Ramparts)',
      image: 'mcp/ramparts:latest',
      port: 3011,
      status: 'stopped',
      description: 'Security vulnerability scanning and analysis',
      capabilities: ['security-scanning', 'vulnerability-detection', 'threat-analysis']
    });

    this.servers.set('frontend-health-checker', {
      name: 'Frontend Health Checker',
      image: 'mcp/fetch:latest',
      port: 3012,
      status: 'stopped',
      description: 'Frontend health monitoring and uptime checking',
      capabilities: ['health-monitoring', 'uptime-checking', 'frontend-analysis']
    });

    this.servers.set('security-scanner-sentry', {
      name: 'Security Scanner (Sentry)',
      image: 'mcp/sentry:latest',
      port: 3013,
      status: 'stopped',
      description: 'Error tracking and security monitoring',
      capabilities: ['error-tracking', 'security-monitoring', 'incident-reporting']
    });

    this.servers.set('frontend-analyzer', {
      name: 'Frontend Analyzer',
      image: 'mcp/ast-grep:latest',
      port: 3014,
      status: 'stopped',
      description: 'Code analysis and pattern matching for frontend',
      capabilities: ['code-analysis', 'pattern-matching', 'ast-parsing', 'refactoring']
    });

    this.servers.set('git-mcp', {
      name: 'Git MCP',
      image: 'mcp/git:latest',
      port: 3015,
      status: 'stopped',
      description: 'Git repository operations and version control',
      capabilities: ['git-operations', 'version-control', 'repository-management', 'branch-analysis']
    });

    this.servers.set('filesystem-mcp', {
      name: 'Filesystem MCP',
      image: 'mcp/filesystem:latest',
      port: 3016,
      status: 'stopped',
      description: 'Filesystem operations and file management',
      capabilities: ['file-operations', 'directory-management', 'file-analysis', 'permissions']
    });

    this.servers.set('slack-mcp', {
      name: 'Slack MCP',
      image: 'mcp/slack:latest',
      port: 3017,
      status: 'stopped',
      description: 'Slack integration and messaging',
      capabilities: ['slack-integration', 'messaging', 'notifications', 'channel-management']
    });

    // AVAILABLE IMAGES (Context7 and others you mentioned!)
    this.servers.set('context7', {
      name: 'Context7 MCP',
      image: 'mcp/context7:latest',
      port: 3018,
      status: 'running',
      baseUrl: 'http://localhost:3018',
      description: 'Advanced context management and AI reasoning',
      capabilities: ['context-management', 'ai-reasoning', 'advanced-analysis', 'knowledge-graph'],
      health: async () => await this.checkContext7Health()
    });

    this.servers.set('aws-core', {
      name: 'AWS Core MCP',
      image: 'mcp/aws-core-mcp-server:latest',
      port: 3019,
      status: 'available',
      description: 'AWS core services integration',
      capabilities: ['aws-services', 'cloud-management', 'resource-provisioning', 'cost-analysis']
    });

    this.servers.set('aws-cdk', {
      name: 'AWS CDK MCP',
      image: 'mcp/aws-cdk-mcp-server:latest',
      port: 3020,
      status: 'available',
      description: 'AWS CDK infrastructure as code',
      capabilities: ['infrastructure-as-code', 'cdk-deployment', 'cloudformation', 'resource-management']
    });

    this.servers.set('aws-documentation', {
      name: 'AWS Documentation MCP',
      image: 'mcp/aws-documentation:latest',
      port: 3021,
      status: 'available',
      description: 'AWS documentation and API reference',
      capabilities: ['documentation-access', 'api-reference', 'service-guides', 'best-practices']
    });

    this.servers.set('desktop-commander', {
      name: 'Desktop Commander MCP',
      image: 'mcp/desktop-commander:latest',
      port: 3022,
      status: 'available',
      description: 'Desktop application control and automation',
      capabilities: ['desktop-automation', 'application-control', 'system-commands', 'gui-interaction']
    });

    this.servers.set('stripe-mcp', {
      name: 'Stripe MCP',
      image: 'mcp/stripe:latest',
      port: 3023,
      status: 'available',
      description: 'Stripe payment processing integration',
      capabilities: ['payment-processing', 'billing', 'subscription-management', 'financial-analysis']
    });

    this.servers.set('wolfram-alpha', {
      name: 'Wolfram Alpha MCP',
      image: 'mcp/wolfram-alpha:latest',
      port: 3024,
      status: 'available',
      description: 'Wolfram Alpha computational knowledge',
      capabilities: ['computational-knowledge', 'mathematical-analysis', 'data-computation', 'scientific-calculations']
    });

    this.servers.set('openapi-schema', {
      name: 'OpenAPI Schema MCP',
      image: 'mcp/openapi-schema:latest',
      port: 3025,
      status: 'available',
      description: 'OpenAPI schema validation and generation',
      capabilities: ['schema-validation', 'api-generation', 'documentation-generation', 'contract-testing']
    });

    this.servers.set('neon-database', {
      name: 'Neon Database MCP',
      image: 'mcp/neon:latest',
      port: 3026,
      status: 'available',
      description: 'Neon serverless database integration',
      capabilities: ['database-management', 'serverless-postgres', 'query-optimization', 'data-migration']
    });

    this.servers.set('duckduckgo-search', {
      name: 'DuckDuckGo Search MCP',
      image: 'mcp/duckduckgo:latest',
      port: 3027,
      status: 'available',
      description: 'DuckDuckGo search integration',
      capabilities: ['search-integration', 'privacy-focused-search', 'web-search', 'information-retrieval']
    });

    this.servers.set('dockerhub', {
      name: 'DockerHub MCP',
      image: 'mcp/dockerhub:latest',
      port: 3028,
      status: 'available',
      description: 'DockerHub registry integration',
      capabilities: ['registry-access', 'image-management', 'repository-browsing', 'container-deployment']
    });
  }

  // RULE: Use ALL MCP servers for error fixing
  async fixError(error: Error, context: any): Promise<string> {
    if (!this.config.useAllServersForErrors) return '';

    const availableServers = Array.from(this.servers.values()).filter(s => s.status === 'running');
    const fixes: string[] = [];

    console.log(`🛠️  Using ${availableServers.length} MCP servers to fix error: ${error.message}`);

    for (const server of availableServers) {
      try {
        const fix = await this.getErrorFixFromServer(server, error, context);
        if (fix) fixes.push(`[${server.name}]: ${fix}`);
      } catch (e) {
        console.warn(`Failed to get fix from ${server.name}:`, e);
      }
    }

    return fixes.join('\n');
  }

  // RULE: Use ALL MCP servers for building
  async assistBuild(buildContext: any): Promise<string> {
    if (!this.config.useAllServersForBuilding) return '';

    const availableServers = Array.from(this.servers.values()).filter(s => s.status === 'running');
    const suggestions: string[] = [];

    console.log(`🔨 Using ${availableServers.length} MCP servers to assist with build`);

    for (const server of availableServers) {
      try {
        const suggestion = await this.getBuildSuggestionFromServer(server, buildContext);
        if (suggestion) suggestions.push(`[${server.name}]: ${suggestion}`);
      } catch (e) {
        console.warn(`Failed to get build suggestion from ${server.name}:`, e);
      }
    }

    return suggestions.join('\n');
  }

  // RULE: Auto-start stopped servers
  async autoStartStoppedServers(): Promise<void> {
    if (!this.config.autoStartStoppedServers) return;

    const stoppedServers = Array.from(this.servers.values()).filter(s => s.status === 'stopped');

    console.log(`🚀 Auto-starting ${stoppedServers.length} stopped MCP servers...`);

    for (const server of stoppedServers) {
      try {
        await this.startServer(server);
        console.log(`✅ Started ${server.name}`);
      } catch (e) {
        console.error(`❌ Failed to start ${server.name}:`, e);
      }
    }
  }

  // RULE: Start available images
  async startAvailableImages(): Promise<void> {
    if (!this.config.fallbackToAvailableImages) return;

    const availableServers = Array.from(this.servers.values()).filter(s => s.status === 'available');

    console.log(`📦 Starting ${availableServers.length} available MCP server images...`);

    for (const server of availableServers) {
      try {
        await this.deployServer(server);
        console.log(`✅ Deployed ${server.name}`);
      } catch (e) {
        console.error(`❌ Failed to deploy ${server.name}:`, e);
      }
    }
  }

  // Core helper methods
  private async checkHealth(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  private async checkContext7Health(): Promise<boolean> {
    try {
      // Context7 may have different endpoint structure, try multiple approaches
      const endpoints = ['/health', '/mcp', '/status', '/'];
      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(`http://localhost:3018${endpoint}`, { timeout: 3000 });
          if (response.status === 200) return true;
        } catch {
          continue;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  private async getErrorFixFromServer(server: MCPServer, error: Error, context: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await axios.post(`${server.baseUrl}/fix-error`, {
        error: error.message,
        stack: error.stack,
        context
      });
      return response.data?.fix || '';
    } catch {
      return '';
    }
  }

  private async getBuildSuggestionFromServer(server: MCPServer, buildContext: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await axios.post(`${server.baseUrl}/build-suggestion`, buildContext);
      return response.data?.suggestion || '';
    } catch {
      return '';
    }
  }

  private async startServer(server: MCPServer): Promise<void> {
    // Docker command to start stopped container
    const containerName = server.name.toLowerCase().replace(/\s+/g, '-');

    try {
      await axios.post('/api/docker/start', {
        image: server.image,
        name: containerName,
        port: server.port
      });

      server.status = 'running';
      server.baseUrl = `http://localhost:${server.port}`;
      server.health = async () => await this.checkHealth(server.baseUrl!);
    } catch (e) {
      throw new Error(`Failed to start ${server.name}: ${e}`);
    }
  }

  private async deployServer(server: MCPServer): Promise<void> {
    // Docker command to deploy new container from image
    const containerName = server.name.toLowerCase().replace(/\s+/g, '-');

    try {
      await axios.post('/api/docker/deploy', {
        image: server.image,
        name: containerName,
        port: server.port
      });

      server.status = 'running';
      server.baseUrl = `http://localhost:${server.port}`;
      server.health = async () => await this.checkHealth(server.baseUrl!);
    } catch (e) {
      throw new Error(`Failed to deploy ${server.name}: ${e}`);
    }
  }

  private startHealthMonitoring(): void {
    if (!this.config.continuousHealthCheck) return;

    setInterval(async () => {
      for (const [key, server] of this.servers) {
        if (server.status === 'running' && server.health) {
          try {
            const isHealthy = await server.health();
            if (!isHealthy) {
              console.warn(`⚠️  ${server.name} health check failed`);
            }
          } catch (e) {
            console.error(`❌ ${server.name} health check error:`, e);
          }
        }
      }
    }, 30000); // Check every 30 seconds
  }

  // Get all available servers
  getAllServers(): MCPServer[] {
    return Array.from(this.servers.values());
  }

  getRunningServers(): MCPServer[] {
    return Array.from(this.servers.values()).filter(s => s.status === 'running');
  }

  getServerByName(name: string): MCPServer | undefined {
    return this.servers.get(name);
  }

  // RULE: Always use all servers for any development task
  async executeWithAllServers<T>(task: (servers: MCPServer[]) => Promise<T>): Promise<T> {
    const runningServers = this.getRunningServers();
    console.log(`🚀 Executing task with ${runningServers.length} MCP servers`);
    return await task(runningServers);
  }
}

// Singleton instance
export const comprehensiveMCPManager = new ComprehensiveMCPManager();

// Export for use in components
export default ComprehensiveMCPManager;