import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Home, Shirt, Star } from "lucide-react"
import Link from "next/link"

export default function CustomWalkInClosetPage() {
  const projectDetails = {
    title: "Custom Walk-In Closet",
    category: "Residential",
    location: "Sarasota, FL",
    duration: "4 weeks",
    budget: "$18,000 - $28,000",
    completedDate: "October 2023",
    client: "The Johnson Family"
  }

  const features = [
    "Cedar-lined drawers and shelving",
    "Custom shoe storage with LED lighting",
    "Adjustable shelving systems",
    "Pull-out accessory trays",
    "Full-length mirrors with integrated lighting",
    "Humidity-resistant finishes",
    "Soft-close drawer mechanisms",
    "Jewelry storage with felt lining"
  ]

  const specifications = [
    { label: "Primary Wood", value: "Red Oak with Natural Stain" },
    { label: "Drawer Lining", value: "Aromatic Cedar" },
    { label: "Hardware", value: "Soft-Close Blum Mechanisms" },
    { label: "Lighting", value: "LED Strip & Accent Lighting" },
    { label: "Finish", value: "Water-Based Polyurethane" },
    { label: "Storage Capacity", value: "200+ Garments, 50+ Shoes" }
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
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">
              {projectDetails.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {projectDetails.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Luxury walk-in closet system designed to maximize storage while creating an elegant dressing experience.
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
                  src="/luxury-walk-in-closet-with-custom-shelving-and-dra.jpg"
                  alt="Custom walk-in closet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/luxury-walk-in-closet-with-custom-shelving-and-dra.jpg"
                  alt="Shoe storage detail"
                  className="aspect-video rounded-lg object-cover"
                />
                <img
                  src="/luxury-walk-in-closet-with-custom-shelving-and-dra.jpg"
                  alt="Drawer and accessory storage"
                  className="aspect-video rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Johnson family wanted to transform their master bedroom closet into a luxury 
                  dressing room that would accommodate their extensive wardrobe while providing 
                  easy access and organization. The space needed to feel like a high-end boutique.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our design maximizes every inch of available space with custom shelving, 
                  cedar-lined drawers, and specialized storage solutions. LED lighting throughout 
                  creates a warm, inviting atmosphere while ensuring excellent visibility.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shirt className="h-6 w-6 text-primary" />
                  Storage Features
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
                  <Star className="h-6 w-6 text-primary" />
                  Materials & Specifications
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
            <h2 className="text-3xl font-bold mb-4">Luxury Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every detail designed for functionality and elegance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-primary" />
                  Cedar Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aromatic cedar lining in all drawers and shelving provides natural moth protection 
                  and maintains fresh scent for your garments.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  LED Lighting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrated LED strip lighting and accent lights ensure perfect visibility 
                  while creating a warm, boutique-like atmosphere.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Soft-Close Hardware
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Premium Blum soft-close mechanisms on all drawers and doors provide 
                  smooth, quiet operation that will last for decades.
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
            <Home className="h-12 w-12 text-primary mx-auto mb-6" />
            <blockquote className="text-2xl font-light text-muted-foreground mb-6 italic">
              "Our closet has become my favorite room in the house! The organization system 
              is incredible, and the cedar lining keeps everything fresh. It's like having 
              a luxury boutique in our bedroom."
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
          <h2 className="text-3xl font-bold mb-4">Design Your Dream Closet</h2>
          <p className="text-xl mb-8 opacity-90">
            Transform your closet into a luxury dressing room with custom storage solutions.
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
                <li><Link href="/services" className="hover:text-foreground">Custom Storage</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Closet Design</Link></li>
                <li><Link href="/services" className="hover:text-foreground">Built-ins</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sarasota, Florida</li>
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
