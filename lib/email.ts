import nodemailer from 'nodemailer'

// Create email transporter
export const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Send contact form email
export const sendContactEmail = async (data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  projectType: string
  projectDetails: string
}) => {
  const transporter = createTransporter()

  // Email to business owner
  const ownerMailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `New Project Inquiry - ${data.firstName} ${data.lastName}`,
    html: `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Project Details:</strong></p>
      <p>${data.projectDetails}</p>
      <hr>
      <p><small>This message was sent from the Original Oak Carpentry website contact form.</small></p>
    `,
  }

  // Confirmation email to client
  const clientMailOptions = {
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: 'Thank you for contacting Original Oak Carpentry',
    html: `
      <h2>Thank you for your inquiry!</h2>
      <p>Hello ${data.firstName},</p>
      <p>We have received your project inquiry and will get back to you within 24 hours.</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Project Details:</strong></p>
      <p>${data.projectDetails}</p>
      <hr>
      <p>Best regards,<br>The Original Oak Carpentry Team</p>
      <p><small>Original Oak Carpentry | Master Craftsmen of Wood & Metal</small></p>
    `,
  }

  try {
    // Send both emails
    await transporter.sendMail(ownerMailOptions)
    await transporter.sendMail(clientMailOptions)
    return { success: true }
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

// Send newsletter signup confirmation
export const sendNewsletterConfirmation = async (email: string) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to Original Oak Carpentry Newsletter',
    html: `
      <h2>Welcome to Original Oak Carpentry!</h2>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You'll receive updates about our latest projects, craftsmanship tips, and special offers.</p>
      <hr>
      <p>Best regards,<br>The Original Oak Carpentry Team</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Newsletter email failed:', error)
    throw error
  }
}

// Enhanced email interface for invoices
export interface EmailOptions {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
  from?: string
  replyTo?: string
}

// Generic email sending function
export const sendEmail = async (options: EmailOptions): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> => {
  try {
    // Use mock email for development if SMTP not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('SMTP not configured - using mock email')
      console.log('Email would be sent to:', options.to)
      console.log('Subject:', options.subject)
      console.log('HTML:', options.html)
      console.log('Text:', options.text)

      return {
        success: true,
        messageId: 'mock-message-id',
        error: 'Using mock email - SMTP not configured'
      }
    }

    const transporter = createTransporter()

    const mailOptions = {
      from: options.from || `Original Oak Carpentry <${process.env.SMTP_USER}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
      replyTo: options.replyTo || process.env.SMTP_REPLY_TO || process.env.SMTP_USER,
    }

    const result = await transporter.sendMail(mailOptions)

    return {
      success: true,
      messageId: result.messageId,
    }

  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

// Send invoice email with PDF attachment
export const sendInvoiceEmail = async (options: {
  to: string
  clientName: string
  projectType: string
  amount: number
  invoiceUrl: string
  invoicePdf?: Buffer
  aiContent?: {
    subject: string
    body: string
    greeting: string
    closing: string
  }
}): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> => {
  try {
    const {
      to,
      clientName,
      projectType,
      amount,
      invoiceUrl,
      invoicePdf,
      aiContent
    } = options

    const subject = aiContent?.subject || `Invoice for your ${projectType} project`
    const greeting = aiContent?.greeting || `Dear ${clientName},`
    const body = aiContent?.body || `Thank you for choosing Original Oak Carpentry for your ${projectType.toLowerCase()} project. Your invoice is ready for payment.`
    const closing = aiContent?.closing || 'Best regards,\nThe Original Oak Carpentry Team'

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2D5016; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { background-color: #B85C38; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #2D5016; text-align: center; color: #666; }
          .highlight { background-color: #fff8e1; padding: 15px; border-left: 4px solid #B85C38; margin: 20px 0; }
          .invoice-details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Original Oak Carpentry</h1>
          <p>Professional Carpentry Services</p>
        </div>

        <div class="content">
          <h2>${greeting}</h2>

          <p>${body}</p>

          <div class="invoice-details">
            <h3>Invoice Details</h3>
            <p><strong>Project:</strong> ${projectType}</p>
            <p><strong>Amount Due:</strong> $${amount.toFixed(2)}</p>
          </div>

          <div style="text-align: center;">
            <a href="${invoiceUrl}" class="button">View Invoice & Pay Now</a>
          </div>

          <div class="highlight">
            <strong>Payment Options:</strong>
            <ul>
              <li>Secure online payment via credit card</li>
              <li>Bank transfer (ACH)</li>
              <li>Check payment</li>
            </ul>
          </div>

          <p>If you have any questions about this invoice or need to discuss payment arrangements, please don't hesitate to contact us.</p>

          <p>${closing.replace(/\n/g, '<br>')}</p>
        </div>

        <div class="footer">
          <p><strong>Original Oak Carpentry</strong></p>
          <p>Phone: (813) 555-0123 | Email: info@ogun-carpentry.com</p>
          <p>License: CBC125847 | Website: ogun-carpentry.com</p>
          <p style="font-size: 12px; margin-top: 20px;">This email was sent automatically. Please do not reply to this email.</p>
        </div>
      </body>
      </html>
    `

    const attachments = []
    if (invoicePdf) {
      attachments.push({
        filename: `invoice-${Date.now()}.pdf`,
        content: invoicePdf,
        contentType: 'application/pdf'
      })
    }

    return await sendEmail({
      to,
      subject,
      html: htmlContent,
      attachments
    })

  } catch (error) {
    console.error('Invoice email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send invoice email'
    }
  }
}

// Send SMS notification (using Twilio)
export const sendSMS = async (options: {
  to: string
  message: string
}): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> => {
  try {
    // Mock SMS for development
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('Twilio not configured - using mock SMS')
      console.log('SMS would be sent to:', options.to)
      console.log('Message:', options.message)

      return {
        success: true,
        messageId: 'mock-sms-id',
        error: 'Using mock SMS - Twilio not configured'
      }
    }

    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

    const result = await client.messages.create({
      body: options.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: options.to
    })

    return {
      success: true,
      messageId: result.sid
    }

  } catch (error) {
    console.error('SMS sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS'
    }
  }
}

// Send invoice reminder via SMS
export const sendInvoiceSMS = async (options: {
  to: string
  clientName: string
  amount: number
  invoiceUrl: string
  daysOverdue?: number
}): Promise<{
  success: boolean
  messageId?: string
  error?: string
}> => {
  try {
    const { to, clientName, amount, invoiceUrl, daysOverdue } = options

    let message = `Hi ${clientName}! Your Original Oak Carpentry invoice for $${amount.toFixed(2)} is ready. `

    if (daysOverdue) {
      message += `It's ${daysOverdue} days overdue. `
    }

    message += `Pay securely online: ${invoiceUrl} Questions? Call (813) 555-0123`

    return await sendSMS({ to, message })

  } catch (error) {
    console.error('Invoice SMS sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send invoice SMS'
    }
  }
}

// Email templates for common scenarios
export const emailTemplates = {
  invoiceCreated: (clientName: string, projectType: string, amount: number, invoiceUrl: string) => ({
    subject: `Invoice Ready - ${projectType}`,
    html: `
      <p>Dear ${clientName},</p>
      <p>Your invoice for the ${projectType.toLowerCase()} project is ready for payment.</p>
      <p><strong>Amount: $${amount.toFixed(2)}</strong></p>
      <p><a href="${invoiceUrl}" style="background-color: #B85C38; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Invoice</a></p>
    `
  }),

  paymentReminder: (clientName: string, amount: number, daysOverdue: number, invoiceUrl: string) => ({
    subject: `Payment Reminder - Invoice Overdue`,
    html: `
      <p>Dear ${clientName},</p>
      <p>This is a friendly reminder that your invoice for <strong>$${amount.toFixed(2)}</strong> is now <strong>${daysOverdue} days overdue</strong>.</p>
      <p><a href="${invoiceUrl}" style="background-color: #B85C38; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Pay Now</a></p>
      <p>If you have any questions or need to discuss payment arrangements, please contact us.</p>
    `
  }),

  paymentReceived: (clientName: string, amount: number) => ({
    subject: 'Payment Received - Thank You!',
    html: `
      <p>Dear ${clientName},</p>
      <p>Thank you for your payment of <strong>$${amount.toFixed(2)}</strong>. We appreciate your business!</p>
      <p>If you have any questions about your project or need additional services, please don't hesitate to contact us.</p>
    `
  })
}