import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Top 5 Outdoor Living Trends in Florida 2025",
      excerpt:
        "Discover the latest trends in Florida outdoor living spaces, from hurricane-resistant pergolas to sustainable materials that thrive in our climate.",
      image: "/waterfront-deck-with-pergola-overlooking-florida-c.jpg",
      date: "March 15, 2024",
      author: "Mike Johnson",
      category: "Outdoor Living",
      slug: "outdoor-living-trends-florida-2025",
    },
    {
      title: "How to Make Your Home Hurricane-Resilient",
      excerpt:
        "Essential upgrades and construction techniques to protect your Florida home from hurricane damage, including the latest building code requirements.",
      image: "/hurricane-shutters-installed-on-florida-home-windo.jpg",
      date: "March 10, 2024",
      author: "Sarah Martinez",
      category: "Hurricane Protection",
      slug: "hurricane-resilient-home-guide",
    },
    {
      title: "Maintaining Your Deck in Florida's Climate",
      excerpt:
        "Expert tips for keeping your deck beautiful and structurally sound in Florida's humid, sunny environment. Learn about the best materials and maintenance schedules.",
      image: "/professional-carpenter-working-on-custom-woodwork-.jpg",
      date: "March 5, 2024",
      author: "David Chen",
      category: "Maintenance",
      slug: "deck-maintenance-florida-climate",
    },
    {
      title: "Custom Kitchen Cabinets: Design Trends for 2024",
      excerpt:
        "Explore the latest in custom kitchen cabinetry design, from sustainable materials to smart storage solutions perfect for Florida homes.",
      image: "/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg",
      date: "February 28, 2024",
      author: "Lisa Thompson",
      category: "Interior Design",
      slug: "custom-kitchen-cabinet-trends-2024",
    },
    {
      title: "Restoring Historic Florida Homes: Challenges and Solutions",
      excerpt:
        "Navigate the unique challenges of restoring historic properties in Florida, from matching original materials to meeting modern building codes.",
      image: "/restored-historic-florida-home-with-original-archi.jpg",
      date: "February 20, 2024",
      author: "Robert Wilson",
      category: "Restoration",
      slug: "historic-home-restoration-florida",
    },
    {
      title: "Sustainable Carpentry: Eco-Friendly Building in Florida",
      excerpt:
        "Learn about sustainable building practices and eco-friendly materials that work well in Florida's climate while reducing environmental impact.",
      image: "/professional-carpenter-working-on-custom-woodwork-.jpg",
      date: "February 15, 2024",
      author: "Maria Rodriguez",
      category: "Sustainability",
      slug: "sustainable-carpentry-florida",
    },
  ]

  const categories = [
    "All",
    "Outdoor Living",
    "Hurricane Protection",
    "Maintenance",
    "Interior Design",
    "Restoration",
    "Sustainability",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Carpentry Resources & Tips
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Expert advice, industry insights, and practical tips for Florida homeowners. Stay informed about the
              latest trends, maintenance tips, and building techniques.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={blogPosts[0].image || "/placeholder.svg"}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <Badge className="mb-4">{blogPosts[0].category}</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-balance">{blogPosts[0].title}</h3>
                    <p className="text-muted-foreground mb-6 text-pretty">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {blogPosts[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blogPosts[0].date}
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${blogPosts[0].slug}`}>
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.slice(1).map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-lg text-balance">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-pretty">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get the latest carpentry tips, Florida building insights, and project inspiration delivered to your
                inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions about your carpentry project? Our experts are here to help with personalized advice and
              free consultations.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Expert Consultation
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
