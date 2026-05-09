"use client";

import { useState } from "react";
import { Check, Crown, ArrowRight, Briefcase, Building2, Loader as Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useStripePriceConfig } from "@/hooks/useStripePriceConfig";

const PLANS = [
  {
    id: "formation-starter",
    tab: "formation" as const,
    name: "Starter U.S. LLC Package",
    tagline: "Everything you need to launch your U.S. LLC",
    price: 399,
    billing: "one-time + state filing fee",
    note: "One-time formation package for starting a new business",
    cta: "Get Started",
    features: [
      "LLC Formation in WY / DE / NM / MT",
      "EIN Application",
      "ITIN Advisory (if needed)",
      "Registered Agent — Year 1",
      "Operating Agreement",
      "Banking Introductions",
      "Stripe Readiness Checklist",
      "Country-Specific Onboarding",
      "AI Chief of Staff",
      "Compliance Calendar Enrollment",
      "Dashboard",
    ],
  },
  {
    id: "management-compliance",
    tab: "management" as const,
    name: "Prolify Compliance",
    tagline: "For businesses that already have a U.S. company",
    price: 150,
    billing: "/ year + state filing fees",
    note: "Annual plan for managing your existing business compliance",
    cta: "Upgrade Now",
    features: [
      "State Annual Report Filing",
      "Registered Agent Coverage",
      "Compliance Dashboard",
      "AI Chief of Staff for Compliance",
      "Quarterly Compliance Review",
      "Compliance Calendar Enrollment",
      "Document Vault",
      "Good Standing Monitoring",
    ],
  },
];

export default function UpgradePlanSection() {
  const { company } = useAuth();
  const { getPriceId, loading: priceConfigLoading } = useStripePriceConfig();
  const [selectedTab, setSelectedTab] = useState<"formation" | "management">("management");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentPlan = company?.current_plan || "";

  const isValidPriceId = (priceId: string) => priceId.startsWith("price_1");

  const redirectToStripe = async (planId: string, priceId: string) => {
    if (!priceId || !isValidPriceId(priceId)) {
      setError("Ce plan n'est pas encore configuré. Allez sur /admin/stripe-config pour ajouter les Price IDs Stripe.");
      return;
    }

    setLoadingPlan(planId);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Veuillez vous connecter pour mettre à jour votre plan.");
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const origin = window.location.origin;

      const response = await fetch(`${supabaseUrl}/functions/v1/stripe-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
          "Apikey": supabaseAnonKey ?? "",
        },
        body: JSON.stringify({
          price_id: priceId,
          mode: "payment",
          success_url: `${origin}/dashboard?upgrade=success&plan=${planId}`,
          cancel_url: `${origin}/dashboard?section=upgrade`,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Échec de la création de la session de paiement.");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleUpgrade = (planId: string) => {
    const priceId = getPriceId(planId);
    redirectToStripe(planId, priceId);
  };

  const visiblePlans = PLANS.filter((p) => p.tab === selectedTab);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-black dark:text-white flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#FFC107] to-[#FFB300] flex items-center justify-center">
            <Crown className="h-6 w-6 text-black" />
          </div>
          Upgrade Your Plan
        </h2>
        <p className="text-black/70 dark:text-white/70 mt-2 ml-13">
          Choose the plan that best fits your business needs
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm flex items-start gap-3">
          <span className="flex-1">{error}</span>
          {error.includes("admin/stripe-config") && (
            <a
              href="/admin/stripe-config"
              className="whitespace-nowrap font-semibold underline flex items-center gap-1 hover:opacity-80"
            >
              <Settings className="h-3.5 w-3.5" />
              Configurer
            </a>
          )}
        </div>
      )}

      <div className="inline-flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <button
          onClick={() => setSelectedTab("formation")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            selectedTab === "formation"
              ? "bg-[#FFC107] text-black shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Formation Package
        </button>
        <button
          onClick={() => setSelectedTab("management")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            selectedTab === "management"
              ? "bg-[#FFC107] text-black shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Compliance Plan
        </button>
      </div>

      <p className="text-sm text-black/50 dark:text-white/50">
        {visiblePlans[0]?.note}
      </p>

      <div className="grid gap-6">
        {visiblePlans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const isLoading = loadingPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 transition-all ${
                isCurrentPlan
                  ? "bg-white dark:bg-black border-2 border-[#FFC107] shadow-lg"
                  : "bg-white dark:bg-black border-2 border-black/20 dark:border-white/20 hover:border-[#FFC107] hover:shadow-lg"
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFC107] text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Current Plan
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-black/60 dark:text-white/60 mb-4">{plan.tagline}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-black dark:text-white">${plan.price}</span>
                    <span className="text-black/60 dark:text-white/60 text-sm">{plan.billing}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#FFC107]" />
                        <span className="text-sm text-black dark:text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:w-40 flex-shrink-0">
                  <Button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={isCurrentPlan || isLoading || priceConfigLoading}
                    className={`w-full font-bold shadow-lg ${
                      isCurrentPlan
                        ? "bg-white/50 dark:bg-black/50 text-black/50 dark:text-white/50 cursor-not-allowed border-2 border-black/20 dark:border-white/20"
                        : "bg-[#FFC107] text-black hover:bg-[#FFB300]"
                    }`}
                  >
                    {isCurrentPlan ? (
                      "Current Plan"
                    ) : priceConfigLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
                    ) : isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...</>
                    ) : (
                      <>{plan.cta} <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-2xl p-6 hover:border-[#FFC107] transition-colors">
        <h3 className="text-lg font-bold text-black dark:text-white mb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#FFC107]"></div>
          Need a custom solution?
        </h3>
        <p className="text-black/70 dark:text-white/70 mb-4">
          Contact our sales team for enterprise pricing and custom features tailored to your business.
        </p>
        <Button className="bg-gradient-to-r from-[#FFC107] to-[#FFB300] text-black hover:from-[#FFB300] hover:to-[#FFA000] font-semibold shadow-lg">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}
