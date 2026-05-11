import type { Invoice } from '@/hooks/useInvoices';

export const milestone2Prefill: Omit<Invoice, 'invoice_number'> = {
  date_issued: new Date().toISOString().split('T')[0],
  payment_due: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
  status: 'unpaid',
  client_name: '',
  client_address: '',
  client_email: '',
  project_name: 'Milestone 2',
  currency: 'KES',
  notes:
    'Thank you for choosing NafArro Solutions. Payment is due within 7 days of invoice date. Late payments may incur a 1.5% monthly fee.',
  items: [
    { description: 'A-01', details: 'Integrate Paystack as primary payment gateway (M-Pesa, card payments, bank transfers)', qty: 1, unit_price: 8100, amount: 8100, sort_order: 0 },
    { description: 'A-02', details: 'Create professional, customisable invoices with discounts and service items', qty: 1, unit_price: 4500, amount: 4500, sort_order: 1 },
    { description: 'A-03', details: 'Generate sales receipts and proforma invoices', qty: 1, unit_price: 2800, amount: 2800, sort_order: 2 },
    { description: 'A-04', details: 'Automate invoice generation upon website bookings', qty: 1, unit_price: 3300, amount: 3300, sort_order: 3 },
    { description: 'A-05', details: 'Automate payment reminders for outstanding debts', qty: 1, unit_price: 2800, amount: 2800, sort_order: 4 },
    { description: 'A-06', details: 'Build income & expense tracking tools (budgets, cash flow monitoring)', qty: 1, unit_price: 5600, amount: 5600, sort_order: 5 },
    { description: 'A-07', details: 'Enable receipt upload and matching to expenses', qty: 1, unit_price: 3300, amount: 3300, sort_order: 6 },
    { description: 'A-08', details: 'Implement Daily/Monthly/Yearly Till Reconciliation', qty: 1, unit_price: 4500, amount: 4500, sort_order: 7 },
    { description: 'A-09', details: 'Generate Profit & Loss, Balance Sheets, and Cash Flow statements', qty: 1, unit_price: 6700, amount: 6700, sort_order: 8 },
    { description: 'A-10', details: 'Set up Accounts Payable/Receivable — bills, debt accrual, and payment scheduling', qty: 1, unit_price: 5600, amount: 5600, sort_order: 9 },
    { description: 'C-01', details: 'Implement optional Google Sign-In (OAuth) for secure user authentication', qty: 1, unit_price: 4500, amount: 4500, sort_order: 10 },
    { description: 'C-02', details: 'Secure saving of user preferences and giving credentials for returning users', qty: 1, unit_price: 2800, amount: 2800, sort_order: 11 },
    { description: 'C-03', details: 'Build private Personal Giving Dashboard for authenticated users (payment & giving history)', qty: 1, unit_price: 5600, amount: 5600, sort_order: 12 },
    { description: 'B-06', details: 'Transfer professional email workspace from my.hosting.com to Google Workspace (Gmail / Google servers) — Scheduled for off-peak period', qty: 1, unit_price: 5200, amount: 5200, sort_order: 13 },
  ],
};
