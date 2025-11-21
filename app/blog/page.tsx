import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, BookOpen, Hammer, TreeDeciduous, ShieldCheck, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Essential Hurricane-Resistant Carpentry Techniques for Florida Homes",
    excerpt: "Learn the critical construction methods that protect your home from hurricane-force winds and flooding.",
    content: "Florida's hurricane season demands special attention to carpentry techniques that can withstand extreme weather conditions...",
    author: "Master Carpenter John Smith",
    publishedDate: "2024-11-15",
    readTime: "8 min read",
    category: "Hurricane Preparation",
    tags: ["hurricane", "safety", "construction", "florida"],
    image: "/hurricane-shutters-installed-on-florida-home-windo.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Sustainable Wood Choices for Florida's Climate",
    excerpt: "Discover eco-friendly wood options that thrive in Florida's humid subtropical environment.",
    content: "Choosing the right wood for Florida's unique climate is crucial for both sustainability and longevity...",
    author: "Environmental Specialist Sarah Johnson",
    publishedDate: "2024-11-10",
    readTime: "6 min read",
    category: "Sustainability",
    tags: ["sustainability", "wood", "climate", "eco-friendly"],
    image: "/professional-carpenter-working-on-custom-woodwork-.jpg",
    featured: false
  },
  {
    id: 3,
    title: "Custom Kitchen Cabinet Installation: A Step-by-Step Guide",
    excerpt: "Professional tips for installing custom kitchen cabinets that will last for decades.",
    content: "Installing custom kitchen cabinets requires precision, patience, and the right techniques...",
    author: "Kitchen Specialist Mike Rodriguez",
    publishedDate: "2024-11-05",
    readTime: "12 min read",
    category: "Kitchen Renovation",
    tags: ["kitchen", "cabinets", "installation", "diy"],
    image: "/luxury-kitchen-with-custom-cabinets-and-granite-co.jpg",
    featured: false
  },
  {
    id: 4,
    title: "Outdoor Living Spaces: Maximizing Florida's Year-Round Weather",
    excerpt: "Create stunning outdoor spaces that take advantage of Florida's beautiful climate.",
    content: "Florida's warm climate makes it perfect for outdoor living spaces that can be enjoyed year-round...",
    author: "Outdoor Specialist Lisa Chen",
    publishedDate: "2024-10-28",
    readTime: "10 min read",
    category: "Outdoor Living",
    tags: ["outdoor", "deck", "patio", "florida"],
    image: "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Wood Restoration: Bringing Historic Florida Homes Back to Life",
    excerpt: "Techniques for restoring and preserving the wooden elements of Florida's historic homes.",
    content: "Florida's historic homes contain beautiful wooden elements that require special care and restoration techniques...",
    author: "Restoration Expert David Wilson",
    publishedDate: "2024-10-20",
    readTime: "15 min read",
    category: "Restoration",
    tags: ["restoration", "historic", "preservation", "florida"],
    image: "/restored-historic-florida-home-with-original-archi.jpg",
    featured: false
  },
  {
    id: 6,
    title: "The Art of Custom Millwork: Creating Unique Architectural Details",
    excerpt: "Explore the craftsmanship behind custom millwork and how it transforms ordinary spaces.",
    content: "Custom millwork is where artistry meets functionality, creating unique architectural details...",
    author: "Master Craftsman Robert Taylor",
    publishedDate: "2024-10-15",
    readTime: "9 min read",
    category: "Custom Millwork",
    tags: ["millwork", "custom", "craftsmanship", "details"],
    image: "/modern-office-reception-area-with-custom-millwork.jpg",
    featured: false
  }
]

const categories = [
  { name: "All Posts", count: blogPosts.length, icon: BookOpen },
  { name: "Hurricane Preparation", count: 1, icon: ShieldCheck },
  { name: "Sustainability", count: 1, icon: TreeDeciduous },
  { name: "Kitchen Renovation", count: 1, icon: Hammer },
  { name: "Outdoor Living", count: 1, icon: TreeDeciduous },
  { name: "Restoration", count: 1, icon: Sparkles },
  { name: "Custom Millwork", count: 1, icon: Hammer }
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Original Oak Carpentry Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Expert insights, tips, and guides from Florida's premier carpentry professionals
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.slice(0, 4).map((category) => (
                <Badge key={category.name} variant="secondary" className="px-4 py-2">
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Featured Article</h2>
              <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src="/ORIGINAL OAK CARPENTRY - HERO-IMAGE.png"
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.publishedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{featuredPost.author}</span>
                      </div>
                      <Button asChild>
                        <Link href={`/blog/${featuredPost.id}`}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src="/ORIGINAL OAK CARPENTRY - HERO-IMAGE.png"
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest carpentry tips, project ideas, and exclusive content delivered to your inbox
            </p>
            <Button size="lg" asChild>
              <Link href="/#newsletter">
                Subscribe to Newsletter <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}