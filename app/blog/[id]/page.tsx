"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const blogPosts = [
  {
    id: "1",
    title: "Essential Hurricane-Resistant Carpentry Techniques for Florida Homes",
    excerpt: "Learn the critical construction methods that protect your home from hurricane-force winds and flooding.",
    content: `
      <h2>Understanding Florida's Hurricane Challenges</h2>
      <p>Florida's hurricane season, which runs from June through November, presents unique challenges for homeowners and builders alike. The combination of high winds, heavy rainfall, and potential flooding requires specialized carpentry techniques that go beyond standard construction methods.</p>
      
      <h2>Key Hurricane-Resistant Techniques</h2>
      
      <h3>1. Reinforced Framing</h3>
      <p>Traditional stick framing may not be sufficient for hurricane-prone areas. We recommend:</p>
      <ul>
        <li>Using hurricane clips and straps to connect roof trusses to wall plates</li>
        <li>Installing continuous load paths from roof to foundation</li>
        <li>Adding extra blocking between studs for increased rigidity</li>
        <li>Using engineered lumber for critical structural elements</li>
      </ul>
      
      <h3>2. Impact-Resistant Windows and Doors</h3>
      <p>Windows and doors are often the weakest points in a home's hurricane defense. Our approach includes:</p>
      <ul>
        <li>Installing impact-resistant windows rated for your area's wind speeds</li>
        <li>Using reinforced door frames with multiple anchor points</li>
        <li>Adding storm shutters as an additional layer of protection</li>
        <li>Ensuring proper flashing and sealing around all openings</li>
      </ul>
      
      <h3>3. Roof System Enhancements</h3>
      <p>The roof system is critical for hurricane resistance:</p>
      <ul>
        <li>Using 6-nail patterns instead of standard 4-nail for shingle installation</li>
        <li>Installing self-adhering underlayment for better water protection</li>
        <li>Adding hurricane straps at 24" on center</li>
        <li>Using ring-shank nails for better holding power</li>
      </ul>
      
      <h2>Material Selection for Hurricane Resistance</h2>
      <p>Choosing the right materials is crucial for hurricane-resistant construction:</p>
      
      <h3>Pressure-Treated Lumber</h3>
      <p>In Florida's humid climate, pressure-treated lumber is essential for:</p>
      <ul>
        <li>Sill plates and bottom plates</li>
        <li>Any framing members within 6 inches of grade</li>
        <li>Deck and porch construction</li>
        <li>Outdoor structures and fencing</li>
      </ul>
      
      <h3>Engineered Wood Products</h3>
      <p>Engineered lumber offers superior strength and consistency:</p>
      <ul>
        <li>Laminated veneer lumber (LVL) for beams and headers</li>
        <li>I-joists for floor systems</li>
        <li>Engineered roof trusses designed for high wind loads</li>
      </ul>
      
      <h2>Installation Best Practices</h2>
      
      <h3>Foundation Connections</h3>
      <p>Proper foundation connections are critical:</p>
      <ul>
        <li>Use anchor bolts at maximum 6-foot spacing</li>
        <li>Install hold-down anchors at corners and wall intersections</li>
        <li>Ensure proper embedment depth for all anchors</li>
        <li>Use corrosion-resistant hardware in coastal areas</li>
      </ul>
      
      <h3>Wall-to-Roof Connections</h3>
      <p>The connection between walls and roof is often where failures occur:</p>
      <ul>
        <li>Install hurricane ties at every rafter or truss</li>
        <li>Use continuous tie-down rods where possible</li>
        <li>Ensure proper nailing patterns for all connections</li>
        <li>Add blocking to distribute loads effectively</li>
      </ul>
      
      <h2>Code Compliance and Permits</h2>
      <p>Florida has some of the strictest building codes in the nation, and for good reason. Always ensure:</p>
      <ul>
        <li>All work complies with the Florida Building Code</li>
        <li>Proper permits are obtained before starting work</li>
        <li>Inspections are scheduled at required intervals</li>
        <li>Documentation is maintained for insurance purposes</li>
      </ul>
      
      <h2>Maintenance and Inspection</h2>
      <p>Regular maintenance is key to maintaining hurricane resistance:</p>
      <ul>
        <li>Annual inspection of all hurricane hardware</li>
        <li>Regular caulking and sealing of penetrations</li>
        <li>Prompt repair of any damage or deterioration</li>
        <li>Professional inspection after any significant weather event</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Hurricane-resistant carpentry is not just about following building codes—it's about protecting your family and your investment. At Original Oak Carpentry, we have decades of experience building homes that can withstand Florida's most severe weather. Our team stays current with the latest techniques and materials to ensure your home is as safe and secure as possible.</p>
      
      <p>If you're planning a new construction project or need to upgrade your existing home's hurricane resistance, contact us for a consultation. We'll assess your specific needs and recommend the best solutions for your situation and budget.</p>
    `,
    author: "Master Carpenter John Smith",
    publishedDate: "2024-11-15",
    readTime: "8 min read",
    category: "Hurricane Preparation",
    tags: ["hurricane", "safety", "construction", "florida"],
    image: "/hurricane-shutters-installed-on-florida-home-windo.jpg"
  },
  {
    id: "2",
    title: "Sustainable Wood Choices for Florida's Climate",
    excerpt: "Discover eco-friendly wood options that thrive in Florida's humid subtropical environment.",
    content: `
      <h2>The Importance of Sustainable Wood Selection in Florida</h2>
      <p>Florida's unique climate presents both opportunities and challenges for sustainable wood use. The high humidity, frequent rainfall, and intense UV exposure require careful consideration when selecting wood materials that will be both environmentally responsible and long-lasting.</p>
      
      <h2>Climate Considerations</h2>
      <p>Florida's subtropical climate is characterized by:</p>
      <ul>
        <li>High humidity levels year-round (often 70-90%)</li>
        <li>Frequent rainfall, especially during summer months</li>
        <li>Intense UV radiation</li>
        <li>Salt air exposure in coastal areas</li>
        <li>Temperature fluctuations between seasons</li>
      </ul>
      
      <h2>Top Sustainable Wood Choices for Florida</h2>
      
      <h3>1. Southern Yellow Pine (Local)</h3>
      <p>Advantages:</p>
      <ul>
        <li>Locally sourced, reducing transportation impact</li>
        <li>Fast-growing, renewable resource</li>
        <li>Takes pressure treatment well</li>
        <li>Cost-effective option</li>
      </ul>
      <p>Best uses: Framing, decking (when treated), outdoor structures</p>
      
      <h3>2. Cypress</h3>
      <p>Advantages:</p>
      <ul>
        <li>Naturally rot and insect resistant</li>
        <li>Native to Florida wetlands</li>
        <li>Beautiful grain patterns</li>
        <li>Excellent for high-moisture applications</li>
      </ul>
      <p>Best uses: Outdoor furniture, siding, trim, dock construction</p>
      
      <h3>3. Reclaimed Wood</h3>
      <p>Advantages:</p>
      <ul>
        <li>Prevents waste and deforestation</li>
        <li>Often higher quality than new lumber</li>
        <li>Unique character and history</li>
        <li>Already seasoned and stable</li>
      </ul>
      <p>Best uses: Interior finishes, furniture, accent walls, beams</p>
      
      <h3>4. Bamboo</h3>
      <p>Advantages:</p>
      <ul>
        <li>Rapidly renewable (3-5 years vs 25-50 for trees)</li>
        <li>Stronger than many hardwoods</li>
        <li>Naturally antimicrobial</li>
        <li>Excellent dimensional stability</li>
      </ul>
      <p>Best uses: Flooring, cabinetry, countertops</p>
      
      <h3>5. FSC-Certified Tropical Hardwoods</h3>
      <p>When tropical hardwoods are necessary:</p>
      <ul>
        <li>Choose Forest Stewardship Council (FSC) certified options</li>
        <li>Ipe, Mahogany, and Teak from sustainable sources</li>
        <li>Excellent durability in marine environments</li>
        <li>Natural resistance to decay and insects</li>
      </ul>
      <p>Best uses: Marine applications, high-end outdoor furniture, decking</p>
      
      <h2>Wood Treatment and Preservation</h2>
      
      <h3>Natural Preservation Methods</h3>
      <ul>
        <li>Proper kiln drying to reduce moisture content</li>
        <li>Natural oil finishes (tung oil, linseed oil)</li>
        <li>Borate treatments for insect protection</li>
        <li>Heat treatment for dimensional stability</li>
      </ul>
      
      <h3>Eco-Friendly Pressure Treatments</h3>
      <ul>
        <li>Alkaline Copper Quaternary (ACQ)</li>
        <li>Copper Azole (CA-B)</li>
        <li>Micronized Copper Azole (MCA)</li>
      </ul>
      
      <h2>Design Strategies for Longevity</h2>
      
      <h3>Moisture Management</h3>
      <ul>
        <li>Proper ventilation in all wood structures</li>
        <li>Adequate drainage around foundations</li>
        <li>Vapor barriers where appropriate</li>
        <li>Regular maintenance schedules</li>
      </ul>
      
      <h3>UV Protection</h3>
      <ul>
        <li>Overhangs and covered areas</li>
        <li>UV-resistant finishes</li>
        <li>Strategic placement away from direct sun</li>
        <li>Regular refinishing schedules</li>
      </ul>
      
      <h2>Certification Programs to Look For</h2>
      
      <h3>Forest Stewardship Council (FSC)</h3>
      <p>The gold standard for sustainable forestry, ensuring:</p>
      <ul>
        <li>Responsible forest management</li>
        <li>Protection of wildlife habitats</li>
        <li>Respect for indigenous rights</li>
        <li>Economic viability for local communities</li>
      </ul>
      
      <h3>Sustainable Forestry Initiative (SFI)</h3>
      <p>North American program focusing on:</p>
      <ul>
        <li>Sustainable forest management</li>
        <li>Protection of water quality</li>
        <li>Wildlife habitat conservation</li>
        <li>Responsible procurement practices</li>
      </ul>
      
      <h2>Cost Considerations</h2>
      <p>While sustainable wood options may have higher upfront costs, consider:</p>
      <ul>
        <li>Longer lifespan reduces replacement costs</li>
        <li>Lower maintenance requirements</li>
        <li>Potential tax incentives for green building</li>
        <li>Increased property value</li>
        <li>Reduced environmental impact costs</li>
      </ul>
      
      <h2>Local Suppliers and Resources</h2>
      <p>Florida has several excellent sources for sustainable wood:</p>
      <ul>
        <li>Local sawmills specializing in native species</li>
        <li>Reclaimed wood dealers</li>
        <li>FSC-certified lumber yards</li>
        <li>Bamboo specialty suppliers</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Choosing sustainable wood for Florida's climate requires balancing environmental responsibility with practical performance needs. By selecting appropriate species, using proper treatment methods, and implementing smart design strategies, you can create beautiful, durable projects that respect both your budget and the environment.</p>
      
      <p>At Original Oak Carpentry, we're committed to helping our clients make informed decisions about sustainable wood choices. Our team can guide you through the selection process and ensure your project meets both your aesthetic goals and environmental values.</p>
    `,
    author: "Environmental Specialist Sarah Johnson",
    publishedDate: "2024-11-10",
    readTime: "6 min read",
    category: "Sustainability",
    tags: ["sustainability", "wood", "climate", "eco-friendly"],
    image: "/professional-carpenter-working-on-custom-woodwork-.jpg"
  }
  // Add more blog posts as needed
]

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id)
  
  if (!post) {
    notFound()
  }

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleDownloadPDF = () => {
    // Create a simple PDF content
    const pdfContent = `
Original Oak Carpentry Blog Post

${post.title}

Author: ${post.author}
Published: ${new Date(post.publishedDate).toLocaleDateString()}
Category: ${post.category}

${post.excerpt}

${post.content.replace(/<[^>]*>/g, '')} // Strip HTML tags for plain text

---
© Original Oak Carpentry - Professional Carpentry Services
Visit us at: https://originaloakcarpentry.com
    `

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button onClick={handleDownloadPDF} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/ORIGINAL OAK CARPENTRY - HERO-IMAGE.png"
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{post.author}</h3>
                    <p className="text-muted-foreground mb-4">
                      Expert craftsman with over 15 years of experience in Florida's unique construction environment. 
                      Specializing in hurricane-resistant techniques and sustainable building practices.
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">More Articles</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative h-32">
                    <Image
                      src="/ORIGINAL OAK CARPENTRY - HERO-IMAGE.png"
                      alt={relatedPost.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{relatedPost.category}</Badge>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={`/blog/${relatedPost.id}`}>
                        Read More
                      </Link>
                    </Button>
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
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Want More Expert Tips?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for weekly carpentry insights and project ideas
            </p>
            <Button size="lg" asChild>
              <Link href="/#newsletter">
                Subscribe Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
