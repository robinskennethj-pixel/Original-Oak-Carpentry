import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

export default function HistoricHomeRestorationPage() {
  const projectDetails = {
    title: "Historic Home Restoration",
    category: "Restoration",
    location: "St. Augustine, FL",
    duration: "12 weeks",
    budget: "$95,000 - $120,000",
    completedDate: "November 2023",
    client: "The Henderson Family"
  }

  const features = [
    "Restored original 1920s heart pine flooring",
    "Rebuilt period-appropriate crown molding",
    "Restored original window casings and trim",
    "Custom millwork matching historical profiles",
    "Hurricane-resistant structural reinforcements",
    "Preservation of original architectural details",
    "Modern electrical integration with period aesthetics",
    "Historical society compliance and certification"
  ]

  const images = [
    {
      src: "/restored-historic-florida-home-with-original-archi.jpg",
      alt: "Completed historic home restoration",
      caption: "Restored 1920s Florida home with original architectural details preserved"
    },
    {
      src: "/historic-home-before-restoration.jpg",
      alt: "Home before restoration",
      caption: "Before: Original condition showing weathered exterior and damaged trim"
    },
    {
      src: "/historic-millwork-restoration-detail.jpg",
      alt: "Restored millwork detail",
      caption: "Meticulously restored crown molding and window casings"
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
              A meticulous restoration of a 1920s Florida home, preserving original 
              architectural character while incorporating modern functionality and 
              hurricane-resistant improvements.
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
                  This 1920s Florida home had suffered decades of weathering and previous 
                  renovations that compromised its historical integrity. The Henderson family 
                  wanted to restore the home to its original grandeur while ensuring it could 
                  withstand modern Florida weather challenges.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our restoration team worked closely with the St. Augustine Historical Society 
                  to ensure every detail met preservation standards. We used period-appropriate 
                  techniques and materials while discretely incorporating modern structural 
                  improvements and hurricane resistance.
                </p>
                <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  "Original Oak Carpentry brought our family home back to life. Their knowledge 
                  of historical construction techniques and attention to period details is 
                  unmatched. The home now looks exactly as it did in the 1920s, but we know 
                  it's built to last another century."
                  <footer className="mt-2 font-medium text-foreground">— Margaret Henderson</footer>
                </blockquote>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Restoration Features</h2>
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
            <h2 className="text-3xl font-bold text-center mb-12">Restoration Gallery</h2>
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
          <h2 className="text-3xl font-bold mb-6">Ready for Your Restoration Project?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us preserve and restore your historic property with authentic craftsmanship and modern durability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">Get Free Assessment</Link>
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

