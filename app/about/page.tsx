import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Users, Hammer, Shield, Heart } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Rooted in <span className="text-primary">Tradition</span>,<br />
            Driven by <span className="text-accent">Passion</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Master craftsmen combining traditional techniques with modern innovation to create exceptional woodwork and fine carpentry.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">The Original Oak Legacy</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2010 with a commitment to excellence and durability,
                Original Oak Carpentry represents the perfect fusion of traditional craftsmanship with modern
                precision and innovation.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our master craftsmen bring decades of experience in fine woodworking and traditional carpentry,
                combining time-honored techniques with cutting-edge tools and materials. Every piece we create
                carries the strength, durability, and artistic excellence that defines our work.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that true craftsmanship transcends mere construction - it's about forging connections 
                between past and present, tradition and innovation, function and beauty. Each project is a 
                testament to our commitment to excellence and our respect for the craft.
              </p>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/professional-carpenter-working-on-custom-woodwork-.jpg"
                  alt="Master craftsman at Original Oak Carpentry working on custom woodwork"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                <div className="text-lg font-bold">14+</div>
                <div className="text-sm">Years Crafting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-muted-foreground">Masterpieces Created</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-accent mb-2">14+</div>
              <div className="text-muted-foreground">Years Crafting</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-secondary mb-2">100%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Lifetime Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full -translate-y-40 translate-x-40"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Our Principles
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Rooted in <span className="text-primary">Excellence</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The values that guide every piece we create and every relationship we build.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Hammer className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">Master Craftsmanship</h3>
                <p className="text-muted-foreground">
                  Every piece is crafted with traditional techniques and modern precision, ensuring exceptional quality
                  that stands the test of time.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Shield className="h-12 w-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-accent transition-colors duration-300">Durability & Strength</h3>
                <p className="text-muted-foreground">
                  Built with the strength of oak, our pieces are designed to last generations, combining
                  beauty with uncompromising durability.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="p-3 bg-secondary/10 rounded-full w-fit mx-auto mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Heart className="h-12 w-12 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-secondary transition-colors duration-300">Passionate Service</h3>
                <p className="text-muted-foreground">
                  We pour our heart into every project, working closely with you to bring your vision to life 
                  with care and attention to detail.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full translate-x-40 translate-y-40"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Our Expertise
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Mastery in Every <span className="text-primary">Craft</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized skills and certifications that ensure exceptional results in every project.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-6 py-3 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300">
              Licensed & Insured
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-sm bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors duration-300">
              Traditional Woodworking
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-sm bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors duration-300">
              Metal Fabrication
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300">
              Antique Restoration
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-sm bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors duration-300">
              Custom Design
            </Badge>
            <Badge variant="secondary" className="px-6 py-3 text-sm bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 transition-colors duration-300">
              Sustainable Materials
            </Badge>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Let's Create Together
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Forge Your <span className="text-primary">Vision</span>?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with master craftsmanship and traditional techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/portfolio">View Our Masterpieces</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
