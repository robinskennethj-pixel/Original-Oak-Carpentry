import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ArrowLeft, Clock, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function VideosPage() {
  const videos = [
    {
      title: "How We Hurricane-Proof a Deck",
      description: "Learn about our specialized techniques for creating storm-resistant outdoor spaces.",
      duration: "12 min",
      views: "2.3k",
      category: "Hurricane Prep",
      thumbnail: "hurricane-deck"
    },
    {
      title: "Maintaining Wooden Cabinets in Florida Humidity",
      description: "Expert tips for keeping your wooden cabinets beautiful in Florida's humid climate.",
      duration: "8 min",
      views: "1.8k",
      category: "Maintenance",
      thumbnail: "cabinet-maintenance"
    },
    {
      title: "Crown Molding Installation Tips",
      description: "Professional techniques for perfect crown molding installation.",
      duration: "15 min",
      views: "3.1k",
      category: "Installation",
      thumbnail: "crown-molding"
    },
    {
      title: "Custom Furniture Design Process",
      description: "Behind the scenes look at how we design and craft custom furniture pieces.",
      duration: "20 min",
      views: "4.2k",
      category: "Design",
      thumbnail: "furniture-design"
    },
    {
      title: "Sustainable Wood Selection",
      description: "How we choose eco-friendly materials for our projects.",
      duration: "10 min",
      views: "1.5k",
      category: "Sustainability",
      thumbnail: "wood-selection"
    },
    {
      title: "Restoration Techniques for Antique Furniture",
      description: "Preserving history through careful restoration methods.",
      duration: "18 min",
      views: "2.7k",
      category: "Restoration",
      thumbnail: "antique-restoration"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            <span className="text-primary">Original Oak</span> Carpentry
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Video Tutorials</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Watch our master craftsmen demonstrate techniques, share maintenance tips, and showcase our craftsmanship process.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Video</h2>
            <Card className="border-2 border-pink-200 shadow-xl">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-pink-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-pink-700 transition-colors cursor-pointer">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-lg font-semibold text-gray-700">How We Hurricane-Proof a Deck</p>
                    <p className="text-sm text-gray-500">Click to watch our most popular tutorial</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">How We Hurricane-Proof a Deck</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn about our specialized techniques for creating storm-resistant outdoor spaces that can withstand Florida's hurricane season.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>12 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>2.3k views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Hurricane Prep</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {["All Videos", "Hurricane Prep", "Maintenance", "Installation", "Design", "Sustainability", "Restoration"].map((category) => (
                <Button
                  key={category}
                  variant={category === "All Videos" ? "default" : "outline"}
                  size="sm"
                  className={category === "All Videos" ? "bg-pink-600 hover:bg-pink-700" : "border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-pink-50 rounded-t-lg flex items-center justify-center relative group">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-pink-700 transition-colors cursor-pointer">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{video.views} views</span>
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">{video.category}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white">
              Load More Videos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Tutorial</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to get notified when we release new videos and tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <Button className="bg-pink-600 hover:bg-pink-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Apply what you've learned from our tutorials to your own custom carpentry project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600">
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
