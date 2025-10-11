import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceNumber, clientName, clientAddress, items, total, notes, date, dueDate } = body;

    if (!clientName || !items || !total) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields: clientName, items, total"
      }, { status: 400 });
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });
    const buffers: Buffer[] = [];

    // Collect PDF data
    doc.on('data', (chunk) => buffers.push(chunk));

    // Generate invoice PDF
    doc.fontSize(20).text('INVOICE', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Invoice #${invoiceNumber || '0001'}`, { align: 'right' });
    doc.text(`Date: ${date || new Date().toLocaleDateString()}`, { align: 'right' });
    doc.text(`Due Date: ${dueDate || 'Upon receipt'}`, { align: 'right' });
    doc.moveDown();

    // Business info
    doc.text('Original Oak Carpentry', { align: 'left' });
    doc.text('123 Workshop Lane');
    doc.text('Tampa, FL 33602');
    doc.text('Phone: (813) 555-0123');
    doc.moveDown();

    // Client info
    doc.text('Bill To:', { underline: true });
    doc.text(clientName);
    doc.text(clientAddress || 'Client Address');
    doc.moveDown();

    // Invoice items
    doc.text('Description', 50, doc.y, { width: 300 });
    doc.text('Amount', 350, doc.y, { width: 100, align: 'right' });
    doc.moveDown();

    if (items && Array.isArray(items)) {
      items.forEach((item: any) => {
        doc.text(item.description || '', 50, doc.y, { width: 300 });
        doc.text(`$${(item.amount || 0).toFixed(2)}`, 350, doc.y, { width: 100, align: 'right' });
      });
    }

    doc.moveDown();
    doc.text(`Total: $${(total || 0).toFixed(2)}`, { align: 'right' });

    // Terms and notes
    if (notes) {
      doc.moveDown();
      doc.text('Notes:', { underline: true });
      doc.text(notes);
    }

    doc.end();

    // Wait for PDF generation to complete
    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        const pdfBase64 = pdfBuffer.toString('base64');

        resolve(NextResponse.json({
          success: true,
          pdf: pdfBase64,
          message: "Invoice PDF generated successfully",
          size: pdfBuffer.length,
          filename: `invoice-${invoiceNumber || '0001'}.pdf`
        }));
      });
    });

  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({
      success: false,
      error: `PDF generation failed: ${error.message}`
    }, { status: 500 });
  }
}