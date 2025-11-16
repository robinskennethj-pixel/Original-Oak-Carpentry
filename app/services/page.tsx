import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Building2, Hammer, Leaf, Wrench } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
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
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Master craftsmanship combining traditional techniques with modern precision. From custom woodwork to fine finishing and weather-resistant construction.
          </p>
        </div>
      </section>

      {/* Residential Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Home className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Residential Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your home with our expert residential carpentry services, designed specifically for Florida
              living.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Finish Carpentry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Custom trim work, crown molding, baseboards, and architectural details that add elegance to your home.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Crown molding installation</li>
                  <li>• Custom trim and millwork</li>
                  <li>• Wainscoting and paneling</li>
                  <li>• Built-in shelving</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/finish-carpentry">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Kitchen & Bath Cabinets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Custom cabinetry designed for Florida's humidity and your lifestyle needs.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Custom kitchen cabinets</li>
                  <li>• Bathroom vanities</li>
                  <li>• Cabinet refacing</li>
                  <li>• Hardware installation</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/custom-woodwork">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outdoor Living Spaces</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Decks, pergolas, and outdoor structures built to withstand Florida weather.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Custom decks and patios</li>
                  <li>• Pergolas and gazebos</li>
                  <li>• Outdoor kitchens</li>
                  <li>• Pool decking</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/outdoor-living">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Hurricane-Proof Construction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Storm-resistant upgrades and construction to protect your home and family.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Hurricane shutters</li>
                  <li>• Storm-resistant framing</li>
                  <li>• Impact-resistant installations</li>
                  <li>• Reinforced structures</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/hurricane-resistant">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Repair & Restoration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Expert repair services for storm damage, wear, and aging structures.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Storm damage repair</li>
                  <li>• Wood rot replacement</li>
                  <li>• Structural repairs</li>
                  <li>• Historic restoration</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/repair-restoration">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Custom Millwork</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Bespoke woodworking and millwork crafted to your exact specifications.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Custom mantels</li>
                  <li>• Stair railings</li>
                  <li>• Window casings</li>
                  <li>• Decorative elements</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/custom-woodwork">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Commercial Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional commercial carpentry for businesses, developers, and contractors.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Office & Retail Build-Outs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Complete interior construction for offices, retail spaces, and commercial properties.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Reception areas and lobbies</li>
                  <li>• Conference rooms</li>
                  <li>• Retail displays and fixtures</li>
                  <li>• Restaurant build-outs</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/custom-woodwork">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Multi-Family Housing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Carpentry services for apartment complexes, condos, and multi-unit developments.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Unit finish work</li>
                  <li>• Common area construction</li>
                  <li>• Balcony and deck installation</li>
                  <li>• Amenity space build-outs</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/custom-woodwork">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialty Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Hammer className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Specialty Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unique carpentry solutions for specialized projects and requirements.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Leaf className="h-6 w-6 text-primary" />
                  <CardTitle>Sustainable Carpentry</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Eco-friendly construction using sustainable materials and green building practices.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Reclaimed wood projects</li>
                  <li>• FSC-certified materials</li>
                  <li>• Energy-efficient installations</li>
                  <li>• Low-VOC finishes</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/sustainable-crafting">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Wrench className="h-6 w-6 text-primary" />
                  <CardTitle>Bespoke Woodworking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  One-of-a-kind custom pieces crafted with traditional woodworking techniques.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Custom furniture</li>
                  <li>• Artistic installations</li>
                  <li>• Handcrafted details</li>
                  <li>• Unique design elements</li>
                </ul>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/bespoke-commissions">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Consultation</h3>
                <p className="text-sm text-muted-foreground mb-4">We discuss your vision, needs, and budget</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/process">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Design & Planning</h3>
                <p className="text-sm text-muted-foreground mb-4">Detailed plans and material selection</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/process">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Construction</h3>
                <p className="text-sm text-muted-foreground mb-4">Expert craftsmanship and quality materials</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/process">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  4
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Completion</h3>
                <p className="text-sm text-muted-foreground mb-4">Final inspection and your satisfaction</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/process">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate for your carpentry project.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get Free Estimate</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Original Oak Carpentry</h3>
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
            <p>&copy; 2024 Original Oak Carpentry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
