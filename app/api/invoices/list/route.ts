import { NextRequest, NextResponse } from 'next/server'
import { listInvoices } from '@/lib/integrations/stripe-invoicing'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const limit = parseInt(searchParams.get('limit') || '50')
    const startingAfter = searchParams.get('startingAfter')

    // Get invoices from Stripe
    const result = await listInvoices({
      status: status !== 'all' ? status : undefined,
      limit,
      startingAfter: startingAfter || undefined
    })

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 })
    }

    // Mock development data if Stripe not configured
    if (!process.env.STRIPE_SECRET_KEY) {
      const mockInvoices = [
        {
          id: 'inv_1234567890',
          clientName: 'Sarah Johnson',
          clientEmail: 'sarah.j@email.com',
          projectType: 'Custom Deck Installation',
          amount: 3200,
          status: 'paid',
          createdDate: '2024-09-20',
          dueDate: '2024-10-20',
          invoiceUrl: 'https://pay.stripe.com/invoice/test/inv_1234567890',
          invoicePdf: 'https://pay.stripe.com/invoice/test/inv_1234567890/pdf'
        },
        {
          id: 'inv_0987654321',
          clientName: 'Michael Chen',
          clientEmail: 'm.chen@email.com',
          projectType: 'Kitchen Cabinet Installation',
          amount: 4500,
          status: 'open',
          createdDate: '2024-09-18',
          dueDate: '2024-10-18',
          invoiceUrl: 'https://pay.stripe.com/invoice/test/inv_0987654321',
          invoicePdf: 'https://pay.stripe.com/invoice/test/inv_0987654321/pdf'
        },
        {
          id: 'inv_1122334455',
          clientName: 'Robert Martinez',
          clientEmail: 'r.martinez@email.com',
          projectType: 'Hurricane Repair',
          amount: 2800,
          status: 'overdue',
          createdDate: '2024-09-15',
          dueDate: '2024-09-30',
          invoiceUrl: 'https://pay.stripe.com/invoice/test/inv_1122334455',
          invoicePdf: 'https://pay.stripe.com/invoice/test/inv_1122334455/pdf'
        },
        {
          id: 'inv_5566778899',
          clientName: 'Jennifer Davis',
          clientEmail: 'j.davis@email.com',
          projectType: 'Interior Trim Work',
          amount: 1850,
          status: 'paid',
          createdDate: '2024-09-12',
          dueDate: '2024-10-12',
          invoiceUrl: 'https://pay.stripe.com/invoice/test/inv_5566778899',
          invoicePdf: 'https://pay.stripe.com/invoice/test/inv_5566778899/pdf'
        },
        {
          id: 'inv_9988776655',
          clientName: 'David Wilson',
          clientEmail: 'd.wilson@email.com',
          projectType: 'Outdoor Living Space',
          amount: 5200,
          status: 'draft',
          createdDate: '2024-09-10',
          dueDate: '2024-10-10',
          invoiceUrl: null,
          invoicePdf: null
        }
      ]

      return NextResponse.json({
        success: true,
        invoices: mockInvoices,
        hasMore: false,
        note: 'Using mock invoice data - Stripe not configured'
      })
    }

    return NextResponse.json({
      success: true,
      invoices: result.invoices,
      hasMore: result.hasMore
    })

  } catch (error) {
    console.error('Invoice List API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}