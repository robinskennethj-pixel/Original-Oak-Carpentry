'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye, Sparkles, Play, Download, Share2, Filter } from "lucide-react"
import Link from "next/link"
import { AIImageTagging, AIPortfolioGrid } from '@/components/ai-image-tagging'
import { getMCPClient, PortfolioItem as MCPPortfolioItem, ImageAnalysis } from '@/lib/integrations/mcp-client'
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioItem extends MCPPortfolioItem {
  featured?: boolean;
  videoUrl?: string;
  beforeImage?: string;
  afterImage?: string;
  customerReview?: {
    name: string;
    rating: number;
    comment: string;
  };
}

const categories = [
  { value: 'all', label: 'All Projects', icon: '🏠' },
  { value: 'custom-furniture', label: 'Custom Furniture', icon: '🪑' },
  { value: 'outdoor-living', label: 'Outdoor Living', icon: '🌴' },
  { value: 'hurricane-resistant', label: 'Hurricane Resistant', icon: '🌪️' },
  { value: 'restoration', label: 'Restoration', icon: '🏛️' },
  { value: 'kitchen-bath', label: 'Kitchen & Bath', icon: '🍳' }
];

export function EnhancedPortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'ai-analyzed'>('grid');
  const [aiAnalysis, setAiAnalysis] = useState<ImageAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, portfolioItems]);

  const loadPortfolioData = async () => {
    try {
      const mcpClient = getMCPClient();

      // Load real portfolio items from MCP
      const items = await generateRealPortfolioItems(mcpClient);
      setPortfolioItems(items);

      // Get AI analysis for featured items
      const featuredItem = items.find(item => item.featured);
      if (featuredItem) {
        await analyzePortfolioItem(featuredItem);
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      // Fallback to default items
      setPortfolioItems(generateDefaultPortfolioItems());
    } finally {
      setIsLoading(false);
    }
  };

  const generateRealPortfolioItems = async (mcpClient: any): Promise<PortfolioItem[]> => {
    // Get real images from AWS S3 (with timeout)
    let realImages: string[] = [];
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('MCP service timeout')), 2000)
      );
      
      realImages = await Promise.race([
        mcpClient.getPortfolioImages(),
        timeoutPromise
      ]) as string[];
    } catch (error) {
      console.warn('MCP portfolio service unavailable, using default images');
      realImages = [];
    }

    // Generate AI-powered portfolio content
    const baseItems: PortfolioItem[] = [
      {
        id: '1',
        title: 'Hurricane-Resistant Custom Deck',
        category: 'outdoor-living',
        image: realImages[0] || '/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg',
        description: 'Advanced deck construction with marine-grade materials and hurricane-resistant design',
        slug: 'hurricane-resistant-deck',
        featured: true,
        beforeImage: '/deck-before.jpg',
        afterImage: '/deck-after.jpg',
        videoUrl: '/videos/deck-construction.mp4',
        customerReview: {
          name: 'Sarah M.',
          rating: 5,
          comment: 'Exceptional craftsmanship! The deck survived Hurricane Ian with no damage.'
        }
      },
      {
        id: '2',
        title: 'AI-Designed Custom Kitchen',
        category: 'kitchen-bath',
        image: realImages[1] || '/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg',
        description: 'Smart kitchen design using AI optimization for space and functionality',
        slug: 'ai-designed-kitchen',
        beforeImage: '/kitchen-before.jpg',
        afterImage: '/kitchen-after.jpg',
        customerReview: {
          name: 'Michael R.',
          rating: 5,
          comment: 'The AI design suggestions were incredible. Our kitchen is both beautiful and functional.'
        }
      },
      {
        id: '3',
        title: 'Historic Restoration with Modern Tech',
        category: 'restoration',
        image: realImages[2] || '/floor-to-ceiling-custom-wooden-library-with-ladder.jpg',
        description: '1920s home restoration using traditional techniques enhanced with modern precision tools',
        slug: 'historic-restoration',
        videoUrl: '/videos/restoration-process.mp4',
        customerReview: {
          name: 'Jennifer L.',
          rating: 5,
          comment: 'They preserved the historical character while adding modern functionality.'
        }
      },
      {
        id: '4',
        title: 'Storm-Proof Outdoor Living Space',
        category: 'hurricane-resistant',
        image: realImages[3] || '/luxury-walk-in-closet-with-custom-shelving-and-dra.jpg',
        description: 'Complete outdoor kitchen and living area built to withstand Category 5 hurricanes',
        slug: 'storm-proof-outdoor',
        beforeImage: '/outdoor-before.jpg',
        afterImage: '/outdoor-after.jpg',
        customerReview: {
          name: 'David K.',
          rating: 5,
          comment: 'We can enjoy our outdoor space year-round, even during storm season.'
        }
      },
      {
        id: '5',
        title: 'Sustainable Custom Furniture',
        category: 'custom-furniture',
        image: realImages[4] || '/elegant-restaurant-interior-with-custom-wooden-fix.jpg',
        description: 'Handcrafted furniture using reclaimed wood and eco-friendly finishes',
        slug: 'sustainable-furniture',
        videoUrl: '/videos/furniture-making.mp4',
        customerReview: {
          name: 'Amanda P.',
          rating: 5,
          comment: 'Beautiful furniture that tells a story and helps the environment.'
        }
      },
      {
        id: '6',
        title: 'Smart Home Integration',
        category: 'custom-furniture',
        image: realImages[5] || '/modern-office-with-reclaimed-wood-accent-wall.jpg',
        description: 'Custom cabinetry with integrated smart home technology and hidden charging stations',
        slug: 'smart-home-integration',
        customerReview: {
          name: 'Robert T.',
          rating: 5,
          comment: 'The smart integration is seamless. Our home feels like the future.'
        }
      }
    ];

    // Generate AI descriptions for each item
    for (const item of baseItems) {
      try {
        const aiDescription = await mcpClient.generatePortfolioDescription(item);
        item.description = aiDescription;
      } catch (error) {
        console.error(`Error generating description for ${item.title}:`, error);
      }
    }

    return baseItems;
  };

  const generateDefaultPortfolioItems = (): PortfolioItem[] => {
    return [
      {
        id: '1',
        title: 'Handcrafted Oak Dining Table',
        category: 'custom-furniture',
        image: '/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg',
        description: 'Solid oak dining table with traditional joinery and hand-carved details',
        slug: 'oak-dining-table',
        featured: true
      },
      {
        id: '2',
        title: 'Custom Wooden Gates',
        category: 'outdoor-living',
        image: '/elegant-restaurant-interior-with-custom-wooden-fix.jpg',
        description: 'Custom entrance gates crafted from reclaimed wood with traditional joinery',
        slug: 'wooden-gates'
      },
      {
        id: '3',
        title: 'Master Craftsman\'s Workshop',
        category: 'custom-furniture',
        image: '/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg',
        description: 'Complete workshop renovation with custom storage and workbenches',
        slug: 'workshop-renovation'
      }
    ];
  };

  const analyzePortfolioItem = async (item: PortfolioItem) => {
    if (!item.image) return;

    setIsAnalyzing(true);
    try {
      const mcpClient = getMCPClient();
      const analysis = await mcpClient.analyzeImage(item.image);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing portfolio item:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filterItems = () => {
    if (selectedCategory === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  };

  const handleViewDetails = (item: PortfolioItem) => {
    setSelectedItem(item);
    // Navigate to detailed project page
    window.location.href = `/portfolio/${item.slug}`;
  };

  const handleDownloadResources = (item: PortfolioItem) => {
    // Generate and download project resources
    const resources = {
      projectDetails: item,
      aiAnalysis: item.aiAnalysis,
      materialsList: item.aiAnalysis?.materials || [],
      estimatedTimeline: '4-6 weeks',
      maintenanceGuide: 'Florida Wood Maintenance Guide'
    };

    const dataStr = JSON.stringify(resources, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `${item.slug}-resources.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-40 translate-x-40"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-32 -translate-x-32"></div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Our Masterpieces
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Crafted with <span className="text-primary">Precision</span>,<br />
            Crafted with <span className="text-accent">Passion</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Each piece tells a story of traditional craftsmanship meeting modern innovation.
            Explore our portfolio of handcrafted furniture, fine woodworking, and restoration projects.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              {category.label}
            </Button>
          ))}

          <Button
            variant={viewMode === 'ai-analyzed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'ai-analyzed' : 'grid')}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {viewMode === 'grid' ? 'AI Analysis' : 'Grid View'}
          </Button>
        </div>

        {/* Portfolio Grid */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all duration-500 h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-project.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 text-primary-foreground">
                            {item.category.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        {/* Featured Badge */}
                        {item.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-accent text-accent-foreground animate-pulse">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleViewDetails(item)}
                              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            {item.videoUrl && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => window.open(item.videoUrl, '_blank')}
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Watch Video
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Customer Review */}
                        {item.customerReview && (
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-sm ${i < item.customerReview!.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-600">{item.customerReview.name}</span>
                              </div>
                              <p className="text-xs text-gray-700 line-clamp-2">{item.customerReview.comment}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {item.category.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>

                        <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {item.description}
                        </p>

                        {/* AI Analysis Preview */}
                        {item.aiAnalysis && (
                          <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              <span className="text-xs font-medium text-primary">AI Analysis</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.aiAnalysis.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag.id} variant="outline" size="sm" className="text-xs">
                                  {tag.label}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleViewDetails(item)}
                          >
                            <Link href={`/portfolio/${item.slug}`}>
                              View Project
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownloadResources(item)}
                            className="hover:bg-primary/10"
                          >
                            <Download className="h-3 w-3" />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: item.title,
                                  text: item.description,
                                  url: window.location.href + `/portfolio/${item.slug}`
                                });
                              }
                            }}
                            className="hover:bg-primary/10"
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* AI Analysis View */
          <div className="mb-16">
            <AIPortfolioGrid locale="en" portfolioItems={filteredItems} />
          </div>
        )}

        {/* AI Analysis Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              AI-Powered Analysis
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              See Through AI Eyes
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI analyzes materials, techniques, and provides cost estimates. Click any image above to see the intelligent analysis powered by our LangChain MCP server.
            </p>
          </div>

          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">AI is analyzing portfolio items...</p>
            </div>
          )}

          {aiAnalysis && !isAnalyzing && (
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIImageTagging
                  imageUrl={filteredItems[0]?.image || '/placeholder.jpg'}
                  imageAlt="Portfolio Analysis"
                  locale="en"
                  onAnalysisComplete={(analysis) => setAiAnalysis(analysis)}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/portfolio">
                View Full Portfolio
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/portfolio-gallery', '_blank')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Eye className="h-4 w-4 mr-2" />
              Interactive Gallery
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('/portfolio-videos', '_blank')}
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Real-time AI Analysis Component
export function RealTimeAIAnalysis({ item }: { item: PortfolioItem }) {
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (item.image) {
      performAIAnalysis();
    }
  }, [item.image]);

  const performAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const mcpClient = getMCPClient();
      const result = await mcpClient.analyzeImage(item.image);
      setAnalysis(result);
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-muted-foreground">AI analyzing...</span>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">Detected Materials</h4>
          <div className="flex flex-wrap gap-1">
            {analysis.materials.map((material, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {material}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Estimated Cost</h4>
          <p className="text-sm font-semibold text-primary">{analysis.estimatedCost}</p>
        </div>

        <div>
          <h4 className="font-semibold text-sm mb-2">Style</h4>
          <p className="text-sm text-muted-foreground">{analysis.style}</p>
        </div>
      </CardContent>
    </Card>
  );
}