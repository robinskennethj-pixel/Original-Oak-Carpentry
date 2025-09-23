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
      <p><small>This message was sent from the Ogun Carpentry website contact form.</small></p>
    `,
  }

  // Confirmation email to client
  const clientMailOptions = {
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: 'Thank you for contacting Ogun Carpentry',
    html: `
      <h2>Thank you for your inquiry!</h2>
      <p>Hello ${data.firstName},</p>
      <p>We have received your project inquiry and will get back to you within 24 hours.</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Project Details:</strong></p>
      <p>${data.projectDetails}</p>
      <hr>
      <p>Best regards,<br>The Ogun Carpentry Team</p>
      <p><small>Ogun Carpentry | Master Craftsmen of Wood & Metal</small></p>
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
    subject: 'Welcome to Ogun Carpentry Newsletter',
    html: `
      <h2>Welcome to Ogun Carpentry!</h2>
      <p>Thank you for subscribing to our newsletter.</p>
      <p>You'll receive updates about our latest projects, craftsmanship tips, and special offers.</p>
      <hr>
      <p>Best regards,<br>The Ogun Carpentry Team</p>
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