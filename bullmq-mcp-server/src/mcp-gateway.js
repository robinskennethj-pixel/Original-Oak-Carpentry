import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { JobQueue } from './queues/jobQueue.js';
import { MCPHandlers } from './mcp/handlers.js';
import express from 'express';
import cors from 'cors';

class MCPGateway {
  constructor() {
    this.server = new Server(
      {
        name: 'bullmq-mcp-gateway',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.jobQueue = new JobQueue();
    this.handlers = new MCPHandlers(this.jobQueue);
    this.setupHandlers();
    this.setupHTTPServer();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        await this.jobQueue.initialize();
        return {
          tools: [
            {
              name: 'add_job',
              description: 'Add a new job to the BullMQ queue',
              inputSchema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Job name'
                  },
                  data: {
                    type: 'object',
                    description: 'Job data payload'
                  },
                  delay: {
                    type: 'number',
                    description: 'Delay in milliseconds before processing'
                  }
                },
                required: ['name', 'data']
              }
            },
            {
              name: 'get_queue_metrics',
              description: 'Get metrics and statistics about the BullMQ queue',
              inputSchema: {
                type: 'object',
                properties: {
                  queue: {
                    type: 'string',
                    description: 'Queue name (optional)',
                    default: 'default'
                  }
                }
              }
            },
            {
              name: 'get_job_status',
              description: 'Get the status of a specific job',
              inputSchema: {
                type: 'object',
                properties: {
                  jobId: {
                    type: 'string',
                    description: 'Job ID'
                  }
                },
                required: ['jobId']
              }
            },
            {
              name: 'pause_queue',
              description: 'Pause the queue processing',
              inputSchema: {
                type: 'object',
                properties: {
                  queue: {
                    type: 'string',
                    description: 'Queue name (optional)',
                    default: 'default'
                  }
                }
              }
            },
            {
              name: 'resume_queue',
              description: 'Resume the queue processing',
              inputSchema: {
                type: 'object',
                properties: {
                  queue: {
                    type: 'string',
                    description: 'Queue name (optional)',
                    default: 'default'
                  }
                }
              }
            }
          ]
        };
      } catch (error) {
        console.error('Error initializing queue:', error);
        return {
          tools: []
        };
      }
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      try {
        return await this.handlers.handleToolCall(request);
      } catch (error) {
        console.error('Error handling tool call:', error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`
            }
          ]
        };
      }
    });
  }

  setupHTTPServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'bullmq-mcp-gateway'
      });
    });

    app.get('/metrics', async (req, res) => {
      try {
        const metrics = await this.handlers.getQueueMetrics();
        res.json(metrics);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.post('/jobs', async (req, res) => {
      try {
        const { name, data, delay } = req.body;
        const job = await this.jobQueue.addJob(name, data, delay);
        res.json({
          jobId: job.id,
          status: 'added',
          queue: 'default'
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    app.get('/jobs/:jobId', async (req, res) => {
      try {
        const job = await this.jobQueue.getJob(req.params.jobId);
        if (!job) {
          return res.status(404).json({ error: 'Job not found' });
        }
        res.json({
          id: job.id,
          name: job.name,
          data: job.data,
          status: await job.getState(),
          progress: job.progress,
          timestamp: job.timestamp
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`HTTP gateway server running on port ${PORT}`);
    });
  }

  async run() {
    try {
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      console.error('BullMQ MCP gateway running on stdio');

      await this.jobQueue.initialize();
    } catch (error) {
      console.error('Failed to start MCP gateway:', error);
      process.exit(1);
    }
  }
}

const gateway = new MCPGateway();
gateway.run().catch(console.error);