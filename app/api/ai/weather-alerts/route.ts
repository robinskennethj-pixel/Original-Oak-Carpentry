import { NextRequest, NextResponse } from 'next/server'

// NOAA Weather API integration
const NOAA_API_BASE = 'https://api.weather.gov'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

interface WeatherAlert {
  id: string
  area: string
  severity: string
  certainty: string
  urgency: string
  event: string
  headline: string
  description: string
  instruction: string
}

interface AISummary {
  summary: string
  carpentryImpact: string
  recommendedAction: string
  location: string
  urgency: 'low' | 'medium' | 'high'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') || 'Miami, FL'

    // Get weather alerts from NOAA
    const alertsResponse = await fetch(`${NOAA_API_BASE}/alerts/active?zone=FLS079`)
    const alertsData = await alertsResponse.json()

    if (!alertsData.features || alertsData.features.length === 0) {
      return NextResponse.json({
        alerts: [],
        message: 'No active weather alerts for the area'
      })
    }

    // Process alerts
    const alerts: WeatherAlert[] = alertsData.features.map((feature: any) => ({
      id: feature.properties.id,
      area: feature.properties.areaDesc,
      severity: feature.properties.severity,
      certainty: feature.properties.certainty,
      urgency: feature.properties.urgency,
      event: feature.properties.event,
      headline: feature.properties.headline,
      description: feature.properties.description,
      instruction: feature.properties.instruction
    }))

    // Use AI to summarize and create carpentry-specific recommendations
    const aiSummaries: AISummary[] = []

    for (const alert of alerts) {
      if (OPENAI_API_KEY) {
        const aiSummary = await generateAISummary(alert, location)
        aiSummaries.push(aiSummary)
      }
    }

    return NextResponse.json({
      alerts,
      aiSummaries,
      timestamp: new Date().toISOString(),
      location
    })

  } catch (error) {
    console.error('Weather alert error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather alerts' },
      { status: 500 }
    )
  }
}

async function generateAISummary(alert: WeatherAlert, location: string): Promise<AISummary> {
  const prompt = `
You are a weather alert specialist for Original Oak Carpentry in Florida.

Weather Alert:
- Event: ${alert.event}
- Severity: ${alert.severity}
- Headline: ${alert.headline}
- Description: ${alert.description}
- Location: ${alert.area}

Create a concise summary for carpentry business owners that:
1. Explains the weather situation in simple terms
2. Identifies specific risks to outdoor carpentry projects
3. Recommends immediate actions to protect work sites and equipment
4. Suggests potential business opportunities (storm damage repairs, etc.)
5. Uses a friendly, professional tone

Format as JSON with: summary, carpentryImpact, recommendedAction, location, urgency (low/medium/high)
`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 300,
        temperature: 0.7
      })
    })

    const data = await response.json()
    const content = data.choices[0].message.content

    return JSON.parse(content)
  } catch (error) {
    console.error('AI summary error:', error)
    return {
      summary: alert.headline,
      carpentryImpact: 'Potential weather-related delays',
      recommendedAction: 'Secure outdoor materials and equipment',
      location: alert.area,
      urgency: 'medium' as const
    }
  }
}

// POST endpoint to send weather alerts to clients
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { alert, clientEmail, location } = body

    if (!alert || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate AI summary for the specific alert
    const aiSummary = await generateAISummary(alert, location || 'Florida')

    // Here you would integrate with your email system to send the alert
    // For now, we'll return the AI summary that would be used in the email

    return NextResponse.json({
      success: true,
      aiSummary,
      message: 'Weather alert processed successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Weather alert POST error:', error)
    return NextResponse.json(
      { error: 'Failed to process weather alert' },
      { status: 500 }
    )
  }
}