import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Building2, Leaf, Hammer, Shield, Wrench } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Home,
    title: "Custom Woodwork",
    description: "Handcrafted furniture and millwork forged with traditional techniques and modern precision.",
    features: ["Custom Furniture", "Architectural Millwork", "Handcrafted Details", "Unique Installations"],
    slug: "finish-carpentry",
  },
  {
    icon: Building2,
    title: "Metal Fabrication",
    description: "Precision metalwork and structural elements crafted with the strength and durability of Ogun.",
    features: ["Custom Metalwork", "Structural Elements", "Decorative Ironwork", "Hardware & Fittings"],
    slug: "hurricane-resistant",
  },
  {
    icon: Shield,
    title: "Restoration & Repair",
    description: "Expert restoration services bringing new life to cherished pieces and structures.",
    features: ["Antique Restoration", "Structural Repair", "Finish Restoration", "Custom Repairs"],
    slug: "repair-restoration",
  },
  {
    icon: Leaf,
    title: "Sustainable Crafting",
    description: "Eco-conscious woodworking using reclaimed materials and sustainable practices.",
    features: ["Reclaimed Wood", "Eco-friendly Finishes", "Sustainable Materials", "Green Practices"],
    slug: "outdoor-living",
  },
  {
    icon: Hammer,
    title: "Bespoke Commissions",
    description: "One-of-a-kind pieces designed and crafted specifically for your vision and space.",
    features: ["Custom Design", "Personal Consultation", "Unique Creations", "Lifetime Craftsmanship"],
    slug: "bespoke-commissions",
  },
  {
    icon: Wrench,
    title: "Installation & Service",
    description: "Professional installation and ongoing maintenance to ensure your pieces last generations.",
    features: ["Professional Installation", "Maintenance Services", "Warranty Support", "Care Instructions"],
    slug: "installation-service",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-36 -translate-y-36"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-48 translate-y-48"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Our Craft
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Forged by <span className="text-primary">Tradition</span>,<br />
            Refined by <span className="text-accent">Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Every piece we create carries the strength of Ogun and the precision of master craftsmen. 
            From custom woodwork to metal fabrication, we forge exceptional quality that stands the test of time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="relative">
                  <service.icon className="h-12 w-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent/20 rounded-full group-hover:bg-accent/40 transition-colors duration-300"></div>
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-card-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Link href={`/services/${service.slug}`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
