# Add Quotations to Admin

Mirror the existing Invoices feature so admins can create, edit, download, email, and (optionally) convert quotations into invoices before billing clients.

## What admins will get

- A new **Quotations** tab in `/admin/content` (next to Invoices).
- Create / edit quotations with the same editor UX as invoices: client info, line items (qty, unit price, amount), currency, notes, validity date.
- Statuses tailored to quotes: `draft`, `sent`, `accepted`, `declined`, `expired`.
- Actions per quotation: Edit, Download PDF, Send via Email, Delete, and **Convert to Invoice** (creates a new invoice prefilled from the quotation and marks the quote as `accepted`).
- Auto-generated quote numbers like `QUO-2026-001`.
- PDF + email templates branded the same as invoices, but labeled "Quotation".

## Technical plan

### Database (migration)
Two new tables in `public`, mirroring `invoices` / `invoice_items`:

- `quotations`
  - `id`, `quote_number` (unique), `date_issued`, `valid_until`
  - `status` (text, default `draft`)
  - `client_name`, `client_address`, `client_email`
  - `project_name`, `currency` (default `KES`), `notes`
  - `converted_invoice_id` (nullable FK → `invoices.id`)
  - `created_at`, `updated_at`
- `quotation_items`
  - `id`, `quotation_id` (FK cascade), `description`, `details`, `qty`, `unit_price`, `amount`, `sort_order`

GRANTs + RLS: same pattern used for `invoices` (admin-only via `has_role(auth.uid(),'admin')`), plus `GRANT ALL` to `service_role` for edge functions.

### Frontend
- `src/hooks/useQuotations.ts` — clone of `useInvoices.ts` (list, fetch-with-items, create, update, delete, status update, `generateQuoteNumber`, plus `convertToInvoice` mutation that inserts an invoice + items via the existing `useInvoices` create path and updates the quote).
- `src/components/admin/QuotationEditor.tsx` — clone of `InvoiceEditor.tsx` with "Valid Until" instead of "Payment Due" and quote-specific status options.
- `src/components/admin/QuotationsTab.tsx` — clone of `InvoicesTab.tsx`, adds a **Convert to Invoice** action button.
- `src/pages/admin/AdminContentPage.tsx` — add a `Quotations` tab between Blog and Invoices.
- `src/utils/quotationPdf.ts` — clone of `invoicePdf.ts`, header reads "QUOTATION", footer notes validity.

### Edge function
- `supabase/functions/send-quotation-email/index.ts` — clone of `send-invoice-email`, subject/body reference quotation + validity date, attaches the generated PDF (or reuses the same PDF-by-link pattern already in use for invoices).

### Out of scope
- No public-facing quote acceptance page (admin-only management for now).
- No changes to the public site, calculator, or existing invoices logic beyond reading the create path from the convert action.

After approval I'll write the migration, the hook, the editor, the tab, the PDF util, the edge function, and wire the new tab into `AdminContentPage`.
