import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"

// Project data - in a real app this would come from a database
const projects = {
  "luxury-kitchen-renovation": {
    title: "Luxury Kitchen Renovation",
    category: "Residential",
    location: "Naples, FL",
    duration: "6 weeks",
    teamSize: "4 craftsmen",
    completedDate: "March 2024",
    images: [
      "/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg",
      "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
      "/professional-carpenter-working-on-custom-wooden-fu.jpg",
    ],
    description:
      "Complete kitchen transformation featuring custom cabinets, crown molding, and hurricane-resistant construction techniques.",
    challenge:
      "The homeowners wanted a luxury kitchen that could withstand Florida's hurricane seasons while maintaining elegant aesthetics.",
    solution:
      "We designed custom cabinets with reinforced construction, used hurricane-rated hardware, and incorporated storm-resistant features without compromising the luxury feel.",
    features: [
      "Custom solid wood cabinets with soft-close hardware",
      "Hurricane-resistant crown molding installation",
      "Granite countertops with reinforced support",
      "Under-cabinet LED lighting system",
      "Custom pantry organization system",
    ],
    testimonial: {
      text: "The attention to detail was incredible. Our kitchen is not only beautiful but we feel confident it can handle anything Florida weather throws at us.",
      author: "Jennifer Martinez",
      location: "Naples, FL",
    },
  },
  "waterfront-deck-pergola": {
    title: "Waterfront Deck & Pergola",
    category: "Outdoor Living",
    location: "Fort Myers, FL",
    duration: "4 weeks",
    teamSize: "3 craftsmen",
    completedDate: "February 2024",
    images: [
      "/waterfront-deck-with-pergola-overlooking-florida-c.jpg",
      "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
    ],
    description:
      "Storm-resistant outdoor living space with composite decking and custom pergola structure designed for waterfront conditions.",
    challenge:
      "Creating an outdoor space that could withstand salt air, high winds, and frequent storms while providing year-round enjoyment.",
    solution:
      "Used marine-grade materials, engineered the pergola for 150+ mph winds, and incorporated drainage systems for heavy rainfall.",
    features: [
      "Composite decking with hidden fastener system",
      "Hurricane-rated pergola construction",
      "Stainless steel hardware throughout",
      "Integrated drainage system",
      "Custom built-in seating with storage",
    ],
    testimonial: {
      text: "Our deck has survived two major storms without any damage. The craftsmanship is outstanding and the views are incredible.",
      author: "Robert & Linda Chen",
      location: "Fort Myers, FL",
    },
  },
  // Add more projects as needed
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug as keyof typeof projects]

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link href="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Florida Carpentry Co.
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
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild>
          <Link href="/portfolio" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <section className="relative">
        <img src={project.images[0] || "/placeholder.svg"} alt={project.title} className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <Badge className="mb-4" variant="secondary">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.duration}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {project.teamSize}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">{project.description}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Our Solution</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-3 mb-12">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Additional Images */}
              {project.images.length > 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} detail ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">{project.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium">{project.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Team Size</div>
                      <div className="font-medium">{project.teamSize}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                      <div className="font-medium">{project.completedDate}</div>
                    </div>
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h4 className="font-semibold mb-4">Client Testimonial</h4>
                    <blockquote className="text-sm text-muted-foreground italic mb-4">
                      "{project.testimonial.text}"
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-medium">{project.testimonial.author}</div>
                      <div className="text-muted-foreground">{project.testimonial.location}</div>
                    </div>
                  </div>

                  <Button className="w-full mt-6" asChild>
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Florida Carpentry Co.</h3>
              <p className="text-primary-foreground/80">Built Strong. Built Beautiful. Built for Florida.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Finish Carpentry</li>
                <li>Outdoor Living</li>
                <li>Hurricane-Proof Construction</li>
                <li>Commercial Build-Outs</li>
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
                (555) 123-4567
                <br />
                info@floridacarpentry.com
              </p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Florida Carpentry Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
