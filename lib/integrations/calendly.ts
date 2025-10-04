import { CalendlyEvent, CalendlyUser } from './types'

const CALENDLY_API_URL = 'https://api.calendly.com'

// Calendly API client
export const calendlyClient = {
  async makeRequest(endpoint: string, options: RequestInit = {}) {
    const token = process.env.CALENDLY_ACCESS_TOKEN

    if (!token) {
      throw new Error('Calendly access token not configured')
    }

    const response = await fetch(`${CALENDLY_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.statusText}`)
    }

    return response.json()
  }
}

// Get user information
export const getCalendlyUser = async () => {
  try {
    const data = await calendlyClient.makeRequest('/users/me')
    return data.resource
  } catch (error) {
    console.error('Error fetching Calendly user:', error)
    throw error
  }
}

// Get event types (booking types)
export const getEventTypes = async (userUri: string) => {
  try {
    const data = await calendlyClient.makeRequest(`/event_types?user=${userUri}`)
    return data.collection
  } catch (error) {
    console.error('Error fetching Calendly event types:', error)
    throw error
  }
}

// Get scheduled events
export const getScheduledEvents = async (userUri: string, status: 'active' | 'canceled' = 'active') => {
  try {
    const data = await calendlyClient.makeRequest(`/scheduled_events?user=${userUri}&status=${status}`)
    return data.collection
  } catch (error) {
    console.error('Error fetching Calendly scheduled events:', error)
    throw error
  }
}

// Get event details
export const getEventDetails = async (eventUri: string) => {
  try {
    const data = await calendlyClient.makeRequest(`/scheduled_events/${eventUri.split('/').pop()}`)
    return data.resource
  } catch (error) {
    console.error('Error fetching Calendly event details:', error)
    throw error
  }
}

// Create scheduling link
export const createSchedulingLink = async (eventTypeUri: string) => {
  try {
    const data = await calendlyClient.makeRequest('/scheduling_links', {
      method: 'POST',
      body: JSON.stringify({
        max_event_count: 1,
        owner: eventTypeUri,
        owner_type: 'EventType'
      })
    })
    return data.resource
  } catch (error) {
    console.error('Error creating Calendly scheduling link:', error)
    throw error
  }
}

// Get availability for a specific date range
export const getAvailability = async (eventTypeUri: string, startDate: string, endDate: string) => {
  try {
    const data = await calendlyClient.makeRequest(
      `/event_type_available_times?event_type=${eventTypeUri}&start_time=${startDate}&end_time=${endDate}`
    )
    return data.collection
  } catch (error) {
    console.error('Error fetching Calendly availability:', error)
    throw error
  }
}

// Cancel scheduled event
export const cancelEvent = async (eventUri: string, reason?: string) => {
  try {
    const data = await calendlyClient.makeRequest(`/scheduled_events/${eventUri.split('/').pop()}/cancellation`, {
      method: 'POST',
      body: JSON.stringify({
        reason: reason || 'Cancelled by customer'
      })
    })
    return data.resource
  } catch (error) {
    console.error('Error canceling Calendly event:', error)
    throw error
  }
}

// Get organization info (for teams)
export const getOrganizationInfo = async (orgUri: string) => {
  try {
    const data = await calendlyClient.makeRequest(`/organizations/${orgUri.split('/').pop()}`)
    return data.resource
  } catch (error) {
    console.error('Error fetching Calendly organization info:', error)
    throw error
  }
}

// Webhook management
export const createWebhook = async (url: string, events: string[]) => {
  try {
    const data = await calendlyClient.makeRequest('/webhook_subscriptions', {
      method: 'POST',
      body: JSON.stringify({
        url,
        events,
        organization: process.env.CALENDLY_ORGANIZATION_URI,
        scope: 'organization'
      })
    })
    return data.resource
  } catch (error) {
    console.error('Error creating Calendly webhook:', error)
    throw error
  }
}

// Get webhook subscriptions
export const getWebhooks = async () => {
  try {
    const data = await calendlyClient.makeRequest('/webhook_subscriptions')
    return data.collection
  } catch (error) {
    console.error('Error fetching Calendly webhooks:', error)
    throw error
  }
}

// Delete webhook
export const deleteWebhook = async (webhookId: string) => {
  try {
    await calendlyClient.makeRequest(`/webhook_subscriptions/${webhookId}`, {
      method: 'DELETE'
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting Calendly webhook:', error)
    throw error
  }
}

// Format event data for display
export const formatEventForDisplay = (event: CalendlyEvent) => {
  return {
    id: event.uri.split('/').pop(),
    name: event.name,
    status: event.status,
    startTime: event.start_time,
    endTime: event.end_time,
    createdAt: event.created_at,
    updatedAt: event.updated_at,
    eventType: event.event_type,
    location: event.location,
    invitee: event.invitee,
    rescheduled: event.rescheduled,
    cancelUrl: event.cancel_url,
    rescheduleUrl: event.reschedule_url,
    duration: event.duration,
    formattedDuration: formatDuration(event.duration),
    formattedDate: formatDateTime(event.start_time),
  }
}

// Format duration in human readable format
const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes} minutes`
}

// Format date and time
const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    full: date.toLocaleString(),
    iso: date.toISOString(),
  }
}

// Get scheduling link for specific event type
export const getSchedulingUrl = (eventTypeSlug: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/ogun-carpentry'
  return `${baseUrl}/${eventTypeSlug}`
}

// Common event types for Original Oak Carpentry
export const CALENDLY_EVENT_TYPES = {
  CONSULTATION: {
    slug: 'free-consultation',
    name: 'Free Consultation',
    duration: 30,
    description: 'Discuss your project ideas and get expert advice',
  },
  ESTIMATE: {
    slug: 'project-estimate',
    name: 'Project Estimate',
    duration: 60,
    description: 'Detailed discussion of project scope and pricing',
  },
  FOLLOW_UP: {
    slug: 'follow-up-meeting',
    name: 'Follow-up Meeting',
    duration: 30,
    description: 'Review progress and discuss next steps',
  },
  DESIGN_REVIEW: {
    slug: 'design-review',
    name: 'Design Review',
    duration: 45,
    description: 'Review design concepts and make adjustments',
  },
}

// Mock data for development
export const getMockCalendlyData = () => ({
  user: {
    name: 'Original Oak Carpentry',
    email: 'info@oguncarpentry.com',
    timezone: 'America/New_York',
  },
  eventTypes: [
    {
      uri: 'mock-consultation',
      name: 'Free Consultation',
      active: true,
      slug: 'free-consultation',
      scheduling_url: 'https://calendly.com/ogun-carpentry/free-consultation',
      duration: 30,
      kind: 'solo',
      pooling_type: null,
      type: 'StandardEventType',
      color: '#1E3A2F',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      internal_note: 'Initial consultation for new projects',
      description_plain: 'Discuss your project ideas and get expert advice',
      description_html: '<p>Discuss your project ideas and get expert advice</p>',
    },
    {
      uri: 'mock-estimate',
      name: 'Project Estimate',
      active: true,
      slug: 'project-estimate',
      scheduling_url: 'https://calendly.com/ogun-carpentry/project-estimate',
      duration: 60,
      kind: 'solo',
      pooling_type: null,
      type: 'StandardEventType',
      color: '#B85C38',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      internal_note: 'Detailed project estimate meeting',
      description_plain: 'Detailed discussion of project scope and pricing',
      description_html: '<p>Detailed discussion of project scope and pricing</p>',
    },
  ],
  scheduledEvents: [
    {
      uri: 'mock-event-1',
      name: 'Free Consultation',
      status: 'active',
      start_time: '2024-09-25T14:00:00Z',
      end_time: '2024-09-25T14:30:00Z',
      event_type: 'mock-consultation',
      location: {
        type: 'custom',
        location: 'Virtual Meeting',
      },
      invitee: 'mock-invitee-1',
      created_at: '2024-09-20T10:00:00Z',
      updated_at: '2024-09-20T10:00:00Z',
    },
  ],
})

// Webhook event types
export const CALENDLY_WEBHOOK_EVENTS = [
  'invitee.created',
  'invitee.canceled',
  'event_type.created',
  'event_type.updated',
  'event_type.deleted',
  'scheduled_event.created',
  'scheduled_event.canceled',
  'scheduled_event.rescheduled',
]

// Process webhook payload
export const processCalendlyWebhook = (payload: any) => {
  const { event, payload: webhookPayload } = payload

  switch (event) {
    case 'invitee.created':
      return handleNewBooking(webhookPayload)
    case 'invitee.canceled':
      return handleCanceledBooking(webhookPayload)
    case 'scheduled_event.rescheduled':
      return handleRescheduledBooking(webhookPayload)
    default:
      return { success: true, message: 'Webhook processed' }
  }
}

const handleNewBooking = (payload: any) => {
  const event = payload.scheduled_event
  const invitee = payload.invitee

  console.log('New booking created:', {
    event: event.name,
    startTime: event.start_time,
    invitee: invitee.name,
    email: invitee.email,
  })

  // Send confirmation email
  // Update calendar
  // Notify team

  return { success: true, message: 'New booking processed' }
}

const handleCanceledBooking = (payload: any) => {
  const event = payload.scheduled_event
  const invitee = payload.invitee

  console.log('Booking canceled:', {
    event: event.name,
    startTime: event.start_time,
    invitee: invitee.name,
    email: invitee.email,
  })

  // Send cancellation email
  // Update calendar
  // Notify team

  return { success: true, message: 'Booking cancellation processed' }
}

const handleRescheduledBooking = (payload: any) => {
  const event = payload.scheduled_event
  const invitee = payload.invitee

  console.log('Booking rescheduled:', {
    event: event.name,
    oldTime: payload.old_start_time,
    newTime: event.start_time,
    invitee: invitee.name,
    email: invitee.email,
  })

  // Send rescheduling email
  // Update calendar
  // Notify team

  return { success: true, message: 'Booking rescheduling processed' }
}

export default {
  calendlyClient,
  getCalendlyUser,
  getEventTypes,
  getScheduledEvents,
  getEventDetails,
  createSchedulingLink,
  getAvailability,
  cancelEvent,
  getOrganizationInfo,
  createWebhook,
  getWebhooks,
  deleteWebhook,
  formatEventForDisplay,
  getSchedulingUrl,
  CALENDLY_EVENT_TYPES,
  getMockCalendlyData,
  CALENDLY_WEBHOOK_EVENTS,
  processCalendlyWebhook,
}

// Type definitions
export interface CalendlyEvent {
  uri: string
  name: string
  status: 'active' | 'canceled'
  start_time: string
  end_time: string
  created_at: string
  updated_at: string
  event_type: string
  location: {
    type: string
    location?: string
    additional_info?: string
  }
  invitee: string
  rescheduled: boolean
  cancel_url?: string
  reschedule_url?: string
  duration: number
}

export interface CalendlyUser {
  uri: string
  name: string
  email: string
  timezone: string
  created_at: string
  updated_at: string
}

export interface CalendlyEventType {
  uri: string
  name: string
  active: boolean
  slug: string
  scheduling_url: string
  duration: number
  kind: 'solo' | 'round_robin' | 'collective'
  type: 'StandardEventType' | 'AdhocEventType'
  color: string
  created_at: string
  updated_at: string
  internal_note?: string
  description_plain?: string
  description_html?: string
}

export interface CalendlyAvailability {
  start_time: string
  end_time: string
}

export interface CalendlyInvitee {
  uri: string
  name: string
  email: string
  timezone: string
  created_at: string
  updated_at: string
  text_reminder_number?: string
  rescheduled: boolean
  old_start_time?: string
  old_end_time?: string
  cancel_url?: string
  reschedule_url?: string
  questions_and_answers: Array<{
    question: string
    answer: string
  }>
  tracking: {
    utm_campaign?: string
    utm_source?: string
    utm_medium?: string
    utm_content?: string
    utm_term?: string
    salesforce_uuid?: string
  }
}

export interface CalendlyWebhookPayload {
  event: string
  time: string
  payload: {
    scheduled_event: CalendlyEvent
    invitee: CalendlyInvitee
    old_start_time?: string
    old_end_time?: string
  }
}

// Check if Calendly is configured
export const isCalendlyConfigured = () => {
  return !!process.env.CALENDLY_ACCESS_TOKEN
}

// Get appropriate booking URL
export const getBookingUrl = (eventType: keyof typeof CALENDLY_EVENT_TYPES) => {
  if (isCalendlyConfigured()) {
    return getSchedulingUrl(CALENDLY_EVENT_TYPES[eventType].slug)
  }
  return '#calendly-not-configured'
}

// Mock scheduling data for development
export const getMockSchedulingData = () => ({
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
})