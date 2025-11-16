import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Recycle, TreePine, Award } from "lucide-react"
import Link from "next/link"

export default function SustainableCraftingPage() {
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
            <Link href="/services" className="text-primary font-medium">
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Sustainable Crafting</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Eco-conscious woodworking using reclaimed materials and sustainable practices that honor both craftsmanship and environmental responsibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="tel:+14075550123" className="flex items-center gap-2">
                Call Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Eco-Friendly Excellence</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Our sustainable crafting approach combines traditional woodworking techniques with environmentally responsible practices. We source reclaimed materials, use eco-friendly finishes, and implement green building practices that reduce environmental impact while creating beautiful, lasting pieces.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Recycle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Reclaimed Materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Eco-Friendly Finishes</span>
                </div>
                <div className="flex items-center gap-3">
                  <TreePine className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Sustainable Sourcing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Green Certified</span>
                </div>
              </div>
            </div>
            <div className="bg-green-100 rounded-2xl p-8 text-center">
              <TreePine className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
              <p className="text-muted-foreground">
                Every sustainable project helps reduce waste and supports environmental conservation while creating beautiful, functional pieces.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-green-600" />
                  Reclaimed Wood Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Beautiful furniture and architectural elements crafted from reclaimed barn wood, vintage lumber, and salvaged materials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Eco-Friendly Finishes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Low-VOC stains, natural oils, and water-based finishes that protect both your health and the environment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-green-600" />
                  Sustainable Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  FSC-certified lumber, bamboo, and other renewable materials sourced from responsible suppliers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Green Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Waste reduction, energy-efficient processes, and sustainable workshop practices that minimize environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Sustainable?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your eco-friendly woodworking project and create something beautiful that's good for you and the planet.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Start Your Project</Link>
          </Button>
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
