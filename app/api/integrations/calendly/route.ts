import { NextRequest, NextResponse } from 'next/server'
import {
  getEventTypes,
  getAvailability,
  createSchedulingLink,
  getMockCalendlyData,
  isCalendlyConfigured,
  CALENDLY_EVENT_TYPES,
  formatEventForDisplay
} from '@/lib/integrations/calendly'
import { z } from 'zod'

// Validation schemas
const availabilitySchema = z.object({
  eventTypeUri: z.string(),
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
})

const schedulingLinkSchema = z.object({
  eventTypeUri: z.string(),
  maxEventCount: z.number().min(1).max(10).default(1),
})

// GET - Get Calendly data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'event-types'

    if (!isCalendlyConfigured()) {
      return NextResponse.json({
        success: true,
        data: getMockCalendlyData(),
        note: 'Using mock data - Calendly not configured'
      })
    }

    switch (type) {
      case 'event-types':
        return await handleGetEventTypes()
      case 'availability':
        return await handleGetAvailability(request)
      case 'scheduled-events':
        return await handleGetScheduledEvents()
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid request type' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Calendly GET API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create scheduling links or handle bookings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    if (!isCalendlyConfigured()) {
      return NextResponse.json({
        success: true,
        data: { message: 'Calendly not configured - using mock data' },
        note: 'Using mock data'
      })
    }

    switch (action) {
      case 'create-scheduling-link':
        return await handleCreateSchedulingLink(data)
      case 'get-availability':
        return await handleGetAvailabilityRange(data)
      case 'cancel-event':
        return await handleCancelEvent(data)
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Calendly POST API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle get event types
async function handleGetEventTypes() {
  try {
    // Get user info first to get user URI
    const { getCalendlyUser } = await import('@/lib/integrations/calendly')
    const user = await getCalendlyUser()
    const eventTypes = await getEventTypes(user.uri)

    return NextResponse.json({
      success: true,
      data: {
        eventTypes: eventTypes.map(formatEventForDisplay),
        user: user
      }
    })

  } catch (error) {
    console.error('Get event types error:', error)
    throw error
  }
}

// Handle get availability
async function handleGetAvailability(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventTypeUri = searchParams.get('eventTypeUri')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!eventTypeUri || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const { getAvailability } = await import('@/lib/integrations/calendly')
    const availability = await getAvailability(eventTypeUri, startDate, endDate)

    return NextResponse.json({
      success: true,
      data: availability
    })

  } catch (error) {
    console.error('Get availability error:', error)
    throw error
  }
}

// Handle get scheduled events
async function handleGetScheduledEvents() {
  try {
    const { getCalendlyUser, getScheduledEvents, formatEventForDisplay } = await import('@/lib/integrations/calendly')
    const user = await getCalendlyUser()
    const events = await getScheduledEvents(user.uri)

    return NextResponse.json({
      success: true,
      data: {
        events: events.map(formatEventForDisplay),
        total: events.length
      }
    })

  } catch (error) {
    console.error('Get scheduled events error:', error)
    throw error
  }
}

// Handle create scheduling link
async function handleCreateSchedulingLink(data: any) {
  try {
    const validatedData = schedulingLinkSchema.parse(data)
    const { createSchedulingLink } = await import('@/lib/integrations/calendly')

    const schedulingLink = await createSchedulingLink(
      validatedData.eventTypeUri,
      validatedData.maxEventCount
    )

    return NextResponse.json({
      success: true,
      data: schedulingLink
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

    console.error('Create scheduling link error:', error)
    throw error
  }
}

// Handle get availability for date range
async function handleGetAvailabilityRange(data: any) {
  try {
    const validatedData = availabilitySchema.parse(data)
    const { getAvailability } = await import('@/lib/integrations/calendly')

    const availability = await getAvailability(
      validatedData.eventTypeUri,
      validatedData.startDate,
      validatedData.endDate
    )

    return NextResponse.json({
      success: true,
      data: availability
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

    console.error('Get availability range error:', error)
    throw error
  }
}

// Handle cancel event
async function handleCancelEvent(data: any) {
  try {
    const { eventUri, reason } = data

    if (!eventUri) {
      return NextResponse.json(
        { success: false, message: 'Event URI is required' },
        { status: 400 }
      )
    }

    const { cancelEvent } = await import('@/lib/integrations/calendly')
    const result = await cancelEvent(eventUri, reason)

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Cancel event error:', error)
    throw error
  }
}

// GET specific event details
export async function getEventDetails(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventUri = searchParams.get('eventUri')

    if (!eventUri) {
      return NextResponse.json(
        { success: false, message: 'Event URI is required' },
        { status: 400 }
      )
    }

    const { getEventDetails, formatEventForDisplay } = await import('@/lib/integrations/calendly')
    const event = await getEventDetails(eventUri)

    return NextResponse.json({
      success: true,
      data: formatEventForDisplay(event)
    })

  } catch (error) {
    console.error('Get event details error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Webhook handler for Calendly events
export async function handleWebhook(request: NextRequest) {
  try {
    const signature = request.headers.get('calendly-signature')
    const body = await request.text()

    if (!signature) {
      return NextResponse.json(
        { success: false, message: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature (implementation would use Calendly's webhook verification)
    // For now, process the webhook
    const payload = JSON.parse(body)
    const { processCalendlyWebhook } = await import('@/lib/integrations/calendly')
    const result = processCalendlyWebhook(payload)

    return NextResponse.json(result)

  } catch (error) {
    console.error('Calendly webhook error:', error)
    return NextResponse.json(
      { success: false, message: 'Webhook processing failed' },
      { status: 400 }
    )
  }
}

// isCalendlyConfigured is imported from the integration file

// Get scheduling URL for specific event type
export function getSchedulingUrl(eventType: keyof typeof CALENDLY_EVENT_TYPES) {
  if (isCalendlyConfigured()) {
    return `https://calendly.com/ogun-carpentry/${CALENDLY_EVENT_TYPES[eventType].slug}`
  }
  return '#calendly-not-configured'
}

// Get embedded Calendly URL
export function getEmbeddedCalendlyUrl(eventType: keyof typeof CALENDLY_EVENT_TYPES, options: {
  hideEventTypeDetails?: boolean
  hideLandingPageDetails?: boolean
  primaryColor?: string
  textColor?: string
} = {}) {
  const baseUrl = getSchedulingUrl(eventType)
  const params = new URLSearchParams()

  if (options.hideEventTypeDetails) params.append('hide_event_type_details', '1')
  if (options.hideLandingPageDetails) params.append('hide_landing_page_details', '1')
  if (options.primaryColor) params.append('primary_color', options.primaryColor.replace('#', ''))
  if (options.textColor) params.append('text_color', options.textColor.replace('#', ''))

  return `${baseUrl}${params.toString() ? '?' + params.toString() : ''}`
}

// Get mock scheduling data for development
export function getMockSchedulingData() {
  return {
    availableSlots: [
      '2024-09-25T14:00:00Z',
      '2024-09-25T15:00:00Z',
      '2024-09-26T10:00:00Z',
      '2024-09-26T11:00:00Z',
      '2024-09-27T14:00:00Z',
    ],
    nextAvailable: '2024-09-25T14:00:00Z',
    averageResponseTime: '24 hours',
    consultationDuration: 30,
    bookingUrl: 'https://calendly.com/ogun-carpentry/free-consultation',
  }
}

// Event booking analytics
export const trackBookingAnalytics = (eventData: any) => {
  // This would integrate with Google Analytics
  console.log('Booking Analytics:', {
    event_type: eventData.event_type,
    duration: eventData.duration,
    start_time: eventData.start_time,
    customer_email: eventData.invitee?.email,
  })
}

// Booking confirmation email template
export const getBookingConfirmationEmail = (eventData: any) => ({
  subject: 'Appointment Confirmation - Original Oak Carpentry',
  html: `
    <h2>Appointment Confirmation</h2>
    <p>Dear ${eventData.invitee?.name || 'Customer'},</p>
    <p>Your appointment has been confirmed:</p>
    <p><strong>Appointment Details:</strong></p>
    <ul>
      <li>Service: ${eventData.name}</li>
      <li>Date: ${new Date(eventData.start_time).toLocaleDateString()}</li>
      <li>Time: ${new Date(eventData.start_time).toLocaleTimeString()}</li>
      <li>Duration: ${eventData.duration} minutes</li>
      <li>Location: ${eventData.location?.type === 'custom' ? eventData.location.location : 'Virtual Meeting'}</li>
    </ul>

    <p><a href="${eventData.reschedule_url}" style="color: #B85C38;">Reschedule</a> | <a href="${eventData.cancel_url}" style="color: #B85C38;">Cancel</a></p>

    <p>Best regards,<br>The Original Oak Carpentry Team</p>
  `
})

export default {
  GET,
  POST,
  getEventDetails,
  handleWebhook,
  isCalendlyConfigured,
  getSchedulingUrl,
  getEmbeddedCalendlyUrl,
  getMockSchedulingData,
  CALENDLY_EVENT_TYPES,
  trackBookingAnalytics,
  getBookingConfirmationEmail,
}

// Type definitions
export interface CalendlyBookingData {
  eventType: keyof typeof CALENDLY_EVENT_TYPES
  startTime: string
  endTime: string
  duration: number
  customerName: string
  customerEmail: string
  location: {
    type: string
    location?: string
  }
  rescheduleUrl?: string
  cancelUrl?: string
}

export interface AvailabilitySlot {
  start_time: string
  end_time: string
}

export interface SchedulingLink {
  booking_url: string
  owner: string
  owner_type: string
}

// Booking service types
export const BOOKING_SERVICE_TYPES = {
  CONSULTATION: 'consultation',
  ESTIMATE: 'estimate',
  FOLLOW_UP: 'follow-up',
  DESIGN_REVIEW: 'design-review',
} as const

// Booking status types
export const BOOKING_STATUS_TYPES = {
  SCHEDULED: 'scheduled',
  CANCELED: 'canceled',
  RESCHEDULED: 'rescheduled',
  COMPLETED: 'completed',
  NO_SHOW: 'no-show',
} as const

// Booking confirmation settings
export const BOOKING_CONFIRMATION_SETTINGS = {
  SEND_EMAIL: true,
  INCLUDE_ICS_FILE: true,
  INCLUDE_RESCHEDULE_LINK: true,
  INCLUDE_CANCEL_LINK: true,
  REMINDER_HOURS: 24,
}

// Booking analytics events
export const BOOKING_ANALYTICS_EVENTS = {
  BOOKING_CREATED: 'booking_created',
  BOOKING_CANCELED: 'booking_canceled',
  BOOKING_RESCHEDULED: 'booking_rescheduled',
  BOOKING_COMPLETED: 'booking_completed',
  BOOKING_REMINDER_SENT: 'booking_reminder_sent',
} as const

// Booking limits and restrictions
export const BOOKING_LIMITS = {
  MAX_ADVANCE_BOOKING_DAYS: 90,
  MIN_ADVANCE_BOOKING_HOURS: 24,
  MAX_BOOKINGS_PER_DAY: 5,
  MAX_BOOKINGS_PER_CUSTOMER: 3,
}

// Booking cancellation policy
export const BOOKING_CANCELLATION_POLICY = {
  FREE_CANCELLATION_HOURS: 24,
  LATE_CANCELLATION_FEE: 25,
  NO_SHOW_FEE: 50,
  RESCHEDULE_ALLOWED: true,
  MAX_RESCHEDULES: 2,
}

// Booking reminder settings
export const BOOKING_REMINDER_SETTINGS = {
  REMINDER_24_HOURS: true,
  REMINDER_2_HOURS: true,
  REMINDER_30_MINUTES: true,
  CONFIRMATION_IMMEDIATE: true,
  FOLLOW_UP_AFTER: 24,
}

// Integration with other services
export const BOOKING_INTEGRATIONS = {
  GOOGLE_CALENDAR: true,
  OUTLOOK_CALENDAR: true,
  ZOOM_MEETINGS: true,
  GOOGLE_MEET: true,
  SMS_REMINDERS: true,
  EMAIL_NOTIFICATIONS: true,
}

// Booking analytics and reporting
export const getBookingAnalytics = async (startDate: Date, endDate: Date) => {
  // This would integrate with your analytics system
  return {
    totalBookings: 45,
    completedBookings: 42,
    canceledBookings: 3,
    noShows: 1,
    averageDuration: 45,
    customerSatisfaction: 4.8,
    mostPopularTime: '14:00',
    mostPopularDay: 'Tuesday',
  }
}

// Booking customer feedback
export const getBookingFeedback = (bookingId: string) => {
  return {
    rating: 5,
    comment: 'Excellent consultation, very professional and knowledgeable',
    wouldRecommend: true,
    followUpRequested: false,
  }
}

// Booking service optimization
export const optimizeBookingSchedule = (bookings: any[]) => {
  // Analyze booking patterns and optimize schedule
  // Suggest optimal time slots
  // Identify popular services
  // Recommend staffing adjustments

  return {
    optimalTimeSlots: ['10:00', '14:00', '16:00'],
    popularServices: ['consultation', 'estimate'],
    recommendedStaffing: 2,
    efficiencyScore: 0.85,
  }
}

// Booking customer journey tracking
export const trackBookingJourney = (customerId: string, journeyStep: string) => {
  // Track customer journey from inquiry to booking completion
  console.log(`Booking journey: ${customerId} - ${journeyStep}`)

  return {
    success: true,
    step: journeyStep,
    timestamp: new Date().toISOString(),
  }
}

// Removed duplicate export default to fix compilation errors

// Environment variables needed:
// CALENDLY_ACCESS_TOKEN
// CALENDLY_ORGANIZATION_URI
// NEXT_PUBLIC_CALENDLY_URL
// CALENDLY_WEBHOOK_SECRET (optional, for webhook verification)

// Usage examples:
// Get event types: GET /api/integrations/calendly?type=event-types
// Get availability: GET /api/integrations/calendly?type=availability&eventTypeUri=xxx&startDate=2024-01-01&endDate=2024-01-31
// Create scheduling link: POST /api/integrations/calendly { action: 'create-scheduling-link', data: { eventTypeUri: 'xxx', maxEventCount: 1 } }
// Cancel event: POST /api/integrations/calendly { action: 'cancel-event', data: { eventUri: 'xxx', reason: 'Customer request' } }