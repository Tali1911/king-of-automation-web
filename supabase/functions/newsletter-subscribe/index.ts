import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM = "NafArro Solutions <info@nafarrosolutions.com>";
const NOTIFY_TO = ["naftali@nafarrosolutions.com", "ruciukoome@gmail.com"];
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://nafarrosolutions.com";

const isEmail = (s: string) =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

// Simple in-memory rate limiter (per warm instance).
// Caps a single IP to 5 submissions per 10 minutes.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const ipHits = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const arr = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  ipHits.set(ip, arr);
  return arr.length > RATE_MAX;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json();
    const { email, source, website, formLoadedAt } = body ?? {};

    // Honeypot: bots fill hidden "website" field
    if (typeof website === "string" && website.trim().length > 0) {
      // Pretend success to not tip off bots
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Time-trap: form submitted suspiciously fast (< 1.5s)
    if (typeof formLoadedAt === "number") {
      const elapsed = Date.now() - formLoadedAt;
      if (elapsed >= 0 && elapsed < 1500) {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    if (!isEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const cleanEmail = email.trim().toLowerCase();
    const cleanSource = typeof source === "string" ? source.slice(0, 100) : "blog";

    // Generate or reuse an unsubscribe token
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("unsubscribe_token")
      .eq("email", cleanEmail)
      .maybeSingle();

    const token = existing?.unsubscribe_token ?? crypto.randomUUID();

    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: cleanEmail,
          source: cleanSource,
          confirmed: true,
          unsubscribe_token: token,
          unsubscribed_at: null,
        },
        { onConflict: "email" },
      );

    if (error) {
      console.error("DB error", error);
      return new Response(JSON.stringify({ error: "Could not subscribe" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${encodeURIComponent(token)}`;

    if (RESEND_API_KEY) {
      const send = (to: string[], subject: string, html: string) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: FROM,
            to,
            subject,
            html,
            headers: {
              "List-Unsubscribe": `<${unsubscribeUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        }).catch((e) => console.error("Resend error", e));

      await Promise.all([
        send(
          [cleanEmail],
          "Welcome to the NafArro Solutions newsletter",
          `<p>Hi there,</p>
           <p>Thanks for subscribing! You'll now receive our latest articles on
           business automation, web development and data analysis.</p>
           <p>— The NafArro Solutions Team</p>
           <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
           <p style="font-size:12px;color:#888">
             Don't want these emails?
             <a href="${unsubscribeUrl}">Unsubscribe here</a>.
           </p>`,
        ),
        send(
          NOTIFY_TO,
          "New newsletter subscriber",
          `<p>New subscriber: <strong>${cleanEmail}</strong></p>
           <p>Source: ${cleanSource}</p>`,
        ),
      ]);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
