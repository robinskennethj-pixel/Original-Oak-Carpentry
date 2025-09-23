import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { addNewsletterSubscriber } from '@/lib/database'
import { sendNewsletterConfirmation } from '@/lib/email'

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const { email } = newsletterSchema.parse(body)

    // Add to database
    const result = await addNewsletterSubscriber(email)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message
        },
        { status: 400 }
      )
    }

    // Send confirmation email
    try {
      await sendNewsletterConfirmation(email)
    } catch (emailError) {
      console.error('Newsletter confirmation email failed:', emailError)
      // Don't fail the signup if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter signup error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide a valid email address.'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please try again later.'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter API endpoint is working' },
    { status: 200 }
  )
}