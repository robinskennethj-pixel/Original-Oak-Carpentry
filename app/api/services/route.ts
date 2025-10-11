import { NextRequest, NextResponse } from 'next/server'

// Mock services data - in a real app, this would come from a database
const services = [
  {
    id: 1,
    title: "Custom Woodwork",
    description: "Handcrafted furniture and millwork crafted with traditional techniques and modern precision.",
    features: ["Custom Furniture", "Architectural Millwork", "Handcrafted Details", "Unique Installations"],
    icon: "Home",
    category: "Woodworking",
    pricing: "Custom Quote",
    duration: "2-8 weeks",
    featured: true,
    images: ["/modern-custom-kitchen-with-wooden-cabinets-and-gra.jpg"],
    materials: ["Solid Hardwoods", "Reclaimed Wood", "Custom Hardware", "Eco-friendly Finishes"],
    techniques: ["Traditional Joinery", "Hand-carving", "Custom Design", "Precision Crafting"],
  },
  {
    id: 2,
    title: "Weather-Resistant Carpentry",
    description: "Marine-grade outdoor structures and weatherproof installations designed for Florida's challenging climate.",
    features: ["Weather-Resistant Design", "Marine-Grade Materials", "Storm Protection", "Outdoor Kitchens"],
    icon: "Shield",
    category: "Outdoor Carpentry",
    pricing: "Custom Quote",
    duration: "2-6 weeks",
    featured: true,
    images: ["/coastal-home-with-custom-wooden-hurricane-shutters.jpg"],
    materials: ["Marine-Grade Wood", "Weather-Resistant Finishes", "Stainless Hardware", "Protective Coatings"],
    techniques: ["Weather Sealing", "Marine Construction", "Storm-Resistant Design", "Precision Installation"],
  },
  {
    id: 3,
    title: "Restoration & Repair",
    description: "Expert restoration services bringing new life to cherished pieces and structures.",
    features: ["Antique Restoration", "Structural Repair", "Finish Restoration", "Custom Repairs"],
    icon: "Shield",
    category: "Restoration",
    pricing: "Assessment Required",
    duration: "1-12 weeks",
    featured: true,
    images: ["/floor-to-ceiling-custom-wooden-library-with-ladder.jpg"],
    materials: ["Period-appropriate Materials", "Original Hardware", "Traditional Finishes", "Custom Parts"],
    techniques: ["Antique Restoration", "Period Techniques", "Careful Preservation", "Custom Fabrication"],
  },
  {
    id: 4,
    title: "Sustainable Crafting",
    description: "Eco-conscious woodworking using reclaimed materials and sustainable practices.",
    features: ["Reclaimed Wood", "Eco-friendly Finishes", "Sustainable Materials", "Green Practices"],
    icon: "Leaf",
    category: "Sustainability",
    pricing: "Custom Quote",
    duration: "2-6 weeks",
    featured: false,
    images: ["/modern-office-with-reclaimed-wood-accent-wall.jpg"],
    materials: ["Reclaimed Wood", "Eco-friendly Finishes", "Sustainable Hardware", "Natural Materials"],
    techniques: ["Wood Restoration", "Sustainable Practices", "Custom Design", "Eco-friendly Finishing"],
  },
  {
    id: 5,
    title: "Bespoke Commissions",
    description: "One-of-a-kind pieces designed and crafted specifically for your vision and space.",
    features: ["Custom Design", "Personal Consultation", "Unique Creations", "Lifetime Craftsmanship"],
    icon: "Hammer",
    category: "Custom",
    pricing: "Custom Quote",
    duration: "4-16 weeks",
    featured: true,
    images: ["/beautiful-wooden-deck-with-pergola-overlooking-wat.jpg"],
    materials: ["Premium Materials", "Custom Hardware", "Unique Finishes", "Specialty Components"],
    techniques: ["Custom Design", "Master Craftsmanship", "Unique Techniques", "Personal Consultation"],
  },
  {
    id: 6,
    title: "Installation & Service",
    description: "Professional installation and ongoing maintenance to ensure your pieces last generations.",
    features: ["Professional Installation", "Maintenance Services", "Warranty Support", "Care Instructions"],
    icon: "Wrench",
    category: "Service",
    pricing: "Hourly Rate",
    duration: "1-3 days",
    featured: false,
    images: ["/coastal-home-with-custom-wooden-hurricane-shutters.jpg"],
    materials: ["Installation Hardware", "Protective Materials", "Maintenance Supplies", "Replacement Parts"],
    techniques: ["Professional Installation", "Precision Setup", "Maintenance", "Customer Education"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    let filteredServices = [...services]
    
    // Filter by category
    if (category) {
      filteredServices = filteredServices.filter(service => 
        service.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Filter by featured status
    if (featured === 'true') {
      filteredServices = filteredServices.filter(service => service.featured)
    }
    
    // Limit results
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum)) {
        filteredServices = filteredServices.slice(0, limitNum)
      }
    }
    
    return NextResponse.json({
      success: true,
      data: filteredServices,
      total: filteredServices.length,
      categories: [...new Set(services.map(service => service.category))]
    })
    
  } catch (error) {
    console.error('Services API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch services' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In a real app, you would validate the data and save to database
    console.log('New service inquiry:', body)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Service inquiry submitted successfully' 
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Service inquiry error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit service inquiry' 
      },
      { status: 500 }
    )
  }
}

