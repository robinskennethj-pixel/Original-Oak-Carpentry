// Instagram Basic Display API integration
// Note: Instagram Basic Display API is primarily for displaying user media
// For business features like insights and publishing, you'd need Instagram Graph API

export interface InstagramMedia {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  timestamp: string
  username: string
  like_count?: number
  comments_count?: number
  thumbnail_url?: string // For videos
  children?: { // For carousel posts
    data: Array<{
      id: string
      media_type: 'IMAGE' | 'VIDEO'
      media_url: string
      thumbnail_url?: string
    }>
  }
}

export interface InstagramUser {
  id: string
  username: string
  account_type: 'BUSINESS' | 'MEDIA_CREATOR' | 'PERSONAL'
  media_count: number
}

// Instagram Basic Display API configuration
const INSTAGRAM_API_URL = 'https://graph.instagram.com'

class InstagramAPI {
  private accessToken: string
  private userId: string

  constructor(accessToken: string, userId: string) {
    this.accessToken = accessToken
    this.userId = userId
  }

  async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${INSTAGRAM_API_URL}${endpoint}`)
    url.searchParams.append('access_token', this.accessToken)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    try {
      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('Instagram API request failed:', error)
      throw error
    }
  }

  // Get user information
  async getUserInfo() {
    return this.makeRequest('/me', {
      fields: 'id,username,account_type,media_count'
    })
  }

  // Get user's media
  async getUserMedia(limit: number = 12, fields: string = 'id,caption,media_type,media_url,permalink,timestamp,username,like_count,comments_count,thumbnail_url') {
    return this.makeRequest(`/${this.userId}/media`, {
      fields,
      limit: limit.toString()
    })
  }

  // Get specific media details
  async getMediaDetails(mediaId: string, fields: string = 'id,caption,media_type,media_url,permalink,timestamp,username,like_count,comments_count,thumbnail_url,children{id,media_type,media_url,thumbnail_url}') {
    return this.makeRequest(`/${mediaId}`, {
      fields
    })
  }

  // Get media children (for carousel posts)
  async getMediaChildren(mediaId: string) {
    return this.makeRequest(`/${mediaId}/children`)
  }
}

// Initialize Instagram API client
export const createInstagramClient = (accessToken: string, userId: string) => {
  return new InstagramAPI(accessToken, userId)
}

// Get Instagram feed with error handling and fallback
export const getInstagramFeed = async (accessToken: string, userId: string, limit: number = 9) => {
  try {
    const client = createInstagramClient(accessToken, userId)
    const data = await client.getUserMedia(limit)

    if (data.data) {
      return data.data.map(formatInstagramMedia)
    }

    return []
  } catch (error) {
    console.error('Error fetching Instagram feed:', error)

    // Return mock data for development
    return getMockInstagramFeed()
  }
}

// Format Instagram media for consistent display
const formatInstagramMedia = (media: any): InstagramMedia => {
  return {
    id: media.id,
    caption: media.caption,
    media_type: media.media_type,
    media_url: media.media_url,
    permalink: media.permalink,
    timestamp: media.timestamp,
    username: media.username,
    like_count: media.like_count,
    comments_count: media.comments_count,
    thumbnail_url: media.thumbnail_url,
    children: media.children,
  }
}

// Mock Instagram data for development
export const getMockInstagramFeed = (): InstagramMedia[] => ([
  {
    id: 'mock-1',
    caption: 'Just finished this beautiful oak dining table with traditional joinery. The grain patterns are absolutely stunning! #woodworking #oak #diningtable #craftsmanship',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1080',
    permalink: 'https://instagram.com/p/mock1',
    timestamp: '2024-09-20T10:00:00Z',
    username: 'ogun_carpentry',
    like_count: 142,
    comments_count: 23,
  },
  {
    id: 'mock-2',
    caption: 'Custom iron gates we forged for a client. Love how the metalwork complements the reclaimed wood panels. #metalwork #forging #customgates #reclaimedwood',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080',
    permalink: 'https://instagram.com/p/mock2',
    timestamp: '2024-09-18T14:30:00Z',
    username: 'ogun_carpentry',
    like_count: 89,
    comments_count: 15,
  },
  {
    id: 'mock-3',
    caption: 'Behind the scenes in our workshop. Every piece is crafted with precision and care. #workshop #tools #craftsmanship #oguncarpentry',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1080',
    permalink: 'https://instagram.com/p/mock3',
    timestamp: '2024-09-16T09:15:00Z',
    username: 'ogun_carpentry',
    like_count: 201,
    comments_count: 31,
  },
  {
    id: 'mock-4',
    caption: 'Restoration project in progress. Bringing this 1920s armoire back to life with period-appropriate techniques. #restoration #antique #woodwork #preservation',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1080',
    permalink: 'https://instagram.com/p/mock4',
    timestamp: '2024-09-14T16:45:00Z',
    username: 'ogun_carpentry',
    like_count: 167,
    comments_count: 28,
  },
  {
    id: 'mock-5',
    caption: 'Custom metal railings with traditional forging techniques. Every detail matters! #metalwork #forging #railings #customwork',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1080',
    permalink: 'https://instagram.com/p/mock5',
    timestamp: '2024-09-12T11:20:00Z',
    username: 'ogun_carpentry',
    like_count: 134,
    comments_count: 19,
  },
  {
    id: 'mock-6',
    caption: 'Reclaimed wood feature wall installation complete! Love how the natural textures create such warmth. #reclaimedwood #featurewall #sustainable #texture',
    media_type: 'IMAGE',
    media_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1080',
    permalink: 'https://instagram.com/p/mock6',
    timestamp: '2024-09-10T13:10:00Z',
    username: 'ogun_carpentry',
    like_count: 98,
    comments_count: 14,
  },
])

// Get Instagram user info
export const getInstagramUserInfo = async (accessToken: string, userId: string) => {
  try {
    const client = createInstagramClient(accessToken, userId)
    return await client.getUserInfo()
  } catch (error) {
    console.error('Error fetching Instagram user info:', error)

    return {
      id: 'mock-user',
      username: 'ogun_carpentry',
      account_type: 'BUSINESS',
      media_count: 156
    }
  }
}

// Get specific media details
export const getInstagramMediaDetails = async (accessToken: string, mediaId: string) => {
  try {
    const client = createInstagramClient(accessToken, process.env.INSTAGRAM_USER_ID!)
    const media = await client.getMediaDetails(mediaId)
    return formatInstagramMedia(media)
  } catch (error) {
    console.error('Error fetching Instagram media details:', error)
    return null
  }
}

// Filter Instagram posts by hashtag
export const filterPostsByHashtag = (posts: InstagramMedia[], hashtag: string) => {
  return posts.filter(post => {
    if (!post.caption) return false
    const hashtagRegex = new RegExp(`#${hashtag}\\b`, 'i')
    return hashtagRegex.test(post.caption)
  })
}

// Get posts by media type
export const filterPostsByType = (posts: InstagramMedia[], type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM') => {
  return posts.filter(post => post.media_type === type)
}

// Format Instagram data for component display
export const formatInstagramForDisplay = (posts: InstagramMedia[]) => {
  return posts.map(post => ({
    id: post.id,
    imageUrl: post.media_url,
    permalink: post.permalink,
    caption: post.caption,
    likeCount: post.like_count || 0,
    commentCount: post.comments_count || 0,
    timestamp: post.timestamp,
    formattedDate: formatInstagramDate(post.timestamp),
    isVideo: post.media_type === 'VIDEO',
    thumbnailUrl: post.thumbnail_url,
    children: post.children?.data.map(child => ({
      id: child.id,
      mediaUrl: child.media_url,
      isVideo: child.media_type === 'VIDEO',
      thumbnailUrl: child.thumbnail_url,
    })),
  }))
}

// Format Instagram date
const formatInstagramDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  } else {
    return 'Just now'
  }
}

// Get Instagram feed with specific filters
export const getInstagramFeedFiltered = async (
  accessToken: string,
  userId: string,
  options: {
    limit?: number
    type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
    hashtag?: string
    featured?: boolean
  } = {}
) => {
  try {
    const posts = await getInstagramFeed(accessToken, userId, options.limit || 12)
    let filteredPosts = posts

    // Filter by media type
    if (options.type) {
      filteredPosts = filterPostsByType(filteredPosts, options.type)
    }

    // Filter by hashtag
    if (options.hashtag) {
      filteredPosts = filterPostsByHashtag(filteredPosts, options.hashtag)
    }

    // Filter featured posts (high engagement)
    if (options.featured) {
      filteredPosts = filteredPosts
        .filter(post => (post.like_count || 0) > 50)
        .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
        .slice(0, 6)
    }

    return formatInstagramForDisplay(filteredPosts)
  } catch (error) {
    console.error('Error fetching filtered Instagram feed:', error)
    return formatInstagramForDisplay(getMockInstagramFeed())
  }
}

// Instagram Graph API for business accounts (more features)
export class InstagramGraphAPI {
  private accessToken: string
  private businessAccountId: string

  constructor(accessToken: string, businessAccountId: string) {
    this.accessToken = accessToken
    this.businessAccountId = businessAccountId
  }

  async makeRequest(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`https://graph.facebook.com/v18.0/${endpoint}`)
    url.searchParams.append('access_token', this.accessToken)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Instagram Graph API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Get account insights
  async getAccountInsights(metrics: string[] = ['impressions', 'reach', 'profile_views'], period: 'day' | 'week' | 'days_28' = 'week') {
    return this.makeRequest(`${this.businessAccountId}/insights`, {
      metric: metrics.join(','),
      period,
    })
  }

  // Get media insights
  async getMediaInsights(mediaId: string, metrics: string[] = ['impressions', 'reach', 'saved']) {
    return this.makeRequest(`/${mediaId}/insights`, {
      metric: metrics.join(','),
    })
  }

  // Get hashtag analytics
  async getHashtagInfo(hashtagName: string) {
    return this.makeRequest('/ig_hashtag_search', {
      q: hashtagName,
      access_token: this.accessToken,
    })
  }

  // Get stories
  async getStories() {
    return this.makeRequest(`${this.businessAccountId}/stories`, {
      fields: 'id,media_type,media_url,permalink,timestamp',
    })
  }
}

// Check if Instagram is configured
export const isInstagramConfigured = () => {
  return !!(
    process.env.INSTAGRAM_ACCESS_TOKEN &&
    process.env.INSTAGRAM_USER_ID
  )
}

// Get Instagram widget data
export const getInstagramWidgetData = async (accessToken: string, userId: string) => {
  try {
    const [userInfo, feed] = await Promise.all([
      getInstagramUserInfo(accessToken, userId),
      getInstagramFeedFiltered(accessToken, userId, { limit: 6, featured: true })
    ])

    return {
      user: userInfo,
      posts: feed,
      profileUrl: `https://instagram.com/${userInfo.username}`,
      followerCount: userInfo.followers_count || 0, // Only available for business accounts
      isConfigured: true,
    }
  } catch (error) {
    console.error('Error fetching Instagram widget data:', error)

    return {
      user: {
        username: 'ogun_carpentry',
        media_count: 156,
      },
      posts: formatInstagramForDisplay(getMockInstagramFeed()),
      profileUrl: 'https://instagram.com/ogun_carpentry',
      followerCount: 1842,
      isConfigured: false,
    }
  }
}

// Instagram embed component helper
export const getInstagramEmbedUrl = (postUrl: string) => {
  // Convert Instagram post URL to embed URL
  const postId = postUrl.split('/p/')[1]?.split('/')[0]
  return postId ? `https://www.instagram.com/p/${postId}/embed` : ''
}

// Instagram API endpoints for Next.js
export const createInstagramAPIEndpoints = () => ({
  async getFeed(limit = 9, type?: string, hashtag?: string) {
    if (!isInstagramConfigured()) {
      return formatInstagramForDisplay(getMockInstagramFeed())
    }

    return await getInstagramFeedFiltered(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      process.env.INSTAGRAM_USER_ID!,
      { limit, type, hashtag }
    )
  },

  async getUserInfo() {
    if (!isInstagramConfigured()) {
      return {
        username: 'ogun_carpentry',
        media_count: 156,
      }
    }

    return await getInstagramUserInfo(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      process.env.INSTAGRAM_USER_ID!
    )
  },

  async getMediaDetails(mediaId: string) {
    if (!isInstagramConfigured()) {
      return formatInstagramForDisplay(getMockInstagramFeed())[0]
    }

    return await getInstagramMediaDetails(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      mediaId
    )
  }
})

export default {
  createInstagramClient,
  getInstagramFeed,
  getInstagramUserInfo,
  getInstagramMediaDetails,
  filterPostsByHashtag,
  filterPostsByType,
  formatInstagramForDisplay,
  getInstagramFeedFiltered,
  getInstagramWidgetData,
  getInstagramEmbedUrl,
  isInstagramConfigured,
  createInstagramAPIEndpoints,
  InstagramGraphAPI,
  getMockInstagramFeed,
}

// Environment variables needed:
// INSTAGRAM_ACCESS_TOKEN
// INSTAGRAM_USER_ID
// INSTAGRAM_APP_ID (for Graph API)
// INSTAGRAM_APP_SECRET (for Graph API)
// INSTAGRAM_BUSINESS_ACCOUNT_ID (for Graph API)