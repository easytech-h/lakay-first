"use client";

import { useState } from "react";
import { X, Check, Sparkles, Crown, Briefcase, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanSelected: (planId: string) => void;
}

const PLANS = [
  {
    id: "formation-starter",
    tab: "formation" as const,
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
    ],
  },
  {
    id: "management-compliance",
    tab: "management" as const,
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
      "Good Standing Monitoring",
    ],
  },
];

export default function PlanSelectionModal({
  isOpen,
  onClose,
  onPlanSelected,
}: PlanSelectionModalProps) {
  const { user, refreshUserData } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"formation" | "management">("formation");

  if (!isOpen) return null;

  const handleSelectPlan = async (planId: string) => {
    if (!user) return;

    setLoading(true);
    setSelectedPlan(planId);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ plan_selected: true })
        .eq("id", user.id);

      if (error) throw error;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData?.company_id) {
        await supabase
          .from("companies")
          .update({ current_plan: planId })
          .eq("id", profileData.company_id);
      }

      await refreshUserData();
      onPlanSelected(planId);
    } catch (error) {
      console.error("Error selecting plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkipForNow = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await supabase.from("profiles").update({ plan_selected: true }).eq("id", user.id);
      await refreshUserData();
      onClose();
    } catch (error) {
      console.error("Error skipping plan selection:", error);
    } finally {
      setLoading(false);
    }
  };

  const visiblePlans = PLANS.filter((p) => p.tab === selectedTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-[#FFC107] via-[#FFB300] to-[#FFA000] rounded-t-3xl overflow-hidden">
          <div className="absolute top-8 right-10 w-28 h-28 bg-white/20 rounded-full" />
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full -mb-20" />
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
          <X className="w-6 h-6 text-black" />
        </button>

        <div className="relative pt-8 px-8 pb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-4">
              <Crown className="w-4 h-4 text-black" />
              <span className="text-sm font-semibold text-black">Choose Your Plan</span>
            </div>
            <h2 className="text-3xl font-bold text-black mb-1">Unlock Your Business Potential</h2>
            <p className="text-black/70">Select the plan that best fits your business needs</p>
          </div>

          <div className="flex justify-center mb-6 mt-14">
            <div className="inline-flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button
                onClick={() => { setSelectedTab("formation"); setSelectedPlan(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedTab === "formation"
                    ? "bg-[#FFC107] text-black shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                New Business
              </button>
              <button
                onClick={() => { setSelectedTab("management"); setSelectedPlan(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedTab === "management"
                    ? "bg-[#FFC107] text-black shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Existing Business
              </button>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {visiblePlans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-[#FFC107] shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{plan.tagline}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{plan.billing}</p>
                      </div>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#FFC107] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSelectPlan(plan.id)}
                      disabled={loading}
                      className={`w-full py-3 font-semibold rounded-xl transition-all ${
                        isSelected
                          ? "bg-[#FFC107] text-black hover:bg-[#FFB300]"
                          : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                      }`}
                    >
                      {loading && selectedPlan === plan.id ? "Selecting..." : (
                        <>Choose {plan.name} <Sparkles className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSkipForNow}
              disabled={loading}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium transition-colors"
            >
              Skip for now and continue with Free plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
