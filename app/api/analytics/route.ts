import { NextRequest, NextResponse } from 'next/server'
import { getAnalyticsData, getStats } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    // Get analytics data
    const analyticsData = await getAnalyticsData()
    const stats = await getStats()

    return NextResponse.json(
      {
        success: true,
        data: {
          contactForms: analyticsData,
          stats: stats,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Analytics API error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve analytics data'
      },
      { status: 500 }
    )
  }
}