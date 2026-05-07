import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    let token: string | null = null;
    if (req.method === "GET") {
      token = new URL(req.url).searchParams.get("token");
    } else {
      const body = await req.json().catch(() => ({}));
      token = typeof body?.token === "string" ? body.token : null;
    }

    if (!token || token.length < 8 || token.length > 100) {
      return json(400, { error: "Missing or invalid token" });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error: findErr } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, unsubscribed_at")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (findErr) {
      console.error(findErr);
      return json(500, { error: "Could not process request" });
    }
    if (!row) return json(404, { error: "Subscription not found" });

    if (!row.unsubscribed_at) {
      const { error: updErr } = await supabase
        .from("newsletter_subscribers")
        .update({ unsubscribed_at: new Date().toISOString(), confirmed: false })
        .eq("id", row.id);
      if (updErr) {
        console.error(updErr);
        return json(500, { error: "Could not unsubscribe" });
      }
    }

    return json(200, { ok: true, email: row.email });
  } catch (e) {
    console.error(e);
    return json(400, { error: "Bad request" });
  }
});
