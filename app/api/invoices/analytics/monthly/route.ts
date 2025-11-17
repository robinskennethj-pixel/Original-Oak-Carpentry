import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Mock monthly data for development
const MOCK_MONTHLY_DATA = [
  { month: 'Jan', revenue: 12500, invoices: 4 },
  { month: 'Feb', revenue: 18200, invoices: 6 },
  { month: 'Mar', revenue: 15800, invoices: 5 },
  { month: 'Apr', revenue: 22100, invoices: 7 },
  { month: 'May', revenue: 19500, invoices: 6 },
  { month: 'Jun', revenue: 26700, invoices: 8 },
  { month: 'Jul', revenue: 24300, invoices: 7 },
  { month: 'Aug', revenue: 28900, invoices: 9 },
  { month: 'Sep', revenue: 21400, invoices: 6 },
  { month: 'Oct', revenue: 19800, invoices: 6 },
  { month: 'Nov', revenue: 23600, invoices: 7 },
  { month: 'Dec', revenue: 27200, invoices: 8 }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30'

    // For now, return mock data
    // In a real implementation, this would query your database for monthly invoice data
    return NextResponse.json({
      success: true,
      data: MOCK_MONTHLY_DATA,
      note: 'Using mock monthly data'
    })

  } catch (error) {
    console.error('Monthly Analytics API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}