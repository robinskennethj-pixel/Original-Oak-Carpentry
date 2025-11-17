import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Mock project categories for development
const MOCK_CATEGORIES = [
  {
    category: 'deck',
    count: 12,
    revenue: 45000,
    percentage: 31.6
  },
  {
    category: 'cabinet-installation',
    count: 8,
    revenue: 28000,
    percentage: 19.6
  },
  {
    category: 'trim-work',
    count: 10,
    revenue: 22000,
    percentage: 15.4
  },
  {
    category: 'hurricane-repair',
    count: 5,
    revenue: 18500,
    percentage: 13.0
  },
  {
    category: 'outdoor-living',
    count: 4,
    revenue: 15000,
    percentage: 10.5
  },
  {
    category: 'finish-carpentry',
    count: 6,
    revenue: 9000,
    percentage: 6.3
  },
  {
    category: 'other',
    count: 3,
    revenue: 5000,
    percentage: 3.5
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30'

    // For now, return mock data
    // In a real implementation, this would query your database for project categories
    return NextResponse.json({
      success: true,
      data: MOCK_CATEGORIES,
      note: 'Using mock category data'
    })

  } catch (error) {
    console.error('Category Analytics API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}