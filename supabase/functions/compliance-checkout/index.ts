import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  appInfo: { name: "Prolify Compliance Checkout", version: "1.0.0" },
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Missing authorization header" }, 401);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return json({ error: "Unauthorized" }, 401);

    const { price_id, success_url, cancel_url, company_data } = await req.json();

    if (!price_id || !success_url || !cancel_url) {
      return json({ error: "Missing required fields: price_id, success_url, cancel_url" }, 400);
    }

    // Get or create Stripe customer
    const { data: customerRecord } = await supabase
      .from("stripe_customers")
      .select("customer_id")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .maybeSingle();

    let customerId: string;

    if (customerRecord?.customer_id) {
      customerId = customerRecord.customer_id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      });

      const { error: insertErr } = await supabase.from("stripe_customers").insert({
        user_id: user.id,
        customer_id: newCustomer.id,
      });

      if (insertErr) {
        await stripe.customers.del(newCustomer.id).catch(() => {});
        return json({ error: "Failed to create customer record" }, 500);
      }

      customerId = newCustomer.id;
    }

    // Create subscription checkout session with 30-day free trial
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: price_id, quantity: 1 }],
      mode: "subscription",
      subscription_data: {
        trial_period_days: 30,
      },
      success_url,
      cancel_url,
    });

    return json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error("Compliance checkout error:", err?.message ?? err);
    return json({ error: err?.message ?? "Internal server error" }, 500);
  }
});
