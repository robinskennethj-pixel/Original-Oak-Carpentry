import { NextRequest, NextResponse } from 'next/server'
import { generateAIInvoiceContent, projectDataSchema } from '@/lib/integrations/ai-invoice-generator'
import { getMockAIInvoiceContent } from '@/lib/integrations/ai-invoice-generator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedData = projectDataSchema.parse(body)

    // Check if we should use mock data (for development without OpenAI API key)
    if (!process.env.OPENAI_API_KEY) {
      console.log('Using mock AI invoice content for development')
      return NextResponse.json({
        success: true,
        content: getMockAIInvoiceContent(),
        note: 'Using mock data - OpenAI API not configured'
      })
    }

    // Generate AI content
    const result = await generateAIInvoiceContent(validatedData)

    if (result.success) {
      return NextResponse.json({
        success: true,
        content: result.content
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 })
    }

  } catch (error) {
    console.error('AI Invoice Generation API Error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.message
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return mock data for testing
    return NextResponse.json({
      success: true,
      content: getMockAIInvoiceContent(),
      note: 'Mock data for testing'
    })
  } catch (error) {
    console.error('AI Invoice Generation GET Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}