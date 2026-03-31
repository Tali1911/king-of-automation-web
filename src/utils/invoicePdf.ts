import jsPDF from 'jspdf';
import type { Invoice } from '@/hooks/useInvoices';

const NAVY: [number, number, number] = [10, 36, 99];
const DARK: [number, number, number] = [30, 30, 30];
const GRAY: [number, number, number] = [100, 100, 100];
const LIGHT_GRAY: [number, number, number] = [200, 200, 200];
const WHITE: [number, number, number] = [255, 255, 255];
const TABLE_BG: [number, number, number] = [245, 247, 250];

function formatCurrency(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateInvoicePdf(invoice: Invoice): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ─── HEADER ───
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('NafArro Solutions', margin, y + 7);

  doc.setFontSize(28);
  doc.setTextColor(...LIGHT_GRAY);
  doc.text('I N V O I C E', pageWidth - margin, y + 7, { align: 'right' });

  y += 14;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...NAVY);
  doc.text(`#${invoice.invoice_number}`, margin, y);

  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text('The King of Automation', margin, y + 5);
  doc.text('naftali@nafarrosolutions.com | +254 701443446', margin, y + 9);
  doc.text('1001, Catherine Ndereba Rd, Nairobi, Kenya', margin, y + 13);

  // Right side - dates & status
  const rightCol = pageWidth - margin;
  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text('Date Issued:', rightCol - 45, y);
  doc.text('Payment Due:', rightCol - 45, y + 5);
  doc.text('Status:', rightCol - 45, y + 10);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...DARK);
  doc.text(new Date(invoice.date_issued).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }), rightCol, y, { align: 'right' });
  doc.text(new Date(invoice.payment_due).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }), rightCol, y + 5, { align: 'right' });

  const statusColor = invoice.status === 'paid' ? [0, 128, 0] as const : invoice.status === 'overdue' ? [200, 0, 0] as const : NAVY;
  doc.setTextColor(...statusColor);
  doc.text(invoice.status.toUpperCase(), rightCol, y + 10, { align: 'right' });

  y += 22;

  // ─── LINE ───
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // ─── BILLING SECTION HEADER ───
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('BILLING INFORMATION', margin, y);
  y += 6;

  // Three columns
  const col1 = margin;
  const col2 = margin + contentWidth / 3;
  const col3 = margin + (contentWidth * 2) / 3;

  doc.setFillColor(...NAVY);
  doc.rect(col1, y, contentWidth / 3 - 2, 6, 'F');
  doc.rect(col2, y, contentWidth / 3 - 2, 6, 'F');
  doc.rect(col3, y, contentWidth / 3, 6, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...WHITE);
  doc.text('FROM', col1 + 3, y + 4);
  doc.text('BILL TO', col2 + 3, y + 4);
  doc.text('PROJECT DETAILS', col3 + 3, y + 4);

  y += 9;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...DARK);
  doc.setFontSize(7);

  // FROM
  const fromLines = [
    'NafArro Solutions',
    '1001, Catherine Ndereba Rd',
    'Nairobi, Kenya',
    'info@nafarrosolutions.com',
    '+254 701 443 446',
  ];
  fromLines.forEach((line, i) => {
    doc.text(line, col1 + 3, y + i * 4);
  });

  // BILL TO
  const clientLines = (invoice.client_address || '').split('\n').filter(Boolean);
  const billToLines = [invoice.client_name, ...clientLines];
  if (invoice.client_email) billToLines.push(invoice.client_email);
  billToLines.forEach((line, i) => {
    doc.text(line, col2 + 3, y + i * 4);
  });

  // PROJECT DETAILS
  const projectLines = [
    `Invoice #: ${invoice.invoice_number}`,
    `Project: ${invoice.project_name || 'N/A'}`,
    `Currency: ${invoice.currency}`,
  ];
  projectLines.forEach((line, i) => {
    doc.text(line, col3 + 3, y + i * 4);
  });

  y += 24;

  // ─── SERVICES TABLE ───
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('SERVICES & DELIVERABLES', margin, y);
  y += 5;

  // Table header
  doc.setFillColor(...NAVY);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...WHITE);
  doc.text('DESCRIPTION', margin + 3, y + 5);
  doc.text('QTY', margin + contentWidth * 0.6, y + 5);
  doc.text('UNIT PRICE', margin + contentWidth * 0.72, y + 5);
  doc.text('AMOUNT', margin + contentWidth - 3, y + 5, { align: 'right' });

  y += 7;

  const items = invoice.items || [];
  items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(...TABLE_BG);
      doc.rect(margin, y, contentWidth, 10, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...DARK);
    doc.setFontSize(7);
    doc.text(item.description, margin + 3, y + 4);

    if (item.details) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6);
      doc.setTextColor(...GRAY);
      doc.text(item.details.substring(0, 80), margin + 3, y + 8);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...DARK);
    doc.text(String(item.qty), margin + contentWidth * 0.6, y + 4);
    doc.text(formatCurrency(item.unit_price, invoice.currency), margin + contentWidth * 0.72, y + 4);
    doc.text(formatCurrency(item.qty * item.unit_price, invoice.currency), margin + contentWidth - 3, y + 4, { align: 'right' });

    y += 10;
  });

  y += 4;

  // Subtotal & Total
  const totalAmount = items.reduce((sum, item) => sum + item.qty * item.unit_price, 0);

  doc.setDrawColor(...LIGHT_GRAY);
  doc.line(margin + contentWidth * 0.6, y, pageWidth - margin, y);
  y += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);
  doc.text('Subtotal', margin + contentWidth * 0.6, y);
  doc.setTextColor(...DARK);
  doc.text(formatCurrency(totalAmount, invoice.currency), pageWidth - margin, y, { align: 'right' });

  y += 8;
  doc.setFillColor(...NAVY);
  doc.rect(margin + contentWidth * 0.55, y - 4, contentWidth * 0.45, 9, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...WHITE);
  doc.text('TOTAL DUE', margin + contentWidth * 0.58, y + 2);
  doc.text(formatCurrency(totalAmount, invoice.currency), pageWidth - margin - 3, y + 2, { align: 'right' });

  y += 16;

  // ─── NOTES & PAYMENT ───
  if (y > 240) {
    doc.addPage();
    y = margin;
  }

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('NOTES & PAYMENT INFORMATION', margin, y);
  y += 6;

  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // Notes
  if (invoice.notes) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...NAVY);
    doc.text('NOTES', margin, y);
    y += 4;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    doc.setFontSize(7);
    const noteLines = doc.splitTextToSize(invoice.notes, contentWidth / 2 - 5);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 3.5 + 4;
  }

  // Payment methods
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...NAVY);
  doc.text('PAYMENT METHODS', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);
  doc.setFontSize(7);
  doc.text('M-Pesa: +254 701 443 446', margin, y);
  doc.text('PayPal: ruciukoome@gmail.com', margin, y + 4);

  // ─── FOOTER ───
  const footerY = 285;
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
  doc.setFontSize(6);
  doc.setTextColor(...GRAY);
  doc.text(
    'NafArro Solutions · The King of Automation · info@nafarrosolutions.com · nafarrosolutions.com',
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );

  return doc;
}

export function downloadInvoicePdf(invoice: Invoice) {
  const doc = generateInvoicePdf(invoice);
  doc.save(`${invoice.invoice_number}.pdf`);
}
