import { NextRequest, NextResponse } from 'next/server'

// Mock testimonials data - in a real app, this would come from a database
const testimonials = [
  {
    id: 1,
    name: "Marcus Williams",
    role: "Antique Collector",
    content: "Original Oak Carpentry restored my great-grandfather's armoire to perfection. The traditional techniques they used brought it back to life better than I ever imagined.",
    rating: 5,
    image: "/satisfied-homeowner.jpg",
    project: "Antique Armoire Restoration",
    completedAt: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    name: "Aisha Johnson",
    role: "Restaurant Owner",
    content: "The custom wooden doors they crafted for our restaurant entrance are absolutely stunning. Every detail shows the master craftsman's touch.",
    rating: 5,
    image: "/happy-homeowner-woman.jpg",
    project: "Custom Restaurant Doors",
    completedAt: "2024-02-20",
    featured: true,
  },
  {
    id: 3,
    name: "James Rodriguez",
    role: "Interior Designer",
    content: "Working with Original Oak Carpentry is like collaborating with artists. Their ability to translate vision into reality is truly remarkable.",
    rating: 5,
    image: "/business-owner.png",
    project: "Custom Workshop Design",
    completedAt: "2024-03-10",
    featured: true,
  },
  {
    id: 4,
    name: "Dr. Patricia Thompson",
    role: "Historic Home Owner",
    content: "They restored our 1920s home's original woodwork using period-appropriate techniques. The craftsmanship is museum-quality.",
    rating: 5,
    image: "/homeowner-historic-house.jpg",
    project: "Historic Home Restoration",
    completedAt: "2024-03-25",
    featured: true,
  },
  {
    id: 5,
    name: "David Chen",
    role: "Modern Home Owner",
    content: "The custom wooden railings they created for our home are both beautiful and functional. The attention to detail is incredible.",
    rating: 5,
    image: "/satisfied-couple-homeowners.jpg",
    project: "Custom Wooden Railings",
    completedAt: "2024-04-05",
    featured: false,
  },
  {
    id: 6,
    name: "Sarah Kim",
    role: "Office Manager",
    content: "The reclaimed wood feature wall they created for our office is stunning. It's become the focal point of our space.",
    rating: 5,
    image: "/satisfied-homeowner.jpg",
    project: "Reclaimed Wood Feature Wall",
    completedAt: "2024-04-18",
    featured: false,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const rating = searchParams.get('rating')
    
    let filteredTestimonials = [...testimonials]
    
    // Filter by featured status
    if (featured === 'true') {
      filteredTestimonials = filteredTestimonials.filter(testimonial => testimonial.featured)
    }
    
    // Filter by rating
    if (rating) {
      const ratingNum = parseInt(rating, 10)
      if (!isNaN(ratingNum)) {
        filteredTestimonials = filteredTestimonials.filter(testimonial => testimonial.rating >= ratingNum)
      }
    }
    
    // Limit results
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum)) {
        filteredTestimonials = filteredTestimonials.slice(0, limitNum)
      }
    }
    
    // Calculate average rating
    const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
    
    return NextResponse.json({
      success: true,
      data: filteredTestimonials,
      total: filteredTestimonials.length,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: testimonials.length
    })
    
  } catch (error) {
    console.error('Testimonials API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch testimonials' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would validate the data and save to database
    console.log('New testimonial:', body)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Testimonial submitted successfully' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Testimonial creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create testimonial' 
      },
      { status: 500 }
    )
  }
}

