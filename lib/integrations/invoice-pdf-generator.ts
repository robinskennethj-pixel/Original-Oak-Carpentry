import PDFDocument from 'pdfkit'
import { OGUN_CARPENTRY_BRANDING } from './stripe-invoicing'
import { InvoiceData } from './stripe-invoicing'
import { AIInvoiceContent } from './ai-invoice-generator'

// Enhanced PDF generation with custom branding
export const generateBrandedInvoicePDF = async (
  invoiceData: InvoiceData,
  aiContent: AIInvoiceContent,
  invoiceNumber: string,
  invoiceDate: string
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 })
      const buffers: Buffer[] = []

      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers)
        resolve(pdfData)
      })

      // Header with branding
      generateHeader(doc, invoiceNumber, invoiceDate)

      // Client information
      generateClientInfo(doc, invoiceData)

      // Invoice details
      generateInvoiceDetails(doc, invoiceData, aiContent)

      // Items breakdown
      generateItemsTable(doc, invoiceData)

      // Totals
      generateTotals(doc, invoiceData)

      // Additional content
      generateAdditionalContent(doc, aiContent)

      // Footer
      generateFooter(doc)

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

// Generate professional header
function generateHeader(doc: PDFKit.PDFDocument, invoiceNumber: string, invoiceDate: string) {
  const { businessName, logoUrl, primaryColor, accentColor, phone, email, website, licenseNumber } = OGUN_CARPENTRY_BRANDING

  // Background color band
  doc.rect(0, 0, doc.page.width, 120)
     .fill(primaryColor)

  // Logo placeholder (would load actual logo in production)
  doc.rect(50, 30, 80, 60)
     .fill('white')

  doc.fillColor('white')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text(businessName, 150, 45)

  // Contact info
  doc.fontSize(10)
     .font('Helvetica')
     .text(`Phone: ${phone}`, 150, 75)
     .text(`Email: ${email}`, 150, 90)
     .text(`Website: ${website}`, 150, 105)
     .text(`License: ${licenseNumber}`, 150, 120)

  // Invoice title and number
  doc.fillColor('white')
     .fontSize(32)
     .font('Helvetica-Bold')
     .text('INVOICE', doc.page.width - 200, 45, { align: 'right' })

  doc.fontSize(12)
     .font('Helvetica')
     .text(`Invoice #: ${invoiceNumber}`, doc.page.width - 200, 85, { align: 'right' })
     .text(`Date: ${invoiceDate}`, doc.page.width - 200, 100, { align: 'right' })

  // Move cursor below header
  doc.moveDown(8)
}

// Generate client information section
function generateClientInfo(doc: PDFKit.PDFDocument, invoiceData: InvoiceData) {
  doc.fillColor(OGUN_CARPENTRY_BRANDING.primaryColor)
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('BILL TO', 50, doc.y)

  doc.moveDown(0.5)

  doc.fillColor('black')
     .fontSize(12)
     .font('Helvetica')
     .text(invoiceData.clientName)
     .text(invoiceData.clientEmail)

  if (invoiceData.clientAddress) {
    const address = invoiceData.clientAddress
    doc.text(address.line1)
    if (address.line2) doc.text(address.line2)
    doc.text(`${address.city}, ${address.state} ${address.postalCode}`)
    if (address.country && address.country !== 'US') {
      doc.text(address.country)
    }
  }

  doc.moveDown(2)
}

// Generate project details section
function generateInvoiceDetails(doc: PDFKit.PDFDocument, invoiceData: InvoiceData, aiContent: AIInvoiceContent) {
  doc.fillColor(OGUN_CARPENTRY_BRANDING.primaryColor)
     .fontSize(16)
     .font('Helvetica-Bold')
     .text('PROJECT DETAILS', 50, doc.y)

  doc.moveDown(0.5)

  doc.fillColor('black')
     .fontSize(12)
     .font('Helvetica')
     .text(`Project Type: ${invoiceData.projectType}`)
     .text(`Completion Date: ${invoiceData.completionDate || 'N/A'}`)
     .text(`Payment Terms: ${invoiceData.paymentTerms || 'Due on receipt'}`)

  if (invoiceData.dueDate) {
    doc.text(`Due Date: ${invoiceData.dueDate}`)
  }

  doc.moveDown(1)

  // Project description
  if (aiContent.projectDescription) {
    doc.fillColor(OGUN_CARPENTRY_BRANDING.primaryColor)
       .fontSize(12)
       .font('Helvetica-Bold')
       .text('DESCRIPTION OF WORK', 50, doc.y)

    doc.moveDown(0.3)

    doc.fillColor('black')
       .fontSize(11)
       .font('Helvetica')
       .text(aiContent.projectDescription, { width: 500 })
  }

  doc.moveDown(2)
}

// Generate items table
function generateItemsTable(doc: PDFKit.PDFDocument, invoiceData: InvoiceData) {
  const tableTop = doc.y
  const tableHeaders = ['ITEM', 'DESCRIPTION', 'QTY', 'RATE', 'AMOUNT']
  const columnWidths = [120, 200, 60, 80, 80]
  const columnPositions = [50, 170, 370, 430, 510]

  // Table header background
  doc.rect(50, tableTop - 10, 540, 30)
     .fill(OGUN_CARPENTRY_BRANDING.accentColor)

  // Table headers
  doc.fillColor('white')
     .fontSize(10)
     .font('Helvetica-Bold')

  tableHeaders.forEach((header, i) => {
    doc.text(header, columnPositions[i], tableTop, { width: columnWidths[i] })
  })

  doc.moveDown(1)

  // Materials items
  doc.fillColor('black')
     .fontSize(10)
     .font('Helvetica')

  if (invoiceData.materialsCost > 0) {
    doc.text('Materials', 50, doc.y)
    doc.text('Materials for project', 170, doc.y - 15, { width: 200 })
    doc.text('1', 370, doc.y - 15, { width: 60, align: 'center' })
    doc.text(`$${invoiceData.materialsCost.toFixed(2)}`, 430, doc.y - 15, { width: 80, align: 'right' })
    doc.text(`$${invoiceData.materialsCost.toFixed(2)}`, 510, doc.y - 15, { width: 80, align: 'right' })
  }

  // Labor item
  if (invoiceData.laborCost > 0) {
    doc.text('Labor', 50, doc.y)
    doc.text('Professional carpentry services', 170, doc.y - 15, { width: 200 })
    doc.text('1', 370, doc.y - 15, { width: 60, align: 'center' })
    doc.text(`$${invoiceData.laborCost.toFixed(2)}`, 430, doc.y - 15, { width: 80, align: 'right' })
    doc.text(`$${invoiceData.laborCost.toFixed(2)}`, 510, doc.y - 15, { width: 80, align: 'right' })
  }

  doc.moveDown(2)
}

// Generate totals section
function generateTotals(doc: PDFKit.PDFDocument, invoiceData: InvoiceData) {
  const subtotal = invoiceData.materialsCost + invoiceData.laborCost
  const tax = invoiceData.taxAmount || 0
  const discount = invoiceData.discountAmount || 0
  const total = subtotal + tax - discount

  const totalsStart = doc.y

  // Subtotal
  doc.fillColor('black')
     .fontSize(11)
     .font('Helvetica')
     .text('Subtotal:', 400, totalsStart, { width: 100, align: 'right' })
     .text(`$${subtotal.toFixed(2)}`, 510, totalsStart, { width: 80, align: 'right' })

  // Tax
  if (tax > 0) {
    doc.text(`Tax (7%):`, 400, doc.y, { width: 100, align: 'right' })
       .text(`$${tax.toFixed(2)}`, 510, doc.y - 15, { width: 80, align: 'right' })
  }

  // Discount
  if (discount > 0) {
    doc.text(`Discount:`, 400, doc.y, { width: 100, align: 'right' })
       .text(`-$${discount.toFixed(2)}`, 510, doc.y - 15, { width: 80, align: 'right' })
  }

  // Total line
  const totalY = doc.y
  doc.rect(400, totalY - 5, 190, 2)
     .fill(OGUN_CARPENTRY_BRANDING.primaryColor)

  doc.fillColor(OGUN_CARPENTRY_BRANDING.primaryColor)
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('TOTAL:', 400, totalY + 5, { width: 100, align: 'right' })
     .text(`$${total.toFixed(2)}`, 510, totalY + 5, { width: 80, align: 'right' })

  doc.moveDown(2)
}

// Generate additional content (warranty, maintenance, etc.)
function generateAdditionalContent(doc: PDFKit.PDFDocument, aiContent: AIInvoiceContent) {
  if (aiContent.warrantyNotes || aiContent.maintenanceNotes || aiContent.suggestedAddOns.length > 0) {
    doc.fillColor(OGUN_CARPENTRY_BRANDING.primaryColor)
       .fontSize(14)
       .font('Helvetica-Bold')
       .text('ADDITIONAL INFORMATION', 50, doc.y)

    doc.moveDown(0.5)

    // Warranty notes
    if (aiContent.warrantyNotes) {
      doc.fillColor(OGUN_CARPENTRY_BRANDING.accentColor)
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('Warranty:', 50, doc.y)

      doc.moveDown(0.3)

      doc.fillColor('black')
         .fontSize(10)
         .font('Helvetica')
         .text(aiContent.warrantyNotes, { width: 500 })

      doc.moveDown(1)
    }

    // Maintenance notes
    if (aiContent.maintenanceNotes) {
      doc.fillColor(OGUN_CARPENTRY_BRANDING.accentColor)
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('Maintenance Recommendations:', 50, doc.y)

      doc.moveDown(0.3)

      doc.fillColor('black')
         .fontSize(10)
         .font('Helvetica')
         .text(aiContent.maintenanceNotes, { width: 500 })

      doc.moveDown(1)
    }

    // Suggested add-ons
    if (aiContent.suggestedAddOns.length > 0) {
      doc.fillColor(OGUN_CARPENTRY_BRANDING.accentColor)
         .fontSize(12)
         .font('Helvetica-Bold')
         .text('Suggested Future Services:', 50, doc.y)

      doc.moveDown(0.3)

      doc.fillColor('black')
         .fontSize(10)
         .font('Helvetica')

      aiContent.suggestedAddOns.forEach((addon, index) => {
        doc.text(`• ${addon}`, { indent: 20 })
      })

      doc.moveDown(1)
    }
  }
}

// Generate footer
function generateFooter(doc: PDFKit.PDFDocument) {
  const { businessName, phone, email, website, licenseNumber } = OGUN_CARPENTRY_BRANDING

  // Move to bottom of page
  const footerY = doc.page.height - 100

  // Footer background
  doc.rect(0, footerY - 10, doc.page.width, 110)
     .fill(OGUN_CARPENTRY_BRANDING.primaryColor)

  // Footer content
  doc.fillColor('white')
     .fontSize(10)
     .font('Helvetica')

  // Business info
  doc.text(businessName, 50, footerY)
     .text(`Phone: ${phone}`, 50, footerY + 15)
     .text(`Email: ${email}`, 50, footerY + 30)
     .text(`Website: ${website}`, 50, footerY + 45)
     .text(`License: ${licenseNumber}`, 50, footerY + 60)

  // Thank you message
  doc.fontSize(12)
     .font('Helvetica-Bold')
     .text('Thank you for choosing Ogun Carpentry!', doc.page.width - 300, footerY, { align: 'right', width: 250 })

  doc.fontSize(10)
     .font('Helvetica')
     .text('We appreciate your business and look forward to serving you again.', doc.page.width - 300, footerY + 20, { align: 'right', width: 250 })

  // Payment methods
  doc.text('Payment Methods Accepted:', doc.page.width - 300, footerY + 45, { align: 'right', width: 250 })
  doc.text('Credit Card, Bank Transfer, Check', doc.page.width - 300, footerY + 60, { align: 'right', width: 250 })
}

// Generate simplified invoice for email attachments
export const generateSimpleInvoicePDF = async (
  invoiceData: InvoiceData,
  invoiceNumber: string,
  invoiceDate: string
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' })
      const buffers: Buffer[] = []

      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers)
        resolve(pdfData)
      })

      // Simple header
      doc.fillColor(OGUN_CARPENTRY_BRANDING.primaryColor)
         .fontSize(20)
         .font('Helvetica-Bold')
         .text('Ogun Carpentry', 50, 50)

      doc.fontSize(12)
         .text(`Invoice #${invoiceNumber}`, 50, 80)
         .text(`Date: ${invoiceDate}`, 50, 95)

      // Client info
      doc.moveDown(2)
      doc.text(`Bill To: ${invoiceData.clientName}`)
      doc.text(invoiceData.clientEmail)

      // Project info
      doc.moveDown(2)
      doc.text(`Project: ${invoiceData.projectType}`)
      doc.text(`Description: ${invoiceData.projectDescription}`)

      // Amount
      doc.moveDown(2)
      doc.text(`Total Amount: $${invoiceData.totalAmount.toFixed(2)}`)

      // Payment info
      doc.moveDown(2)
      doc.text('Payment Instructions:')
      doc.text('Please pay by check or contact us for online payment options.')

      // Contact info
      doc.moveDown(2)
      doc.text('Contact:')
      doc.text(`Phone: ${OGUN_CARPENTRY_BRANDING.phone}`)
      doc.text(`Email: ${OGUN_CARPENTRY_BRANDING.email}`)

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

// Mock PDF generation for development
export const getMockInvoicePDF = async (): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument()
      const buffers: Buffer[] = []

      doc.on('data', buffers.push.bind(buffers))
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers)
        resolve(pdfData)
      })

      doc.fontSize(20).text('Ogun Carpentry - Sample Invoice', 100, 100)
      doc.fontSize(12).text('This is a sample invoice PDF for development purposes.', 100, 150)
      doc.text('In production, this would be a fully branded invoice with client details.')

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  generateBrandedInvoicePDF,
  generateSimpleInvoicePDF,
  getMockInvoicePDF,
}