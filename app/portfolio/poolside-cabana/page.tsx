import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Waves, Sun, Palmtree } from "lucide-react"
import Link from "next/link"

export default function PoolsideCabanaPage() {
  const projectDetails = {
    title: "Poolside Cabana",
    category: "Outdoor Living",
    location: "Key Largo, FL",
    duration: "8 weeks",
    budget: "$75,000 - $95,000",
    completedDate: "December 2023",
    client: "The Rodriguez Family"
  }

  const features = [
    "Outdoor kitchen with stainless steel appliances",
    "Custom tiki bar with bamboo accents",
    "Weather-resistant cedar construction",
    "Retractable canvas roof system",
    "Built-in seating and dining areas",
    "Outdoor sound system integration",
    "Hurricane-rated structural design",
    "Tropical landscaping integration"
  ]

  const specifications = [
    { label: "Structure", value: "Pressure-Treated Cedar Frame" },
    { label: "Roofing", value: "Retractable Canvas with Aluminum Frame" },
    { label: "Kitchen", value: "Marine-Grade Stainless Steel" },
    { label: "Bar Top", value: "Teak with Polyurethane Finish" },
    { label: "Flooring", value: "Composite Decking - Slip Resistant" },
    { label: "Wind Rating", value: "Category 3 Hurricane Resistant" }
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
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Badge className="mb-4 bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
              {projectDetails.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {projectDetails.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Complete outdoor entertainment paradise featuring kitchen, bar, and lounge areas designed for Florida's tropical climate.
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
                  src="/poolside-cabana-with-outdoor-kitchen-and-bar-area.jpg"
                  alt="Poolside cabana with outdoor kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/poolside-cabana-with-outdoor-kitchen-and-bar-area.jpg"
                  alt="Tiki bar detail"
                  className="aspect-video rounded-lg object-cover"
                />
                <img
                  src="/poolside-cabana-with-outdoor-kitchen-and-bar-area.jpg"
                  alt="Outdoor kitchen appliances"
                  className="aspect-video rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Rodriguez family wanted to create the ultimate outdoor entertainment space 
                  that would take advantage of their waterfront location in Key Largo. The design 
                  needed to withstand hurricanes while providing a tropical resort-like experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team created a multi-functional space featuring a full outdoor kitchen, 
                  custom tiki bar, and comfortable seating areas. The retractable roof system 
                  provides flexibility for different weather conditions while maintaining the 
                  open-air tropical feel.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Waves className="h-6 w-6 text-primary" />
                  Entertainment Features
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
                  <Sun className="h-6 w-6 text-primary" />
                  Construction Specifications
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

      {/* Features Showcase */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tropical Paradise Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every element designed for outdoor entertaining in Florida's climate
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  Outdoor Kitchen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Full outdoor kitchen with marine-grade stainless steel appliances, 
                  including grill, refrigerator, and prep areas designed for coastal conditions.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palmtree className="h-5 w-5 text-primary" />
                  Tiki Bar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Custom tiki bar with authentic bamboo accents, teak bar top, 
                  and integrated ice storage for the perfect tropical cocktail experience.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  Retractable Roof
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Motorized retractable canvas roof system provides shade when needed 
                  while allowing for open-sky dining and stargazing.
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
            <Palmtree className="h-12 w-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl font-light text-muted-foreground mb-6 italic">
              "This cabana has transformed our backyard into a tropical resort. We entertain 
              here almost every weekend, and our guests are always amazed by the quality and 
              attention to detail. It's like having our own private tiki bar!"
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
          <h2 className="text-3xl font-bold mb-4">Create Your Outdoor Paradise</h2>
          <p className="text-xl mb-8 opacity-90">
            Transform your backyard into the ultimate entertainment destination with custom outdoor living spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Free Design Consultation</Link>
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
                <li><Link href="/services" className="hover:text-foreground">Outdoor Living</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Outdoor Kitchens</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Custom Structures</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Key Largo, Florida</li>
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

