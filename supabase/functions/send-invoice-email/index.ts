import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.86.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function formatCurrency(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { invoiceId } = await req.json();
    if (!invoiceId) {
      return new Response(JSON.stringify({ error: 'invoiceId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch invoice
    const { data: invoice, error: invErr } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();
    if (invErr || !invoice) {
      return new Response(JSON.stringify({ error: 'Invoice not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!invoice.client_email) {
      return new Response(JSON.stringify({ error: 'No client email on this invoice' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch items
    const { data: items } = await supabase
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('sort_order');

    const total = (items || []).reduce((sum: number, i: any) => sum + i.qty * i.unit_price, 0);

    // Build HTML email
    const itemRows = (items || []).map((item: any) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${item.description}${item.details ? `<br/><span style="color: #6b7280; font-size: 12px;">${item.details}</span>` : ''}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: center; font-size: 14px;">${item.qty}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px;">${formatCurrency(item.unit_price, invoice.currency)}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-size: 14px; font-weight: 600;">${formatCurrency(item.qty * item.unit_price, invoice.currency)}</td>
      </tr>
    `).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0A2463; padding: 24px 30px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">NafArro Solutions</h1>
          <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px;">The King of Automation</p>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #0A2463; margin: 0 0 8px; font-size: 18px;">Invoice ${invoice.invoice_number}</h2>
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 4px;">Date Issued: ${new Date(invoice.date_issued).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p style="color: #6b7280; font-size: 13px; margin: 0 0 4px;">Payment Due: ${new Date(invoice.payment_due).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p style="margin: 0 0 20px;"><span style="background: ${invoice.status === 'paid' ? '#dcfce7' : invoice.status === 'overdue' ? '#fee2e2' : '#fef9c3'}; color: ${invoice.status === 'paid' ? '#166534' : invoice.status === 'overdue' ? '#991b1b' : '#854d0e'}; padding: 3px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">${invoice.status.toUpperCase()}</span></p>
          
          <p style="font-size: 14px; color: #374151; margin: 0 0 4px;"><strong>Bill To:</strong></p>
          <p style="font-size: 14px; color: #374151; margin: 0 0 2px;">${invoice.client_name}</p>
          ${invoice.client_address ? `<p style="font-size: 13px; color: #6b7280; margin: 0 0 2px; white-space: pre-line;">${invoice.client_address}</p>` : ''}
          ${invoice.project_name ? `<p style="font-size: 13px; color: #6b7280; margin: 12px 0 0;">Project: <strong>${invoice.project_name}</strong></p>` : ''}
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #0A2463;">
                <th style="padding: 10px 12px; text-align: left; color: #ffffff; font-size: 12px; font-weight: 600;">Description</th>
                <th style="padding: 10px 12px; text-align: center; color: #ffffff; font-size: 12px; font-weight: 600;">Qty</th>
                <th style="padding: 10px 12px; text-align: right; color: #ffffff; font-size: 12px; font-weight: 600;">Unit Price</th>
                <th style="padding: 10px 12px; text-align: right; color: #ffffff; font-size: 12px; font-weight: 600;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <div style="text-align: right; margin: 16px 0; padding: 12px 16px; background: #0A2463; border-radius: 6px;">
            <span style="color: #ffffff; font-size: 16px; font-weight: 700;">Total Due: ${formatCurrency(total, invoice.currency)}</span>
          </div>

          ${invoice.notes ? `<div style="margin: 20px 0; padding: 16px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #0A2463;"><p style="font-size: 12px; color: #0A2463; font-weight: 600; margin: 0 0 4px;">NOTES</p><p style="font-size: 13px; color: #6b7280; margin: 0; white-space: pre-line;">${invoice.notes}</p></div>` : ''}
          
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 6px;">
            <p style="font-size: 12px; color: #0A2463; font-weight: 600; margin: 0 0 8px;">PAYMENT METHODS</p>
            <p style="font-size: 13px; color: #374151; margin: 0 0 2px;">M-Pesa: +254 701 443 446</p>
            <p style="font-size: 13px; color: #374151; margin: 0;">PayPal: ruciukoome@gmail.com</p>
          </div>
        </div>
        <div style="background: #f1f5f9; padding: 16px 30px; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">NafArro Solutions · The King of Automation · info@nafarrosolutions.com · nafarrosolutions.com</p>
        </div>
      </div>
    `;

    // Send via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'NafArro Solutions <info@nafarrosolutions.com>',
        to: [invoice.client_email],
        subject: `Invoice ${invoice.invoice_number} from NafArro Solutions`,
        html,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error('Resend error:', resendData);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: resendData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, emailId: resendData.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
