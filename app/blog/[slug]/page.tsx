import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

// This would typically come from a CMS or database
const blogPosts = {
  "outdoor-living-trends-florida-2025": {
    title: "Top 5 Outdoor Living Trends in Florida 2025",
    content: `
      <p>Florida's outdoor living spaces are evolving rapidly, driven by our year-round climate and the need for hurricane-resistant construction. Here are the top trends we're seeing in 2025:</p>
      
      <h2>1. Hurricane-Resistant Pergolas</h2>
      <p>Modern pergolas are being engineered to withstand Category 3 hurricanes while maintaining their aesthetic appeal. We're using reinforced aluminum and engineered lumber with hurricane clips and proper anchoring systems.</p>
      
      <h2>2. Multi-Level Deck Systems</h2>
      <p>Homeowners are maximizing their outdoor space with multi-level decks that create distinct zones for dining, lounging, and entertaining. These systems also provide better drainage and flood protection.</p>
      
      <h2>3. Sustainable Materials</h2>
      <p>Composite decking made from recycled materials is becoming the standard, offering durability against Florida's UV rays and humidity while reducing maintenance needs.</p>
      
      <h2>4. Integrated Outdoor Kitchens</h2>
      <p>Full outdoor kitchens with weather-resistant cabinetry, built-in grills, and covered dining areas are increasingly popular, extending the home's living space year-round.</p>
      
      <h2>5. Smart Shade Solutions</h2>
      <p>Retractable awnings, motorized screens, and adjustable pergola roofs allow homeowners to control sun exposure and weather protection with the touch of a button.</p>
    `,
    image: "/waterfront-deck-with-pergola-overlooking-florida-c.jpg",
    date: "March 15, 2024",
    author: "Mike Johnson",
    category: "Outdoor Living",
    readTime: "5 min read",
  },
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Back Navigation */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">{post.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <span>{post.readTime}</span>
              </div>
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Outdoor Space?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our experts help you create the perfect outdoor living area for your Florida home.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
