import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hammer, Star, Users, Award } from "lucide-react"
import Link from "next/link"

export default function BespokeCommissionsPage() {
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
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Bespoke Commissions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            One-of-a-kind pieces designed and crafted specifically for your vision and space. Every commission is a unique collaboration between artisan and client.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/contact">Start Your Commission</Link>
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
              <h2 className="text-3xl font-bold text-foreground mb-6">Artisan Collaboration</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Our bespoke commission process begins with understanding your vision, space, and functional needs. We work closely with you through every step, from initial concept sketches to final installation, ensuring your piece is exactly what you envisioned.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Personal Consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Custom Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Hammer className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Master Craftsmanship</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Lifetime Quality</span>
                </div>
              </div>
            </div>
            <div className="bg-amber-100 rounded-2xl p-8 text-center">
              <Hammer className="h-16 w-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">The Commission Process</h3>
              <p className="text-muted-foreground">
                From initial consultation to final delivery, we guide you through every step of creating your perfect piece.
              </p>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  Consultation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We start with an in-depth consultation to understand your vision, space requirements, and functional needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  Design Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Custom sketches, 3D renderings, and material selection to bring your vision to life on paper first.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hammer className="h-5 w-5 text-amber-600" />
                  Expert Crafting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Master craftsmen bring your design to life using traditional techniques and premium materials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  Delivery & Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professional delivery and installation with lifetime craftsmanship warranty and care instructions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Commission Types */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Commission Specialties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From furniture to architectural elements, we create bespoke pieces that reflect your style and meet your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Custom Furniture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Dining tables and chairs</li>
                  <li>• Bedroom furniture sets</li>
                  <li>• Office desks and storage</li>
                  <li>• Living room pieces</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Architectural Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Custom mantels</li>
                  <li>• Stair railings</li>
                  <li>• Built-in cabinetry</li>
                  <li>• Decorative panels</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialty Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Art installations</li>
                  <li>• Commercial fixtures</li>
                  <li>• Restoration projects</li>
                  <li>• Unique creations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Extraordinary?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your vision and create a one-of-a-kind piece that perfectly fits your space and style.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Begin Your Commission</Link>
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
