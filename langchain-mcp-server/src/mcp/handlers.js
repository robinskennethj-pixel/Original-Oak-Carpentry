import { WebSearchTool } from '../tools/webSearch.js';
import { DocumentLoader } from '../tools/documentLoader.js';

export class MCPHandlers {
  constructor(baseChain) {
    this.baseChain = baseChain;
    this.webSearch = new WebSearchTool();
    this.documentLoader = new DocumentLoader();
  }

  async handleToolCall(request) {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case 'text_summarize':
          return await this.handleTextSummarize(args);
        case 'question_answer':
          return await this.handleQuestionAnswer(args);
        case 'text_classify':
          return await this.handleTextClassify(args);
        case 'web_search':
          return await this.handleWebSearch(args);
        case 'document_process':
          return await this.handleDocumentProcess(args);
        case 'code_analyze':
          return await this.handleCodeAnalyze(args);
        case 'text_translate':
          return await this.handleTextTranslate(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`
          }
        ]
      };
    }
  }

  async handleTextSummarize(args) {
    const { text, max_length = 200 } = args;

    const summary = await this.baseChain.runChain('summarization', {
      text,
      max_length
    });

    return {
      content: [
        {
          type: 'text',
          text: `Summary (max ${max_length} chars):\n${summary}`
        }
      ]
    };
  }

  async handleQuestionAnswer(args) {
    const { question, context } = args;

    const answer = await this.baseChain.runChain('qa', {
      question,
      context
    });

    return {
      content: [
        {
          type: 'text',
          text: `Question: ${question}\n\nAnswer: ${answer}`
        }
      ]
    };
  }

  async handleTextClassify(args) {
    const { text, categories } = args;

    const classification = await this.baseChain.runChain('classification', {
      text,
      categories: categories.join(', ')
    });

    return {
      content: [
        {
          type: 'text',
          text: `Classification:\n${classification}`
        }
      ]
    };
  }

  async handleWebSearch(args) {
    const { query, max_results = 5 } = args;

    const results = await this.webSearch.search(query, max_results);

    return {
      content: [
        {
          type: 'text',
          text: `Web Search Results for "${query}":\n\n${results.map((result, index) =>
            `${index + 1}. ${result.title}\n   URL: ${result.link}\n   Snippet: ${result.snippet}\n`
          ).join('\n')}`
        }
      ]
    };
  }

  async handleDocumentProcess(args) {
    const { url, task } = args;

    const documentContent = await this.documentLoader.loadFromUrl(url);

    let analysis;
    switch (task) {
      case 'summarize':
        analysis = await this.baseChain.runChain('summarization', {
          text: documentContent,
          max_length: 500
        });
        break;
      case 'extract_key_points':
        analysis = await this.baseChain.directLLMCall([
          { role: 'system', content: 'Extract key points from the document. Be concise and focus on main ideas.' },
          { role: 'user', content: `Document:\n${documentContent}\n\nKey Points:` }
        ]);
        break;
      case 'analyze_sentiment':
        analysis = await this.baseChain.runChain('classification', {
          text: documentContent,
          categories: ['positive', 'negative', 'neutral', 'mixed']
        });
        break;
      default:
        throw new Error(`Unknown task: ${task}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `Document Analysis (${task}):\n\n${analysis}`
        }
      ]
    };
  }

  async handleCodeAnalyze(args) {
    const { code, language = 'javascript' } = args;

    const analysis = await this.baseChain.runChain('code_analysis', {
      code,
      language
    });

    return {
      content: [
        {
          type: 'text',
          text: `Code Analysis (${language}):\n\n${analysis}`
        }
      ]
    };
  }

  async handleTextTranslate(args) {
    const { text, target_language, source_language } = args;

    const translation = await this.baseChain.runChain('translation', {
      text,
      target_language,
      source_language
    });

    return {
      content: [
        {
          type: 'text',
          text: `Translation to ${target_language}:\n\n${translation}`
        }
      ]
    };
  }

  // Additional HTTP handler methods
  async chatWithMemory(message, history = []) {
    // Convert history to proper format if needed
    const formattedHistory = history.map(msg => {
      if (typeof msg === 'string') {
        return { role: 'user', content: msg };
      }
      return msg;
    });

    const response = await this.baseChain.directLLMCall([
      ...formattedHistory,
      { role: 'user', content: message }
    ]);

    return {
      response,
      history: [
        ...formattedHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ]
    };
  }

  async batchSummarize(texts) {
    const summaries = [];
    for (const text of texts) {
      const summary = await this.baseChain.runChain('summarization', {
        text,
        max_length: 150
      });
      summaries.push(summary);
    }
    return summaries;
  }

  async analyzeDocument(content, analysisType) {
    return await this.handleDocumentProcess({
      url: `data:text/plain,${encodeURIComponent(content)}`,
      task: analysisType
    });
  }
}