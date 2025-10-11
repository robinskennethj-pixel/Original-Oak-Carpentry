import { Cloudinary } from '@cloudinary/url-gen'
import { Resize, Crop, Gravity } from '@cloudinary/url-gen/actions/resize'
import { Format, Quality } from '@cloudinary/url-gen/actions/delivery'
import { Effect } from '@cloudinary/url-gen/actions/effect'
import { fill, scale } from '@cloudinary/url-gen/actions/resize'

// Initialize Cloudinary
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  },
  url: {
    secure: true,
  },
})

export interface ImageUploadResult {
  public_id: string
  secure_url: string
  url: string
  width: number
  height: number
  format: string
  bytes: number
}

export interface ImageTransformations {
  width?: number
  height?: number
  crop?: 'fill' | 'scale' | 'crop' | 'thumb' | 'pad'
  quality?: 'auto' | 'low' | 'good' | 'best'
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif'
  effects?: string[]
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west'
}

// Get optimized image URL
export const getOptimizedImageUrl = (publicId: string, transformations: ImageTransformations = {}) => {
  let image = cld.image(publicId)

  // Apply resize transformations
  if (transformations.width || transformations.height) {
    const cropType = transformations.crop || 'fill'
    const gravity = transformations.gravity || 'auto'

    switch (cropType) {
      case 'fill':
        image = image.resize(fill().width(transformations.width || 'auto').height(transformations.height || 'auto').gravity(gravity))
        break
      case 'scale':
        image = image.resize(scale().width(transformations.width).height(transformations.height))
        break
      case 'crop':
        image = image.resize(
          Crop.crop(transformations.width || 0, transformations.height || 0)
            .gravity(gravity === 'auto' ? Gravity.auto() : Gravity.center())
        )
        break
      case 'thumb':
        image = image.resize(
          Crop.thumbnail().width(transformations.width || 300).height(transformations.height || 300).gravity(Gravity.face())
        )
        break
      default:
        if (transformations.width && transformations.height) {
          image = image.resize(fill().width(transformations.width).height(transformations.height))
        }
    }
  }

  // Apply format optimization
  if (transformations.format) {
    image = image.delivery(Format.format(transformations.format))
  } else {
    image = image.delivery(Format.auto())
  }

  // Apply quality optimization
  if (transformations.quality) {
    switch (transformations.quality) {
      case 'auto':
        image = image.delivery(Quality.auto())
        break
      case 'low':
        image = image.delivery(Quality.low())
        break
      case 'good':
        image = image.delivery(Quality.good())
        break
      case 'best':
        image = image.delivery(Quality.best())
        break
      default:
        image = image.delivery(Quality.auto())
    }
  } else {
    image = image.delivery(Quality.auto())
  }

  // Apply effects
  if (transformations.effects) {
    transformations.effects.forEach(effect => {
      switch (effect) {
        case 'sharpen':
          image = image.effect(Effect.sharpen())
          break
        case 'improve':
          image = image.effect(Effect.improve())
          break
        case 'vivid':
          image = image.effect(Effect.vivid())
          break
        case 'contrast':
          image = image.effect(Effect.contrast())
          break
        case 'brightness':
          image = image.effect(Effect.brightness())
          break
      }
    })
  }

  return image.toURL()
}

// Predefined image transformations for different use cases
export const IMAGE_PRESETS = {
  // Hero images - large, high quality
  HERO: {
    width: 1920,
    height: 1080,
    crop: 'fill' as const,
    quality: 'best' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },

  // Portfolio gallery - medium quality, responsive
  PORTFOLIO: {
    width: 1200,
    height: 800,
    crop: 'fill' as const,
    quality: 'good' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },

  // Thumbnails - small, fast loading
  THUMBNAIL: {
    width: 400,
    height: 300,
    crop: 'thumb' as const,
    quality: 'good' as const,
    format: 'auto' as const,
    gravity: 'center' as const,
  },

  // Service cards - consistent size
  SERVICE_CARD: {
    width: 600,
    height: 400,
    crop: 'fill' as const,
    quality: 'good' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },

  // Team photos - face focus
  TEAM_PHOTO: {
    width: 500,
    height: 500,
    crop: 'thumb' as const,
    quality: 'good' as const,
    format: 'auto' as const,
    gravity: 'face' as const,
  },

  // Blog images
  BLOG: {
    width: 800,
    height: 600,
    crop: 'fill' as const,
    quality: 'good' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },

  // Social media optimized
  SOCIAL: {
    width: 1200,
    height: 630,
    crop: 'fill' as const,
    quality: 'good' as const,
    format: 'auto' as const,
    gravity: 'center' as const,
  },

  // Logo and branding
  LOGO: {
    width: 300,
    height: 150,
    crop: 'fit' as const,
    quality: 'best' as const,
    format: 'auto' as const,
  },
}

// Get image URL with preset
export const getImageWithPreset = (publicId: string, preset: keyof typeof IMAGE_PRESETS) => {
  return getOptimizedImageUrl(publicId, IMAGE_PRESETS[preset])
}

// Get responsive image URLs (srcset)
export const getResponsiveImageUrls = (publicId: string, baseTransformations: ImageTransformations = {}) => {
  const sizes = [320, 640, 768, 1024, 1280, 1536, 1920]

  return sizes.map(width => ({
    width,
    url: getOptimizedImageUrl(publicId, {
      ...baseTransformations,
      width,
      height: baseTransformations.height ? Math.round((baseTransformations.height * width) / (baseTransformations.width || 1)) : undefined,
    })
  }))
}

// Generate srcset string
export const generateSrcSet = (publicId: string, baseTransformations: ImageTransformations = {}) => {
  const responsiveUrls = getResponsiveImageUrls(publicId, baseTransformations)
  return responsiveUrls.map(({ width, url }) => `${url} ${width}w`).join(', ')
}

// Upload image function (for admin panel)
export const uploadImage = async (file: File, folder: string = 'original-oak-carpentry') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!)
  formData.append('folder', folder)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const result = await response.json()

    return {
      success: true,
      publicId: result.public_id,
      secureUrl: result.secure_url,
      url: result.url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    } as ImageUploadResult
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

// Delete image function
export const deleteImage = async (publicId: string) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: publicId,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Delete failed')
    }

    return { success: true }
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw error
  }
}

// Get image transformations for different devices
export const getDeviceOptimizedImage = (publicId: string, deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop') => {
  const devicePresets = {
    mobile: {
      width: 375,
      height: 250,
      quality: 'good' as const,
      format: 'auto' as const,
    },
    tablet: {
      width: 768,
      height: 512,
      quality: 'good' as const,
      format: 'auto' as const,
    },
    desktop: {
      width: 1920,
      height: 1080,
      quality: 'best' as const,
      format: 'auto' as const,
    },
  }

  return getOptimizedImageUrl(publicId, devicePresets[deviceType])
}

// Optimize images for SEO
export const getSEOOptimizedImage = (publicId: string, altText: string, width?: number, height?: number) => {
  return {
    src: getOptimizedImageUrl(publicId, { width, height, format: 'auto', quality: 'good' }),
    alt: altText,
    width: width || 800,
    height: height || 600,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  }
}

// Batch optimize multiple images
export const batchOptimizeImages = (imageData: Array<{
  publicId: string
  altText: string
  transformations?: ImageTransformations
}>) => {
  return imageData.map(({ publicId, altText, transformations = {} }) => ({
    publicId,
    altText,
    src: getOptimizedImageUrl(publicId, transformations),
    ...transformations,
  }))
}

// Monitor image performance
export const getImageMetrics = async (publicId: string) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/${publicId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`).toString('base64')}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to get metrics')
    }

    return await response.json()
  } catch (error) {
    console.error('Cloudinary metrics error:', error)
    throw error
  }
}

export default {
  cld,
  getOptimizedImageUrl,
  getImageWithPreset,
  getResponsiveImageUrls,
  generateSrcSet,
  uploadImage,
  deleteImage,
  getDeviceOptimizedImage,
  getSEOOptimizedImage,
  batchOptimizeImages,
  getImageMetrics,
  IMAGE_PRESETS,
  getMockImageUrl: (publicId: string) => `https://via.placeholder.com/800x600?text=${encodeURIComponent(publicId)}`,
}

// Helper function to extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl: string) => {
  const regex = /\/([^\/]+)\.(jpg|jpeg|png|gif|webp)$/i
  const match = cloudinaryUrl.match(regex)
  return match ? match[1] : ''
}

// Convert bytes to human readable format
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Calculate image optimization savings
export const calculateOptimizationSavings = (originalSize: number, optimizedSize: number) => {
  const savings = originalSize - optimizedSize
  const percentage = (savings / originalSize) * 100
  return {
    savings,
    percentage: Math.round(percentage),
    formattedSavings: formatBytes(savings),
    originalSize: formatBytes(originalSize),
    optimizedSize: formatBytes(optimizedSize),
  }
}

// Predefined image collections for different sections
export const IMAGE_COLLECTIONS = {
  HERO_IMAGES: [
    'original-oak-carpentry/hero-craftsmanship',
    'original-oak-carpentry/hero-workshop',
    'original-oak-carpentry/hero-tools',
  ],
  PORTFOLIO_HIGHLIGHTS: [
    'original-oak-carpentry/dining-table-oak',
    'original-oak-carpentry/wooden-gates-custom',
    'original-oak-carpentry/workshop-renovation',
    'original-oak-carpentry/armoire-restoration',
    'original-oak-carpentry/wooden-railings',
    'original-oak-carpentry/reclaimed-wood-wall',
  ],
  SERVICE_IMAGES: {
    WOODWORK: 'original-oak-carpentry/woodwork-services',
    METALWORK: 'original-oak-carpentry/metalwork-services',
    RESTORATION: 'original-oak-carpentry/restoration-services',
    SUSTAINABLE: 'original-oak-carpentry/sustainable-services',
    CUSTOM: 'original-oak-carpentry/custom-services',
    INSTALLATION: 'original-oak-carpentry/installation-services',
  },
  TEAM_PHOTOS: [
    'original-oak-carpentry/team-master-craftsman',
    'original-oak-carpentry/team-woodworker',
    'original-oak-carpentry/team-metalworker',
  ],
  WORKSHOP_VIEWS: [
    'original-oak-carpentry/workshop-interior',
    'original-oak-carpentry/workshop-tools',
    'original-oak-carpentry/workshop-projects',
  ],
}

// Default fallback images
export const FALLBACK_IMAGES = {
  HERO: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&h=1080&fit=crop',
  PORTFOLIO: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
  SERVICE: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop',
  TEAM: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
  WORKSHOP: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
}

export const getFallbackImage = (type: keyof typeof FALLBACK_IMAGES) => FALLBACK_IMAGES[type] || FALLBACK_IMAGES.PORTFOLIO

// Check if Cloudinary is configured
export const isCloudinaryConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
}

// Get appropriate image URL (Cloudinary or fallback)
export const getImageUrl = (publicId: string, transformations: ImageTransformations = {}, fallbackType?: keyof typeof FALLBACK_IMAGES) => {
  if (isCloudinaryConfigured()) {
    return getOptimizedImageUrl(publicId, transformations)
  }

  return fallbackType ? getFallbackImage(fallbackType) : getFallbackImage('PORTFOLIO')
}

// Image optimization for different scenarios
export const OPTIMIZATION_PRESETS = {
  // For hero sections with large images
  HERO_OPTIMIZED: {
    loading: 'eager' as const,
    decoding: 'sync' as const,
    fetchPriority: 'high' as const,
  },

  // For below-the-fold images
  LAZY_LOADED: {
    loading: 'lazy' as const,
    decoding: 'async' as const,
    fetchPriority: 'low' as const,
  },

  // For critical above-the-fold images
  CRITICAL: {
    loading: 'eager' as const,
    decoding: 'sync' as const,
    fetchPriority: 'high' as const,
  },
} as const

export type OptimizationPreset = keyof typeof OPTIMIZATION_PRESETS