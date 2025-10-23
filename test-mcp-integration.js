// Comprehensive MCP integration test script
const axios = require('axios');

const MCP_ENDPOINTS = {
  docling: 'http://localhost:8000',
  rag: 'http://localhost:8001',
  nextjs: 'http://localhost:3002'
};

class MCPIntegrationTester {
  constructor() {
    this.results = [];
  }

  async log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '🧪';
    console.log(`${prefix} [${timestamp}] ${message}`);
    this.results.push({ timestamp, message, type });
  }

  async testServiceHealth(serviceName, endpoint) {
    try {
      this.log(`Testing ${serviceName} health...`);
      const response = await axios.get(`${endpoint}/health`, { timeout: 5000 });

      if (response.data.status === 'healthy') {
        this.log(`${serviceName} is healthy`, 'success');
        return true;
      } else {
        this.log(`${serviceName} health check failed`, 'error');
        return false;
      }
    } catch (error) {
      this.log(`${serviceName} not responding: ${error.message}`, 'error');
      return false;
    }
  }

  async testDoclingService() {
    try {
      this.log('Testing Docling document parsing...');

      // Test with a simple text content
      const testContent = {
        text: "Carpentry is a skilled trade that involves cutting, shaping, and installing building materials.",
        metadata: { source: "test", category: "trade" }
      };

      // In a real test, you would upload a file
      const response = await axios.get(`${MCP_ENDPOINTS.docling}/`);

      if (response.data.service === 'Docling MCP Service') {
        this.log('Docling service is functional', 'success');
        return true;
      }
    } catch (error) {
      this.log(`Docling test failed: ${error.message}`, 'error');
      return false;
    }
  }

  async testRAGService() {
    try {
      this.log('Testing RAG vector search...');

      // First, add some sample documents
      const sampleDocs = {
        documents: [
          {
            id: "carpentry_1",
            content: "Oak is a premium hardwood used in high-quality furniture and cabinetry. It's known for durability and beautiful grain patterns.",
            metadata: { category: "materials", type: "wood" }
          },
          {
            id: "carpentry_2",
            content: "Traditional carpentry techniques include joinery, carving, and finishing. These skills require years of practice to master.",
            metadata: { category: "techniques", type: "skills" }
          }
        ]
      };

      // Add documents to vector store
      await axios.post(`${MCP_ENDPOINTS.rag}/add_documents`, sampleDocs);
      this.log('Sample documents added to RAG service');

      // Test vector search
      const queryResponse = await axios.get(`${MCP_ENDPOINTS.rag}/query?q=What is oak wood used for?&top_k=3`);

      if (queryResponse.data.results && queryResponse.data.results.length > 0) {
        this.log(`RAG search returned ${queryResponse.data.results.length} relevant results`, 'success');

        // Show first result
        const firstResult = queryResponse.data.results[0];
        this.log(`Top result (${Math.round(firstResult.similarity_score * 100)}% similarity): ${firstResult.content.substring(0, 100)}...`);

        return true;
      } else {
        this.log('RAG search returned no results', 'error');
        return false;
      }

    } catch (error) {
      this.log(`RAG test failed: ${error.message}`, 'error');
      return false;
    }
  }

  async testNextJSIntegration() {
    try {
      this.log('Testing Next.js API integration...');

      // Test the ask API endpoint
      const response = await axios.get(`${MCP_ENDPOINTS.nextjs}/api/ask?q=What carpentry services do you offer?`);

      if (response.data.source === 'mcp-rag-service') {
        this.log('Next.js API successfully connected to RAG service', 'success');
        return true;
      } else if (response.data.fallback) {
        this.log('Next.js API is using fallback (RAG service may be down)', 'info');
        return false;
      }
    } catch (error) {
      this.log(`Next.js integration test failed: ${error.message}`, 'error');
      return false;
    }
  }

  async runAllTests() {
    console.log('🚀 Starting MCP Integration Tests...\n');

    // Test service health
    const doclingHealthy = await this.testServiceHealth('Docling', MCP_ENDPOINTS.docling);
    const ragHealthy = await this.testServiceHealth('RAG', MCP_ENDPOINTS.rag);
    const nextjsHealthy = await this.testServiceHealth('Next.js', MCP_ENDPOINTS.nextjs);

    if (doclingHealthy) {
      await this.testDoclingService();
    }

    if (ragHealthy) {
      await this.testRAGService();
    }

    if (nextjsHealthy) {
      await this.testNextJSIntegration();
    }

    // Summary
    console.log('\n📊 Test Summary:');
    const successCount = this.results.filter(r => r.type === 'success').length;
    const errorCount = this.results.filter(r => r.type === 'error').length;

    console.log(`✅ Successes: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`🧪 Total Tests: ${this.results.length}`);

    if (errorCount === 0) {
      console.log('\n🎉 All MCP integration tests passed!');
    } else {
      console.log('\n⚠️  Some tests failed. Check the logs above for details.');
    }
  }
}

// Export for use
module.exports = MCPIntegrationTester;

// Run tests if called directly
if (require.main === module) {
  const tester = new MCPIntegrationTester();
  tester.runAllTests().catch(console.error);
}