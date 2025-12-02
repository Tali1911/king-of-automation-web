import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequestData {
  email: string;
  name?: string;
  phone?: string;
  notes?: string;
  serviceTypes: string[];
  features: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const data: QuoteRequestData = await req.json();
    console.log("Received quote request:", data);

    const { email, name, phone, notes, serviceTypes, features } = data;

    // Build features list HTML
    const featuresHtml = features.length > 0 
      ? `<ul style="margin: 0; padding-left: 20px;">${features.map(f => `<li>${f}</li>`).join('')}</ul>`
      : '<p>No specific features selected</p>';

    // Email to the client (confirmation)
    const clientEmailResponse = await resend.emails.send({
      from: "NafArro Solutions <info@nafarrosolutions.com>",
      to: [email],
      subject: "We've Received Your Quote Request - NafArro Solutions",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #0A2463; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">NafArro Solutions</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0; font-size: 14px;">King of Automation</p>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #0A2463; margin-top: 0;">Thank You${name ? `, ${name}` : ''}!</h2>
              
              <p style="color: #374151; line-height: 1.6;">
                We've received your quote request and our team is already reviewing your requirements. 
                You can expect a detailed quotation in your inbox within <strong>24-48 hours</strong>.
              </p>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #0A2463; margin-top: 0; font-size: 16px;">Your Request Summary</h3>
                
                <p style="margin: 10px 0 5px 0; font-weight: 600; color: #374151;">Service Types:</p>
                <p style="margin: 0; color: #6b7280;">${serviceTypes.join(', ')}</p>
                
                <p style="margin: 15px 0 5px 0; font-weight: 600; color: #374151;">Selected Features:</p>
                ${featuresHtml}
                
                ${notes ? `
                <p style="margin: 15px 0 5px 0; font-weight: 600; color: #374151;">Additional Notes:</p>
                <p style="margin: 0; color: #6b7280;">${notes}</p>
                ` : ''}
              </div>
              
              <p style="color: #374151; line-height: 1.6;">
                Have questions in the meantime? Feel free to reply to this email or reach out to us directly.
              </p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://nafarrosolutions.com" style="display: inline-block; background-color: #0A2463; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  Visit Our Website
                </a>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} NafArro Solutions. All rights reserved.</p>
              <p style="margin: 5px 0 0 0;">Nairobi, Kenya</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Client email sent:", clientEmailResponse);

    // Email to NafArro team (notification)
    const teamEmailResponse = await resend.emails.send({
      from: "NafArro Solutions <info@nafarrosolutions.com>",
      to: ["ruciukoome@gmail.com"],
      subject: `New Quote Request from ${name || email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0A2463; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h1>
            </div>
            
            <div style="padding: 30px;">
              <h2 style="color: #0A2463; margin-top: 0;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 100px;">Email:</td>
                  <td style="padding: 8px 0; color: #374151;"><strong>${email}</strong></td>
                </tr>
                ${name ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Name:</td>
                  <td style="padding: 8px 0; color: #374151;"><strong>${name}</strong></td>
                </tr>
                ` : ''}
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Phone:</td>
                  <td style="padding: 8px 0; color: #374151;"><strong>${phone}</strong></td>
                </tr>
                ` : ''}
              </table>
              
              <h2 style="color: #0A2463; margin-top: 30px;">Request Details</h2>
              
              <p style="margin: 10px 0 5px 0; font-weight: 600; color: #374151;">Service Types:</p>
              <p style="margin: 0; color: #6b7280;">${serviceTypes.join(', ')}</p>
              
              <p style="margin: 15px 0 5px 0; font-weight: 600; color: #374151;">Selected Features (${features.length}):</p>
              ${featuresHtml}
              
              ${notes ? `
              <h3 style="color: #0A2463; margin-top: 30px;">Additional Notes</h3>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; color: #374151;">
                ${notes}
              </div>
              ` : ''}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                  Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} (EAT)
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Team email sent:", teamEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quote request emails sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-quote-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
