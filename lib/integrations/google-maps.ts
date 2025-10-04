import { Client } from '@googlemaps/google-maps-services-js'

const googleMapsClient = new Client({})

export interface BusinessInfo {
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

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
  relative_time_description: string
}

// Get business information from Google Maps
export const getBusinessInfo = async (placeId: string) => {
  try {
    const response = await googleMapsClient.placeDetails({
      params: {
        place_id: placeId,
        fields: [
          'name',
          'formatted_address',
          'formatted_phone_number',
          'website',
          'rating',
          'user_ratings_total',
          'opening_hours',
          'photos',
          'geometry'
        ],
        key: process.env.GOOGLE_MAPS_API_KEY!
      }
    })

    const place = response.data.result

    return {
      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number,
      website: place.website,
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      hours: place.opening_hours?.weekday_text || [],
      photos: place.photos?.map(photo => photo.photo_reference) || [],
      location: {
        lat: place.geometry?.location.lat || 0,
        lng: place.geometry?.location.lng || 0
      }
    }
  } catch (error) {
    console.error('Google Maps API error:', error)
    throw error
  }
}

// Get Google reviews for a business
export const getGoogleReviews = async (placeId: string) => {
  try {
    const response = await googleMapsClient.placeDetails({
      params: {
        place_id: placeId,
        fields: ['reviews'],
        key: process.env.GOOGLE_MAPS_API_KEY!
      }
    })

    const reviews = response.data.result.reviews || []

    return reviews.map(review => ({
      author_name: review.author_name,
      rating: review.rating,
      text: review.text,
      time: review.time,
      profile_photo_url: review.profile_photo_url,
      relative_time_description: review.relative_time_description
    }))
  } catch (error) {
    console.error('Google Reviews API error:', error)
    throw error
  }
}

// Generate Google Maps embed URL
export const getGoogleMapsEmbedUrl = (lat: number, lng: number, zoom: number = 15) => {
  return `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=${zoom}`
}

// Get nearby places (for potential partnerships or references)
export const getNearbyPlaces = async (lat: number, lng: number, radius: number = 5000, type: string = 'carpenter') => {
  try {
    const response = await googleMapsClient.placesNearby({
      params: {
        location: { lat, lng },
        radius,
        type,
        key: process.env.GOOGLE_MAPS_API_KEY!
      }
    })

    return response.data.results.map(place => ({
      name: place.name,
      address: place.vicinity,
      rating: place.rating,
      place_id: place.place_id,
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      }
    }))
  } catch (error) {
    console.error('Google Maps Nearby API error:', error)
    throw error
  }
}

// Get place photos
export const getPlacePhoto = async (photoReference: string, maxWidth: number = 400) => {
  try {
    const response = await googleMapsClient.placePhoto({
      params: {
        photoreference: photoReference,
        maxwidth: maxWidth,
        key: process.env.GOOGLE_MAPS_API_KEY!
      }
    })

    return response.data
  } catch (error) {
    console.error('Google Maps Photo API error:', error)
    throw error
  }
}

// Mock data for development (when API key is not available)
export const getMockBusinessInfo = (): BusinessInfo => ({
  name: "Original Oak Carpentry",
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
})

export const getMockGoogleReviews = (): GoogleReview[] => ([
  {
    author_name: "Marcus Williams",
    rating: 5,
    text: "Original Oak Carpentry restored my great-grandfather's armoire to perfection. The traditional techniques they used brought it back to life better than I ever imagined.",
    time: 1705324800,
    profile_photo_url: "/satisfied-homeowner.jpg",
    relative_time_description: "6 months ago"
  },
  {
    author_name: "Aisha Johnson",
    rating: 5,
    text: "The custom metal gates they forged for our restaurant entrance are absolutely stunning. Every detail shows the master craftsman's touch.",
    time: 1708406400,
    profile_photo_url: "/happy-homeowner-woman.jpg",
    relative_time_description: "4 months ago"
  }
])

export default {
  getBusinessInfo,
  getGoogleReviews,
  getGoogleMapsEmbedUrl,
  getNearbyPlaces,
  getPlacePhoto,
  getMockBusinessInfo,
  getMockGoogleReviews
}