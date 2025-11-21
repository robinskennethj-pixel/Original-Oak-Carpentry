import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { AboutSection } from '@/components/about-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { AIChatbot } from '@/components/ai-chatbot'
import { AICostEstimatorWidget } from '@/components/ai-cost-estimator'
import { InteractiveProjectEstimator } from '@/components/interactive-project-estimator'
import VoiceChat from '@/components/VoiceChat'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Bot, Zap, Eye, Users, Cloud, Play, Filter, MessageCircle, Award, Leaf, BookOpen, Mail, BarChart3, Trophy, AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'
import { NewsletterSection } from '@/components/newsletter-section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Interactive Project Estimator - Prominently Featured */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get an Instant AI Estimate
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Use our AI-powered estimator to get an accurate cost range for your project in seconds
            </p>
          </div>
          <InteractiveProjectEstimator />
        </div>
      </section>

      <ServicesSection />

      {/* AI Tools Section - Enhanced with New Features */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Smart AI Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Harness the power of artificial intelligence to plan your project with precision
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            <AICostEstimatorWidget />

            <Card className="border-2 border-secondary shadow-lg">
              <CardHeader className="bg-secondary/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Chat with our AI assistant for instant answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get instant answers about services, pricing, and availability
                </p>
                <p className="text-sm text-muted-foreground">
                  💡 Tip: The AI assistant appears in the bottom-right corner of your screen
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent shadow-lg">
              <CardHeader className="bg-accent/5">
                <CardTitle className="text-xl flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Voice Chat Assistant
                </CardTitle>
                <CardDescription>
                  Talk directly with our AI using voice commands
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Use voice commands to get instant project estimates and answers
                </p>
                <div className="flex justify-center">
                  <VoiceChat agent="support" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional AI Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Virtual Project Visualization */}
            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Virtual Project Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  See before/after comparisons and 3D previews of your project
                </p>
                <Button asChild variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  <Link href="/virtual-gallery">View Visualizations</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Client Portal */}
            <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Client Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Track project status, download invoices, and manage your account
                </p>
                <Button asChild variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  <Link href="/client-portal">Access Portal</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Weather & Storm Alerts */}
            <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-orange-600" />
                  Weather & Storm Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Real-time hurricane alerts and storm preparation tips
                </p>
                <Button asChild variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                  <Link href="/weather-alerts">View Weather Alerts</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Interactive Portfolio */}
            <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-600" />
                  Interactive Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Filter projects by type with AI-powered categorization
                </p>
                <Button asChild variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                  <Link href="/portfolio">Browse Portfolio</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Video & Tutorials */}
            <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-red-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Play className="h-5 w-5 text-red-600" />
                  Video & Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Watch craftsmanship demonstrations and maintenance tips
                </p>
                <Button asChild variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  <Link href="/videos">Watch Videos</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Sustainability Focus */}
            <Card className="border-2 border-emerald-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Sustainable Crafting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Eco-friendly materials and sustainable practices
                </p>
                <Button asChild variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  <Link href="/services/sustainable-crafting">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Virtual Project Visualization Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Virtual Project Visualization
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See your project come to life before we even start building
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Before & After Gallery</h3>
              <p className="text-muted-foreground mb-6">
                Explore our completed projects with interactive before/after comparisons.
                See the transformation and quality of our craftsmanship.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>Interactive before/after sliders</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>3D model previews</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <span>AR visualization for mobile devices</span>
                </div>
              </div>
              <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
                <Link href="/virtual-gallery">View Virtual Gallery</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 border-2 border-blue-200">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Eye className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Visualization</p>
                    <p className="text-sm text-gray-500">Click and drag to compare before/after</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Sample: Hurricane-Resistant Deck</h4>
                  <p className="text-sm text-muted-foreground">
                    See how we transformed this outdoor space with premium materials and storm-resistant construction.
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Before: Weathered wood</span>
                    <span className="text-blue-600">After: Premium composite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Portal & Loyalty Program Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Client Portal & Loyalty Program
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional project management and rewards for our valued clients
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-2 border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Client Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Track project status in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Download invoices and receipts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Approve designs and submit feedback</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Access project photos and updates</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/client-portal">Access Client Portal</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  Loyalty & Referral Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Earn points for every project</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Get discounts for referrals</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Priority scheduling for members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Exclusive member benefits</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Join Loyalty Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weather & Storm Alerts Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Weather & Storm Alerts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time hurricane alerts and storm preparation for Florida homeowners
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Current Weather Status</h3>
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Central Florida</p>
                      <p className="text-2xl font-bold">Partly Cloudy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">75°F</p>
                    <p className="text-sm text-muted-foreground">Humidity: 65%</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Hurricane Season Alert</span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Hurricane season is active. Consider storm-resistant upgrades for your home.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Storm Preparation Tips</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                  <h4 className="font-semibold mb-2">Hurricane-Resistant Decking</h4>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to composite materials and reinforced framing for maximum storm protection.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">Window & Door Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Install hurricane shutters or impact-resistant windows and doors.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2">Regular Maintenance</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule annual inspections to ensure your home is storm-ready.
                  </p>
                </div>
              </div>

              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                <Link href="/weather-alerts">View Weather Alerts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portfolio & Video Content */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Interactive Portfolio & Video Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our craftsmanship through interactive galleries and educational videos
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Interactive Portfolio */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Filter className="h-6 w-6 text-purple-600" />
                Interactive Portfolio
              </h3>
              <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-200">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button variant="outline" size="sm" className="border-purple-600 text-purple-600">
                      All Projects
                    </Button>
                    <Button variant="outline" size="sm">
                      Decks
                    </Button>
                    <Button variant="outline" size="sm">
                      Cabinets
                    </Button>
                    <Button variant="outline" size="sm">
                      Trim Work
                    </Button>
                    <Button variant="outline" size="sm">
                      Hurricane-Resistant
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Filter className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Custom Deck</p>
                      <p className="text-xs text-muted-foreground">Orlando, FL</p>
                    </div>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Home className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm font-medium">Kitchen Cabinets</p>
                      <p className="text-xs text-muted-foreground">Tampa, FL</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  <Link href="/portfolio">Browse Portfolio</Link>
                </Button>
              </div>
            </div>

            {/* Video & Tutorial Content */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Play className="h-6 w-6 text-pink-600" />
                Video & Tutorial Content
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold">How We Hurricane-Proof a Deck</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn about our specialized techniques for creating storm-resistant outdoor spaces.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>12 min</span>
                    <span>•</span>
                    <span>2.3k views</span>
                    <span>•</span>
                    <span>Hurricane Prep</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold">Maintaining Wooden Cabinets in Florida Humidity</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Expert tips for keeping your wooden cabinets beautiful in Florida's humid climate.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>8 min</span>
                    <span>•</span>
                    <span>1.8k views</span>
                    <span>•</span>
                    <span>Maintenance</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="h-5 w-5 text-pink-600" />
                    <h4 className="font-semibold">Crown Molding Installation Tips</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Professional techniques for perfect crown molding installation.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>15 min</span>
                    <span>•</span>
                    <span>3.1k views</span>
                    <span>•</span>
                    <span>Installation</span>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                <Link href="/videos">Watch Videos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Case Studies */}
      <TestimonialsSection />

      {/* Sustainability & Awards */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Sustainability & Recognition
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Committed to excellence and environmental responsibility
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Sustainability Focus */}
            <Card className="border-2 border-emerald-200 shadow-lg">
              <CardHeader className="bg-emerald-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Sustainable Crafting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Reclaimed wood projects</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Eco-friendly finishes and sealants</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Sustainable sourcing practices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Waste reduction and recycling</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  We're committed to environmentally responsible carpentry practices that protect Florida's natural beauty.
                </p>
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/services/sustainable-crafting">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Awards & Certifications */}
            <Card className="border-2 border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-50">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Awards & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Florida Licensed</p>
                    <p className="text-xs text-muted-foreground">Contractor #CBC123456</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">BBB A+ Rating</p>
                    <p className="text-xs text-muted-foreground">Accredited Business</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">98% Satisfaction</p>
                    <p className="text-xs text-muted-foreground">Client Reviews</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Best of Orlando</p>
                    <p className="text-xs text-muted-foreground">2023 Winner</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recognized for excellence in craftsmanship and customer service throughout Central Florida.
                </p>
                <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Link href="/certifications">View All Certifications</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog & Education Hub */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Blog & Education Hub
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights and tips for Florida homeowners
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Top 5 Deck Materials for Florida's Climate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn which materials perform best in Florida's humid climate and hurricane conditions.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>AI-Generated Content</span>
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  How to Protect Your Home from Storm Damage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Essential tips for Florida homeowners to prepare for hurricane season.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Expert Guide</span>
                  <span>8 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Maintaining Wooden Cabinets in Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Professional tips for keeping your wooden cabinets beautiful in Florida's humid climate.
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Maintenance Guide</span>
                  <span>6 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/blog">
                <BookOpen className="mr-2 h-4 w-4" />
                Visit Our Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <NewsletterSection />

      {/* Interactive Cost/Material Comparison Tool */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Interactive Cost & Material Comparison
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare materials side-by-side to make informed decisions
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 border-2 border-gray-200">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Material Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Select Materials</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Pressure-Treated Pine', cost: 1.0, durability: 7, maintenance: 8 },
                    { name: 'Cedar', cost: 1.4, durability: 8, maintenance: 6 },
                    { name: 'Composite', cost: 2.2, durability: 9, maintenance: 2 },
                    { name: 'Premium Hardwood', cost: 2.8, durability: 10, maintenance: 4 }
                  ].map((material, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{material.name}</span>
                        <span className="text-sm text-muted-foreground">{(material.cost * 100).toFixed(0)}% of base cost</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Durability:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${material.durability * 10}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Maintenance:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(10 - material.maintenance) * 10}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Value:</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${material.durability * 10}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Material Comparison</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Comparison Chart</p>
                    <p className="text-sm text-gray-500">Visual comparison of cost vs. longevity vs. maintenance</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Select materials above to see detailed comparison
                  </p>
                </div>
              </div>

              {/* Cost Calculator */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Cost Calculator</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Project Size (sq ft)</Label>
                    <Input type="number" placeholder="Enter size" className="mt-1" />
                  </div>
                  <div>
                    <Label>Complexity Level</Label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md">
                      <option>Simple</option>
                      <option>Standard</option>
                      <option>Complex</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Estimated Cost Range</h4>
                    <div className="text-2xl font-bold text-blue-600">$2,500 - $4,200</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on selected materials and project parameters
                    </p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Get Detailed Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <AIChatbot />
    </div>
  )
}