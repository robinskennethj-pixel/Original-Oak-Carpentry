import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Shield, Zap, Home } from "lucide-react"
import Link from "next/link"

export default function HurricaneShuttersPage() {
  const projectDetails = {
    title: "Hurricane Shutters Installation",
    category: "Hurricane Protection",
    location: "Naples, FL",
    duration: "3 weeks",
    budget: "$25,000 - $35,000",
    completedDate: "August 2023",
    client: "The Martinez Family"
  }

  const features = [
    "Impact-resistant aluminum construction",
    "Custom-fitted for each window and door",
    "Manual and electric operation options",
    "Powder-coated finish for corrosion resistance",
    "Meets Miami-Dade hurricane standards",
    "Integrated security features",
    "Quick-deploy emergency system",
    "Professional installation and testing"
  ]

  const specifications = [
    { label: "Material", value: "6061-T6 Aluminum Alloy" },
    { label: "Wind Rating", value: "Category 5 Hurricane (180+ mph)" },
    { label: "Impact Rating", value: "Large Missile Impact Certified" },
    { label: "Finish", value: "Powder-Coated for UV Protection" },
    { label: "Operation", value: "Manual Crank & Electric Motor Options" },
    { label: "Warranty", value: "10 Years Manufacturer + 5 Years Installation" }
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
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-200">
              {projectDetails.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {projectDetails.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Professional hurricane protection system designed to safeguard your home and family during severe weather events.
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
                  src="/hurricane-shutters-installed-on-florida-home-windo.jpg"
                  alt="Hurricane shutters installation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/hurricane-shutters-installed-on-florida-home-windo.jpg"
                  alt="Shutter detail view"
                  className="aspect-video rounded-lg object-cover"
                />
                <img
                  src="/hurricane-shutters-installed-on-florida-home-windo.jpg"
                  alt="Control mechanism"
                  className="aspect-video rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Martinez family approached us after experiencing property damage during Hurricane Ian. 
                  They needed a comprehensive hurricane protection system that would provide maximum security 
                  while maintaining the aesthetic appeal of their Naples home.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team designed and installed a complete hurricane shutter system featuring impact-resistant 
                  aluminum construction, custom-fitted for each opening. The system includes both manual and 
                  electric operation options for convenience during emergency deployment.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  Protection Features
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
                  <Zap className="h-6 w-6 text-primary" />
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

      {/* Client Testimonial */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Home className="h-12 w-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl font-light text-muted-foreground mb-6 italic">
              "After Hurricane Ian, we knew we needed serious protection. Original Oak Carpentry delivered 
              a system that gives us complete peace of mind. The shutters deployed perfectly during the 
              last storm, and our home was completely protected."
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
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your Home Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait for the next storm. Get a free consultation for hurricane protection solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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
                <li><Link href="/services" className="hover:text-foreground">Hurricane Protection</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Custom Carpentry</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Restoration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Naples, Florida</li>
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
