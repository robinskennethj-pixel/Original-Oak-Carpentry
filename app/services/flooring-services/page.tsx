import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Square, CheckCircle, Star, ArrowRight, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function FlooringServicesPage() {
  const flooringServices = [
    {
      title: "Hardwood Flooring",
      description: "Premium hardwood installation and refinishing services",
      features: ["Solid Wood Installation", "Engineered Hardwood", "Floor Refinishing", "Custom Staining"],
      image: "/placeholder-flooring-1.jpg"
    },
    {
      title: "Luxury Vinyl Plank",
      description: "Modern, durable luxury vinyl plank installation",
      features: ["Waterproof Options", "Click-Lock Installation", "Realistic Wood Looks", "Easy Maintenance"],
      image: "/placeholder-flooring-2.jpg"
    },
    {
      title: "Tile & Stone",
      description: "Professional tile and natural stone flooring installation",
      features: ["Ceramic & Porcelain", "Natural Stone", "Custom Patterns", "Heated Floor Systems"],
      image: "/placeholder-flooring-3.jpg"
    },
    {
      title: "Subfloor Preparation",
      description: "Expert subfloor preparation and repair services",
      features: ["Moisture Testing", "Leveling Compounds", "Structural Repairs", "Vapor Barriers"],
      image: "/placeholder-flooring-4.jpg"
    }
  ]

  const benefits = [
    "Professional installation with lifetime warranty",
    "Expert consultation and design assistance",
    "High-quality materials from trusted suppliers",
    "Dust-free sanding and refinishing",
    "Flexible scheduling to minimize disruption",
    "Comprehensive cleanup after completion"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-48 -translate-y-48"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Square className="h-4 w-4" />
              Flooring Services
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Expert <span className="text-primary">Flooring</span> Installation & <span className="text-accent">Refinishing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your space with our professional flooring services. From hardwood installation to luxury vinyl and tile work, we deliver exceptional craftsmanship that stands the test of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Get Free Estimate
              </Button>
              <Button variant="outline" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our Flooring <span className="text-primary">Specialties</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in all types of flooring installation and refinishing, using only the highest quality materials and proven techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {flooringServices.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Square className="h-16 w-16 text-primary/60" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose <span className="text-primary">Original Oak Carpentry</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Our commitment to excellence and attention to detail sets us apart in the flooring industry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
                  <Star className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-card-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Installation</span> Process
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              From initial consultation to final walkthrough, we ensure every step meets our high standards.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Consultation", desc: "Free in-home consultation and measurement" },
                { step: "2", title: "Planning", desc: "Material selection and project timeline" },
                { step: "3", title: "Installation", desc: "Professional installation by certified craftsmen" },
                { step: "4", title: "Completion", desc: "Final inspection and cleanup" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Floors?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today for a free consultation and estimate. Let's bring your flooring vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="mr-2 h-5 w-5" />
              Call (555) 123-4567
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Mail className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
