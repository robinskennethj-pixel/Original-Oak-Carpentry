import { NextRequest, NextResponse } from 'next/server'
import {
  getInstagramFeed,
  getInstagramUserInfo,
  getInstagramMediaDetails,
  getInstagramFeedFiltered,
  formatInstagramForDisplay,
  isInstagramConfigured,
  getMockInstagramFeed
} from '@/lib/integrations/instagram'
import { z } from 'zod'

// Validation schemas
const feedSchema = z.object({
  limit: z.number().min(1).max(50).default(12),
  type: z.enum(['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM']).optional(),
  hashtag: z.string().optional(),
  featured: z.boolean().default(false),
})

const mediaDetailsSchema = z.object({
  mediaId: z.string(),
})

// GET - Get Instagram data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'feed'

    switch (type) {
      case 'feed':
        return await handleGetFeed(request)
      case 'user-info':
        return await handleGetUserInfo()
      case 'media-details':
        return await handleGetMediaDetails(request)
      case 'widget-data':
        return await handleGetWidgetData()
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid request type' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Instagram GET API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Handle Instagram actions (like, comment, etc.)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    if (!isInstagramConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Instagram not configured',
        note: 'Please configure Instagram API credentials'
      })
    }

    switch (action) {
      case 'like-media':
        return await handleLikeMedia(data)
      case 'comment-media':
        return await handleCommentMedia(data)
      case 'save-media':
        return await handleSaveMedia(data)
      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Instagram POST API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle get Instagram feed
async function handleGetFeed(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '12')
    const mediaType = searchParams.get('type') as 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | undefined
    const hashtag = searchParams.get('hashtag') || undefined
    const featured = searchParams.get('featured') === 'true'

    if (!isInstagramConfigured()) {
      const mockFeed = getMockInstagramFeed()
      const filteredFeed = await filterAndFormatFeed(mockFeed, { type: mediaType, hashtag, featured })

      return NextResponse.json({
        success: true,
        data: filteredFeed,
        note: 'Using mock data - Instagram not configured'
      })
    }

    const feed = await getInstagramFeedFiltered(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      process.env.INSTAGRAM_USER_ID!,
      { limit, type: mediaType, hashtag, featured }
    )

    return NextResponse.json({
      success: true,
      data: feed
    })

  } catch (error) {
    console.error('Get Instagram feed error:', error)

    // Return mock data on error
    const mockFeed = getMockInstagramFeed()
    const filteredFeed = await filterAndFormatFeed(mockFeed)

    return NextResponse.json({
      success: true,
      data: filteredFeed,
      note: 'Using mock data due to API error'
    })
  }
}

// Handle get user info
async function handleGetUserInfo() {
  try {
    if (!isInstagramConfigured()) {
      return NextResponse.json({
        success: true,
        data: {
          username: 'ogun_carpentry',
          media_count: 156,
          account_type: 'BUSINESS',
        },
        note: 'Using mock data - Instagram not configured'
      })
    }

    const userInfo = await getInstagramUserInfo(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      process.env.INSTAGRAM_USER_ID!
    )

    return NextResponse.json({
      success: true,
      data: userInfo
    })

  } catch (error) {
    console.error('Get Instagram user info error:', error)
    throw error
  }
}

// Handle get media details
async function handleGetMediaDetails(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json(
        { success: false, message: 'Media ID is required' },
        { status: 400 }
      )
    }

    if (!isInstagramConfigured()) {
      const mockFeed = getMockInstagramFeed()
      const media = mockFeed.find(post => post.id === mediaId)

      return NextResponse.json({
        success: true,
        data: media || mockFeed[0],
        note: 'Using mock data - Instagram not configured'
      })
    }

    const mediaDetails = await getInstagramMediaDetails(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      mediaId
    )

    return NextResponse.json({
      success: true,
      data: mediaDetails
    })

  } catch (error) {
    console.error('Get Instagram media details error:', error)
    throw error
  }
}

// Handle get widget data
async function handleGetWidgetData() {
  try {
    const widgetData = await getInstagramWidgetData(
      process.env.INSTAGRAM_ACCESS_TOKEN!,
      process.env.INSTAGRAM_USER_ID!
    )

    return NextResponse.json({
      success: true,
      data: widgetData
    })

  } catch (error) {
    console.error('Get Instagram widget data error:', error)

    // Return mock widget data
    return NextResponse.json({
      success: true,
      data: {
        user: {
          username: 'ogun_carpentry',
          media_count: 156,
        },
        posts: formatInstagramForDisplay(getMockInstagramFeed()),
        profileUrl: 'https://instagram.com/ogun_carpentry',
        followerCount: 1842,
        isConfigured: false,
      },
      note: 'Using mock data - Instagram not configured'
    })
  }
}

// Handle like media (requires Instagram Graph API for business accounts)
async function handleLikeMedia(data: any) {
  try {
    const { mediaId } = data

    if (!isInstagramConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Instagram not configured'
      })
    }

    // Note: Liking media requires Instagram Graph API and business account
    // This is a placeholder for the implementation

    return NextResponse.json({
      success: true,
      message: 'Media liked successfully (mock)'
    })

  } catch (error) {
    console.error('Like media error:', error)
    throw error
  }
}

// Handle comment on media (requires Instagram Graph API)
async function handleCommentMedia(data: any) {
  try {
    const { mediaId, comment } = data

    if (!isInstagramConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Instagram not configured'
      })
    }

    // Note: Commenting requires Instagram Graph API and business account
    // This is a placeholder for the implementation

    return NextResponse.json({
      success: true,
      message: 'Comment posted successfully (mock)'
    })

  } catch (error) {
    console.error('Comment media error:', error)
    throw error
  }
}

// Handle save media (requires Instagram Graph API)
async function handleSaveMedia(data: any) {
  try {
    const { mediaId } = data

    if (!isInstagramConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Instagram not configured'
      })
    }

    // Note: Saving media requires Instagram Graph API and business account
    // This is a placeholder for the implementation

    return NextResponse.json({
      success: true,
      message: 'Media saved successfully (mock)'
    })

  } catch (error) {
    console.error('Save media error:', error)
    throw error
  }
}

// Filter and format Instagram feed
async function filterAndFormatFeed(posts: any[], options: {
  type?: string
  hashtag?: string
  featured?: boolean
} = {}) {
  let filteredPosts = posts

  // Filter by media type
  if (options.type) {
    filteredPosts = filteredPosts.filter(post => post.media_type === options.type)
  }

  // Filter by hashtag
  if (options.hashtag) {
    filteredPosts = posts.filter(post => {
      if (!post.caption) return false
      const hashtagRegex = new RegExp(`#${options.hashtag}\\b`, 'i')
      return hashtagRegex.test(post.caption)
    })
  }

  // Filter featured posts (high engagement)
  if (options.featured) {
    filteredPosts = filteredPosts
      .filter(post => (post.like_count || 0) > 50)
      .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
      .slice(0, 6)
  }

  return formatInstagramForDisplay(filteredPosts)
}

// Check if Instagram is configured
export function isInstagramConfigured() {
  return !!(
    process.env.INSTAGRAM_ACCESS_TOKEN &&
    process.env.INSTAGRAM_USER_ID
  )
}

// Get Instagram embed URL for a post
export function getInstagramEmbedUrl(postUrl: string) {
  const postId = postUrl.split('/p/')[1]?.split('/')[0]
  return postId ? `https://www.instagram.com/p/${postId}/embed` : ''
}

// Get Instagram profile URL
export function getInstagramProfileUrl(username?: string) {
  const profileUsername = username || 'ogun_carpentry'
  return `https://instagram.com/${profileUsername}`
}

// Instagram analytics tracking
export const trackInstagramAnalytics = (postData: any, eventType: string) => {
  // This would integrate with Google Analytics
  console.log('Instagram Analytics:', {
    event: eventType,
    post_id: postData.id,
    media_type: postData.media_type,
    like_count: postData.like_count,
    comment_count: postData.comments_count,
  })
}

// Instagram feed optimization
export const optimizeInstagramFeed = (posts: any[]) => {
  // Sort by engagement
  // Filter out low-quality posts
  // Ensure variety in content types
  // Optimize for different devices

  return posts
    .sort((a, b) => (b.like_count || 0) - (a.like_count || 0))
    .slice(0, 12)
    .map((post, index) => ({
      ...post,
      position: index + 1,
      quality_score: calculateQualityScore(post),
    }))
}

// Calculate quality score for Instagram posts
const calculateQualityScore = (post: any) => {
  const likeScore = (post.like_count || 0) * 1
  const commentScore = (post.comments_count || 0) * 2
  const recencyScore = getRecencyScore(post.timestamp)
  const captionScore = post.caption ? (post.caption.length > 50 ? 10 : 5) : 0

  return likeScore + commentScore + recencyScore + captionScore
}

// Calculate recency score
const getRecencyScore = (timestamp: string) => {
  const postDate = new Date(timestamp)
  const now = new Date()
  const daysDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)

  if (daysDiff < 7) return 20
  if (daysDiff < 30) return 15
  if (daysDiff < 90) return 10
  return 5
}

// Instagram hashtag suggestions
export const getInstagramHashtags = () => ([
  '#oguncarpentry',
  '#customwoodwork',
  '#metalwork',
  '#craftsmanship',
  '#woodworking',
  '#handmade',
  '#customfurniture',
  '#restoration',
  '#sustainablewood',
  '#traditionaltechniques',
  '#modernwoodwork',
  '#bespoke',
  '#woodgrain',
  '#joinery',
  '#woodshop',
  '#metalfabrication',
  '#forging',
  '#customdesign',
  '#interiordesign',
  '#homedecor',
])

// Instagram content calendar suggestions
export const getInstagramContentIdeas = () => ([
  {
    type: 'before_after',
    title: 'Before & After Restoration',
    description: 'Show transformation of restored piece',
    hashtags: ['#restoration', '#beforeandafter', '#transformation']
  },
  {
    type: 'process',
    title: 'Woodworking Process',
    description: 'Show step-by-step crafting process',
    hashtags: ['#woodworking', '#process', '#handmade']
  },
  {
    type: 'tools',
    title: 'Tools of the Trade',
    description: 'Showcase traditional and modern tools',
    hashtags: ['#tools', '#craftsmanship', '#tradition']
  },
  {
    type: 'materials',
    title: 'Material Spotlight',
    description: 'Highlight different wood types',
    hashtags: ['#wood', '#materials', '#sustainable']
  },
  {
    type: 'team',
    title: 'Meet the Team',
    description: 'Introduce team members',
    hashtags: ['#team', '#craftsmen', '#behindthescenes']
  }
])

// Instagram performance metrics
export const getInstagramMetrics = (posts: any[]) => {
  const totalPosts = posts.length
  const totalLikes = posts.reduce((sum, post) => sum + (post.like_count || 0), 0)
  const totalComments = posts.reduce((sum, post) => sum + (post.comments_count || 0), 0)
  const averageLikes = totalLikes / totalPosts
  const averageComments = totalComments / totalPosts
  const engagementRate = ((totalLikes + totalComments) / (totalPosts * 1000)) * 100

  return {
    totalPosts,
    totalLikes,
    totalComments,
    averageLikes: Math.round(averageLikes),
    averageComments: Math.round(averageComments),
    engagementRate: Math.round(engagementRate * 100) / 100,
    topPerformingPost: posts.sort((a, b) => (b.like_count || 0) - (a.like_count || 0))[0],
  }
}

// Instagram API rate limiting
export const INSTAGRAM_RATE_LIMITS = {
  FEED_REQUESTS_PER_HOUR: 200,
  MEDIA_REQUESTS_PER_HOUR: 1000,
  USER_REQUESTS_PER_HOUR: 200,
  WEBHOOK_REQUESTS_PER_HOUR: 100,
}

// Instagram API error handling
export const handleInstagramError = (error: any) => {
  if (error.message.includes('rate limit')) {
    return {
      success: false,
      message: 'Instagram API rate limit exceeded',
      retryAfter: 3600, // 1 hour
    }
  }

  if (error.message.includes('access token')) {
    return {
      success: false,
      message: 'Instagram access token expired or invalid',
      action: 'Please re-authenticate'
    }
  }

  if (error.message.includes('permissions')) {
    return {
      success: false,
      message: 'Insufficient Instagram API permissions',
      action: 'Please check app permissions'
    }
  }

  return {
    success: false,
    message: 'Instagram API error occurred',
    error: error.message
  }
}

export default {
  GET,
  POST,
  isInstagramConfigured,
  getInstagramEmbedUrl,
  getInstagramProfileUrl,
  trackInstagramAnalytics,
  optimizeInstagramFeed,
  getInstagramHashtags,
  getInstagramContentIdeas,
  getInstagramMetrics,
  handleInstagramError,
  INSTAGRAM_RATE_LIMITS,
}

// Environment variables needed:
// INSTAGRAM_ACCESS_TOKEN
// INSTAGRAM_USER_ID
// INSTAGRAM_APP_ID (for Graph API)
// INSTAGRAM_APP_SECRET (for Graph API)
// INSTAGRAM_BUSINESS_ACCOUNT_ID (for Graph API)

// Usage examples:
// Get feed: GET /api/integrations/instagram?type=feed&limit=12&featured=true
// Get user info: GET /api/integrations/instagram?type=user-info
// Get media details: GET /api/integrations/instagram?type=media-details&mediaId=xxx
// Get widget data: GET /api/integrations/instagram?type=widget-data
// Like media: POST /api/integrations/instagram { action: 'like-media', data: { mediaId: 'xxx' } }
// Comment media: POST /api/integrations/instagram { action: 'comment-media', data: { mediaId: 'xxx', comment: 'Great work!' } }