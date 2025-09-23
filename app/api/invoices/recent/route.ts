import { NextRequest, NextResponse } from 'next/server'

// Mock recent invoices for development
const MOCK_RECENT_INVOICES = [
  {
    id: 'inv_1234567890',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    projectType: 'Custom Deck Installation',
    amount: 3200.00,
    status: 'paid',
    createdDate: '2024-09-20',
    dueDate: '2024-10-20'
  },
  {
    id: 'inv_0987654321',
    clientName: 'Michael Chen',
    clientEmail: 'm.chen@email.com',
    projectType: 'Kitchen Cabinet Installation',
    amount: 4500.00,
    status: 'open',
    createdDate: '2024-09-18',
    dueDate: '2024-10-18'
  },
  {
    id: 'inv_1122334455',
    clientName: 'Robert Martinez',
    clientEmail: 'r.martinez@email.com',
    projectType: 'Hurricane Repair',
    amount: 2800.00,
    status: 'overdue',
    createdDate: '2024-09-15',
    dueDate: '2024-09-30'
  },
  {
    id: 'inv_5566778899',
    clientName: 'Jennifer Davis',
    clientEmail: 'j.davis@email.com',
    projectType: 'Interior Trim Work',
    amount: 1850.00,
    status: 'paid',
    createdDate: '2024-09-12',
    dueDate: '2024-10-12'
  },
  {
    id: 'inv_9988776655',
    clientName: 'David Wilson',
    clientEmail: 'd.wilson@email.com',
    projectType: 'Outdoor Living Space',
    amount: 5200.00,
    status: 'draft',
    createdDate: '2024-09-10',
    dueDate: '2024-10-10'
  },
  {
    id: 'inv_3344556677',
    clientName: 'Lisa Brown',
    clientEmail: 'l.brown@email.com',
    projectType: 'Finish Carpentry',
    amount: 2100.00,
    status: 'open',
    createdDate: '2024-09-08',
    dueDate: '2024-10-08'
  },
  {
    id: 'inv_7788990011',
    clientName: 'James Taylor',
    clientEmail: 'j.taylor@email.com',
    projectType: 'Repair & Restoration',
    amount: 1650.00,
    status: 'paid',
    createdDate: '2024-09-05',
    dueDate: '2024-10-05'
  },
  {
    id: 'inv_2233445566',
    clientName: 'Maria Garcia',
    clientEmail: 'm.garcia@email.com',
    projectType: 'Custom Furniture',
    amount: 3800.00,
    status: 'open',
    createdDate: '2024-09-03',
    dueDate: '2024-10-03'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    // For now, return mock data
    // In a real implementation, this would query your database for recent invoices
    return NextResponse.json({
      success: true,
      data: MOCK_RECENT_INVOICES.slice(0, limit),
      note: 'Using mock recent invoices data'
    })

  } catch (error) {
    console.error('Recent Invoices API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}