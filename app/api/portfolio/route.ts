import { NextRequest, NextResponse } from 'next/server'

// Mock portfolio data - in a real app, this would come from a database
const portfolioItems = [
  {
    id: 1,
    title: "Handcrafted Oak Dining Table",
    category: "Custom Furniture",
    description: "Solid oak dining table with traditional joinery and custom metal hardware",
    image: "/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg",
    featured: true,
    completedAt: "2024-01-15",
    client: "Marcus Williams",
    location: "Downtown Residence",
    materials: ["Solid Oak", "Custom Metal Hardware", "Traditional Joinery"],
    techniques: ["Hand-carved Details", "Mortise and Tenon", "Custom Metalwork"],
  },
  {
    id: 2,
    title: "Forged Iron & Wood Gates",
    category: "Metal Fabrication",
    description: "Custom entrance gates combining forged iron with reclaimed wood panels",
    image: "/elegant-restaurant-interior-with-custom-wooden-fix.jpg",
    featured: true,
    completedAt: "2024-02-20",
    client: "Aisha Johnson",
    location: "Restaurant Entrance",
    materials: ["Forged Iron", "Reclaimed Wood", "Custom Hardware"],
    techniques: ["Traditional Forging", "Wood Restoration", "Custom Design"],
  },
  {
    id: 3,
    title: "Master Craftsman's Workshop",
    category: "Workshop Design",
    description: "Complete workshop renovation with custom storage and workbenches",
    image: "/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg",
    featured: false,
    completedAt: "2024-03-10",
    client: "James Rodriguez",
    location: "Private Workshop",
    materials: ["Reclaimed Wood", "Custom Hardware", "Eco-friendly Finishes"],
    techniques: ["Custom Millwork", "Space Optimization", "Ergonomic Design"],
  },
  {
    id: 4,
    title: "Antique Restoration Project",
    category: "Restoration",
    description: "Century-old armoire restored to its original glory with period-appropriate techniques",
    image: "/floor-to-ceiling-custom-wooden-library-with-ladder.jpg",
    featured: true,
    completedAt: "2024-03-25",
    client: "Dr. Patricia Thompson",
    location: "Historic Home",
    materials: ["Original Wood", "Period Hardware", "Traditional Finishes"],
    techniques: ["Antique Restoration", "Period Techniques", "Careful Preservation"],
  },
  {
    id: 5,
    title: "Custom Metal Railings",
    category: "Architectural Metalwork",
    description: "Decorative metal railings with traditional forging techniques",
    image: "/coastal-home-with-custom-wooden-hurricane-shutters.jpg",
    featured: false,
    completedAt: "2024-04-05",
    client: "David Chen",
    location: "Modern Home",
    materials: ["Steel", "Custom Hardware", "Protective Finishes"],
    techniques: ["Traditional Forging", "Custom Design", "Precision Installation"],
  },
  {
    id: 6,
    title: "Reclaimed Wood Feature Wall",
    category: "Sustainable Design",
    description: "Feature wall using reclaimed barn wood with custom metal accents",
    image: "/modern-office-with-reclaimed-wood-accent-wall.jpg",
    featured: false,
    completedAt: "2024-04-18",
    client: "Sarah Kim",
    location: "Office Space",
    materials: ["Reclaimed Barn Wood", "Custom Metal Accents", "Eco-friendly Finishes"],
    techniques: ["Wood Restoration", "Custom Metalwork", "Sustainable Practices"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    let filteredItems = [...portfolioItems]
    
    // Filter by category
    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Filter by featured status
    if (featured === 'true') {
      filteredItems = filteredItems.filter(item => item.featured)
    }
    
    // Limit results
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum)) {
        filteredItems = filteredItems.slice(0, limitNum)
      }
    }
    
    return NextResponse.json({
      success: true,
      data: filteredItems,
      total: filteredItems.length,
      categories: [...new Set(portfolioItems.map(item => item.category))]
    })
    
  } catch (error) {
    console.error('Portfolio API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch portfolio items' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would validate the data and save to database
    console.log('New portfolio item:', body)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Portfolio item created successfully' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Portfolio creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create portfolio item' 
      },
      { status: 500 }
    )
  }
}

