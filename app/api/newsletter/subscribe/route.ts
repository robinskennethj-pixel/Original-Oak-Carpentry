import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Simple in-memory storage for demo (in production, use a database)
const subscribers: { email: string; subscribedAt: string; preferences: string[] }[] = []

// POST /api/newsletter/subscribe - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, preferences = ['monthly'] } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existingSubscriber = subscribers.find(sub => sub.email === email)
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 200 }
      )
    }

    // Add new subscriber
    const newSubscriber = {
      email,
      subscribedAt: new Date().toISOString(),
      preferences
    }
    subscribers.push(newSubscriber)

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Integrate with email service (Mailchimp, SendGrid, etc.)
    // 4. Add to marketing automation

    console.log(`New newsletter subscriber: ${email}`)
    console.log(`Total subscribers: ${subscribers.length}`)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      subscriber: {
        email,
        subscribedAt: newSubscriber.subscribedAt,
        preferences
      }
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// GET /api/newsletter/subscribe - Get subscription stats (for admin)
export async function GET(request: NextRequest) {
  try {
    // In production, add authentication check here
    
    return NextResponse.json({
      totalSubscribers: subscribers.length,
      recentSubscribers: subscribers.slice(-10).map(sub => ({
        email: sub.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email for privacy
        subscribedAt: sub.subscribedAt,
        preferences: sub.preferences
      }))
    })
  } catch (error) {
    console.error('Error fetching subscription stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

