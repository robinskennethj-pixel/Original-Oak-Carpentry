import { NextRequest, NextResponse } from 'next/server'
import { GoogleAnalyticsAPI, getMockAnalyticsData, isGoogleAnalyticsConfigured, GA_EVENTS } from '@/lib/integrations/google-analytics'
import { z } from 'zod'

// Validation schemas
const eventSchema = z.object({
  name: z.string(),
  parameters: z.record(z.any()).optional(),
  userId: z.string().optional(),
})

const pageViewSchema = z.object({
  page_title: z.string().optional(),
  page_location: z.string().optional(),
  page_path: z.string().optional(),
  custom_parameters: z.record(z.any()).optional(),
  userId: z.string().optional(),
})

const ecommerceSchema = z.object({
  eventName: z.string(),
  transaction_id: z.string().optional(),
  value: z.number().optional(),
  currency: z.string().default('USD'),
  items: z.array(z.object({
    item_id: z.string(),
    item_name: z.string(),
    item_category: z.string().optional(),
    item_variant: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
  })).optional(),
})

// GET - Get analytics data or check configuration
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'config'

    switch (type) {
      case 'config':
        return await handleGetConfig()
      case 'basic-metrics':
        return await handleGetBasicMetrics(request)
      case 'page-analytics':
        return await handleGetPageAnalytics(request)
      case 'event-analytics':
        return await handleGetEventAnalytics(request)
      case 'ecommerce-analytics':
        return await handleGetEcommerceAnalytics(request)
      case 'mock-data':
        return await handleGetMockData()
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid request type' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Google Analytics GET API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Send analytics events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    if (!isGoogleAnalyticsConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Google Analytics not configured',
        note: 'Please configure Google Analytics credentials'
      })
    }

    switch (action) {
      case 'send-event':
        return await handleSendEvent(data)
      case 'send-page-view':
        return await handleSendPageView(data)
      case 'send-ecommerce-event':
        return await handleSendEcommerceEvent(data)
      case 'send-contact-form':
        return await handleSendContactForm(data)
      case 'send-booking':
        return await handleSendBooking(data)
      case 'send-payment':
        return await handleSendPayment(data)
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Google Analytics POST API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle get configuration
async function handleGetConfig() {
  try {
    const isConfigured = isGoogleAnalyticsConfigured()

    return NextResponse.json({
      success: true,
      data: {
        isConfigured,
        measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        availableEvents: Object.values(GA_EVENTS),
        note: isConfigured ? 'Google Analytics is configured' : 'Google Analytics not configured'
      }
    })

  } catch (error) {
    console.error('Get config error:', error)
    throw error
  }
}

// Handle get basic metrics
async function handleGetBasicMetrics(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get('endDate') || new Date().toISOString()

    if (!isGoogleAnalyticsConfigured()) {
      const mockData = getMockAnalyticsData()
      return NextResponse.json({
        success: true,
        data: mockData.basicMetrics,
        note: 'Using mock data - Google Analytics not configured'
      })
    }

    // In a real implementation, you would fetch from Google Analytics Reporting API
    // For now, return mock data
    const mockData = getMockAnalyticsData()

    return NextResponse.json({
      success: true,
      data: mockData.basicMetrics,
      period: { start: startDate, end: endDate }
    })

  } catch (error) {
    console.error('Get basic metrics error:', error)
    throw error
  }
}

// Handle get page analytics
async function handleGetPageAnalytics(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pagePath = searchParams.get('pagePath') || '/'
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get('endDate') || new Date().toISOString()

    if (!isGoogleAnalyticsConfigured()) {
      const mockData = getMockAnalyticsData()
      return NextResponse.json({
        success: true,
        data: mockData.pageAnalytics[pagePath] || mockData.pageAnalytics['/'],
        note: 'Using mock data - Google Analytics not configured'
      })
    }

    // Mock page analytics data
    const mockData = getMockAnalyticsData()
    const pageData = mockData.pageAnalytics[pagePath] || mockData.pageAnalytics['/']

    return NextResponse.json({
      success: true,
      data: pageData,
      pagePath,
      period: { start: startDate, end: endDate }
    })

  } catch (error) {
    console.error('Get page analytics error:', error)
    throw error
  }
}

// Handle get event analytics
async function handleGetEventAnalytics(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventName = searchParams.get('eventName') || 'contact_form_submit'
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get('endDate') || new Date().toISOString()

    if (!isGoogleAnalyticsConfigured()) {
      const mockData = getMockAnalyticsData()
      return NextResponse.json({
        success: true,
        data: mockData.eventAnalytics[eventName] || mockData.eventAnalytics['contact_form_submit'],
        note: 'Using mock data - Google Analytics not configured'
      })
    }

    // Mock event analytics data
    const mockData = getMockAnalyticsData()
    const eventData = mockData.eventAnalytics[eventName] || mockData.eventAnalytics['contact_form_submit']

    return NextResponse.json({
      success: true,
      data: eventData,
      eventName,
      period: { start: startDate, end: endDate }
    })

  } catch (error) {
    console.error('Get event analytics error:', error)
    throw error
  }
}

// Handle get ecommerce analytics
async function handleGetEcommerceAnalytics(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get('endDate') || new Date().toISOString()

    if (!isGoogleAnalyticsConfigured()) {
      const mockData = getMockAnalyticsData()
      return NextResponse.json({
        success: true,
        data: mockData.ecommerce,
        note: 'Using mock data - Google Analytics not configured'
      })
    }

    // Mock ecommerce analytics data
    const mockData = getMockAnalyticsData()

    return NextResponse.json({
      success: true,
      data: mockData.ecommerce,
      period: { start: startDate, end: endDate }
    })

  } catch (error) {
    console.error('Get ecommerce analytics error:', error)
    throw error
  }
}

// Handle get mock data
async function handleGetMockData() {
  try {
    const mockData = getMockAnalyticsData()

    return NextResponse.json({
      success: true,
      data: mockData,
      note: 'Mock data for development and testing'
    })

  } catch (error) {
    console.error('Get mock data error:', error)
    throw error
  }
}

// Handle send event
async function handleSendEvent(data: any) {
  try {
    const validatedData = eventSchema.parse(data)

    if (!isGoogleAnalyticsConfigured()) {
      console.log('Mock event sent:', validatedData)
      return NextResponse.json({
        success: true,
        data: { event: validatedData, note: 'Mock event - Google Analytics not configured' }
      })
    }

    const ga = new GoogleAnalyticsAPI(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
      process.env.GOOGLE_ANALYTICS_API_SECRET!,
      'original-oak-carpentry-client'
    )

    await ga.sendEvent({
      name: validatedData.name,
      parameters: validatedData.parameters,
      userId: validatedData.userId,
    })

    return NextResponse.json({
      success: true,
      data: { event: validatedData, message: 'Event sent successfully' }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors
        },
        { status: 400 }
      )
    }

    console.error('Send event error:', error)
    throw error
  }
}

// Handle send page view
async function handleSendPageView(data: any) {
  try {
    const validatedData = pageViewSchema.parse(data)

    if (!isGoogleAnalyticsConfigured()) {
      console.log('Mock page view sent:', validatedData)
      return NextResponse.json({
        success: true,
        data: { pageView: validatedData, note: 'Mock page view - Google Analytics not configured' }
      })
    }

    const ga = new GoogleAnalyticsAPI(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
      process.env.GOOGLE_ANALYTICS_API_SECRET!,
      'original-oak-carpentry-client'
    )

    await ga.sendPageView({
      page_title: validatedData.page_title,
      page_location: validatedData.page_location,
      page_path: validatedData.page_path,
      custom_parameters: validatedData.custom_parameters,
      userId: validatedData.userId,
    })

    return NextResponse.json({
      success: true,
      data: { pageView: validatedData, message: 'Page view sent successfully' }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors
        },
        { status: 400 }
      )
    }

    console.error('Send page view error:', error)
    throw error
  }
}

// Handle send ecommerce event
async function handleSendEcommerceEvent(data: any) {
  try {
    const validatedData = ecommerceSchema.parse(data)

    if (!isGoogleAnalyticsConfigured()) {
      console.log('Mock ecommerce event sent:', validatedData)
      return NextResponse.json({
        success: true,
        data: { ecommerceEvent: validatedData, note: 'Mock ecommerce event - Google Analytics not configured' }
      })
    }

    const ga = new GoogleAnalyticsAPI(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
      process.env.GOOGLE_ANALYTICS_API_SECRET!,
      'original-oak-carpentry-client'
    )

    await ga.sendEcommerceEvent(validatedData.eventName, {
      transaction_id: validatedData.transaction_id,
      value: validatedData.value,
      currency: validatedData.currency,
      items: validatedData.items,
    })

    return NextResponse.json({
      success: true,
      data: { ecommerceEvent: validatedData, message: 'Ecommerce event sent successfully' }
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors
        },
        { status: 400 }
      )
    }

    console.error('Send ecommerce event error:', error)
    throw error
  }
}

// Handle send contact form event
async function handleSendContactForm(data: any) {
  try {
    const { formType, success, userId } = data

    if (!isGoogleAnalyticsConfigured()) {
      console.log('Mock contact form event sent:', { formType, success, userId })
      return NextResponse.json({
        success: true,
        data: { formEvent: { formType, success, userId }, note: 'Mock contact form event - Google Analytics not configured' }
      })
    }

    const ga = new GoogleAnalyticsAPI(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
      process.env.GOOGLE_ANALYTICS_API_SECRET!,
      'original-oak-carpentry-client'
    )

    await ga.sendContactFormSubmission(formType, success)

    return NextResponse.json({
      success: true,
      data: { formEvent: { formType, success, userId }, message: 'Contact form event sent successfully' }
    })

  } catch (error) {
    console.error('Send contact form event error:', error)
    throw error
  }
}

// Handle send booking event
async function handleSendBooking(data: any) {
  try {
    const { eventType, duration, location, userId } = data

    if (!isGoogleAnalyticsConfigured()) {
      console.log('Mock booking event sent:', { eventType, duration, location, userId })
      return NextResponse.json({
        success: true,
        data: { bookingEvent: { eventType, duration, location, userId }, note: 'Mock booking event - Google Analytics not configured' }
      })
    }

    const ga = new GoogleAnalyticsAPI(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
      process.env.GOOGLE_ANALYTICS_API_SECRET!,
      'original-oak-carpentry-client'
    )

    await ga.sendBookingEvent(eventType, duration, location)

    return NextResponse.json({
      success: true,
      data: { bookingEvent: { eventType, duration, location, userId }, message: 'Booking event sent successfully' }
    })

  } catch (error) {
    console.error('Send booking event error:', error)
    throw error
  }
}

// Handle send payment event
async function handleSendPayment(data: any) {
  try {
    const { transactionId, value, currency, items, userId } = data

    if (!isGoogleAnalyticsConfigured()) {
      console.log('Mock payment event sent:', { transactionId, value, currency, items, userId })
      return NextResponse.json({
        success: true,
        data: { paymentEvent: { transactionId, value, currency, items, userId }, note: 'Mock payment event - Google Analytics not configured' }
      })
    }

    const ga = new GoogleAnalyticsAPI(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!,
      process.env.GOOGLE_ANALYTICS_API_SECRET!,
      'original-oak-carpentry-client'
    )

    await ga.sendEcommerceEvent('purchase', {
      transaction_id: transactionId,
      value,
      currency,
      items,
    })

    return NextResponse.json({
      success: true,
      data: { paymentEvent: { transactionId, value, currency, items, userId }, message: 'Payment event sent successfully' }
    })

  } catch (error) {
    console.error('Send payment event error:', error)
    throw error
  }
}

// isGoogleAnalyticsConfigured is imported from the integration file

// Analytics tracking helper for client-side
export const trackAnalyticsEvent = async (eventName: string, parameters?: Record<string, any>) => {
  try {
    const response = await fetch('/api/integrations/google-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send-event',
        data: {
          name: eventName,
          parameters,
        },
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return { success: false, error: error.message }
  }
}

// Page view tracking helper
export const trackPageView = async (pageData: {
  page_title?: string
  page_location?: string
  page_path?: string
  custom_parameters?: Record<string, any>
  userId?: string
}) => {
  try {
    const response = await fetch('/api/integrations/google-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send-page-view',
        data: pageData,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Page view tracking error:', error)
    return { success: false, error: error.message }
  }
}

// Ecommerce tracking helper
export const trackEcommerceEvent = async (eventName: string, ecommerceData: any) => {
  try {
    const response = await fetch('/api/integrations/google-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send-ecommerce-event',
        data: {
          eventName,
          ...ecommerceData,
        },
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Ecommerce tracking error:', error)
    return { success: false, error: error.message }
  }
}

// Contact form tracking helper
export const trackContactForm = async (formType: string, success: boolean, userId?: string) => {
  try {
    const response = await fetch('/api/integrations/google-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send-contact-form',
        data: {
          formType,
          success,
          userId,
        },
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Contact form tracking error:', error)
    return { success: false, error: error.message }
  }
}

// Booking tracking helper
export const trackBooking = async (bookingData: {
  eventType: string
  duration: number
  location?: string
  userId?: string
}) => {
  try {
    const response = await fetch('/api/integrations/google-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send-booking',
        data: bookingData,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Booking tracking error:', error)
    return { success: false, error: error.message }
  }
}

// Payment tracking helper
export const trackPayment = async (paymentData: {
  transactionId?: string
  value?: number
  currency?: string
  items?: any[]
  userId?: string
}) => {
  try {
    const response = await fetch('/api/integrations/google-analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send-payment',
        data: paymentData,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('Payment tracking error:', error)
    return { success: false, error: error.message }
  }
}


// Environment variables needed:
// NEXT_PUBLIC_GA_MEASUREMENT_ID
// GOOGLE_ANALYTICS_API_SECRET
// GOOGLE_ANALYTICS_CREDENTIALS (for reporting/admin APIs)
// GOOGLE_TAG_MANAGER_CONTAINER_ID (optional)
// GOOGLE_TAG_MANAGER_CREDENTIALS (optional)

// Usage examples:
// Get config: GET /api/integrations/google-analytics?type=config
// Get basic metrics: GET /api/integrations/google-analytics?type=basic-metrics&startDate=2024-01-01&endDate=2024-01-31
// Send event: POST /api/integrations/google-analytics { action: 'send-event', data: { name: 'contact_form_submit', parameters: { form_type: 'custom' } } }
// Send page view: POST /api/integrations/google-analytics { action: 'send-page-view', data: { page_title: 'Contact', page_path: '/contact' } }
// Send ecommerce event: POST /api/integrations/google-analytics { action: 'send-ecommerce-event', data: { eventName: 'purchase', transaction_id: '123', value: 5000, currency: 'usd', items: [...] } }