import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { JobQueue } from './queues/jobQueue.js';
import { MCPHandlers } from './mcp/handlers.js';
import express from 'express';
import cors from 'cors';

class BullMQMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'bullmq-mcp-server',
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

    // HTTP server for monitoring
    this.setupHTTPServer();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
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
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return await this.handlers.handleToolCall(request);
    });
  }

  setupHTTPServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Health check endpoint
    app.get('/health', (_req, res) => {
      res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
    });

    // Queue metrics endpoint
    app.get('/metrics', async (_req, res) => {
      try {
        const metrics = await this.handlers.getQueueMetrics();
        res.json(metrics);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Add job via HTTP
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

    // Get job status
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

    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`HTTP server running on port ${PORT}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('BullMQ MCP server running on stdio');

    // Initialize queue connection
    await this.jobQueue.initialize();
  }
}

const server = new BullMQMCPServer();
server.run().catch(console.error);