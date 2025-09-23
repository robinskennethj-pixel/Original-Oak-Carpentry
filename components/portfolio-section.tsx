import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import Link from "next/link"

const portfolioItems = [
  {
    title: "Handcrafted Oak Dining Table",
    category: "Custom Furniture",
    image: "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
    description: "Solid oak dining table with traditional joinery and custom metal hardware",
    slug: "oak-dining-table",
  },
  {
    title: "Forged Iron & Wood Gates",
    category: "Metal Fabrication",
    image: "/elegant-restaurant-interior-with-custom-wooden-fix.jpg",
    description: "Custom entrance gates combining forged iron with reclaimed wood panels",
    slug: "iron-wood-gates",
  },
  {
    title: "Master Craftsman's Workshop",
    category: "Workshop Design",
    image: "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
    description: "Complete workshop renovation with custom storage and workbenches",
    slug: "workshop-renovation",
  },
  {
    title: "Antique Restoration Project",
    category: "Restoration",
    image: "/floor-to-ceiling-custom-wooden-library-with-ladder.jpg",
    description: "Century-old armoire restored to its original glory with period-appropriate techniques",
    slug: "antique-armoire-restoration",
  },
  {
    title: "Custom Metal Railings",
    category: "Architectural Metalwork",
    image: "/coastal-home-with-custom-wooden-hurricane-shutters.jpg",
    description: "Decorative metal railings with traditional forging techniques",
    slug: "metal-railings",
  },
  {
    title: "Reclaimed Wood Feature Wall",
    category: "Sustainable Design",
    image: "/modern-office-with-reclaimed-wood-accent-wall.jpg",
    description: "Feature wall using reclaimed barn wood with custom metal accents",
    slug: "reclaimed-wood-wall",
  },
]

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-40 translate-x-40"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Our Masterpieces
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Forged with <span className="text-primary">Precision</span>,<br />
            Crafted with <span className="text-accent">Passion</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Each piece tells a story of traditional craftsmanship meeting modern innovation. 
            Explore our portfolio of handcrafted furniture, metalwork, and restoration projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="bg-card border-border overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm font-medium text-accent mb-1">{item.category}</div>
                    <div className="text-lg font-bold mb-2">{item.title}</div>
                    <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button asChild size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Link href={`/portfolio/${item.slug}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full">
                      {item.category}
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    <Link href={`/portfolio/${item.slug}`}>
                      View Project
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <Link href="/portfolio">
              View Full Portfolio
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
