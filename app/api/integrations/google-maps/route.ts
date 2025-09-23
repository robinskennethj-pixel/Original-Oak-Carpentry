import { NextRequest, NextResponse } from 'next/server'
import { getBusinessInfo, getGoogleReviews, getMockBusinessInfo, getMockGoogleReviews } from '@/lib/integrations/google-maps'
import { getReviewData } from '@/lib/integrations/google-reviews'

// GET business information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const placeId = searchParams.get('placeId') || process.env.GOOGLE_BUSINESS_PLACE_ID
    const includeReviews = searchParams.get('reviews') === 'true'

    if (!placeId) {
      return NextResponse.json(
        { success: false, message: 'Place ID is required' },
        { status: 400 }
      )
    }

    // Get business info
    const businessInfo = await getBusinessInfo(placeId)

    let reviews = null
    if (includeReviews) {
      reviews = await getReviewData(placeId)
    }

    return NextResponse.json({
      success: true,
      data: {
        business: businessInfo,
        reviews: reviews,
      }
    })

  } catch (error) {
    console.error('Google Maps API error:', error)

    // Return mock data for development
    const businessInfo = getMockBusinessInfo()
    const reviews = await getReviewData('mock-place-id')

    return NextResponse.json({
      success: true,
      data: {
        business: businessInfo,
        reviews: reviews,
        note: 'Using mock data - Google Maps API not configured'
      }
    })
  }
}

// POST - Create custom map data or handle map interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'getDirections':
        return handleGetDirections(data)
      case 'calculateDistance':
        return handleCalculateDistance(data)
      case 'getNearbyPlaces':
        return handleGetNearbyPlaces(data)
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Google Maps POST API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle directions request
async function handleGetDirections(data: any) {
  try {
    const { origin, destination, mode = 'driving' } = data

    // In a real implementation, you would call Google Directions API
    // For now, return mock directions
    const mockDirections = {
      routes: [{
        summary: 'Fastest route',
        legs: [{
          distance: { text: '15.2 mi', value: 24460 },
          duration: { text: '28 mins', value: 1680 },
          steps: [
            'Head north on Main St',
            'Turn right onto Oak Ave',
            'Continue for 5 miles',
            'Turn left onto Workshop Rd',
            'Arrive at destination'
          ]
        }]
      }],
      status: 'OK'
    }

    return NextResponse.json({
      success: true,
      data: mockDirections
    })

  } catch (error) {
    console.error('Get directions error:', error)
    throw error
  }
}

// Handle distance calculation
async function handleCalculateDistance(data: any) {
  try {
    const { origin, destination, mode = 'driving' } = data

    // Mock distance calculation
    const mockDistance = {
      distance: { text: '15.2 mi', value: 24460 },
      duration: { text: '28 mins', value: 1680 },
      status: 'OK'
    }

    return NextResponse.json({
      success: true,
      data: mockDistance
    })

  } catch (error) {
    console.error('Calculate distance error:', error)
    throw error
  }
}

// Handle nearby places search
async function handleGetNearbyPlaces(data: any) {
  try {
    const { location, radius = 5000, type = 'carpenter' } = data

    // Mock nearby places
    const mockNearbyPlaces = [
      {
        name: 'Master Woodworks',
        address: '123 Carpenter St, Nearby City',
        rating: 4.5,
        place_id: 'nearby-1',
        location: { lat: 40.7128, lng: -74.0060 }
      },
      {
        name: 'Quality Carpentry',
        address: '456 Oak Ave, Nearby Town',
        rating: 4.2,
        place_id: 'nearby-2',
        location: { lat: 40.7589, lng: -73.9851 }
      }
    ]

    return NextResponse.json({
      success: true,
      data: mockNearbyPlaces
    })

  } catch (error) {
    console.error('Get nearby places error:', error)
    throw error
  }
}

// Generate embedded map URL
export async function generateEmbedUrl(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const zoom = searchParams.get('zoom') || '15'

    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, message: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Generate Google Maps embed URL
    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=${zoom}`

    return NextResponse.json({
      success: true,
      data: { embedUrl }
    })

  } catch (error) {
    console.error('Generate embed URL error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Check if Google Maps is configured
export function isGoogleMapsConfigured() {
  return !!process.env.GOOGLE_MAPS_API_KEY
}

export default {
  GET,
  POST,
  generateEmbedUrl,
  isGoogleMapsConfigured
}

// Type definitions for Google Maps API responses
export interface GoogleMapsBusinessInfo {
  name: string
  address: string
  phone: string
  website: string
  rating: number
  reviewCount: number
  hours: string[]
  photos: string[]
  location: {
    lat: number
    lng: number
  }
}

export interface GoogleMapsReview {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
  relative_time_description: string
}

export interface DirectionsResult {
  routes: Array<{
    summary: string
    legs: Array<{
      distance: { text: string; value: number }
      duration: { text: string; value: number }
      steps: string[]
    }>
  }>
  status: string
}

export interface NearbyPlacesResult {
  name: string
  address: string
  rating: number
  place_id: string
  location: {
    lat: number
    lng: number
  }
}

export interface MapEmbedData {
  embedUrl: string
  width?: number
  height?: number
  options?: {
    zoom?: number
    maptype?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain'
    markers?: Array<{ lat: number; lng: number; title?: string }>
  }
}

// Mock data for development
export const getMockMapData = () => ({
  businessInfo: {
    name: "Ogun Carpentry",
    address: "123 Craftsmanship Lane, Metropolitan Area, ST 12345",
    phone: "(555) 123-4567",
    website: "https://oguncarpentry.com",
    rating: 4.9,
    reviewCount: 127,
    hours: [
      "Monday: 7:00 AM – 6:00 PM",
      "Tuesday: 7:00 AM – 6:00 PM",
      "Wednesday: 7:00 AM – 6:00 PM",
      "Thursday: 7:00 AM – 6:00 PM",
      "Friday: 7:00 AM – 6:00 PM",
      "Saturday: 8:00 AM – 4:00 PM",
      "Sunday: Closed"
    ],
    photos: [],
    location: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  serviceArea: {
    center: { lat: 40.7128, lng: -74.0060 },
    radius: 50000, // 50km radius
    coveredAreas: [
      "Downtown Metropolitan",
      "North Side",
      "South Side",
      "East Side",
      "West Side",
      "Suburban Areas"
    ]
  },
  directions: {
    fromDowntown: "15 minutes drive",
    fromAirport: "25 minutes drive",
    fromHighway: "5 minutes drive"
  }
})

// Service area coordinates for different regions
export const SERVICE_AREAS = {
  METROPOLITAN: {
    center: { lat: 40.7128, lng: -74.0060 },
    radius: 50000,
    name: "Metropolitan Area"
  },
  CENTRAL_FLORIDA: {
    center: { lat: 28.5383, lng: -81.3792 },
    radius: 100000,
    name: "Central Florida"
  },
  SOUTH_FLORIDA: {
    center: { lat: 25.7617, lng: -80.1918 },
    radius: 150000,
    name: "South Florida"
  }
}

// Map styling options
export const MAP_STYLES = {
  STANDARD: 'roadmap',
  SATELLITE: 'satellite',
  HYBRID: 'hybrid',
  TERRAIN: 'terrain'
}

// Custom map styling for Ogun Carpentry brand
export const CUSTOM_MAP_STYLE = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f3f0" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#1e3a2f" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#2e2e2e" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  }
]

// Default map configuration
export const DEFAULT_MAP_CONFIG = {
  zoom: 15,
  center: { lat: 40.7128, lng: -74.0060 },
  mapTypeId: 'roadmap',
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: CUSTOM_MAP_STYLE
}

export default {
  GET,
  POST,
  generateEmbedUrl,
  isGoogleMapsConfigured,
  getMockMapData,
  SERVICE_AREAS,
  MAP_STYLES,
  CUSTOM_MAP_STYLE,
  DEFAULT_MAP_CONFIG
}