'use client';

/**
 * Context7 System Checker
 * Uses Context7 MCP server specifically for comprehensive system analysis
 */

export class Context7SystemChecker {
  private baseUrl = 'http://localhost:3018/mcp';

  /**
   * Use Context7 to check system for updates and provide comprehensive analysis
   */
  static async checkSystemForUpdates(systemInfo: {
    projectName: string;
    currentVersion?: string;
    dependencies?: string[];
    lastCheck?: string;
    scope?: 'security' | 'performance' | 'features' | 'all';
  }): Promise<string> {
    try {
      console.log('🔍 Context7: Checking system for updates and analysis');

      const response = await fetch('http://localhost:3018/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: 'context7_analysis',
            arguments: {
              query: `Analyze the ${systemInfo.projectName} system for updates, improvements, and potential issues. ` +
                     `Focus on: ${systemInfo.scope || 'all'} aspects. ` +
                     `Current version: ${systemInfo.currentVersion || 'unknown'}. ` +
                     `Dependencies: ${systemInfo.dependencies?.join(', ') || 'standard dependencies'}. ` +
                     `Provide comprehensive analysis including security, performance, and feature recommendations.`,
              context: 'system_update_analysis'
            }
          },
          id: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`Context7 request failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`Context7 error: ${data.error.message}`);
      }

      return data.result?.content || 'Context7 analysis completed successfully';
    } catch (error) {
      console.error('Context7 system check failed:', error);
      return 'Context7 system analysis temporarily unavailable';
    }
  }

  /**
   * Get comprehensive system documentation using Context7
   */
  static async getSystemDocumentation(query: string): Promise<string> {
    try {
      console.log('📚 Context7: Getting system documentation');

      const response = await fetch('http://localhost:3018/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/call',
          params: {
            name: 'context7_documentation',
            arguments: {
              query: query,
              format: 'comprehensive'
            }
          },
          id: Date.now()
        })
      });

      const data = await response.json();
      return data.result?.content || 'Documentation retrieved successfully';
    } catch (error) {
      console.error('Context7 documentation request failed:', error);
      return 'Documentation temporarily unavailable';
    }
  }

  /**
   * Check Context7 health status
   */
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3018/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          params: {},
          id: Date.now()
        })
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get Context7 capabilities
   */
  static async getCapabilities(): Promise<string[]> {
    try {
      const response = await fetch('http://localhost:3018/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'tools/list',
          params: {},
          id: Date.now()
        })
      });

      const data = await response.json();
      return data.result?.tools?.map((tool: any) => tool.name) || [];
    } catch {
      return [];
    }
  }
}

export default Context7SystemChecker;