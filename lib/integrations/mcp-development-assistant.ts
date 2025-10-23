'use client';

import { comprehensiveMCPManager } from './comprehensive-mcp-manager';
import { Context7SystemChecker } from './context7-system-checker';

/**
 * RULE: ALWAYS USE ALL AVAILABLE MCP SERVERS FOR BUILDING AND ERROR FIXING
 * This assistant will automatically utilize ALL MCP servers for any development task
 */

export class MCPDevelopmentAssistant {

  /**
   * RULE: Use ALL MCP servers to fix build errors
   */
  static async fixBuildError(error: Error, context: any): Promise<string> {
    console.log('🔧 MCP Development Assistant: Fixing build error with ALL servers');

    const runningServers = comprehensiveMCPManager.getRunningServers();
    const fixes: string[] = [];

    for (const server of runningServers) {
      try {
        console.log(`🛠️  Consulting ${server.name}...`);
        const fix = await MCPDevelopmentAssistant.getBuildFixFromServer(server, error, context);
        if (fix) {
          fixes.push(`[${server.name}]: ${fix}`);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to get fix from ${server.name}:`, e);
      }
    }

    return fixes.join('\n\n');
  }

  /**
   * RULE: Use ALL MCP servers to assist with building
   */
  static async assistWithBuild(buildContext: any): Promise<string> {
    console.log('🏗️  MCP Development Assistant: Assisting build with ALL servers');

    const runningServers = comprehensiveMCPManager.getRunningServers();
    const suggestions: string[] = [];

    for (const server of runningServers) {
      try {
        console.log(`🏗️  Consulting ${server.name}...`);
        const suggestion = await MCPDevelopmentAssistant.getBuildSuggestionFromServer(server, buildContext);
        if (suggestion) {
          suggestions.push(`[${server.name}]: ${suggestion}`);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to get suggestion from ${server.name}:`, e);
      }
    }

    return suggestions.join('\n\n');
  }

  /**
   * RULE: Use ALL MCP servers for code analysis
   */
  static async analyzeCode(code: string, filePath: string): Promise<string> {
    console.log('🔍 MCP Development Assistant: Analyzing code with ALL servers');

    const runningServers = comprehensiveMCPManager.getRunningServers();
    const analyses: string[] = [];

    for (const server of runningServers) {
      try {
        console.log(`🔍 Analyzing with ${server.name}...`);
        const analysis = await MCPDevelopmentAssistant.getCodeAnalysisFromServer(server, code, filePath);
        if (analysis) {
          analyses.push(`[${server.name}]: ${analysis}`);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to get analysis from ${server.name}:`, e);
      }
    }

    return analyses.join('\n\n');
  }

  /**
   * RULE: Use ALL MCP servers for testing
   */
  static async runTests(testContext: any): Promise<string> {
    console.log('🧪 MCP Development Assistant: Running tests with ALL servers');

    const runningServers = comprehensiveMCPManager.getRunningServers();
    const testResults: string[] = [];

    for (const server of runningServers) {
      try {
        console.log(`🧪 Testing with ${server.name}...`);
        const result = await MCPDevelopmentAssistant.getTestResultsFromServer(server, testContext);
        if (result) {
          testResults.push(`[${server.name}]: ${result}`);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to get test results from ${server.name}:`, e);
      }
    }

    return testResults.join('\n\n');
  }

  /**
   * RULE: Use ALL MCP servers for deployment
   */
  static async assistDeployment(deployContext: any): Promise<string> {
    console.log('🚀 MCP Development Assistant: Assisting deployment with ALL servers');

    const runningServers = comprehensiveMCPManager.getRunningServers();
    const deploymentSuggestions: string[] = [];

    for (const server of runningServers) {
      try {
        console.log(`🚀 Consulting ${server.name} for deployment...`);
        const suggestion = await MCPDevelopmentAssistant.getDeploymentSuggestionFromServer(server, deployContext);
        if (suggestion) {
          deploymentSuggestions.push(`[${server.name}]: ${suggestion}`);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to get deployment suggestion from ${server.name}:`, e);
      }
    }

    return deploymentSuggestions.join('\n\n');
  }

  // Helper methods for server communication
  private static async getBuildFixFromServer(server: any, error: Error, context: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      // Try different endpoints based on server capabilities
      if (server.capabilities.includes('code-analysis')) {
        const response = await fetch(`${server.baseUrl}/analyze-error`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: error.message, stack: error.stack, context })
        });
        const data = await response.json();
        return data.fix || data.suggestion || '';
      }

      if (server.capabilities.includes('build-automation')) {
        const response = await fetch(`${server.baseUrl}/build-fix`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: error.message, context })
        });
        const data = await response.json();
        return data.fix || '';
      }

      if (server.capabilities.includes('security-scanning')) {
        const response = await fetch(`${server.baseUrl}/security-fix`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: error.message, context })
        });
        const data = await response.json();
        return data.fix || '';
      }

      // Generic error fix endpoint
      const response = await fetch(`${server.baseUrl}/fix-error`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: error.message, context })
      });
      const data = await response.json();
      return data.fix || data.suggestion || '';

    } catch (e) {
      console.warn(`Failed to communicate with ${server.name}:`, e);
      return '';
    }
  }

  private static async getBuildSuggestionFromServer(server: any, buildContext: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await fetch(`${server.baseUrl}/build-suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildContext)
      });
      const data = await response.json();
      return data.suggestion || data.recommendation || '';
    } catch (e) {
      console.warn(`Failed to get build suggestion from ${server.name}:`, e);
      return '';
    }
  }

  private static async getCodeAnalysisFromServer(server: any, code: string, filePath: string): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await fetch(`${server.baseUrl}/analyze-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, filePath })
      });
      const data = await response.json();
      return data.analysis || data.feedback || '';
    } catch (e) {
      console.warn(`Failed to get code analysis from ${server.name}:`, e);
      return '';
    }
  }

  private static async getTestResultsFromServer(server: any, testContext: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await fetch(`${server.baseUrl}/run-tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testContext)
      });
      const data = await response.json();
      return data.results || data.feedback || '';
    } catch (e) {
      console.warn(`Failed to get test results from ${server.name}:`, e);
      return '';
    }
  }

  private static async getDeploymentSuggestionFromServer(server: any, deployContext: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await fetch(`${server.baseUrl}/deployment-suggestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deployContext)
      });
      const data = await response.json();
      return data.suggestion || data.recommendation || '';
    } catch (e) {
      console.warn(`Failed to get deployment suggestion from ${server.name}:`, e);
      return '';
    }
  }

  /**
   * RULE: Use Context7 specifically for system updates and comprehensive analysis
   */
  static async checkSystemForUpdates(systemInfo: any): Promise<string> {
    console.log('🔍 MCP Development Assistant: Using Context7 for system analysis');

    try {
      const context7Result = await Context7SystemChecker.checkSystemForUpdates(systemInfo);
      return `[Context7 MCP]: ${context7Result}`;
    } catch (error) {
      console.warn('⚠️  Context7 system check failed:', error);
      return 'Context7 system analysis temporarily unavailable';
    }
  }

  /**
   * RULE: Get comprehensive assistance using ALL MCP servers
   */
  static async getComprehensiveAssistance(task: string, context: any): Promise<string> {
    console.log(`🤖 MCP Development Assistant: Getting comprehensive assistance for: ${task}`);

    const runningServers = comprehensiveMCPManager.getRunningServers();
    const results: string[] = [];

    // Use Context7 first for comprehensive analysis
    try {
      console.log('🤖 Consulting Context7 for comprehensive analysis...');
      const context7Result = await Context7SystemChecker.getSystemDocumentation(task);
      if (context7Result) {
        results.push(`[Context7 MCP]: ${context7Result}`);
      }
    } catch (e) {
      console.warn('⚠️  Context7 consultation failed:', e);
    }

    // Then use all other servers
    for (const server of runningServers) {
      if (server.name === 'Context7 MCP') continue; // Skip Context7 as we already used it

      try {
        console.log(`🤖 Consulting ${server.name}...`);
        const result = await MCPDevelopmentAssistant.getGeneralAssistanceFromServer(server, task, context);
        if (result) {
          results.push(`[${server.name}]: ${result}`);
        }
      } catch (e) {
        console.warn(`⚠️  Failed to get assistance from ${server.name}:`, e);
      }
    }

    return results.join('\n\n');
  }

  private static async getGeneralAssistanceFromServer(server: any, task: string, context: any): Promise<string> {
    if (!server.baseUrl) return '';

    try {
      const response = await fetch(`${server.baseUrl}/assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, context })
      });
      const data = await response.json();
      return data.assistance || data.suggestion || data.advice || '';
    } catch (e) {
      console.warn(`Failed to get general assistance from ${server.name}:`, e);
      return '';
    }
  }
}

export default MCPDevelopmentAssistant;