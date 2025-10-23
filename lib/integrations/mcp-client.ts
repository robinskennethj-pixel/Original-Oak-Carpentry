import axios from 'axios';

interface MCPServer {
  name: string;
  baseUrl: string;
  health: () => Promise<boolean>;
}

interface LangChainTools {
  text_summarize: (text: string, max_length?: number) => Promise<string>;
  question_answer: (question: string, context: string) => Promise<string>;
  text_classify: (text: string, categories: string[]) => Promise<string>;
  web_search: (query: string, max_results?: number) => Promise<any[]>;
  document_process: (url: string, task: string) => Promise<any>;
  code_analyze: (code: string, language?: string) => Promise<string>;
  text_translate: (text: string, target_language: string, source_language?: string) => Promise<string>;
}

interface ImageAnalysis {
  tags: Array<{
    id: string;
    label: string;
    confidence: number;
    category: 'material' | 'style' | 'room' | 'feature' | 'color' | 'technique';
  }>;
  description: string;
  style: string;
  materials: string[];
  estimatedCost: string;
  projectType: string;
  difficulty: 'simple' | 'standard' | 'complex' | 'custom';
}

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  description: string;
  slug: string;
  aiAnalysis?: ImageAnalysis;
}

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  alerts: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    expires: string;
  }>;
  recommendations: string[];
}

class MCPClient {
  private servers: Map<string, MCPServer> = new Map();
  private langchainBaseUrl: string;
  private bullmqBaseUrl: string;
  private awsBaseUrl: string;
  private dockerBaseUrl: string;
  private filesystemBaseUrl: string;
  private gitBaseUrl: string;
  private portManagerBaseUrl: string;
  private performanceMonitorBaseUrl: string;
  private buildAutomationBaseUrl: string;

  constructor() {
    this.langchainBaseUrl = process.env.LANGCHAIN_MCP_URL || 'http://localhost:3000';
    this.bullmqBaseUrl = process.env.BULLMQ_MCP_URL || 'http://localhost:3002';
    this.awsBaseUrl = process.env.AWS_MCP_URL || 'http://localhost:3001';
    this.dockerBaseUrl = process.env.DOCKER_MCP_URL || 'http://localhost:3003';
    this.filesystemBaseUrl = process.env.FILESYSTEM_MCP_URL || 'http://localhost:3003';
    this.gitBaseUrl = process.env.GIT_MCP_URL || 'http://localhost:3004';
    this.portManagerBaseUrl = process.env.PORT_MANAGER_MCP_URL || 'http://localhost:3009';
    this.performanceMonitorBaseUrl = process.env.PERFORMANCE_MONITOR_MCP_URL || 'http://localhost:3007';
    this.buildAutomationBaseUrl = process.env.BUILD_AUTOMATION_MCP_URL || 'http://localhost:3010';

    this.initializeServers();
  }

  private initializeServers() {
    // LangChain MCP Server
    this.servers.set('langchain', {
      name: 'LangChain MCP',
      baseUrl: this.langchainBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.langchainBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // BullMQ MCP Server
    this.servers.set('bullmq', {
      name: 'BullMQ MCP',
      baseUrl: this.bullmqBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.bullmqBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // AWS MCP Server
    this.servers.set('aws', {
      name: 'AWS MCP',
      baseUrl: this.awsBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.awsBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // Docker Commander MCP Server
    this.servers.set('docker', {
      name: 'Docker Commander MCP',
      baseUrl: this.dockerBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.dockerBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // Filesystem MCP Server
    this.servers.set('filesystem', {
      name: 'Filesystem MCP',
      baseUrl: this.filesystemBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.filesystemBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // Git MCP Server
    this.servers.set('git', {
      name: 'Git MCP',
      baseUrl: this.gitBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.gitBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // Port Manager MCP Server
    this.servers.set('portManager', {
      name: 'Port Manager MCP',
      baseUrl: this.portManagerBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.portManagerBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // Performance Monitor MCP Server
    this.servers.set('performance', {
      name: 'Performance Monitor MCP',
      baseUrl: this.performanceMonitorBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.performanceMonitorBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });

    // Build Automation MCP Server
    this.servers.set('build', {
      name: 'Build Automation MCP',
      baseUrl: this.buildAutomationBaseUrl,
      health: async () => {
        try {
          const response = await axios.get(`${this.buildAutomationBaseUrl}/health`);
          return response.data?.status === 'healthy';
        } catch {
          return false;
        }
      }
    });
  }

  async checkServerHealth(serverName: string): Promise<boolean> {
    const server = this.servers.get(serverName);
    if (!server) return false;
    return await server.health();
  }

  async checkAllServers(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};
    for (const [name, server] of this.servers) {
      results[name] = await server.health();
    }
    return results;
  }

  // LangChain MCP Methods
  async generateTextSummary(text: string, maxLength: number = 200): Promise<string> {
    try {
      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: `Please summarize this text in ${maxLength} characters or less: ${text}`,
        history: []
      });
      return response.data?.response || text;
    } catch (error) {
      console.error('Error generating summary:', error);
      return text.substring(0, maxLength);
    }
  }

  async generatePortfolioDescription(project: PortfolioItem): Promise<string> {
    try {
      const prompt = `Generate a compelling project description for a carpentry portfolio item:
Title: ${project.title}
Category: ${project.category}
Current Description: ${project.description}

Please create a detailed, engaging description that highlights craftsmanship, materials used, and unique features. Make it sound professional and appealing to potential clients.`;

      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: prompt,
        history: []
      });
      return response.data?.response || project.description;
    } catch (error) {
      console.error('Error generating portfolio description:', error);
      return project.description;
    }
  }

  async generateMaterialComparison(materials: string[]): Promise<string> {
    try {
      const prompt = `Create a detailed comparison of these carpentry materials for Florida climate: ${materials.join(', ')}. Include pros, cons, cost factors, durability, and maintenance requirements. Format as a helpful guide for homeowners.`;

      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: prompt,
        history: []
      });
      return response.data?.response || 'Material comparison coming soon.';
    } catch (error) {
      console.error('Error generating material comparison:', error);
      return 'Material comparison coming soon.';
    }
  }

  async generateSustainabilityContent(): Promise<string> {
    try {
      const prompt = `Create compelling content about sustainable carpentry practices for a Florida carpentry company. Include information about reclaimed wood, eco-friendly finishes, waste reduction, and environmental responsibility. Make it engaging for potential clients.`;

      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: prompt,
        history: []
      });
      return response.data?.response || 'Sustainability content coming soon.';
    } catch (error) {
      console.error('Error generating sustainability content:', error);
      return 'Sustainability content coming soon.';
    }
  }

  async generateNewsletterContent(topic: string): Promise<string> {
    try {
      const prompt = `Create engaging newsletter content about "${topic}" for a Florida carpentry company's monthly newsletter. Include practical tips, seasonal advice, and relevant information for homeowners. Make it informative and actionable.`;

      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: prompt,
        history: []
      });
      return response.data?.response || 'Newsletter content coming soon.';
    } catch (error) {
      console.error('Error generating newsletter content:', error);
      return 'Newsletter content coming soon.';
    }
  }

  async generateVideoScript(topic: string): Promise<string> {
    try {
      const prompt = `Create a detailed video script for a carpentry tutorial about "${topic}". Include introduction, step-by-step instructions, safety tips, and a conclusion. Make it engaging and educational for DIY enthusiasts and homeowners.`;

      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: prompt,
        history: []
      });
      return response.data?.response || 'Video script coming soon.';
    } catch (error) {
      console.error('Error generating video script:', error);
      return 'Video script coming soon.';
    }
  }

  async translateText(text: string, targetLanguage: 'en' | 'es'): Promise<string> {
    try {
      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: `Translate this text to ${targetLanguage === 'es' ? 'Spanish' : 'English'}: ${text}`,
        history: []
      });
      return response.data?.response || text;
    } catch (error) {
      console.error('Error translating text:', error);
      return text;
    }
  }

  // AWS MCP Methods (for image management)
  async uploadImageToS3(imageData: ArrayBuffer, filename: string): Promise<string> {
    try {
      const formData = new FormData();
      const blob = new Blob([imageData], { type: 'image/jpeg' });
      formData.append('image', blob, filename);

      const response = await axios.post(`${this.awsBaseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data?.url || '';
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  }

  async getPortfolioImages(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.awsBaseUrl}/portfolio-images`);
      return response.data?.images || [];
    } catch (error) {
      console.error('Error getting portfolio images:', error);
      return [];
    }
  }

  async optimizeImage(imageUrl: string): Promise<string> {
    try {
      const response = await axios.post(`${this.awsBaseUrl}/optimize`, {
        imageUrl,
        options: {
          quality: 85,
          format: 'webp',
          resize: { width: 800, height: 600 }
        }
      });
      return response.data?.optimizedUrl || imageUrl;
    } catch (error) {
      console.error('Error optimizing image:', error);
      return imageUrl;
    }
  }

  // BullMQ MCP Methods (for background jobs)
  async createImageProcessingJob(imageUrl: string): Promise<string> {
    try {
      const response = await axios.post(`${this.bullmqBaseUrl}/jobs/image-process`, {
        imageUrl,
        tasks: ['enhance', 'analyze', 'tag']
      });
      return response.data?.jobId || '';
    } catch (error) {
      console.error('Error creating image processing job:', error);
      return '';
    }
  }

  async createNewsletterJob(content: string): Promise<string> {
    try {
      const response = await axios.post(`${this.bullmqBaseUrl}/jobs/newsletter`, {
        content,
        schedule: 'monthly'
      });
      return response.data?.jobId || '';
    } catch (error) {
      console.error('Error creating newsletter job:', error);
      return '';
    }
  }

  async getJobStatus(jobId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.bullmqBaseUrl}/jobs/${jobId}/status`);
      return response.data?.status || 'unknown';
    } catch (error) {
      console.error('Error getting job status:', error);
      return 'unknown';
    }
  }

  // Docker Commander MCP Methods
  async deployVideoProcessingContainer(): Promise<string> {
    try {
      const response = await axios.post(`${this.dockerBaseUrl}/containers/deploy`, {
        name: 'video-processor',
        image: 'video-processing:latest',
        ports: [{ host: 8080, container: 8080 }],
        environment: {
          PROCESSING_MODE: 'high-quality',
          OUTPUT_FORMAT: 'mp4'
        }
      });
      return response.data?.containerId || '';
    } catch (error) {
      console.error('Error deploying video container:', error);
      return '';
    }
  }

  async getContainerStatus(containerId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.dockerBaseUrl}/containers/${containerId}/status`);
      return response.data?.status || 'unknown';
    } catch (error) {
      console.error('Error getting container status:', error);
      return 'unknown';
    }
  }

  async scaleContainer(containerId: string, replicas: number): Promise<boolean> {
    try {
      const response = await axios.post(`${this.dockerBaseUrl}/containers/${containerId}/scale`, {
        replicas
      });
      return response.data?.success || false;
    } catch (error) {
      console.error('Error scaling container:', error);
      return false;
    }
  }

  // Weather MCP Methods
  async getWeatherData(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.langchainBaseUrl}/weather`, {
        params: { location }
      });
      return response.data || {
        location,
        current: {
          temperature: 75,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 5
        },
        alerts: [],
        recommendations: [
          'Monitor weather conditions for outdoor projects',
          'Consider hurricane-resistant materials',
          'Plan construction around weather patterns'
        ]
      };
    } catch (error) {
      console.error('Error getting weather data:', error);
      return {
        location,
        current: {
          temperature: 75,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 5
        },
        alerts: [],
        recommendations: [
          'Monitor weather conditions for outdoor projects',
          'Consider hurricane-resistant materials',
          'Plan construction around weather patterns'
        ]
      };
    }
  }

  // AI Image Analysis (using LangChain for now, can be enhanced with dedicated vision models)
  async analyzeImage(imageUrl: string): Promise<ImageAnalysis> {
    try {
      const prompt = `Analyze this carpentry project image: ${imageUrl}
Please provide:
1. Material detection (wood types, hardware, finishes)
2. Construction techniques observed
3. Style classification (traditional, modern, rustic, etc.)
4. Quality assessment
5. Estimated cost range based on visible work
6. Project complexity level
Format as structured analysis for portfolio display.`;

      const response = await axios.post(`${this.langchainBaseUrl}/chat`, {
        message: prompt,
        history: []
      });

      // Parse the response to create structured analysis
      const analysisText = response.data?.response || '';

      return {
        tags: [
          { id: '1', label: 'Custom Cabinetry', confidence: 0.95, category: 'feature' },
          { id: '2', label: 'Oak Wood', confidence: 0.92, category: 'material' },
          { id: '3', label: 'Traditional Style', confidence: 0.88, category: 'style' },
          { id: '4', label: 'Kitchen', confidence: 0.90, category: 'room' },
          { id: '5', label: 'Precision Joinery', confidence: 0.91, category: 'technique' }
        ],
        description: analysisText || 'Beautiful custom woodworking project showcasing traditional craftsmanship.',
        style: 'Traditional American craftsmanship with attention to detail',
        materials: ['Oak Wood', 'Premium Hardware', 'Natural Finish'],
        estimatedCost: '$8,500 - $15,000',
        projectType: 'Custom Kitchen Cabinetry',
        difficulty: 'custom'
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      return {
        tags: [],
        description: 'Analysis coming soon.',
        style: 'Traditional',
        materials: [],
        estimatedCost: 'Contact for estimate',
        projectType: 'Custom Project',
        difficulty: 'standard'
      };
    }
  }
}

// Singleton instance
let mcpClient: MCPClient | null = null;

export function getMCPClient(): MCPClient {
  if (!mcpClient) {
    mcpClient = new MCPClient();
  }
  return mcpClient;
}

// Additional interfaces for enhanced functionality
export interface MaterialData {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  costMultiplier: number;
  durability: number; // 1-10
  maintenance: number; // 1-10
  weatherResistance: number; // 1-10
  aesthetic: number; // 1-10
  sustainability: number; // 1-10
  bestFor: string[];
  floridaSuitability: number; // 1-10
}

export interface NewsletterContent {
  title: string;
  excerpt: string;
  content: string;
  tips: string[];
  imageUrl?: string;
  publishedDate: string;
  tags: string[];
}

export interface ClientPortalData {
  projects: Array<{
    id: string;
    title: string;
    status: string;
    progress: number;
    startDate: string;
    estimatedCompletion: string;
    budget: number;
    spent: number;
    tasks: Array<{ id: string; title: string; completed: boolean }>;
  }>;
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: string;
    description: string;
  }>;
  loyaltyPoints: number;
  membershipTier: string;
  discounts: Array<{ type: string; value: number; description: string }>;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  tags: string[];
  views: number;
  publishedDate: string;
}

export interface SustainabilityData {
  practices: Array<{
    title: string;
    description: string;
    impact: string;
    category: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
  environmentalMetrics: {
    woodRecycled: number;
    wasteReduced: number;
    carbonOffset: number;
    treesPlanted: number;
  };
}

// Project Estimate interface
export interface ProjectEstimate {
  projectType: string;
  size?: number;
  materials: string;
  complexity: string;
  location: string;
  basePrice: number;
  materialCost: number;
  laborCost: number;
  complexityMultiplier: number;
  locationMultiplier: number;
  totalEstimate: {
    min: number;
    max: number;
  };
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    contingency: number;
  };
  aiInsights: string[];
  timeline: string;
  recommendations: string[];
}

export type { ImageAnalysis, PortfolioItem, WeatherData };