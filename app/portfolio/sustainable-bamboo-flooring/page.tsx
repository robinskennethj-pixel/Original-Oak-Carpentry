import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Leaf, Recycle, TreePine } from "lucide-react"
import Link from "next/link"

export default function SustainableBambooFlooringPage() {
  const projectDetails = {
    title: "Sustainable Bamboo Flooring",
    category: "Sustainable",
    location: "Gainesville, FL",
    duration: "2 weeks",
    budget: "$12,000 - $18,000",
    completedDate: "November 2023",
    client: "The Green Family"
  }

  const features = [
    "100% sustainable bamboo materials",
    "Low-VOC adhesives and finishes",
    "Moisture-resistant installation",
    "Radiant heating compatibility",
    "Natural antimicrobial properties",
    "Carbon-negative material choice",
    "Easy maintenance and cleaning",
    "25-year manufacturer warranty"
  ]

  const specifications = [
    { label: "Material", value: "Strand Woven Bamboo" },
    { label: "Thickness", value: "5/8 inch (15.8mm)" },
    { label: "Finish", value: "Low-VOC Water-Based Polyurethane" },
    { label: "Installation", value: "Floating Floor with Underlayment" },
    { label: "Janka Hardness", value: "3,000+ lbf (Harder than Oak)" },
    { label: "Sustainability", value: "FSC Certified, Carbon Negative" }
  ]

  const sustainabilityStats = [
    { label: "Growth Rate", value: "3-5 years vs 25-100 years for hardwood" },
    { label: "CO2 Absorption", value: "35% more than equivalent hardwood" },
    { label: "Renewable", value: "Harvested without killing the plant" },
    { label: "VOC Emissions", value: "Near-zero with our low-VOC finishes" }
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              {projectDetails.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {projectDetails.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Eco-friendly bamboo flooring installation that combines sustainability with stunning natural beauty and exceptional durability.
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold">{projectDetails.location}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold">{projectDetails.duration}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Investment</p>
                <p className="font-semibold">{projectDetails.budget}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="font-semibold">{projectDetails.completedDate}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Project Image */}
            <div className="space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src="/beautiful-bamboo-flooring-installation-in-modern-h.jpg"
                  alt="Sustainable bamboo flooring installation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/beautiful-bamboo-flooring-installation-in-modern-h.jpg"
                  alt="Bamboo flooring detail"
                  className="aspect-video rounded-lg object-cover"
                />
                <img
                  src="/beautiful-bamboo-flooring-installation-in-modern-h.jpg"
                  alt="Natural bamboo texture"
                  className="aspect-video rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Green family was committed to creating an environmentally responsible home 
                  without compromising on style or durability. They chose bamboo flooring as part 
                  of their sustainable living philosophy while wanting a beautiful, long-lasting floor.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team installed strand-woven bamboo flooring throughout their 1,800 sq ft home, 
                  using low-VOC adhesives and finishes. The result is a stunning floor that's harder 
                  than oak while being completely renewable and carbon-negative.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-primary" />
                  Sustainable Features
                </h3>
                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <TreePine className="h-6 w-6 text-primary" />
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="font-medium">{spec.label}</span>
                      <span className="text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Stats */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Environmental Impact</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Why bamboo is the most sustainable flooring choice for your home
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sustainabilityStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Leaf className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-primary" />
                  Renewable Resource
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bamboo regenerates from its root system after harvesting, growing back 
                  to full size in just 3-5 years compared to 25-100 years for hardwood trees.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Carbon Negative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Bamboo absorbs more CO2 and produces more oxygen than equivalent stands 
                  of hardwood, making it a carbon-negative building material.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-primary" />
                  Healthier Indoor Air
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our low-VOC finishes and bamboo's natural antimicrobial properties 
                  contribute to better indoor air quality for your family's health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Leaf className="h-12 w-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl font-light text-muted-foreground mb-6 italic">
              "We love knowing that our beautiful floors are helping the environment rather than 
              harming it. The bamboo is incredibly durable - even more so than the oak floors 
              we had before. It's the perfect combination of sustainability and quality."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <p className="font-semibold">{projectDetails.client}</p>
                <p className="text-sm text-muted-foreground">{projectDetails.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Choose Sustainable Flooring</h2>
          <p className="text-xl mb-8 opacity-90">
            Make an eco-friendly choice that's beautiful, durable, and better for the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Sustainable Flooring Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/portfolio">View More Projects</Link>
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
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/services" className="hover:text-foreground">Sustainable Flooring</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Eco-Friendly Materials</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Green Building</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Gainesville, Florida</li>
                <li>(555) 123-4567</li>
                <li>info@originaloakcarpentry.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Original Oak Carpentry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

