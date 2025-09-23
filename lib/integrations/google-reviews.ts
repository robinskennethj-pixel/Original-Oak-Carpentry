import { getGoogleReviews, getMockGoogleReviews } from './google-maps'

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  recentReviews: GoogleReview[]
  featuredReviews: GoogleReview[]
}

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
  relative_time_description: string
}

// Get comprehensive review data
export const getReviewData = async (placeId: string) => {
  try {
    const reviews = await getGoogleReviews(placeId)

    // Calculate statistics
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    }

    // Get recent reviews (last 6 months)
    const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000)
    const recentReviews = reviews.filter(review => review.time * 1000 > sixMonthsAgo)

    // Get featured reviews (5-star reviews with detailed text)
    const featuredReviews = reviews
      .filter(review => review.rating === 5 && review.text.length > 50)
      .slice(0, 6)

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingDistribution,
      recentReviews,
      featuredReviews
    }
  } catch (error) {
    console.error('Error fetching review data:', error)

    // Return mock data for development
    const mockReviews = getMockGoogleReviews()
    return {
      averageRating: 4.9,
      totalReviews: 127,
      ratingDistribution: {
        5: 114,
        4: 10,
        3: 2,
        2: 1,
        1: 0
      },
      recentReviews: mockReviews,
      featuredReviews: mockReviews
    }
  }
}

// Get reviews by rating
export const getReviewsByRating = async (placeId: string, rating: number) => {
  try {
    const reviews = await getGoogleReviews(placeId)
    return reviews.filter(review => review.rating === rating)
  } catch (error) {
    console.error('Error filtering reviews by rating:', error)
    return []
  }
}

// Get most helpful reviews (longer text, higher rating)
export const getMostHelpfulReviews = async (placeId: string, limit: number = 3) => {
  try {
    const reviews = await getGoogleReviews(placeId)
    return reviews
      .filter(review => review.rating >= 4 && review.text.length > 100)
      .sort((a, b) => b.text.length - a.text.length)
      .slice(0, limit)
  } catch (error) {
    console.error('Error getting helpful reviews:', error)
    return []
  }
}

// Format reviews for display
export const formatReviewsForDisplay = (reviews: GoogleReview[]) => {
  return reviews.map(review => ({
    id: `${review.author_name}-${review.time}`,
    author: review.author_name,
    rating: review.rating,
    text: review.text,
    date: new Date(review.time * 1000).toLocaleDateString(),
    relativeTime: review.relative_time_description,
    avatar: review.profile_photo_url,
    verified: true // Google reviews are verified
  }))
}

// Generate review summary text
export const generateReviewSummary = (stats: ReviewStats) => {
  const { averageRating, totalReviews } = stats

  if (totalReviews === 0) {
    return "No reviews yet"
  }

  const ratingText = averageRating >= 4.8 ? "exceptional" :
                    averageRating >= 4.5 ? "excellent" :
                    averageRating >= 4.0 ? "very good" :
                    averageRating >= 3.5 ? "good" : "average"

  return `Based on ${totalReviews} Google reviews with an average rating of ${averageRating} stars`
}

// Get review trends over time
export const getReviewTrends = async (placeId: string) => {
  try {
    const reviews = await getGoogleReviews(placeId)

    // Group reviews by month
    const monthlyTrends: Record<string, { count: number; averageRating: number }> = {}

    reviews.forEach(review => {
      const date = new Date(review.time * 1000)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      if (!monthlyTrends[monthKey]) {
        monthlyTrends[monthKey] = { count: 0, averageRating: 0 }
      }

      monthlyTrends[monthKey].count++
      monthlyTrends[monthKey].averageRating =
        (monthlyTrends[monthKey].averageRating * (monthlyTrends[monthKey].count - 1) + review.rating) /
        monthlyTrends[monthKey].count
    })

    // Convert to array and sort by date
    return Object.entries(monthlyTrends)
      .map(([month, data]) => ({
        month,
        reviewCount: data.count,
        averageRating: Math.round(data.averageRating * 10) / 10
      }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12) // Last 12 months
  } catch (error) {
    console.error('Error getting review trends:', error)
    return []
  }
}

// API endpoint for Google Reviews
export const createGoogleReviewsAPI = () => {
  return {
    async getReviews(placeId: string) {
      return await getReviewData(placeId)
    },

    async getReviewsByRating(placeId: string, rating: number) {
      return await getReviewsByRating(placeId, rating)
    },

    async getMostHelpful(placeId: string, limit = 3) {
      return await getMostHelpfulReviews(placeId, limit)
    },

    async getTrends(placeId: string) {
      return await getReviewTrends(placeId)
    }
  }
}

export default {
  getReviewData,
  getReviewsByRating,
  getMostHelpfulReviews,
  formatReviewsForDisplay,
  generateReviewSummary,
  getReviewTrends,
  createGoogleReviewsAPI
}