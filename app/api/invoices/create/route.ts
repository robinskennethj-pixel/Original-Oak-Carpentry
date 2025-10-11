import { NextRequest, NextResponse } from 'next/server'
import { createBrandedInvoice, finalizeAndSendInvoice } from '@/lib/integrations/stripe-invoicing'
import { generateAIEmailContent } from '@/lib/integrations/ai-invoice-generator'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

// Validation schemas
const createInvoiceSchema = z.object({
  invoiceData: z.object({
    clientEmail: z.string().email(),
    clientName: z.string().min(1),
    clientAddress: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string().optional().default('US'),
    }),
    projectType: z.string(),
    projectDescription: z.string(),
    materialsCost: z.number().min(0),
    laborCost: z.number().min(0),
    totalAmount: z.number().positive(),
    taxAmount: z.number().optional().default(0),
    dueDate: z.string().optional(),
    notes: z.string().optional(),
  }),
  aiContent: z.object({
    projectDescription: z.string(),
    clientMessage: z.string(),
    paymentInstructions: z.string(),
    warrantyNotes: z.string().optional(),
    maintenanceNotes: z.string().optional(),
    projectCategory: z.string(),
    suggestedAddOns: z.array(z.string()).optional(),
  }).optional(),
  sendImmediately: z.boolean().optional().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validatedData = createInvoiceSchema.parse(body)

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Stripe not configured',
        message: 'Please configure Stripe to create invoices'
      }, { status: 400 })
    }

    // Create invoice with AI-enhanced content
    const invoiceData = {
      ...validatedData.invoiceData,
      notes: validatedData.aiContent?.clientMessage || validatedData.invoiceData.notes,
    }

    const invoiceResult = await createBrandedInvoice(invoiceData)

    if (!invoiceResult.success) {
      return NextResponse.json({
        success: false,
        error: invoiceResult.error,
        details: invoiceResult.details
      }, { status: 400 })
    }

    // If send immediately, finalize and send the invoice
    let sentResult = null
    if (validatedData.sendImmediately) {
      sentResult = await finalizeAndSendInvoice(invoiceResult.invoiceId!)

      if (!sentResult.success) {
        return NextResponse.json({
          success: false,
          error: 'Invoice created but failed to send',
          details: sentResult.details
        }, { status: 400 })
      }

      // Generate and send email if AI content is available
      if (validatedData.aiContent) {
        const emailResult = await generateAIEmailContent(
          validatedData.invoiceData.clientName,
          validatedData.invoiceData.projectType,
          validatedData.invoiceData.totalAmount
        )

        if (emailResult.success) {
          await sendEmail({
            to: validatedData.invoiceData.clientEmail,
            subject: emailResult.content!.subject,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2D5016;">${emailResult.content!.greeting}</h2>
                <p>${emailResult.content!.body.replace(/\n/g, '<br>')}</p>
                <p style="margin-top: 20px;">
                  <a href="${sentResult.invoiceUrl}" style="background-color: #B85C38; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                    View Invoice & Pay
                  </a>
                </p>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">
                  ${validatedData.aiContent.paymentInstructions}
                </p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #2D5016; font-weight: bold;">${emailResult.content!.closing}</p>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  Original Oak Carpentry<br>
                  Phone: (813) 555-0123<br>
                  Email: info@originaloakcarpentry.com<br>
                  License: CBC125847
                </p>
              </div>
            `
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      invoiceId: invoiceResult.invoiceId,
      invoiceUrl: sentResult?.invoiceUrl || invoiceResult.invoiceUrl,
      invoicePdf: sentResult?.invoicePdf || invoiceResult.invoicePdf,
      status: sentResult?.status || 'draft',
      sent: validatedData.sendImmediately,
      customerId: invoiceResult.customerId,
      amount: invoiceResult.amount,
    })

  } catch (error) {
    console.error('Create Invoice API Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation error',
        details: error.errors
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
    const { searchParams } = new URL(request.url)
    const invoiceId = searchParams.get('invoiceId')

    if (!invoiceId) {
      return NextResponse.json({
        success: false,
        error: 'Invoice ID is required'
      }, { status: 400 })
    }

    // Get invoice details
    const { getInvoiceDetails } = await import('@/lib/integrations/stripe-invoicing')
    const result = await getInvoiceDetails(invoiceId)

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      invoice: result.invoice
    })

  } catch (error) {
    console.error('Get Invoice API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}