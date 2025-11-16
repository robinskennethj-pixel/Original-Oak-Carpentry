import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ArrowLeft, Play, RotateCcw, ZoomIn, Download } from "lucide-react"
import Link from "next/link"

export default function VirtualGalleryPage() {
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
            <Link href="/portfolio" className="text-primary font-medium">
              Portfolio
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Virtual Project Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Experience our craftsmanship through interactive before/after comparisons and 3D project previews.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Featured Project */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Project: Hurricane-Resistant Deck</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200 shadow-xl">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Interactive Before/After Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-r from-gray-200 to-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Eye className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700">Interactive Visualization</p>
                      <p className="text-sm text-gray-500 mb-4">Drag the slider to compare before and after</p>
                      <div className="flex gap-4 justify-center">
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset View
                        </Button>
                        <Button variant="outline" size="sm">
                          <ZoomIn className="h-4 w-4 mr-2" />
                          Zoom In
                        </Button>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Auto Play
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Project Details</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Location: Orlando, FL</li>
                        <li>• Size: 400 sq ft deck</li>
                        <li>• Materials: Composite decking, reinforced framing</li>
                        <li>• Timeline: 5 days</li>
                        <li>• Hurricane rating: Category 3 resistant</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Key Features</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Storm-resistant composite materials</li>
                        <li>• Reinforced hurricane ties</li>
                        <li>• Pressure-treated lumber frame</li>
                        <li>• Integrated drainage system</li>
                        <li>• 25-year warranty</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Project Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Custom Kitchen Cabinets", location: "Tampa, FL", type: "Interior" },
                { title: "Outdoor Living Space", location: "Orlando, FL", type: "Exterior" },
                { title: "Historic Home Restoration", location: "Winter Park, FL", type: "Restoration" },
                { title: "Hurricane Shutters", location: "Melbourne, FL", type: "Protection" },
                { title: "Custom Furniture Set", location: "Kissimmee, FL", type: "Furniture" },
                { title: "Pergola & Deck Combo", location: "Sanford, FL", type: "Outdoor" }
              ].map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-blue-50 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Eye className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm font-medium">{project.title}</p>
                        <p className="text-xs text-muted-foreground">{project.location}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View 3D
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AR Experience */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto border-2 border-purple-200">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  Augmented Reality Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-muted-foreground mb-6">
                  Use your mobile device to visualize our projects in your own space with AR technology.
                </p>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Launch AR Viewer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's create something beautiful together. Get your free consultation and 3D visualization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/portfolio">View Full Portfolio</Link>
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
