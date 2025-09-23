import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendEmail } from '@/lib/email'
import { generateAIEmailContent } from '@/lib/integrations/ai-invoice-generator'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different invoice events
    switch (event.type) {
      case 'invoice.created':
        await handleInvoiceCreated(event.data.object as Stripe.Invoice)
        break

      case 'invoice.finalized':
        await handleInvoiceFinalized(event.data.object as Stripe.Invoice)
        break

      case 'invoice.sent':
        await handleInvoiceSent(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'invoice.overdue':
        await handleInvoiceOverdue(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({
      success: true,
      received: true,
      eventType: event.type
    })

  } catch (error) {
    console.error('Invoice Webhook Error:', error)
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle invoice created event
async function handleInvoiceCreated(invoice: Stripe.Invoice) {
  console.log('Invoice created:', invoice.id)

  // Log for analytics
  // This could trigger internal notifications, update CRM, etc.

  // Example: Send notification to admin
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Invoice Created - ${invoice.id}`,
      text: `A new invoice has been created for ${invoice.customer_name} (${invoice.customer_email}) for $${(invoice.amount_due / 100).toFixed(2)}`
    })
  }
}

// Handle invoice finalized event
async function handleInvoiceFinalized(invoice: Stripe.Invoice) {
  console.log('Invoice finalized:', invoice.id)

  // Update internal records
  // Could trigger additional business logic here
}

// Handle invoice sent event
async function handleInvoiceSent(invoice: Stripe.Invoice) {
  console.log('Invoice sent:', invoice.id)

  // Log the sending event
  // Could update customer communication records

  // Send confirmation to admin
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Invoice Sent to Customer - ${invoice.id}`,
      text: `Invoice has been sent to ${invoice.customer_name} (${invoice.customer_email}) for $${(invoice.amount_due / 100).toFixed(2)}`
    })
  }
}

// Handle successful payment
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id)

  const amount = invoice.amount_paid / 100
  const customerName = invoice.customer_name || 'Valued Customer'
  const customerEmail = invoice.customer_email

  // Send thank you email to customer
  if (customerEmail) {
    const emailResult = await generateAIEmailContent(
      customerName,
      invoice.metadata?.projectType || 'Project',
      amount
    )

    if (emailResult.success) {
      await sendEmail({
        to: customerEmail,
        subject: `Payment Received - Thank You!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2D5016;">Payment Confirmation</h2>
            <p>Dear ${customerName},</p>
            <p>Thank you for your payment of <strong>$${amount.toFixed(2)}</strong> for invoice #${invoice.id}.</p>
            <p>We appreciate your business and look forward to serving you again in the future.</p>
            <p>If you have any questions about your project or need additional services, please don't hesitate to contact us.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #2D5016; font-weight: bold;">Best regards,<br>The Ogun Carpentry Team</p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Ogun Carpentry<br>
              Phone: (813) 555-0123<br>
              Email: info@ogun-carpentry.com<br>
              License: CBC125847
            </p>
          </div>
        `
      })
    }
  }

  // Update project status in database
  // This could mark the project as paid and trigger completion workflows

  // Send notification to admin
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Payment Received - Invoice #${invoice.id}`,
      text: `Payment of $${amount.toFixed(2)} received from ${customerName} (${customerEmail}) for invoice #${invoice.id}`
    })
  }
}

// Handle failed payment
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id)

  const customerName = invoice.customer_name || 'Customer'
  const customerEmail = invoice.customer_email
  const amount = invoice.amount_due / 100

  // Send payment failure notification to customer
  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: 'Payment Issue - Please Update Payment Method',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B85C38;">Payment Issue</h2>
          <p>Dear ${customerName},</p>
          <p>We encountered an issue processing your payment of <strong>$${amount.toFixed(2)}</strong> for invoice #${invoice.id}.</p>
          <p>This could be due to:</p>
          <ul>
            <li>Expired credit card</li>
            <li>Insufficient funds</li>
            <li>Bank decline</li>
          </ul>
          <p><strong>Next Steps:</strong></p>
          <p>Please update your payment method or contact us to resolve this issue.</p>
          <p style="margin-top: 20px;">
            <a href="${invoice.hosted_invoice_url}" style="background-color: #B85C38; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Update Payment Method
            </a>
          </p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #2D5016; font-weight: bold;">Best regards,<br>The Ogun Carpentry Team</p>
        </div>
      `
    })
  }

  // Send notification to admin
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Payment Failed - Invoice #${invoice.id}`,
      text: `Payment failed for invoice #${invoice.id} from ${customerName} (${customerEmail}) for $${amount.toFixed(2)}. Please follow up with the customer.`
    })
  }
}

// Handle overdue invoice
async function handleInvoiceOverdue(invoice: Stripe.Invoice) {
  console.log('Invoice overdue:', invoice.id)

  const customerName = invoice.customer_name || 'Customer'
  const customerEmail = invoice.customer_email
  const amount = invoice.amount_due / 100

  // Send overdue reminder to customer
  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: 'Invoice Overdue - Please Remit Payment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B85C38;">Invoice Overdue</h2>
          <p>Dear ${customerName},</p>
          <p>This is a friendly reminder that your invoice #${invoice.id} for <strong>$${amount.toFixed(2)}</strong> is now overdue.</p>
          <p><strong>Due Date:</strong> ${invoice.due_date ? new Date(invoice.due_date * 1000).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Days Overdue:</strong> ${Math.ceil((Date.now() - (invoice.due_date || 0) * 1000) / (1000 * 60 * 60 * 24))}</p>
          <p style="margin-top: 20px;">
            <a href="${invoice.hosted_invoice_url}" style="background-color: #B85C38; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Pay Invoice Now
            </a>
          </p>
          <p>If you have already sent payment, please disregard this message. If you have any questions or need to discuss payment arrangements, please contact us.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #2D5016; font-weight: bold;">Best regards,<br>The Ogun Carpentry Team</p>
        </div>
      `
    })
  }

  // Send notification to admin for follow-up
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Invoice Overdue - Follow Up Required - #${invoice.id}`,
      text: `Invoice #${invoice.id} for ${customerName} (${customerEmail}) is ${Math.ceil((Date.now() - (invoice.due_date || 0) * 1000) / (1000 * 60 * 60 * 24))} days overdue. Amount: $${amount.toFixed(2)}. Please follow up with the customer.`
    })
  }
}

// Export for testing
export const invoiceWebhookHandlers = {
  handleInvoiceCreated,
  handleInvoiceFinalized,
  handleInvoiceSent,
  handleInvoicePaymentSucceeded,
  handleInvoicePaymentFailed,
  handleInvoiceOverdue,
}

export default {
  POST,
  invoiceWebhookHandlers,
}