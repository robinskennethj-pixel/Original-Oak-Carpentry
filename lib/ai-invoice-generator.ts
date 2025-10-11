import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ProjectData {
  clientName: string;
  clientEmail: string;
  projectType: string;
  projectDescription: string;
  materials: string[];
  laborHours: number;
  materialCost: number;
  laborRate: number;
  totalAmount: number;
  completionDate: string;
  location: string;
  specialRequests?: string;
  warrantyRequired?: boolean;
  isHurricaneRelated?: boolean;
}

export interface GeneratedInvoice {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  projectDescription: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  emailBody: string;
  dueDate: string;
  paymentTerms: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'materials' | 'labor' | 'permits' | 'other';
}

export class AIInvoiceGenerator {

  /**
   * Generate comprehensive invoice data using AI
   */
  async generateInvoice(projectData: ProjectData): Promise<GeneratedInvoice> {
    try {
      const prompt = this.createInvoicePrompt(projectData);

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert invoice generator for Original Oak Carpentry, a Florida-based carpentry company specializing in hurricane-resistant construction and custom woodworking.

Generate professional invoice content based on the project details. Include:
1. Detailed itemized breakdown
2. Professional project description
3. Relevant notes and terms
4. Personalized email message
5. Appropriate payment terms

Consider Florida building codes, hurricane requirements, and local market conditions.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      const aiResponse = completion.choices[0]?.message?.content;
      if (!aiResponse) throw new Error('No AI response generated');

      return this.parseAIResponse(aiResponse, projectData);
    } catch (error) {
      console.error('AI Invoice Generation Error:', error);
      return this.generateFallbackInvoice(projectData);
    }
  }

  /**
   * Create detailed prompt for AI invoice generation
   */
  private createInvoicePrompt(projectData: ProjectData): string {
    return `Generate a professional invoice for Original Oak Carpentry with the following project details:

CLIENT INFORMATION:
- Name: ${projectData.clientName}
- Email: ${projectData.clientEmail}
- Location: ${projectData.location}

PROJECT DETAILS:
- Type: ${projectData.projectType}
- Description: ${projectData.projectDescription}
- Materials: ${projectData.materials.join(', ')}
- Labor Hours: ${projectData.laborHours}
- Material Cost: $${projectData.materialCost}
- Labor Rate: $${projectData.laborRate}/hour
- Total Base Amount: $${projectData.totalAmount}
- Completion Date: ${projectData.completionDate}
- Hurricane Related: ${projectData.isHurricaneRelated ? 'Yes' : 'No'}
- Warranty Required: ${projectData.warrantyRequired ? 'Yes' : 'No'}
- Special Requests: ${projectData.specialRequests || 'None'}

REQUIREMENTS:
1. Create detailed invoice items with proper categorization
2. Calculate appropriate taxes (Florida sales tax where applicable)
3. Add professional project description
4. Include relevant notes based on project type
5. Generate personalized email message
6. Set appropriate payment terms
7. Consider Florida building codes and hurricane requirements

Return the invoice in this JSON format:
{
  "invoiceNumber": "OAK-2024-XXX",
  "projectDescription": "Detailed project description",
  "items": [
    {
      "description": "Item description",
      "quantity": number,
      "unitPrice": number,
      "total": number,
      "category": "materials|labor|permits|other"
    }
  ],
  "subtotal": number,
  "tax": number,
  "total": number,
  "notes": "Relevant project notes",
  "emailBody": "Personalized email message",
  "dueDate": "YYYY-MM-DD",
  "paymentTerms": "Payment terms description"
}`;
  }

  /**
   * Parse AI response into structured invoice data
   */
  private parseAIResponse(aiResponse: string, projectData: ProjectData): GeneratedInvoice {
    try {
      // Extract JSON from AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in AI response');

      const aiData = JSON.parse(jsonMatch[0]);

      return {
        invoiceNumber: aiData.invoiceNumber || this.generateInvoiceNumber(),
        clientName: projectData.clientName,
        clientEmail: projectData.clientEmail,
        projectDescription: aiData.projectDescription || projectData.projectDescription,
        items: aiData.items || this.generateDefaultItems(projectData),
        subtotal: aiData.subtotal || projectData.totalAmount,
        tax: aiData.tax || this.calculateTax(projectData.totalAmount, projectData.location),
        total: aiData.total || (projectData.totalAmount + this.calculateTax(projectData.totalAmount, projectData.location)),
        notes: aiData.notes || this.generateDefaultNotes(projectData),
        emailBody: aiData.emailBody || this.generateDefaultEmail(projectData),
        dueDate: aiData.dueDate || this.generateDueDate(),
        paymentTerms: aiData.paymentTerms || "Payment due within 30 days. Late fees may apply after due date."
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.generateFallbackInvoice(projectData);
    }
  }

  /**
   * Generate fallback invoice when AI fails
   */
  private generateFallbackInvoice(projectData: ProjectData): GeneratedInvoice {
    const subtotal = projectData.totalAmount;
    const tax = this.calculateTax(subtotal, projectData.location);
    const total = subtotal + tax;

    return {
      invoiceNumber: this.generateInvoiceNumber(),
      clientName: projectData.clientName,
      clientEmail: projectData.clientEmail,
      projectDescription: this.generateFallbackDescription(projectData),
      items: this.generateDefaultItems(projectData),
      subtotal,
      tax,
      total,
      notes: this.generateDefaultNotes(projectData),
      emailBody: this.generateDefaultEmail(projectData),
      dueDate: this.generateDueDate(),
      paymentTerms: "Payment due within 30 days. Late fees may apply after due date."
    };
  }

  /**
   * Generate default invoice items
   */
  private generateDefaultItems(projectData: ProjectData): InvoiceItem[] {
    const items: InvoiceItem[] = [];

    // Materials
    if (projectData.materialCost > 0) {
      items.push({
        description: `Materials: ${projectData.materials.join(', ')}`,
        quantity: 1,
        unitPrice: projectData.materialCost,
        total: projectData.materialCost,
        category: 'materials'
      });
    }

    // Labor
    const laborTotal = projectData.laborHours * projectData.laborRate;
    if (laborTotal > 0) {
      items.push({
        description: `Professional carpentry labor (${projectData.laborHours} hours)`,
        quantity: projectData.laborHours,
        unitPrice: projectData.laborRate,
        total: laborTotal,
        category: 'labor'
      });
    }

    // Additional fees
    const additionalFees = projectData.totalAmount - (projectData.materialCost + laborTotal);
    if (additionalFees > 0) {
      items.push({
        description: 'Additional services and fees',
        quantity: 1,
        unitPrice: additionalFees,
        total: additionalFees,
        category: 'other'
      });
    }

    return items;
  }

  /**
   * Generate fallback project description
   */
  private generateFallbackDescription(projectData: ProjectData): string {
    let description = `${projectData.projectType} project completed on ${projectData.completionDate}`;

    if (projectData.isHurricaneRelated) {
      description += ' - Hurricane-resistant construction meeting Florida building codes';
    }

    if (projectData.warrantyRequired) {
      description += ' - Includes warranty coverage';
    }

    return description;
  }

  /**
   * Generate default invoice notes
   */
  private generateDefaultNotes(projectData: ProjectData): string {
    const notes = [];

    if (projectData.isHurricaneRelated) {
      notes.push("This project includes hurricane-resistant construction techniques and materials meeting Florida building codes.");
    }

    if (projectData.warrantyRequired) {
      notes.push("Workmanship warranty included. Contact us for warranty details and maintenance recommendations.");
    }

    if (projectData.specialRequests) {
      notes.push(`Special considerations: ${projectData.specialRequests}`);
    }

    notes.push("Thank you for choosing Original Oak Carpentry for your project!");

    return notes.join(' ');
  }

  /**
   * Generate default email message
   */
  private generateDefaultEmail(projectData: ProjectData): string {
    const greeting = `Hi ${projectData.clientName},`;
    const projectSummary = `Thank you for trusting Original Oak Carpentry with your ${projectData.projectType.toLowerCase()} project.`;
    const completionNote = `We completed the work on ${projectData.completionDate} and hope you're satisfied with the results.`;
    const paymentNote = `Please find your invoice attached. Payment is due within 30 days.`;
    const closing = `If you have any questions or need warranty information, please don't hesitate to contact us.`;

    return `${greeting}\n\n${projectSummary} ${completionNote}\n\n${paymentNote}\n\n${closing}\n\nBest regards,\nThe Original Oak Carpentry Team\n(407) 555-0123\ninfo@originaloakcarpentry.com`;
  }

  /**
   * Calculate Florida sales tax based on location
   */
  private calculateTax(amount: number, location: string): number {
    // Florida sales tax rates by county (simplified)
    const taxRates: { [key: string]: number } = {
      'orange-county': 0.065,
      'osceola-county': 0.075,
      'seminole-county': 0.07,
      'hillsborough-county': 0.075,
      'pinellas-county': 0.07,
      'miami-dade': 0.07,
      'broward': 0.06,
      'palm-beach': 0.065
    };

    const rate = taxRates[location.toLowerCase().replace(/\s+/g, '-')] || 0.065;
    return Math.round(amount * rate * 100) / 100;
  }

  /**
   * Generate unique invoice number
   */
  private generateInvoiceNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `OAK-${year}-${month}-${random}`;
  }

  /**
   * Generate due date (30 days from now)
   */
  private generateDueDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }
}

/**
 * Generate Stripe invoice data from AI-generated invoice
 */
export function generateStripeInvoiceData(invoice: GeneratedInvoice) {
  return {
    customer_email: invoice.clientEmail,
    description: invoice.projectDescription,
    line_items: invoice.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.description,
        },
        unit_amount: Math.round(item.unitPrice * 100), // Convert to cents
      },
      quantity: item.quantity,
    })),
    metadata: {
      invoice_number: invoice.invoiceNumber,
      client_name: invoice.clientName,
      notes: invoice.notes,
    }
  };
}

/**
 * Generate email content for invoice delivery
 */
export function generateInvoiceEmail(invoice: GeneratedInvoice): {
  subject: string;
  body: string;
  html?: string;
} {
  const subject = `Invoice ${invoice.invoiceNumber} - Original Oak Carpentry`;

  const body = invoice.emailBody;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2E473B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .footer { margin-top: 20px; text-align: center; color: #666; font-size: 14px; }
        .button { background: #A67B5B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Original Oak Carpentry</h1>
          <p>Professional Carpentry Services</p>
        </div>
        <div class="content">
          <p>${invoice.emailBody.replace(/\n/g, '<br>')}</p>
          <p><strong>Invoice Details:</strong></p>
          <ul>
            <li>Invoice Number: ${invoice.invoiceNumber}</li>
            <li>Project: ${invoice.projectDescription}</li>
            <li>Total Amount: $${invoice.total.toLocaleString()}</li>
            <li>Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}</li>
          </ul>
          <p>${invoice.paymentTerms}</p>
          <p><strong>Payment Options:</strong></p>
          <p>• Online payment via secure link<br>
             • Check payable to Original Oak Carpentry<br>
             • Cash or card on delivery</p>
        </div>
        <div class="footer">
          <p>Original Oak Carpentry<br>
          Orlando, FL<br>
          (407) 555-0123<br>
          info@originaloakcarpentry.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    subject,
    body,
    html
  };
}

export const aiInvoiceGenerator = new AIInvoiceGenerator();