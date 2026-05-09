"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { Check, ArrowRight, Shield, Briefcase, Building2, ChevronDown, DollarSign, Sparkles, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

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

export default function PricingPage() {
  const [selectedTab, setSelectedTab] = useState<"new" | "existing">("new");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const vipPerks = [
    { icon: DollarSign, title: "$5,000+ in Annual Savings", description: "Save thousands with exclusive discounts on Stripe, AWS, Shopify, and more." },
    { icon: Sparkles, title: "Premium Partner Perks", description: "Waived fees, extended trials, and founder-only pricing from 50+ partners." },
    { icon: Zap, title: "Priority Expert Help", description: "Jump the queue with dedicated support from our tax, legal, and compliance teams." },
    { icon: TrendingUp, title: "Powerful Business Tools", description: "Pre-negotiated deals on payment processing, hosting, marketing, and operations tools." },
  ];

  const faqs = [
    { question: "What's the difference between the two plans?", answer: "The $399 Starter U.S. LLC Package is a one-time fee for forming a brand new U.S. LLC — filing, EIN, registered agent, and more. The $150 Prolify Compliance plan is for founders who already have a U.S. company and need ongoing compliance support — annual reports, registered agent, and good standing monitoring." },
    { question: "What's included in 'State Fees'?", answer: "State fees vary by state and are paid directly to the government for LLC formation. Most states charge between $50–$500. We'll tell you the exact amount before you pay anything. These fees are separate from Prolify's service fee." },
    { question: "Do I need to be a US citizen to use Prolify?", answer: "No. Prolify is built specifically for international founders. You don't need US citizenship, a US address, or a social security number to form a US business with us." },
    { question: "Can I switch from Formation to Compliance after my company is formed?", answer: "Yes. Once your company is formed, you can subscribe to the Prolify Compliance plan to handle ongoing compliance, registered agent, and good standing management." },
    { question: "Can I upgrade my plan later?", answer: "Yes. You can switch between plans or add services at any time by contacting our team." },
    { question: "What happens if I need both Formation and Compliance?", answer: "Many founders start with the $399 Formation package to create their company, then add the $150 Compliance plan for ongoing operations. Contact us to bundle both." },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <section className="relative pt-20 pb-20 px-4 bg-[#FAFAFA] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,193,7,0.08) 0%, transparent 65%)" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/30 text-xs font-bold uppercase tracking-widest text-black/60 mb-6">
            Transparent Pricing
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black mb-6">
            Two Plans.<br className="hidden sm:block" /> Everything Included.
          </h1>
          <p className="text-lg text-black/55 max-w-xl mx-auto font-medium leading-relaxed mb-10">
            Whether starting fresh or managing an existing business — we have you covered. No hidden fees. No surprises.
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-black/8 shadow-sm text-sm font-bold text-black/70">
            <Shield className="h-4 w-4 text-[#FFC107]" />
            14-day money-back guarantee on all plans
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 p-1.5 bg-[#F5F5F5] rounded-2xl border border-black/6">
              <button
                onClick={() => setSelectedTab("new")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  selectedTab === "new" ? "bg-black text-white shadow-sm" : "text-black/50 hover:text-black"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                New Business
              </button>
              <button
                onClick={() => setSelectedTab("existing")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  selectedTab === "existing" ? "bg-black text-white shadow-sm" : "text-black/50 hover:text-black"
                }`}
              >
                <Building2 className="h-4 w-4" />
                Existing Business
              </button>
            </div>
          </div>

          {selectedTab === "new" ? (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-2">
                  Everything you need to launch your U.S. LLC
                </h2>
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
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-2">
                  Already formed your U.S. company?
                </h2>
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
        </div>
      </section>

      <section className="py-20 px-4 bg-[#FFC107]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/10 border border-black/20 text-xs font-bold uppercase tracking-widest text-black/70 mb-6">
              Partner Network
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4">
              Unlock $5,000+ in<br className="hidden sm:block" /> Annual Savings
            </h2>
            <p className="text-lg text-black/55 max-w-xl mx-auto font-medium leading-relaxed">
              Our clients get exclusive access to VIP deals from the tools you actually use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vipPerks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <div key={index} className="bg-white border border-black/8 rounded-3xl p-6 hover:border-black/20 transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#FFC107] border border-black/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="text-sm font-black text-black mb-2">{perk.title}</h3>
                  <p className="text-xs text-black/50 font-medium leading-relaxed">{perk.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/30 text-xs font-bold uppercase tracking-widest text-black/60 mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black">
              Common Questions
            </h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-black/8 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-bold text-sm text-black pr-4">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-black/40 flex-shrink-0 transition-transform duration-200 ${openFAQ === index ? "rotate-180" : ""}`} />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-black/55 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/30 text-xs font-bold uppercase tracking-widest text-black/60 mb-6">
            Get Started
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4">
            Ready to Build<br className="hidden sm:block" /> Your US Business?
          </h2>
          <p className="text-lg text-black/55 max-w-xl mx-auto font-medium leading-relaxed mb-10">
            Join thousands of founders who chose Prolify for transparent pricing, expert service, and everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-black rounded-2xl hover:bg-[#FFC107] hover:text-black transition-all duration-200 text-sm group">
                Start Your Business
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/formation">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFC107]/10 text-black font-black rounded-2xl hover:bg-[#FFC107]/20 transition-all duration-200 text-sm border border-[#FFC107]/30">
                Learn About Formation
              </button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-black/35 font-medium">
            14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>
    </main>
  );
}
