import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { MCPHandlers } from './mcp/handlers.js';
import { BaseChain } from './chains/baseChain.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

class LangChainMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'langchain-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.baseChain = new BaseChain();
    this.handlers = new MCPHandlers(this.baseChain);
    this.setupHandlers();

    // HTTP server for additional functionality
    this.setupHTTPServer();
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'text_summarize',
          description: 'Summarize text content using LangChain',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text content to summarize'
              },
              max_length: {
                type: 'number',
                description: 'Maximum length of summary',
                default: 200
              }
            },
            required: ['text']
          }
        },
        {
          name: 'question_answer',
          description: 'Answer questions based on provided context',
          inputSchema: {
            type: 'object',
            properties: {
              question: {
                type: 'string',
                description: 'Question to answer'
              },
              context: {
                type: 'string',
                description: 'Context for answering the question'
              }
            },
            required: ['question', 'context']
          }
        },
        {
          name: 'text_classify',
          description: 'Classify text into categories',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text to classify'
              },
              categories: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of possible categories'
              }
            },
            required: ['text', 'categories']
          }
        },
        {
          name: 'web_search',
          description: 'Search the web for information',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query'
              },
              max_results: {
                type: 'number',
                description: 'Maximum number of results',
                default: 5
              }
            },
            required: ['query']
          }
        },
        {
          name: 'document_process',
          description: 'Process and extract information from documents',
          inputSchema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL of the document to process'
              },
              task: {
                type: 'string',
                description: 'What to extract from the document',
                enum: ['summarize', 'extract_key_points', 'analyze_sentiment']
              }
            },
            required: ['url', 'task']
          }
        },
        {
          name: 'code_analyze',
          description: 'Analyze and explain code',
          inputSchema: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                description: 'Code to analyze'
              },
              language: {
                type: 'string',
                description: 'Programming language',
                default: 'javascript'
              }
            },
            required: ['code']
          }
        },
        {
          name: 'text_translate',
          description: 'Translate text between languages',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text to translate'
              },
              target_language: {
                type: 'string',
                description: 'Target language code (e.g., es, fr, de)',
                default: 'es'
              },
              source_language: {
                type: 'string',
                description: 'Source language code (optional)'
              }
            },
            required: ['text', 'target_language']
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
    app.use(express.json({ limit: '10mb' }));

    // Health check
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        service: 'LangChain MCP Server',
        timestamp: new Date().toISOString()
      });
    });

    // Chat endpoint
    app.post('/chat', async (req, res) => {
      try {
        const { message, history = [] } = req.body;
        const response = await this.handlers.chatWithMemory(message, history);
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Batch processing
    app.post('/batch/summarize', async (req, res) => {
      try {
        const { texts } = req.body;
        const summaries = await this.handlers.batchSummarize(texts);
        res.json({ summaries });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Document analysis
    app.post('/analyze/document', async (req, res) => {
      try {
        const { content, analysis_type } = req.body;
        const result = await this.handlers.analyzeDocument(content, analysis_type);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`LangChain MCP HTTP server running on port ${PORT}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('LangChain MCP server running on stdio');

    // Initialize LangChain components
    await this.baseChain.initialize();
  }
}

const server = new LangChainMCPServer();
server.run().catch(console.error);