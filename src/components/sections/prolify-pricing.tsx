"use client";

import { useState } from "react";
import { Check, ArrowRight, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";

const formationFeatures = [
  { title: "LLC Formation in WY / DE / NM / MT", description: "Choose the state that fits your business" },
  { title: "EIN Application", description: "Help applying for your federal tax ID" },
  { title: "ITIN Advisory (if needed)", description: "Guidance for founders who need ITIN support" },
  { title: "Registered Agent — Year 1", description: "Required legal address service included" },
  { title: "Operating Agreement", description: "Foundational company document included" },
  { title: "Banking Introductions", description: "Mercury, Wise, and Relay" },
];

const formationAlso = [
  { title: "Stripe Readiness Checklist", description: "Prepare to accept payments" },
  { title: "Country-Specific Onboarding", description: "Guided setup tailored to your country" },
  { title: "AI Chief of Staff", description: "Basic in-product guidance" },
  { title: "Compliance Calendar Enrollment", description: "Track key deadlines from day one" },
  { title: "Dashboard", description: "Core visibility for your U.S. business" },
];

const complianceFeatures = [
  { title: "State Annual Report Filing", description: "Annual or periodic state report prepared and filed on time." },
  { title: "Registered Agent Coverage", description: "Professional registered agent service across all 50 states." },
  { title: "Compliance Dashboard", description: "Track status, deadlines, filings, and documents in one place." },
  { title: "AI Chief of Staff for Compliance", description: "Get guidance, answers, and reminders for your compliance tasks." },
];

const complianceAlso = [
  { title: "Quarterly Compliance Review", description: "We review your company's compliance status every quarter." },
  { title: "Compliance Calendar Enrollment", description: "State and federal deadlines are added to your Prolify calendar." },
  { title: "Document Vault", description: "Store annual reports, confirmations, EIN letter, and key company records." },
  { title: "Good Standing Monitoring", description: "Reduce the risk of missed deadlines and loss of good standing." },
];

export default function ProlifyPricing() {
  const [selectedTab, setSelectedTab] = useState<"new" | "existing">("new");
  const { t } = useI18n();

  return (
    <section id="prolify-pricing" className="py-24 md:py-32 px-4 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,193,7,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/30 text-xs font-bold uppercase tracking-widest text-black/60">
            {t.pricingSection.badge}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black">
            {t.pricingSection.title}
          </h2>
          <p className="text-lg text-black/55 max-w-xl mx-auto font-medium leading-relaxed">
            {t.pricingSection.subtitle}
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1.5 bg-[#F5F5F5] rounded-2xl border border-black/6">
            <button
              onClick={() => setSelectedTab("new")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                selectedTab === "new"
                  ? "bg-[#FFC107] text-black shadow-sm"
                  : "text-black/50 hover:text-black"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              {t.pricingSection.newBusiness}
            </button>
            <button
              onClick={() => setSelectedTab("existing")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                selectedTab === "existing"
                  ? "bg-[#FFC107] text-black shadow-sm"
                  : "text-black/50 hover:text-black"
              }`}
            >
              <Building2 className="h-4 w-4" />
              {t.pricingSection.existingBusiness}
            </button>
          </div>
        </div>

        {selectedTab === "new" ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black tracking-tighter text-black mb-2">
                Everything you need to launch your U.S. LLC
              </h3>
              <p className="text-black/50 font-medium text-sm">
                One simple Prolify price for cost-sensitive non-US founders. State filing fee added separately. No upsells.
              </p>
            </div>

            <div className="bg-white border border-black/8 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-8 pb-0 text-center">
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-6xl font-black tracking-tighter text-black">$399</span>
                  <div className="text-left">
                    <div className="text-sm font-medium text-black/50">+ state filing fee</div>
                    <div className="text-sm font-medium text-black/50">one-time</div>
                  </div>
                </div>
                <p className="text-[#2563EB] font-bold text-base mt-1">Starter U.S. LLC Package</p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-black text-black text-sm mb-4">What&apos;s Included</h4>
                    <ul className="space-y-3">
                      {formationFeatures.map((f) => (
                        <li key={f.title} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-black">{f.title}</span>
                            <p className="text-xs text-black/50">{f.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm mb-4">Also Included</h4>
                    <ul className="space-y-3">
                      {formationAlso.map((f) => (
                        <li key={f.title} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-black">{f.title}</span>
                            <p className="text-xs text-black/50">{f.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-black/50 font-medium">Ready to start? Launch your U.S. LLC with Prolify.</p>
                  <Link href="/signup">
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white font-bold rounded-2xl hover:bg-[#1d4ed8] transition-all duration-200 text-sm group whitespace-nowrap">
                      Start Your LLC for $399
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black tracking-tighter text-black mb-2">
                Already formed your U.S. company?
              </h3>
              <p className="text-black/50 font-medium text-sm">
                Let Prolify manage the compliance so you don&apos;t miss deadlines, lose good standing, or deal with state paperwork alone.
              </p>
            </div>

            <div className="bg-white border border-black/8 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-8 pb-0 text-center">
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-6xl font-black tracking-tighter text-black">$150</span>
                  <div className="text-left">
                    <div className="text-sm font-medium text-black/50">/ year + state filing fees</div>
                  </div>
                </div>
                <p className="text-[#2563EB] font-bold text-base mt-1">Prolify Compliance</p>
                <p className="text-sm text-black/50 mt-1">For businesses that already have a U.S. company and want to stay compliant.</p>
                <p className="text-sm text-black/60 font-medium mt-2">Everything you need to keep your business active, organized, and in good standing.</p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-black text-black text-sm mb-4">What&apos;s Included</h4>
                    <ul className="space-y-3">
                      {complianceFeatures.map((f) => (
                        <li key={f.title} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-black">{f.title}</span>
                            <p className="text-xs text-black/50">{f.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-black text-sm mb-4">Also Included</h4>
                    <ul className="space-y-3">
                      {complianceAlso.map((f) => (
                        <li key={f.title} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-black">{f.title}</span>
                            <p className="text-xs text-black/50">{f.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-black/50 font-medium">Stay compliant and organized with Prolify.</p>
                  <Link href="/signup">
                    <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] text-white font-bold rounded-2xl hover:bg-[#1d4ed8] transition-all duration-200 text-sm group whitespace-nowrap">
                      Manage My U.S. Business
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-bold text-black/60 hover:text-black transition-colors"
          >
            {t.pricingSection.viewFullPricing}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-black/40 font-medium mt-3">
            {t.pricingSection.moneyBack}
          </p>
        </div>
      </div>
    </section>
  );
}
