"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { GoogleSignIn } from "@/components/ui/google-sign-in"
import { Label } from "@/components/ui/label"
import { Users, FileText, Calendar, MessageSquare, Download, ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            <span className="text-primary">Original Oak</span> Carpentry
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Client Portal</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Track your project status, download invoices, and manage your account all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-green-50 text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Client Login
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-password">Password</Label>
                    <PasswordInput
                      id="client-password"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Access Portal
                  </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Sign-In */}
                  <GoogleSignIn
                    onSuccess={(user) => {
                      console.log('Client Google sign-in successful:', user)
                      // Handle successful Google sign-in for client portal
                    }}
                    onError={(error) => {
                      console.error('Client Google sign-in error:', error)
                    }}
                    className="w-full"
                  />

                  <div className="text-center">
                    <Link href="/contact" className="text-sm text-green-600 hover:underline">
                      Need access? Contact us
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portal Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Once logged in, you'll have access to all these powerful project management tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Project Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time updates on your project progress with detailed timeline and milestones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                  Documents & Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Download contracts, invoices, receipts, and project documentation anytime.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Schedule Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View upcoming appointments, reschedule visits, and track project timeline.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  Communication Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Direct messaging with your project team, photo sharing, and feedback submission.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Dashboard */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dashboard Preview</h2>
            <p className="text-muted-foreground">Here's what your project dashboard will look like</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Current Project: Custom Kitchen Renovation</h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Completed
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Design approval</li>
                    <li>• Material ordering</li>
                    <li>• Cabinet installation</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    In Progress
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Countertop installation</li>
                    <li>• Electrical work</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    Upcoming
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Final inspection</li>
                    <li>• Touch-up work</li>
                    <li>• Project completion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us to begin your project and get access to your personal client portal.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
