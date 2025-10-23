import axios from 'axios';

export class WebSearchTool {
  constructor() {
    this.apiKey = process.env.SERPAPI_API_KEY;
  }

  async search(query, maxResults = 5) {
    if (!this.apiKey) {
      return this.fallbackSearch(query, maxResults);
    }

    try {
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          q: query,
          api_key: this.apiKey,
          engine: 'google',
          num: maxResults
        }
      });

      return response.data.organic_results.slice(0, maxResults).map(result => ({
        title: result.title,
        link: result.link,
        snippet: result.snippet
      }));
    } catch (error) {
      console.error('SerpAPI search failed:', error.message);
      return this.fallbackSearch(query, maxResults);
    }
  }

  async fallbackSearch(query, maxResults) {
    // Simple fallback using a different approach
    // In production, you might want to use another search API
    return [{
      title: `Search results for "${query}"`,
      link: `https://google.com/search?q=${encodeURIComponent(query)}`,
      snippet: `Use the provided link to view search results for "${query}"`
    }];
  }
}