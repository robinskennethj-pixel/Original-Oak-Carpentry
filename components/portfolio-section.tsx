'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"
import { AIPortfolioGrid } from "@/components/ai-image-tagging"
import { getMCPClient, PortfolioItem } from "@/lib/integrations/mcp-client"
import { useEffect, useState } from "react"

const defaultPortfolioItems = [
  {
    title: "Handcrafted Oak Dining Table",
    category: "Custom Furniture",
    image: "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
    description: "Solid oak dining table with traditional joinery and hand-carved details",
    slug: "oak-dining-table",
  },
  {
    title: "Custom Wooden Gates",
    category: "Outdoor Carpentry",
    image: "/elegant-restaurant-interior-with-custom-wooden-fix.jpg",
    description: "Custom entrance gates crafted from reclaimed wood with traditional joinery",
    slug: "wooden-gates",
  },
  {
    title: "Master Craftsman's Workshop",
    category: "Workshop Design",
    image: "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
    description: "Complete workshop renovation with custom storage and workbenches",
    slug: "workshop-renovation",
  },
  {
    title: "Antique Restoration Project",
    category: "Restoration",
    image: "/floor-to-ceiling-custom-wooden-library-with-ladder.jpg",
    description: "Century-old armoire restored to its original glory with period-appropriate techniques",
    slug: "antique-armoire-restoration",
  },
  {
    title: "Custom Wooden Railings",
    category: "Architectural Woodwork",
    image: "/luxury-walk-in-closet-with-custom-shelving-and-dra.jpg",
    description: "Decorative wooden railings with traditional carving techniques",
    slug: "wooden-railings",
  },
  {
    title: "Reclaimed Wood Feature Wall",
    category: "Sustainable Design",
    image: "/modern-office-with-reclaimed-wood-accent-wall.jpg",
    description: "Feature wall using reclaimed barn wood with hand-carved wooden accents",
    slug: "reclaimed-wood-wall",
  },
  {
    title: "Weather-Resistant Outdoor Kitchen",
    category: "Weather Proofing",
    image: "/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg",
    description: "Marine-grade outdoor kitchen with weather-resistant finishes for coastal conditions",
    slug: "weather-resistant-kitchen",
  },
  {
    title: "Hurricane-Resistant Shutters",
    category: "Storm Protection",
    image: "/hurricane-shutters-installed-on-florida-home-windo.jpg",
    description: "Custom wooden hurricane shutters designed for maximum storm protection",
    slug: "hurricane-shutters",
  },
]

export function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioItems = async () => {
      try {
        const mcpClient = getMCPClient();

        // Get real portfolio images from AWS S3 (with timeout)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('MCP service timeout')), 2000)
        );
        
        const realImages = await Promise.race([
          mcpClient.getPortfolioImages(),
          timeoutPromise
        ]) as string[];

        // If we have real images, update the portfolio items
        if (realImages && realImages.length > 0) {
          const updatedItems = defaultPortfolioItems.map((item, index) => ({
            ...item,
            image: realImages[index % realImages.length] || item.image,
          }));
          setPortfolioItems(updatedItems);
        } else {
          setPortfolioItems(defaultPortfolioItems);
        }
      } catch (error) {
        // Silently fall back to default items when MCP services are unavailable
        console.warn('MCP portfolio service unavailable, using default images');
        setPortfolioItems(defaultPortfolioItems);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolioItems();
  }, []);

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-accent mb-1">{item.category}</div>
                    <div className="text-lg font-bold mb-2">{item.title}</div>
                    <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button asChild size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Link href={`/portfolio/${item.slug}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full">
                      {item.category}
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Link href={`/portfolio/${item.slug}`}>
                      View Project
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Image Analysis Section */}
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

          <AIPortfolioGrid locale="en" portfolioItems={portfolioItems} />
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
