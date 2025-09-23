import { NextRequest, NextResponse } from 'next/server'

// Mock top clients data for development
const MOCK_TOP_CLIENTS = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    totalSpent: 28500,
    invoiceCount: 8,
    lastInvoiceDate: '2024-09-15'
  },
  {
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    totalSpent: 22400,
    invoiceCount: 6,
    lastInvoiceDate: '2024-09-10'
  },
  {
    name: 'Robert Martinez',
    email: 'r.martinez@email.com',
    totalSpent: 18900,
    invoiceCount: 5,
    lastInvoiceDate: '2024-09-05'
  },
  {
    name: 'Jennifer Davis',
    email: 'j.davis@email.com',
    totalSpent: 16750,
    invoiceCount: 4,
    lastInvoiceDate: '2024-08-28'
  },
  {
    name: 'David Wilson',
    email: 'd.wilson@email.com',
    totalSpent: 14200,
    invoiceCount: 3,
    lastInvoiceDate: '2024-08-20'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30'

    // For now, return mock data
    // In a real implementation, this would query your database for top clients
    return NextResponse.json({
      success: true,
      data: MOCK_TOP_CLIENTS,
      note: 'Using mock top clients data'
    })

  } catch (error) {
    console.error('Top Clients Analytics API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}