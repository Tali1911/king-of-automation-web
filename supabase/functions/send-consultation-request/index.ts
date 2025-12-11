import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { create, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

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

// Helper to get Google OAuth2 access token using service account
async function getGoogleAccessToken(): Promise<string> {
  const serviceAccountEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKeyPem = Deno.env.get("GOOGLE_PRIVATE_KEY");

  if (!serviceAccountEmail || !privateKeyPem) {
    throw new Error("Google Calendar credentials not configured");
  }

  // Clean the private key (handle escaped newlines from environment variable)
  const cleanedPrivateKey = privateKeyPem.replace(/\\n/g, "\n");

  // Import the private key
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = cleanedPrivateKey
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const now = Math.floor(Date.now() / 1000);
  const jwt = await create(
    { alg: "RS256", typ: "JWT" },
    {
      iss: serviceAccountEmail,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    },
    cryptoKey
  );

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("Failed to get Google access token:", errorText);
    throw new Error("Failed to authenticate with Google");
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Create Google Calendar event
async function createCalendarEvent(
  accessToken: string,
  { name, email, phone, date, time, duration, message }: ConsultationRequest
): Promise<{ eventId: string; eventLink: string }> {
  const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID");
  if (!calendarId) {
    throw new Error("Google Calendar ID not configured");
  }

  // Parse the time - handles both 24-hour ("17:00") and 12-hour ("09:00 AM") formats
  let hours: number;
  let minutes: number;

  const time24Match = time.match(/^(\d{1,2}):(\d{2})$/);
  const time12Match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);

  if (time24Match) {
    // 24-hour format (e.g., "17:00")
    hours = parseInt(time24Match[1]);
    minutes = parseInt(time24Match[2]);
  } else if (time12Match) {
    // 12-hour format (e.g., "09:00 AM")
    hours = parseInt(time12Match[1]);
    minutes = parseInt(time12Match[2]);
    const period = time12Match[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  } else {
    throw new Error("Invalid time format");
  }

  // Create start datetime
  const startDate = new Date(date);
  startDate.setHours(hours, minutes, 0, 0);

  // Create end datetime based on duration
  const durationHours = parseFloat(duration);
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  const event = {
    summary: `Consultation with ${name || email}`,
    description: `
Consultation Request Details:

Client: ${name || "Not provided"}
Email: ${email}
Phone: ${phone || "Not provided"}
Duration: ${duration} hour(s)

${message ? `Message:\n${message}` : "No additional message provided."}
    `.trim(),
    start: {
      dateTime: startDate.toISOString(),
      timeZone: "Africa/Nairobi",
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: "Africa/Nairobi",
    },
    attendees: [{ email: email, displayName: name || email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  console.log("Creating calendar event:", JSON.stringify(event, null, 2));

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to create calendar event:", errorText);
    throw new Error("Failed to create calendar event");
  }

  const eventData = await response.json();
  console.log("Calendar event created successfully:", eventData.id);

  return {
    eventId: eventData.id,
    eventLink: eventData.htmlLink,
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
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

    // Try to create Google Calendar event
    let calendarEventInfo: { eventId: string; eventLink: string } | null = null;
    try {
      const accessToken = await getGoogleAccessToken();
      calendarEventInfo = await createCalendarEvent(accessToken, consultationData);
      console.log("Calendar event created:", calendarEventInfo.eventId);
    } catch (calendarError) {
      console.error("Failed to create calendar event:", calendarError);
      // Continue with email sending even if calendar fails
    }

    // Email to client (confirmation)
    const clientEmailResponse = await resend.emails.send({
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
            .calendar-link { display: inline-block; background: #0A2463; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 15px; }
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
              <p>We have received your consultation request and our team will review it shortly. We'll contact you to confirm the appointment.</p>
              
              <div class="booking-details">
                <h3 style="margin-top: 0; color: #0A2463;">Your Requested Booking:</h3>
                <div class="detail-row"><span class="detail-label">Date:</span> ${formattedDate}</div>
                <div class="detail-row"><span class="detail-label">Time:</span> ${time}</div>
                <div class="detail-row"><span class="detail-label">Duration:</span> ${duration} hour(s)</div>
                ${message ? `<div class="detail-row"><span class="detail-label">Notes:</span> ${message}</div>` : ''}
                ${calendarEventInfo ? `<p style="margin-top: 15px;"><a href="${calendarEventInfo.eventLink}" class="calendar-link" style="color: white;">View Calendar Invite</a></p>` : ''}
              </div>
              
              <p><strong>What's next?</strong></p>
              <ul>
                <li>Our team will review your request</li>
                <li>We'll confirm availability for your requested time</li>
                <li>You'll receive a confirmation email with meeting details</li>
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
    const teamEmailResponse = await resend.emails.send({
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
            .success { background: #d1fae5; border-left: 4px solid #10b981; }
            .calendar-link { display: inline-block; background: #0A2463; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 10px; }
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
                <h3>👤 Client Information</h3>
                <div class="detail-row"><span class="detail-label">Name:</span> ${name || 'Not provided'}</div>
                <div class="detail-row"><span class="detail-label">Email:</span> <a href="mailto:${email}">${email}</a></div>
                <div class="detail-row"><span class="detail-label">Phone:</span> ${phone || 'Not provided'}</div>
              </div>
              
              <div class="section urgent">
                <h3>📅 Requested Schedule</h3>
                <div class="detail-row"><span class="detail-label">Date:</span> ${formattedDate}</div>
                <div class="detail-row"><span class="detail-label">Time:</span> ${time}</div>
                <div class="detail-row"><span class="detail-label">Duration:</span> ${duration} hour(s)</div>
              </div>
              
              ${calendarEventInfo ? `
              <div class="section success">
                <h3>✅ Calendar Event Created</h3>
                <p>A calendar event has been automatically created.</p>
                <a href="${calendarEventInfo.eventLink}" class="calendar-link" style="color: white;">View in Google Calendar</a>
              </div>
              ` : `
              <div class="section" style="background: #fee2e2; border-left: 4px solid #ef4444;">
                <h3>⚠️ Calendar Event Not Created</h3>
                <p>The calendar event could not be created automatically. Please add it manually.</p>
              </div>
              `}
              
              ${message ? `
              <div class="section">
                <h3>💬 Client's Message</h3>
                <p>${message}</p>
              </div>
              ` : ''}
              
              <div class="section">
                <h3>📧 Quick Actions</h3>
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
        calendarEventCreated: !!calendarEventInfo,
        calendarEventLink: calendarEventInfo?.eventLink || null,
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
