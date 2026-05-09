"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ArrowRight, Sparkles, Briefcase, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "formation-starter",
    tab: "formation",
    name: "Starter U.S. LLC Package",
    tagline: "Everything you need to launch your U.S. LLC",
    price: 399,
    billing: "one-time + state filing fee",
    features: [
      "LLC Formation in WY / DE / NM / MT",
      "EIN Application",
      "ITIN Advisory (if needed)",
      "Registered Agent — Year 1",
      "Operating Agreement",
      "Banking Introductions",
      "Stripe Readiness Checklist",
      "Country-Specific Onboarding",
    ],
  },
  {
    id: "management-compliance",
    tab: "management",
    name: "Prolify Compliance",
    tagline: "For businesses that already have a U.S. company",
    price: 150,
    billing: "/ year + state filing fees",
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

function PlanSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [tab, setTab] = useState<"formation" | "management">("formation");

  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) setSelectedPlan(planParam);
    const tabParam = searchParams.get("tab");
    if (tabParam === "management" || tabParam === "formation") setTab(tabParam);
  }, [searchParams]);

  const handleContinue = () => {
    if (!selectedPlan) return;
    router.push(`/signup?plan=${selectedPlan}`);
  };

  const visiblePlans = PLANS.filter((p) => p.tab === tab);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFC107] to-[#FFB300] flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <span className="text-2xl font-black text-black dark:text-white">Prolify</span>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span className="w-6 h-6 rounded-full bg-[#FFC107] text-black text-xs font-black flex items-center justify-center">1</span>
            <span className="font-medium text-[#FFC107]">Choose a plan</span>
            <span className="mx-2 text-gray-300">—</span>
            <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-black flex items-center justify-center">2</span>
            <span>Your details</span>
            <span className="mx-2 text-gray-300">—</span>
            <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 text-xs font-black flex items-center justify-center">3</span>
            <span>Payment</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-black dark:text-white mb-2">Choose your plan</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Select the plan that best fits your needs.
        </p>

        <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl w-fit">
          <button
            onClick={() => { setTab("formation"); setSelectedPlan(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === "formation"
                ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Starting a Business
          </button>
          <button
            onClick={() => { setTab("management"); setSelectedPlan(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === "management"
                ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <Building2 className="h-4 w-4" />
            I Have a Business
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {visiblePlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative w-full text-left p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#FFC107] bg-[#FFC107]/5"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-black text-lg text-black dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{plan.tagline}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-2xl font-black text-black dark:text-white">${plan.price}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{plan.billing}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="h-3.5 w-3.5 text-[#FFC107] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#FFC107] flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-black" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedPlan}
          className="w-full bg-gradient-to-r from-[#FFC107] to-[#FFB300] hover:from-[#FFB300] hover:to-[#FFA000] text-black font-black py-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-40 text-base"
        >
          Continue with {selectedPlan ? PLANS.find(p => p.id === selectedPlan)?.name : "selected plan"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#FFC107] font-bold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PlanSelectionPage() {
  return (
    <Suspense>
      <PlanSelectionContent />
    </Suspense>
  );
}
