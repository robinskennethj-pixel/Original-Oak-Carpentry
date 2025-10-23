import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hammer, Award, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function CustomWoodworkPage() {
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
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Custom Woodwork</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Handcrafted furniture and architectural millwork built with traditional techniques and modern precision.
          </p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Master Craftsmanship</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our custom woodwork service combines centuries-old woodworking traditions with modern precision tools.
                Each piece is meticulously crafted to meet your exact specifications, ensuring both beauty and functionality
                that will last for generations.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From initial design consultation to final installation, we work closely with you to bring your vision to life,
                using only the finest materials and time-tested joinery techniques.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Award Winning</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Timely Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Hammer className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Traditional Methods</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Our Custom Woodwork Includes:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Custom furniture design and construction
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Architectural millwork and trim
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Built-in cabinetry and shelving
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Traditional joinery techniques
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Premium hardwood selection
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Hand-applied finishes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Custom Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we ensure every detail meets your expectations.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Design Consultation</h3>
              <p className="text-sm text-muted-foreground">We discuss your vision, space, and functional needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Material Selection</h3>
              <p className="text-sm text-muted-foreground">Choose from premium hardwoods and finishes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Crafting</h3>
              <p className="text-sm text-muted-foreground">Expert construction using traditional techniques</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Installation</h3>
              <p className="text-sm text-muted-foreground">Professional delivery and setup in your space</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Create Something Beautiful?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your custom woodwork project and bring your vision to life.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Original Oak Carpentry</h3>
              <p className="text-primary-foreground/80">Crafting beautiful woodwork that lasts a lifetime.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Custom Woodwork</li>
                <li>Finish Carpentry</li>
                <li>Cabinetry</li>
                <li>Millwork</li>
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
                (407) 555-0123
                <br />
                info@originaloakcarpentry.com
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