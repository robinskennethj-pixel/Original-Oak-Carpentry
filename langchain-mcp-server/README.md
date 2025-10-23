# LangChain MCP Server

A comprehensive Model Context Protocol (MCP) server powered by LangChain, providing AI-powered tools for text processing, web search, document analysis, and more.

## Features

- **Text Summarization** - Summarize long texts with configurable length limits
- **Question Answering** - Answer questions based on provided context
- **Text Classification** - Classify text into custom categories
- **Web Search** - Search the web for information (SerpAPI integration)
- **Document Processing** - Extract and analyze content from PDFs, DOCX, and web pages
- **Code Analysis** - Analyze and explain code in various programming languages
- **Text Translation** - Translate text between languages
- **HTTP API** - Additional REST endpoints for batch processing and chat functionality

## Quick Start

### Prerequisites

- Node.js 18+
- Docker (optional)
- API keys:
  - OpenAI API key (required)
  - SerpAPI key (optional, for web search)

### Installation

1. Clone and setup:
```bash
cd langchain-mcp-server
cp .env.example .env
# Edit .env and add your API keys
```

2. Install dependencies:
```bash
npm install
```

3. Run the server:
```bash
npm run dev  # Development mode with watch
npm start    # Production mode
```

### Docker Setup

```bash
docker-compose up --build
```

## Usage

### MCP Tools

The server provides these tools through the Model Context Protocol:

#### Text Summarization
```json
{
  "name": "text_summarize",
  "arguments": {
    "text": "Your long text here...",
    "max_length": 200
  }
}
```

#### Question Answering
```json
{
  "name": "question_answer",
  "arguments": {
    "question": "What is the main topic?",
    "context": "The provided context text..."
  }
}
```

#### Web Search
```json
{
  "name": "web_search",
  "arguments": {
    "query": "latest AI developments",
    "max_results": 5
  }
}
```

#### Document Processing
```json
{
  "name": "document_process",
  "arguments": {
    "url": "https://example.com/document.pdf",
    "task": "summarize"
  }
}
```

### HTTP API Endpoints

- `GET /health` - Health check
- `POST /chat` - Chat with memory
- `POST /batch/summarize` - Batch text summarization
- `POST /analyze/document` - Document analysis

#### Chat Example
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is LangChain?",
    "history": []
  }'
```

## Configuration

Environment variables:
- `OPENAI_API_KEY` - Required for AI functionality
- `SERPAPI_API_KEY` - Optional, for web search
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Docker Deployment

The server includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t langchain-mcp .
docker run -p 3000:3000 --env-file .env langchain-mcp
```

## API Reference

### MCP Tools

| Tool | Description | Required Parameters |
|------|-------------|-------------------|
| `text_summarize` | Summarize text | `text` |
| `question_answer` | Q&A with context | `question`, `context` |
| `text_classify` | Text classification | `text`, `categories` |
| `web_search` | Web search | `query` |
| `document_process` | Document analysis | `url`, `task` |
| `code_analyze` | Code analysis | `code` |
| `text_translate` | Text translation | `text`, `target_language` |

### HTTP Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/chat` | POST | Chat with AI |
| `/batch/summarize` | POST | Batch summarization |
| `/analyze/document` | POST | Document analysis |

## Examples

### Document Analysis
Process a PDF document and extract key points:
```json
{
  "name": "document_process",
  "arguments": {
    "url": "https://example.com/report.pdf",
    "task": "extract_key_points"
  }
}
```

### Code Analysis
Analyze JavaScript code:
```json
{
  "name": "code_analyze",
  "arguments": {
    "code": "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
    "language": "javascript"
  }
}
```

### Text Translation
Translate text to Spanish:
```json
{
  "name": "text_translate",
  "arguments": {
    "text": "Hello, how are you today?",
    "target_language": "es"
  }
}
```

## Error Handling

The server includes comprehensive error handling:
- Invalid API keys return appropriate error messages
- Missing parameters are validated
- Network failures have fallback mechanisms
- All errors are logged for debugging

## Development

For development:
```bash
npm run dev  # Runs with file watching
```

The server will auto-restart on file changes during development.

## License

MIT License - see LICENSE file for details.