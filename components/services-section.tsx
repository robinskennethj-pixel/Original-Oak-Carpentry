import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Leaf, Hammer, Shield, Wrench, TreePine } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Home,
    title: "Custom Woodwork",
    description: "Handcrafted furniture and millwork built with traditional techniques and modern precision.",
    features: ["Custom Furniture", "Architectural Millwork", "Cabinetry", "Built-in Solutions"],
    slug: "custom-woodwork",
  },
  {
    icon: TreePine,
    title: "Finish Carpentry",
    description: "Precision finish work that transforms spaces with beautiful wood details and trim.",
    features: ["Door & Window Trim", "Crown Molding", "Baseboards", "Wainscoting"],
    slug: "finish-carpentry",
  },
  {
    icon: Shield,
    title: "Restoration & Repair",
    description: "Expert restoration services bringing new life to cherished wooden pieces and structures.",
    features: ["Antique Restoration", "Structural Repair", "Finish Restoration", "Custom Repairs"],
    slug: "restoration-repair",
  },
  {
    icon: Leaf,
    title: "Sustainable Crafting",
    description: "Eco-conscious woodworking using reclaimed materials and sustainable practices.",
    features: ["Reclaimed Wood Projects", "Eco-friendly Finishes", "Sustainable Materials", "Green Practices"],
    slug: "sustainable-crafting",
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

export function ServicesSection({ locale = 'en' }: { locale?: string }) {
  const isSpanish = locale === 'es';

  const translations = {
    title: isSpanish ? 'Nuestros Servicios' : 'Our Services',
    subtitle: isSpanish
      ? 'Cada pieza que creamos lleva la fuerza del roble y la precisión de maestros artesanos.'
      : 'Each piece we create carries the strength of oak and the precision of master craftsmen.',
    description: isSpanish
      ? 'Desde trabajos de carpintería personalizados hasta restauraciones expertas, forjamos calidad excepcional que resiste la prueba del tiempo.'
      : 'From custom woodworking to expert restorations, we forge exceptional quality that stands the test of time.',
    learnMore: isSpanish ? 'Saber Más' : 'Learn More'
  };

  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-36 -translate-y-36"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-48 translate-y-48"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            {translations.title}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Built with <span className="text-primary">Tradition</span>,<br/>
            Refined by <span className="text-accent">Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {translations.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-card border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardHeader className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 pb-4">
                <div className="relative">
                  <service.icon className="h-12 w-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent/20 rounded-full group-hover:bg-accent/40 transition-colors duration-300"></div>
                </div>
                <CardTitle className="font-semibold text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-card-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Link href={`/services/${service.slug}`}>
                    {translations.learnMore}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}