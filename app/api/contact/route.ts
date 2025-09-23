import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'
import { saveContactForm } from '@/lib/database'

// Validation schema for contact form
const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  projectType: z.string().min(1, 'Please select a project type'),
  projectDetails: z.string().min(10, 'Project details must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // Save to database
    await saveContactForm(validatedData)

    // Send email notifications
    await sendContactEmail(validatedData)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you within 24 hours.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data and try again.',
          errors: error.errors 
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
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  )
}

