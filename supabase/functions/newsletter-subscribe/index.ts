import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM = "NafArro Solutions <info@nafarrosolutions.com>";
const NOTIFY_TO = ["naftali@nafarrosolutions.com", "ruciukoome@gmail.com"];

const isEmail = (s: string) =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { email, source } = await req.json();
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

    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        { email: cleanEmail, source: cleanSource, confirmed: true },
        { onConflict: "email", ignoreDuplicates: false },
      );

    if (error) {
      console.error("DB error", error);
      return new Response(JSON.stringify({ error: "Could not subscribe" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Best-effort emails via Resend
    if (RESEND_API_KEY) {
      const send = (to: string[], subject: string, html: string) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from: FROM, to, subject, html }),
        }).catch((e) => console.error("Resend error", e));

      await Promise.all([
        send(
          [cleanEmail],
          "Welcome to the NafArro Solutions newsletter",
          `<p>Hi there,</p>
           <p>Thanks for subscribing! You'll now receive our latest articles on
           business automation, web development and data analysis.</p>
           <p>— The NafArro Solutions Team</p>`,
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
