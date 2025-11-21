import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowLeft, Quote } from "lucide-react"
import Link from "next/link"

export default function MarcusWilliamsTestimonial() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/ORIGINAL OAK CARPENTRY - FULL-WEBSITE-LOGO.png"
              alt="Original Oak Carpentry Logo"
              className="h-12 w-auto object-contain"
            />
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
            <Link href="/testimonials" className="text-primary font-medium">
              Testimonials
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Back Button */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Button variant="outline" asChild>
            <Link href="/testimonials">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Testimonials
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonial Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>
                
                <blockquote className="text-2xl font-light text-card-foreground mb-8 leading-relaxed">
                  "Original Oak Carpentry restored my great-grandfather's armoire to perfection. The traditional techniques they used brought it back to life better than I ever imagined. The attention to detail was extraordinary - they matched the original wood grain patterns and used period-appropriate joinery methods. What impressed me most was their respect for the piece's history while ensuring it would last for generations to come."
                </blockquote>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/satisfied-homeowner.jpg" 
                      alt="Marcus Williams"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-card-foreground">Marcus Williams</div>
                    <div className="text-muted-foreground">Antique Collector</div>
                    <div className="text-sm text-muted-foreground">Tampa, FL</div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Service Type</h4>
                      <p className="text-muted-foreground">Antique Furniture Restoration</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Timeline</h4>
                      <p className="text-muted-foreground">6 weeks</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Techniques Used</h4>
                      <p className="text-muted-foreground">Traditional joinery, wood matching, period-appropriate finishes</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Year Completed</h4>
                      <p className="text-muted-foreground">2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Own Restoration Project?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us bring your cherished pieces back to life with the same care and expertise.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

