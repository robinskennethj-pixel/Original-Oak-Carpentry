// Google Analytics 4 API integration

export interface AnalyticsEvent {
  name: string
  parameters?: Record<string, any>
}

export interface PageViewEvent {
  page_title?: string
  page_location?: string
  page_path?: string
  custom_parameters?: Record<string, any>
}

export interface EcommerceEvent {
  transaction_id?: string
  value?: number
  currency?: string
  items?: Array<{
    item_id: string
    item_name: string
    item_category?: string
    item_variant?: string
    price?: number
    quantity?: number
  }>
}

// Google Analytics 4 Measurement Protocol
export class GoogleAnalyticsAPI {
  private measurementId: string
  private apiSecret: string
  private clientId: string

  constructor(measurementId: string, apiSecret: string, clientId: string) {
    this.measurementId = measurementId
    this.apiSecret = apiSecret
    this.clientId = clientId
  }

  // Send event to Google Analytics
  async sendEvent(event: AnalyticsEvent, userId?: string) {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`

    const payload = {
      client_id: this.clientId,
      user_id: userId,
      events: [{
        name: event.name,
        params: {
          ...event.parameters,
          session_id: this.generateSessionId(),
          engagement_time_msec: 100,
        }
      }]
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Google Analytics API error: ${response.statusText}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Error sending event to Google Analytics:', error)
      throw error
    }
  }

  // Send page view event
  async sendPageView(pageView: PageViewEvent) {
    const event: AnalyticsEvent = {
      name: 'page_view',
      parameters: {
        page_title: pageView.page_title,
        page_location: pageView.page_location,
        page_path: pageView.page_path,
        ...pageView.custom_parameters,
      }
    }

    return this.sendEvent(event)
  }

  // Send ecommerce event
  async sendEcommerceEvent(eventName: string, ecommerce: EcommerceEvent) {
    const event: AnalyticsEvent = {
      name: eventName,
      parameters: {
        transaction_id: ecommerce.transaction_id,
        value: ecommerce.value,
        currency: ecommerce.currency,
        items: ecommerce.items,
      }
    }

    return this.sendEvent(event)
  }

  // Send user engagement event
  async sendEngagementEvent(action: string, label?: string, value?: number, category: string = 'engagement') {
    const event: AnalyticsEvent = {
      name: 'user_engagement',
      parameters: {
        action,
        category,
        label,
        value,
      }
    }

    return this.sendEvent(event)
  }

  // Send contact form submission event
  async sendContactFormSubmission(formType: string, success: boolean) {
    const event: AnalyticsEvent = {
      name: 'contact_form_submit',
      parameters: {
        form_type: formType,
        success: success,
      }
    }

    return this.sendEvent(event)
  }

  // Send service inquiry event
  async sendServiceInquiry(serviceType: string, estimatedValue?: number) {
    const event: AnalyticsEvent = {
      name: 'service_inquiry',
      parameters: {
        service_type: serviceType,
        estimated_value: estimatedValue,
      }
    }

    return this.sendEvent(event)
  }

  // Send booking event
  async sendBookingEvent(eventType: string, duration: number, location?: string) {
    const event: AnalyticsEvent = {
      name: 'booking_made',
      parameters: {
        event_type: eventType,
        duration: duration,
        location: location,
      }
    }

    return this.sendEvent(event)
  }

  // Generate unique session ID
  private generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Google Analytics 4 Reporting API
export class GoogleAnalyticsReportingAPI {
  private propertyId: string
  private credentials: any

  constructor(propertyId: string, credentials: any) {
    this.propertyId = propertyId
    this.credentials = credentials
  }

  // Get basic analytics data
  async getBasicMetrics(startDate: string, endDate: string) {
    try {
      // This would use the Google Analytics Reporting API v4
      // For now, return mock data
      return {
        sessions: 1250,
        users: 980,
        pageViews: 3450,
        bounceRate: 0.32,
        averageSessionDuration: 180,
        newUsers: 420,
        returningUsers: 560,
      }
    } catch (error) {
      console.error('Error fetching basic metrics:', error)
      throw error
    }
  }

  // Get page analytics
  async getPageAnalytics(pagePath: string, startDate: string, endDate: string) {
    try {
      // Mock data for development
      return {
        pageViews: 245,
        uniquePageViews: 189,
        averageTimeOnPage: 145,
        bounceRate: 0.28,
        exitRate: 0.35,
      }
    } catch (error) {
      console.error('Error fetching page analytics:', error)
      throw error
    }
  }

  // Get event analytics
  async getEventAnalytics(eventName: string, startDate: string, endDate: string) {
    try {
      // Mock data
      return {
        totalEvents: 45,
        uniqueEvents: 38,
        eventValue: 0,
        averageValue: 0,
      }
    } catch (error) {
      console.error('Error fetching event analytics:', error)
      throw error
    }
  }

  // Get ecommerce analytics
  async getEcommerceAnalytics(startDate: string, endDate: string) {
    try {
      // Mock data
      return {
        totalRevenue: 12500,
        totalTransactions: 25,
        averageOrderValue: 500,
        conversionRate: 0.023,
        totalItems: 45,
      }
    } catch (error) {
      console.error('Error fetching ecommerce analytics:', error)
      throw error
    }
  }
}

// Google Analytics Admin API
export class GoogleAnalyticsAdminAPI {
  private propertyId: string
  private credentials: any

  constructor(propertyId: string, credentials: any) {
    this.propertyId = propertyId
    this.credentials = credentials
  }

  // Create custom dimension
  async createCustomDimension(name: string, scope: 'EVENT' | 'USER' | 'SESSION') {
    try {
      // Mock implementation
      return {
        success: true,
        dimensionId: `custom_${Date.now()}`,
        name,
        scope,
      }
    } catch (error) {
      console.error('Error creating custom dimension:', error)
      throw error
    }
  }

  // Create custom metric
  async createCustomMetric(name: string, measurementUnit: string) {
    try {
      // Mock implementation
      return {
        success: true,
        metricId: `custom_${Date.now()}`,
        name,
        measurementUnit,
      }
    } catch (error) {
      console.error('Error creating custom metric:', error)
      throw error
    }
  }

  // Get account summary
  async getAccountSummary() {
    try {
      // Mock data
      return {
        accountName: 'Original Oak Carpentry',
        propertyName: 'Original Oak Carpentry Website',
        propertyId: this.propertyId,
        created: '2024-01-01',
        updated: '2024-09-01',
      }
    } catch (error) {
      console.error('Error getting account summary:', error)
      throw error
    }
  }
}

// Google Tag Manager API
export class GoogleTagManagerAPI {
  private containerId: string
  private credentials: any

  constructor(containerId: string, credentials: any) {
    this.containerId = containerId
    this.credentials = credentials
  }

  // Get container info
  async getContainerInfo() {
    try {
      // Mock data
      return {
        containerId: this.containerId,
        containerName: 'Original Oak Carpentry Container',
        publicId: 'GTM-XXXXXX',
        usageContext: ['web'],
        fingerprint: '123456789',
        tagManagerUrl: `https://tagmanager.google.com/#/container/accounts/123/containers/${this.containerId}`,
      }
    } catch (error) {
      console.error('Error getting container info:', error)
      throw error
    }
  }

  // Get tags
  async getTags() {
    try {
      // Mock data
      return [
        {
          tagId: '1',
          name: 'Google Analytics 4 Configuration',
          type: 'gaawc',
          fingerprint: '123456789',
        },
        {
          tagId: '2',
          name: 'Contact Form Submission',
          type: 'gaawe',
          fingerprint: '987654321',
        },
      ]
    } catch (error) {
      console.error('Error getting tags:', error)
      throw error
    }
  }

  // Create new tag
  async createTag(tagConfig: any) {
    try {
      // Mock implementation
      return {
        success: true,
        tagId: `tag_${Date.now()}`,
        ...tagConfig,
      }
    } catch (error) {
      console.error('Error creating tag:', error)
      throw error
    }
  }
}

// Client-side analytics helper
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Track page view
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
      page_title: title,
    })
  }
}

// Track ecommerce events
export const trackEcommerceEvent = (eventName: string, ecommerceData: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ecommerce: ecommerceData,
    })
  }
}

// Enhanced ecommerce tracking
export const trackPurchase = (transactionId: string, value: number, currency: string, items: any[]) => {
  trackEcommerceEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency,
    items,
  })
}

export const trackAddToCart = (items: any[]) => {
  trackEcommerceEvent('add_to_cart', {
    items,
  })
}

export const trackBeginCheckout = (items: any[]) => {
  trackEcommerceEvent('begin_checkout', {
    items,
  })
}

// Mock analytics data for development
export const getMockAnalyticsData = () => ({
  basicMetrics: {
    sessions: 1250,
    users: 980,
    pageViews: 3450,
    bounceRate: 0.32,
    averageSessionDuration: 180,
    newUsers: 420,
    returningUsers: 560,
  },
  pageAnalytics: {
    '/': { pageViews: 850, uniquePageViews: 650, averageTimeOnPage: 95, bounceRate: 0.25 },
    '/services': { pageViews: 245, uniquePageViews: 189, averageTimeOnPage: 145, bounceRate: 0.28 },
    '/portfolio': { pageViews: 312, uniquePageViews: 245, averageTimeOnPage: 120, bounceRate: 0.30 },
    '/contact': { pageViews: 198, uniquePageViews: 156, averageTimeOnPage: 85, bounceRate: 0.35 },
  },
  eventAnalytics: {
    contact_form_submit: { totalEvents: 45, uniqueEvents: 38 },
    service_inquiry: { totalEvents: 23, uniqueEvents: 20 },
    booking_made: { totalEvents: 12, uniqueEvents: 10 },
  },
  ecommerce: {
    totalRevenue: 12500,
    totalTransactions: 25,
    averageOrderValue: 500,
    conversionRate: 0.023,
    totalItems: 45,
  },
  trafficSources: {
    organic: 0.45,
    direct: 0.25,
    social: 0.15,
    referral: 0.10,
    paid: 0.05,
  },
  deviceBreakdown: {
    desktop: 0.55,
    mobile: 0.35,
    tablet: 0.10,
  },
})

// Check if Google Analytics is configured
export const isGoogleAnalyticsConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
    process.env.GOOGLE_ANALYTICS_API_SECRET
  )
}

// Initialize Google Analytics
export const initializeGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && isGoogleAnalyticsConfigured()) {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      send_page_view: false, // We'll handle page views manually
    })
  }
}

// Type definitions for window
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default {
  GoogleAnalyticsAPI,
  GoogleAnalyticsReportingAPI,
  GoogleAnalyticsAdminAPI,
  GoogleTagManagerAPI,
  trackEvent,
  trackPageView,
  trackEcommerceEvent,
  trackPurchase,
  trackAddToCart,
  trackBeginCheckout,
  getMockAnalyticsData,
  isGoogleAnalyticsConfigured,
  initializeGoogleAnalytics,
}

// Environment variables needed:
// NEXT_PUBLIC_GA_MEASUREMENT_ID
// GOOGLE_ANALYTICS_API_SECRET
// GOOGLE_ANALYTICS_CREDENTIALS (for reporting/admin APIs)
// GOOGLE_TAG_MANAGER_CONTAINER_ID (optional)
// GOOGLE_TAG_MANAGER_CREDENTIALS (optional)

// Common Google Analytics events
export const GA_EVENTS = {
  PAGE_VIEW: 'page_view',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  SERVICE_INQUIRY: 'service_inquiry',
  BOOKING_MADE: 'booking_made',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  PAYMENT_COMPLETED: 'payment_completed',
  SOCIAL_SHARE: 'social_share',
  VIDEO_PLAY: 'video_play',
  DOWNLOAD: 'download',
  CLICK: 'click',
  SCROLL: 'scroll',
  SEARCH: 'search',
  PURCHASE: 'purchase',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
} as const

// Custom dimensions and metrics
export const CUSTOM_DIMENSIONS = {
  SERVICE_TYPE: 'service_type',
  PROJECT_CATEGORY: 'project_category',
  USER_TYPE: 'user_type',
  PAGE_CATEGORY: 'page_category',
} as const

export const CUSTOM_METRICS = {
  PROJECT_ESTIMATE_VALUE: 'project_estimate_value',
  CONSULTATION_DURATION: 'consultation_duration',
  GALLERY_VIEWS: 'gallery_views',
} as const

// Event categories
export const EVENT_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  ECOMMERCE: 'ecommerce',
  CONTACT: 'contact',
  BOOKING: 'booking',
  SOCIAL: 'social',
  NAVIGATION: 'navigation',
  CONTENT: 'content',
} as const

// User properties
export const USER_PROPERTIES = {
  CUSTOMER_TYPE: 'customer_type',
  SERVICE_PREFERENCE: 'service_preference',
  PROJECT_HISTORY: 'project_history',
  COMMUNICATION_PREFERENCE: 'communication_preference',
} as const

// Enhanced ecommerce tracking helpers
export const createEcommerceItem = (itemId: string, itemName: string, itemCategory?: string, price?: number, quantity: number = 1) => ({
  item_id: itemId,
  item_name: itemName,
  item_category: itemCategory,
  price,
  quantity,
})

export const createTransaction = (transactionId: string, value: number, currency: string = 'USD', items: any[] = []) => ({
  transaction_id: transactionId,
  value,
  currency,
  items,
})