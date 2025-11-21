"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BookOpen, Mail, Download, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleDownloadGuide = () => {
    // Trigger download of the free guide
    window.open('/api/download-guide', '_blank')
  }

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    setSubscriptionStatus('idle')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          preferences: ['monthly', 'maintenance-tips', 'hurricane-alerts']
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscriptionStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setSubscriptionStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      setSubscriptionStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Free Resources & Newsletter
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get exclusive guides and stay updated with the latest carpentry tips
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Guide Card */}
            <Card className="border-2 border-green-200 dark:border-green-800 shadow-lg">
              <CardHeader className="bg-green-50 dark:bg-green-950/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Free Guide: Ultimate Florida Home Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Comprehensive guide covering:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Seasonal maintenance checklists
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Hurricane preparation tips
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Wood care in humid climate
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    When to call a professional
                  </li>
                </ul>
                <Button 
                  onClick={handleDownloadGuide}
                  className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Free Guide
                </Button>
              </CardContent>
            </Card>

            {/* Newsletter Card */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
              <CardHeader className="bg-emerald-50 dark:bg-emerald-950/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Monthly Newsletter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Subscribe for:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Seasonal maintenance reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Exclusive discounts and offers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    New blog posts and guides
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Hurricane season alerts
                  </li>
                </ul>
                
                <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                  <Input 
                    placeholder="Enter your email address" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubscribing}
                  />
                  <Button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                    disabled={isSubscribing || !email}
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>
                </form>

                {/* Status Messages */}
                {subscriptionStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    {message}
                  </div>
                )}
                {subscriptionStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {message}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Blog CTA */}
          <div className="text-center mt-12">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
              <Link href="/blog">
                <BookOpen className="mr-2 h-4 w-4" />
                Visit Our Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

