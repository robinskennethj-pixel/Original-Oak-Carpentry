import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AIBlogGenerator, AIBlogSEOAssistant } from '@/components/ai-blog-generator'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Tag, Clock, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'Hurricane-Resistant Deck Construction: A Florida Homeowner\'s Guide',
    slug: 'hurricane-resistant-deck-guide',
    excerpt: 'Learn how to build a deck that can withstand Florida\'s hurricane season with proper materials and construction techniques.',
    content: 'Complete guide to hurricane-resistant deck construction...',
    author: 'Original Oak Carpentry',
    date: '2024-01-15',
    category: 'hurricane-prep',
    tags: ['hurricane', 'deck', 'construction', 'florida'],
    readingTime: 8,
    image: '/hurricane-deck-construction.jpg',
    featured: true
  },
  {
    id: '2',
    title: 'Choosing the Right Wood for Florida\'s Climate',
    slug: 'best-wood-florida-climate',
    excerpt: 'Discover the best wood types for outdoor projects in Florida\'s humid, hurricane-prone environment.',
    content: 'Wood selection guide for Florida climate...',
    author: 'Original Oak Carpentry',
    date: '2024-01-10',
    category: 'materials-guide',
    tags: ['wood', 'materials', 'florida', 'climate'],
    readingTime: 6,
    image: '/wood-selection-guide.jpg',
    featured: false
  },
  {
    id: '3',
    title: 'Custom Outdoor Kitchen Design Trends for 2024',
    slug: 'outdoor-kitchen-trends-2024',
    excerpt: 'Explore the latest trends in outdoor kitchen design, from weather-resistant materials to smart cooking technology.',
    content: '2024 outdoor kitchen design trends...',
    author: 'Original Oak Carpentry',
    date: '2024-01-05',
    category: 'outdoor-living',
    tags: ['outdoor kitchen', 'trends', 'design', '2024'],
    readingTime: 10,
    image: '/outdoor-kitchen-trends.jpg',
    featured: false
  }
]

const categories = {
  'carpentry-tips': 'Carpentry Tips',
  'hurricane-prep': 'Hurricane Preparation',
  'outdoor-living': 'Outdoor Living',
  'materials-guide': 'Materials Guide',
  'project-showcase': 'Project Showcase',
  'seasonal-maintenance': 'Seasonal Maintenance',
  'diy-vs-professional': 'DIY vs Professional'
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isSpanish = locale === 'es';

  const content = {
    en: {
      title: 'Blog & Resources',
      subtitle: 'Expert carpentry insights, tips, and industry knowledge',
      description: 'Stay informed with the latest carpentry trends, hurricane preparation tips, and outdoor living ideas from Original Oak Carpentry experts.',
      aiSection: 'AI-Powered Content Creation',
      aiDescription: 'Use our AI blog generator to create engaging content about carpentry, outdoor living, and Florida-specific construction topics.',
      tryGenerator: 'Try AI Blog Generator',
      featuredPost: 'Featured Post',
      recentPosts: 'Recent Posts',
      categories: 'Categories',
      popularTags: 'Popular Tags',
      searchPlaceholder: 'Search blog posts...',
      readMore: 'Read More',
      readingTime: 'min read'
    },
    es: {
      title: 'Blog y Recursos',
      subtitle: 'Conocimientos expertos en carpintería, consejos y tendencias',
      description: 'Manténgase informado con las últimas tendencias en carpintería, consejos de preparación para huracanes e ideas de vida al aire libre de los expertos de Carpintería Oak Original.',
      aiSection: 'Creación de Contenido con IA',
      aiDescription: 'Use nuestro generador de blogs con IA para crear contenido atractivo sobre carpintería, vida al aire libre y temas de construcción específicos de Florida.',
      tryGenerator: 'Probar Generador de Blogs IA',
      featuredPost: 'Publicación Destacada',
      recentPosts: 'Publicaciones Recientes',
      categories: 'Categorías',
      popularTags: 'Etiquetas Populares',
      searchPlaceholder: 'Buscar publicaciones...',
      readMore: 'Leer Más',
      readingTime: 'min de lectura'
    }
  }

  const t = content[locale as keyof typeof content] || content.en

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-secondary/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wood-grain-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full translate-y-40 -translate-x-40"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              {t.subtitle}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* AI Blog Generator Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              AI-Powered
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t.aiSection}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.aiDescription}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <AIBlogGenerator locale={locale} />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {t.featuredPost}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {blogPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readingTime} {t.readingTime}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {categories[post.category as keyof typeof categories]}
                        </Badge>
                        <Button asChild>
                          <Link href={`/blog/${post.slug}`}>
                            {t.readMore}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t.recentPosts}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <Badge variant="secondary" className="mb-2">
                      {categories[post.category as keyof typeof categories]}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime} {t.readingTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.slug}`}>
                        {t.readMore}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI SEO Assistant */}
          <div className="mt-16">
            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  AI SEO Assistant
                </CardTitle>
                <p className="text-muted-foreground">
                  Optimize your blog content for search engines with AI-powered SEO analysis
                </p>
              </CardHeader>
              <CardContent>
                <AIBlogSEOAssistant locale={locale} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories & Tags */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Categories */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t.categories}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(categories).map(([key, value]) => (
                  <Button
                    key={key}
                    variant="outline"
                    className="justify-start"
                    asChild
                  >
                    <Link href={`/blog/category/${key}`}>
                      {value}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t.popularTags}</h3>
              <div className="flex flex-wrap gap-2">
                {['hurricane', 'deck', 'carpentry', 'florida', 'outdoor', 'kitchen', 'pergola', 'maintenance', 'custom', 'restoration'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link href={`/blog/tag/${tag}`}>
                      #{tag}
                    </Link>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}