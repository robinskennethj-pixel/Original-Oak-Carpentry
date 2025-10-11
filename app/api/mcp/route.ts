import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { PrismaClient } from "../../../lib/generated/prisma";

const run = util.promisify(exec);
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { tool, data } = await req.json();

  // Debug logging
  console.log('MCP Request:', { tool, data });

  try {
    if (tool === "rebuild") {
      await run("npm run build");
      return NextResponse.json({ ok: true, message: "Rebuild completed" });
    }

    if (tool === "lint") {
      const { stdout } = await run("npm run lint");
      return NextResponse.json({ ok: true, result: stdout });
    }

    if (tool === "diagnostics") {
      const { stdout } = await run("npm run diagnostics || echo 'No diagnostics script'" );
      return NextResponse.json({ ok: true, diagnostics: stdout });
    }

    if (tool === "generateInvoicePDF") {
      const { invoiceId, client, items, total } = data;

      if (!invoiceId || !client || !items || !total) {
        return NextResponse.json({
          ok: false,
          error: "Missing required fields: invoiceId, client, items, total"
        }, { status: 400 });
      }

      try {
        // Create invoices directory if it doesn't exist
        const pdfDir = path.join(process.cwd(), "public/invoices");
        fs.mkdirSync(pdfDir, { recursive: true });
        const filePath = path.join(pdfDir, `${invoiceId}.pdf`);

        // Create PDF document
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Generate invoice PDF
        doc.fontSize(20).text("INVOICE", { align: "center" }).moveDown();
        doc.fontSize(14).text(`Client: ${client}`);
        doc.moveDown();
        doc.text("Items:");
        items.forEach((i: any) =>
          doc.text(`• ${i.description} - $${i.amount}`)
        );
        doc.moveDown();
        doc.text(`Total: $${total}`, { align: "right" });

        doc.end();

        // Wait for PDF to finish writing
        await new Promise((resolve) => stream.on("finish", resolve));

        return NextResponse.json({
          ok: true,
          message: "Invoice PDF generated",
          path: `/invoices/${path.basename(filePath)}`
        });

      } catch (error: any) {
        return NextResponse.json({
          ok: false,
          error: `PDF generation failed: ${error.message}`
        }, { status: 500 });
      }
    }

    if (tool === "analyze_system") {
      const { stdout } = await run("npm run lint && npm run build || echo 'Build failed'");
      return NextResponse.json({ ok: true, analysis: stdout });
    }

    if (tool === "repair_system") {
      await run("npm install");
      await run("npm run lint -- --fix");
      const { stdout } = await run("npm run build");
      return NextResponse.json({ ok: true, message: "System repaired", output: stdout });
    }

    if (tool === "db_seed") {
      try {
        const sampleInvoices = [
          {
            client: "John Smith",
            total: 1250.00,
            items: JSON.stringify([
              { description: "Custom Kitchen Cabinets", amount: 800.00 },
              { description: "Installation Labor", amount: 450.00 }
            ])
          },
          {
            client: "Sarah Johnson",
            total: 850.00,
            items: JSON.stringify([
              { description: "Oak Dining Table", amount: 650.00 },
              { description: "Delivery & Setup", amount: 200.00 }
            ])
          }
        ];

        for (const invoice of sampleInvoices) {
          await prisma.invoice.create({
            data: {
              client: invoice.client,
              total: invoice.total,
              items: invoice.items
            }
          });
        }

        return NextResponse.json({
          ok: true,
          message: "Database seeded with sample invoices"
        });
      } catch (error: any) {
        return NextResponse.json({
          ok: false,
          error: `Database seed failed: ${error.message}`
        }, { status: 500 });
      }
    }

    if (tool === "db_list_invoices") {
      try {
        const invoices = await prisma.invoice.findMany({
          orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
          ok: true,
          invoices: invoices.map(inv => ({
            id: inv.id,
            client: inv.client,
            total: inv.total,
            createdAt: inv.createdAt,
            items: JSON.parse(inv.items as string)
          }))
        });
      } catch (error: any) {
        return NextResponse.json({
          ok: false,
          error: `Database query failed: ${error.message}`
        }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: false, error: "Unknown tool" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}