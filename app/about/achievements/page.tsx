import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Users, Calendar, MapPin, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AchievementsPage() {
  const achievements = [
    {
      icon: Users,
      number: "500+",
      title: "Projects Completed",
      description: "Successfully delivered projects across Florida",
      details: [
        "Residential renovations and custom builds",
        "Commercial build-outs and office spaces", 
        "Historic restoration projects",
        "Hurricane damage repairs and upgrades",
        "Custom furniture and millwork pieces",
        "Outdoor living spaces and decks"
      ],
      highlights: [
        "Average project completion time: 15% faster than industry standard",
        "Zero major safety incidents in 15+ years",
        "95% of projects completed on or ahead of schedule"
      ]
    },
    {
      icon: Star,
      number: "98%",
      title: "Customer Satisfaction",
      description: "Consistently high ratings from our clients",
      details: [
        "5-star Google Reviews average",
        "Better Business Bureau A+ rating",
        "Angie's List Super Service Award recipient",
        "HomeAdvisor Top Rated Professional",
        "Houzz Customer Service Award winner",
        "Referral rate of 85% from existing clients"
      ],
      highlights: [
        "Average review score: 4.9/5 stars",
        "Response time to customer inquiries: Under 2 hours",
        "Warranty claim rate: Less than 1%"
      ]
    },
    {
      icon: Calendar,
      number: "15+",
      title: "Years Experience",
      description: "Decades of expertise in Florida carpentry",
      details: [
        "Founded in 2009 by master craftsman",
        "Survived multiple economic cycles",
        "Adapted to changing building codes and standards",
        "Continuous education and certification updates",
        "Mentored dozens of apprentice carpenters",
        "Built lasting relationships with suppliers"
      ],
      highlights: [
        "Licensed and insured since day one",
        "Member of Florida Carpenters Union",
        "Certified in hurricane-resistant construction"
      ]
    },
    {
      icon: MapPin,
      number: "50+",
      title: "Counties Served",
      description: "Statewide coverage across Florida",
      details: [
        "Central Florida (Orlando, Tampa, Lakeland)",
        "South Florida (Miami, Fort Lauderdale, West Palm Beach)",
        "North Florida (Jacksonville, Gainesville, Tallahassee)",
        "Southwest Florida (Naples, Fort Myers, Sarasota)",
        "Space Coast (Melbourne, Cocoa Beach, Titusville)",
        "Florida Keys (Key Largo, Islamorada, Key West)"
      ],
      highlights: [
        "Travel radius: Up to 200 miles from Orlando",
        "Local partnerships in major metropolitan areas",
        "Understanding of regional building requirements"
      ]
    }
  ]

  const awards = [
    {
      year: "2024",
      title: "Excellence in Craftsmanship Award",
      organization: "Florida Builders Association",
      category: "Custom Millwork"
    },
    {
      year: "2023",
      title: "Best Restoration Project",
      organization: "Historic Preservation Society of Florida",
      category: "Residential Restoration"
    },
    {
      year: "2022",
      title: "Contractor of the Year",
      organization: "Central Florida Home & Garden Show",
      category: "Specialty Carpentry"
    },
    {
      year: "2021",
      title: "Innovation in Sustainable Building",
      organization: "Green Building Council of Florida",
      category: "Eco-Friendly Practices"
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
            <Link href="/about" className="text-primary font-medium">
              About
            </Link>
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">
              Portfolio
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
            <Link href="/portfolio">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Our Achievements</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Fifteen years of excellence in Florida carpentry, backed by hundreds of satisfied clients 
            and recognition from industry leaders.
          </p>
        </div>
      </section>

      {/* Achievement Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="bg-primary text-primary-foreground p-8 flex flex-col justify-center items-center text-center">
                    <achievement.icon className="h-12 w-12 mb-4" />
                    <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                    <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-primary-foreground/80">{achievement.description}</p>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">Details</h4>
                        <ul className="space-y-2">
                          {achievement.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <TrendingUp className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4 text-lg">Key Highlights</h4>
                        <ul className="space-y-2">
                          {achievement.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Award className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Awards & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry organizations and clients alike.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{award.year}</Badge>
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{award.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{award.organization}</p>
                  <Badge variant="outline">{award.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Success Story</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Become part of our growing list of satisfied clients and experience the quality that has earned us recognition across Florida.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

