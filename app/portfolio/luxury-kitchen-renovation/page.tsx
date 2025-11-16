import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

export default function LuxuryKitchenRenovationPage() {
  const projectDetails = {
    title: "Luxury Kitchen Renovation",
    category: "Residential",
    location: "Orlando, FL",
    duration: "6 weeks",
    budget: "$85,000 - $95,000",
    completedDate: "March 2024",
    client: "The Martinez Family"
  }

  const features = [
    "Custom solid wood cabinets with soft-close hinges",
    "Granite countertops with undermount sink",
    "Hurricane-resistant impact windows",
    "Crown molding and decorative trim work",
    "Custom kitchen island with breakfast bar",
    "Professional-grade stainless steel appliances",
    "Recessed LED lighting throughout",
    "Hardwood flooring installation"
  ]

  const images = [
    {
      src: "/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg",
      alt: "Completed luxury kitchen with custom cabinets",
      caption: "Main kitchen view showing custom cabinetry and granite countertops"
    },
    {
      src: "/kitchen-island-with-breakfast-bar-seating.jpg",
      alt: "Custom kitchen island",
      caption: "Custom kitchen island with breakfast bar seating"
    },
    {
      src: "/kitchen-before-renovation-photo.jpg",
      alt: "Kitchen before renovation",
      caption: "Before: Original kitchen layout"
    }
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

      {/* Back Button */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline">
            <Link href="/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">{projectDetails.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {projectDetails.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A complete kitchen transformation featuring custom cabinetry, premium materials, 
              and hurricane-resistant features designed specifically for Florida living.
            </p>
            
            {/* Project Details Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{projectDetails.location}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{projectDetails.duration}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Investment</p>
                    <p className="font-medium">{projectDetails.budget}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="font-medium">{projectDetails.completedDate}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
            />
            <p className="text-center text-muted-foreground mt-4">{images[0].caption}</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <p className="text-muted-foreground mb-6">
                  The Martinez family approached us with a vision to transform their outdated kitchen 
                  into a modern, functional space that could withstand Florida's unique climate challenges. 
                  This project showcased our expertise in combining luxury finishes with practical, 
                  hurricane-resistant construction.
                </p>
                <p className="text-muted-foreground mb-6">
                  Working within a 6-week timeline, our team completely reimagined the space while 
                  ensuring minimal disruption to the family's daily routine. The result is a stunning 
                  kitchen that serves as the heart of their home.
                </p>
                <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  "Original Oak Carpentry exceeded our expectations in every way. The attention to detail 
                  and quality of craftsmanship is exceptional. Our new kitchen is not only beautiful 
                  but built to last through Florida's toughest weather."
                  <footer className="mt-2 font-medium text-foreground">— Maria Martinez</footer>
                </blockquote>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Images */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {images.slice(1).map((image, index) => (
                <div key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <p className="text-center text-muted-foreground mt-4">{image.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Kitchen Transformation?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us create a custom kitchen that combines luxury, functionality, and Florida durability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
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
          </div>
        </div>
      </footer>
    </div>
  )
}
