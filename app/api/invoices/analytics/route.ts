import { NextRequest, NextResponse } from 'next/server'
import { getInvoiceStats } from '@/lib/integrations/stripe-invoicing'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30'

    // Get invoice statistics from Stripe
    const result = await getInvoiceStats()

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 })
    }

    const stats = result.stats

    // Calculate additional metrics
    const conversionRate = stats.totalInvoices > 0
      ? (stats.paidInvoices / stats.totalInvoices) * 100
      : 0

    const averageInvoiceValue = stats.totalInvoices > 0
      ? stats.totalRevenue / stats.totalInvoices
      : 0

    // Mock development data if Stripe not configured
    if (!process.env.STRIPE_SECRET_KEY) {
      const mockData = {
        totalInvoices: 45,
        totalRevenue: 142500,
        paidInvoices: 42,
        pendingInvoices: 2,
        overdueInvoices: 1,
        recentRevenue: timeRange === '7' ? 18500 : timeRange === '30' ? 47500 : timeRange === '90' ? 98500 : 142500,
        averageInvoiceValue: 3166.67,
        conversionRate: 93.3
      }

      return NextResponse.json({
        success: true,
        data: mockData,
        note: 'Using mock data - Stripe not configured'
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        totalInvoices: stats.totalInvoices,
        totalRevenue: stats.totalRevenue,
        paidInvoices: stats.paidInvoices,
        pendingInvoices: stats.pendingInvoices,
        overdueInvoices: stats.overdueInvoices,
        recentRevenue: stats.recentRevenue,
        averageInvoiceValue,
        conversionRate
      }
    })

  } catch (error) {
    console.error('Invoice Analytics API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}