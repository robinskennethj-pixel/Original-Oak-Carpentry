import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProcessPage() {
  const processSteps = [
    {
      step: 1,
      title: "Consultation",
      description: "We discuss your vision, needs, and budget",
      details: [
        "Initial phone or in-person consultation",
        "Site visit and measurements",
        "Discussion of materials and timeline",
        "Budget planning and cost estimates",
        "Review of design preferences and style",
        "Assessment of structural requirements"
      ],
      duration: "1-2 hours",
      outcome: "Detailed project proposal and timeline"
    },
    {
      step: 2,
      title: "Design & Planning",
      description: "Detailed plans and material selection",
      details: [
        "3D design renderings and blueprints",
        "Material sourcing and selection",
        "Permit applications if required",
        "Timeline finalization",
        "Contract signing and deposit",
        "Coordination with other contractors"
      ],
      duration: "1-2 weeks",
      outcome: "Approved design plans and signed contract"
    },
    {
      step: 3,
      title: "Construction",
      description: "Expert craftsmanship and quality materials",
      details: [
        "Material delivery and preparation",
        "Daily progress updates",
        "Quality control inspections",
        "Clean workspace maintenance",
        "Regular client communication",
        "Adherence to safety protocols"
      ],
      duration: "Varies by project",
      outcome: "Completed construction ready for finishing"
    },
    {
      step: 4,
      title: "Completion",
      description: "Final inspection and your satisfaction",
      details: [
        "Final quality inspection",
        "Client walkthrough and approval",
        "Touch-ups and adjustments",
        "Cleanup and debris removal",
        "Warranty documentation",
        "Care and maintenance instructions"
      ],
      duration: "1-2 days",
      outcome: "Project completion and client satisfaction"
    }
  ]

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
            <Link href="/process" className="text-primary font-medium">
              Process
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
            <Link href="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Our Process</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From initial consultation to project completion, we follow a proven process that ensures quality, 
            transparency, and your complete satisfaction at every step.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {processSteps.map((process, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="bg-primary text-primary-foreground p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-primary-foreground text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {process.step}
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2">{process.title}</h3>
                    <p className="text-primary-foreground/80 text-center">{process.description}</p>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">What We Do</h4>
                        <ul className="space-y-2">
                          {process.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Duration</h4>
                          <p className="text-muted-foreground">{process.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Outcome</h4>
                          <p className="text-muted-foreground">{process.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's begin with a consultation to discuss your vision and how we can bring it to life.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

