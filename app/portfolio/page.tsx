import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PortfolioPage() {
  const projects = [
    {
      title: "Luxury Kitchen Renovation",
      category: "Residential",
      image: "/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg",
      description:
        "Complete kitchen transformation with custom cabinets, crown molding, and hurricane-resistant features.",
    },
    {
      title: "Waterfront Deck & Pergola",
      category: "Outdoor Living",
      image: "/waterfront-deck-with-pergola-overlooking-florida-c.jpg",
      description: "Storm-resistant outdoor living space with composite decking and custom pergola structure.",
    },
    {
      title: "Restaurant Build-Out",
      category: "Commercial",
      image: "/modern-restaurant-interior-with-custom-woodwork-an.jpg",
      description: "Complete interior build-out for upscale restaurant including custom bar and dining areas.",
    },
    {
      title: "Historic Home Restoration",
      category: "Restoration",
      image: "/restored-historic-florida-home-with-original-archi.jpg",
      description:
        "Careful restoration of 1920s Florida home preserving original character while adding modern functionality.",
    },
    {
      title: "Hurricane Shutters Installation",
      category: "Hurricane Protection",
      image: "/hurricane-shutters-installed-on-florida-home-windo.jpg",
      description: "Custom hurricane shutters designed for maximum protection and aesthetic appeal.",
    },
    {
      title: "Office Reception Area",
      category: "Commercial",
      image: "/modern-office-reception-area-with-custom-millwork.jpg",
      description: "Sophisticated reception area with custom millwork and built-in storage solutions.",
    },
    {
      title: "Custom Walk-In Closet",
      category: "Residential",
      image: "/luxury-walk-in-closet-with-custom-shelving-and-dra.jpg",
      description: "Bespoke closet system with cedar lining and humidity-resistant finishes.",
    },
    {
      title: "Poolside Cabana",
      category: "Outdoor Living",
      image: "/poolside-cabana-with-outdoor-kitchen-and-bar-area.jpg",
      description: "Complete outdoor entertainment space with kitchen, bar, and lounge areas.",
    },
    {
      title: "Sustainable Bamboo Flooring",
      category: "Sustainable",
      image: "/beautiful-bamboo-flooring-installation-in-modern-h.jpg",
      description: "Eco-friendly bamboo flooring installation with low-VOC finishes.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Florida Carpentry Co.
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
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Our Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore our completed projects showcasing quality craftsmanship and Florida-specific expertise.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="default" className="px-4 py-2 cursor-pointer">
              All Projects
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Residential
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Commercial
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Outdoor Living
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Hurricane Protection
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Restoration
            </Badge>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    {project.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/portfolio/${project.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")}`}
                    >
                      View Project
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Counties Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl font-light text-muted-foreground mb-6 italic">
              "Florida Carpentry Co. transformed our hurricane-damaged home into something even more beautiful than
              before. Their attention to detail and knowledge of Florida building requirements gave us complete
              confidence."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img
                src="/professional-headshot-of-satisfied-customer.jpg"
                alt="Customer"
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <div className="font-semibold">Sarah & Mike Johnson</div>
                <div className="text-sm text-muted-foreground">Naples, FL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's create something beautiful and built to last in Florida's unique environment.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Get Free Estimate</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Florida Carpentry Co.</h3>
              <p className="text-primary-foreground/80">Built Strong. Built Beautiful. Built for Florida.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Finish Carpentry</li>
                <li>Outdoor Living</li>
                <li>Hurricane-Proof Construction</li>
                <li>Commercial Build-Outs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-primary-foreground/80">
                (555) 123-4567
                <br />
                info@floridacarpentry.com
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Florida Carpentry Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
