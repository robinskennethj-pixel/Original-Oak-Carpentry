import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Marcus Williams",
    role: "Antique Collector",
    content:
      "Ogun Carpentry restored my great-grandfather's armoire to perfection. The traditional techniques they used brought it back to life better than I ever imagined.",
    rating: 5,
    image: "/satisfied-homeowner.jpg",
  },
  {
    name: "Aisha Johnson",
    role: "Restaurant Owner",
    content:
      "The custom metal gates they forged for our restaurant entrance are absolutely stunning. Every detail shows the master craftsman's touch.",
    rating: 5,
    image: "/happy-homeowner-woman.jpg",
  },
  {
    name: "James Rodriguez",
    role: "Interior Designer",
    content:
      "Working with Ogun Carpentry is like collaborating with artists. Their ability to translate vision into reality is truly remarkable.",
    rating: 5,
    image: "/business-owner.png",
  },
  {
    name: "Dr. Patricia Thompson",
    role: "Historic Home Owner",
    content:
      "They restored our 1920s home's original woodwork using period-appropriate techniques. The craftsmanship is museum-quality.",
    rating: 5,
    image: "/homeowner-historic-house.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full translate-x-40 translate-y-40"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            Client Stories
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Forged in <span className="text-primary">Trust</span>,<br />
            Built on <span className="text-accent">Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our clients' satisfaction is the true measure of our craft. Hear from those who have experienced 
            the Ogun Carpentry difference firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
                </div>
                <blockquote className="text-card-foreground mb-6 text-sm leading-relaxed relative">
                  <span className="text-2xl text-primary/20 absolute -top-2 -left-2">"</span>
                  {testimonial.content}
                  <span className="text-2xl text-primary/20 absolute -bottom-4 -right-2">"</span>
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
