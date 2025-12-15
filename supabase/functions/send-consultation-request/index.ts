import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  duration: string;
  message: string;
}

// Helper to send email via Resend API
async function sendEmail(params: {
  from: string;
  to: string[];
  subject: string;
  html: string;
}): Promise<{ id: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend API error:", errorText);
    throw new Error(`Failed to send email: ${response.status}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const consultationData: ConsultationRequest = await req.json();
    const { name, email, phone, date, time, duration, message } = consultationData;

    console.log("Processing consultation request from:", email);

    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email to client (confirmation)
    const clientEmailResponse = await sendEmail({
      from: "NafArro Solutions <info@nafarrosolutions.com>",
      to: [email],
      subject: "Consultation Request Received - NafArro Solutions",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A2463 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0A2463; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            h1 { margin: 0; font-size: 24px; }
            h2 { color: #0A2463; margin-top: 0; }
            .detail-row { display: flex; margin: 10px 0; }
            .detail-label { font-weight: 600; color: #0A2463; min-width: 100px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NafArro Solutions</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Consultation Request Received</p>
            </div>
            <div class="content">
              <h2>Thank you${name ? `, ${name}` : ''}!</h2>
              <p>We have received your consultation request. Our team will contact you shortly to confirm the appointment.</p>
              
              <div class="booking-details">
                <h3 style="margin-top: 0; color: #0A2463;">Your Requested Booking:</h3>
                <div class="detail-row"><span class="detail-label">Date:</span> ${formattedDate}</div>
                <div class="detail-row"><span class="detail-label">Time:</span> ${time}</div>
                <div class="detail-row"><span class="detail-label">Duration:</span> ${duration} hour(s)</div>
                ${message ? `<div class="detail-row"><span class="detail-label">Notes:</span> ${message}</div>` : ''}
              </div>
              
              <p><strong>What's next?</strong></p>
              <ul>
                <li>Our team will review your request</li>
                <li>We'll contact you to confirm availability</li>
                <li>You'll receive meeting details once confirmed</li>
              </ul>
              
              <p>If you have any questions, feel free to reply to this email.</p>
              
              <div class="footer">
                <p>Best regards,<br><strong>The NafArro Solutions Team</strong></p>
                <p style="font-size: 12px;">NafArro Solutions - King of Automation</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Client confirmation email sent:", clientEmailResponse);

    // Email to NafArro team (notification)
    const teamEmailResponse = await sendEmail({
      from: "NafArro Solutions <info@nafarrosolutions.com>",
      to: ["naftali@nafarrosolutions.com"],
      subject: `New Consultation Request from ${name || email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0A2463 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
            .section { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
            h1 { margin: 0; font-size: 24px; }
            h3 { color: #0A2463; margin-top: 0; border-bottom: 2px solid #0A2463; padding-bottom: 10px; }
            .detail-row { margin: 10px 0; }
            .detail-label { font-weight: 600; color: #0A2463; }
            .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Consultation Request</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone wants to book a consultation!</p>
            </div>
            <div class="content">
              <div class="section">
                <h3>Client Information</h3>
                <div class="detail-row"><span class="detail-label">Name:</span> ${name || 'Not provided'}</div>
                <div class="detail-row"><span class="detail-label">Email:</span> <a href="mailto:${email}">${email}</a></div>
                <div class="detail-row"><span class="detail-label">Phone:</span> ${phone || 'Not provided'}</div>
              </div>
              
              <div class="section urgent">
                <h3>Requested Schedule</h3>
                <div class="detail-row"><span class="detail-label">Date:</span> ${formattedDate}</div>
                <div class="detail-row"><span class="detail-label">Time:</span> ${time}</div>
                <div class="detail-row"><span class="detail-label">Duration:</span> ${duration} hour(s)</div>
              </div>
              
              ${message ? `
              <div class="section">
                <h3>Client's Message</h3>
                <p>${message}</p>
              </div>
              ` : ''}
              
              <div class="section">
                <h3>Quick Actions</h3>
                <p>Reply to the client: <a href="mailto:${email}?subject=Re: Consultation Request Confirmation">${email}</a></p>
                ${phone ? `<p>Call the client: <a href="tel:${phone}">${phone}</a></p>` : ''}
              </div>
              
              <div class="footer">
                <p style="font-size: 12px;">This is an automated notification from NafArro Solutions website.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Team notification email sent:", teamEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Consultation request sent successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-request function:", error);
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
