import axios from 'axios';
import * as cheerio from 'cheerio';

export class DocumentLoader {
  async loadFromUrl(url) {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 10000
      });

      const contentType = response.headers['content-type'];
      const buffer = Buffer.from(response.data);

      if (contentType.includes('text/html')) {
        return this.extractTextFromHTML(buffer);
      } else if (contentType.includes('pdf')) {
        return this.extractTextFromPDF(buffer);
      } else if (contentType.includes('word') || contentType.includes('msword')) {
        return this.extractTextFromDOCX(buffer);
      } else {
        return buffer.toString('utf-8');
      }
    } catch (error) {
      throw new Error(`Failed to load document from ${url}: ${error.message}`);
    }
  }

  async extractTextFromHTML(buffer) {
    const $ = cheerio.load(buffer);

    // Remove script and style elements
    $('script, style').remove();

    // Get text content
    const text = $('body').text();

    // Clean up whitespace
    return text.replace(/\s+/g, ' ').trim();
  }

  async extractTextFromPDF(buffer) {
    // Simple fallback for PDF - in production, you'd want to use a proper PDF parser
    return "[PDF content extraction not implemented - please use text-based documents]";
  }

  async extractTextFromDOCX(buffer) {
    // Simple fallback for DOCX - in production, you'd want to use a proper DOCX parser
    return "[DOCX content extraction not implemented - please use text-based documents]";
  }
}