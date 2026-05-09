export type PlanCategory = "formation" | "management";

export type FormationPlan = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  billing: "one-time";
  icon: string;
  image: string;
  coreFeatures: string[];
  alsoIncluded: { icon: string; title: string; description: string }[];
  popular?: boolean;
  processingSpeed: string;
  support: string;
};

export type ManagementPlan = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  billing: "one-time";
  icon: string;
  image: string;
  coreFeatures: string[];
  alsoIncluded: { icon: string; title: string; description: string }[];
  popular?: boolean;
  support: string;
};

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  billing: "annual" | "monthly" | "one-time";
  icon: string;
  coreFeatures: string[];
  additionalFeatures?: string;
  popular?: boolean;
};

export const formationPlans: FormationPlan[] = [
  {
    id: "formation-starter",
    name: "Starter U.S. LLC Package",
    tagline: "Everything you need to launch your U.S. LLC",
    description: "One simple Prolify price for cost-sensitive non-US founders. State filing fee added separately. No upsells.",
    price: 399,
    billing: "one-time",
    icon: "rocket",
    image: "/WhatsApp_Image_2026-05-08_at_13.08.42.jpeg",
    coreFeatures: [
      "LLC Formation in WY / DE / NM / MT",
      "EIN Application",
      "ITIN Advisory (if needed)",
      "Registered Agent — Year 1",
      "Operating Agreement",
      "Banking Introductions",
    ],
    alsoIncluded: [
      { icon: "credit-card", title: "Stripe Readiness Checklist", description: "Prepare to accept payments" },
      { icon: "globe", title: "Country-Specific Onboarding", description: "Guided setup tailored to your country" },
      { icon: "sparkles", title: "AI Chief of Staff", description: "Basic in-product guidance" },
      { icon: "calendar", title: "Compliance Calendar Enrollment", description: "Track key deadlines from day one" },
      { icon: "bar-chart", title: "Dashboard", description: "Core visibility for your U.S. business" },
    ],
    popular: false,
    processingSpeed: "Standard",
    support: "Email Support",
  },
];

export const managementPlans: ManagementPlan[] = [
  {
    id: "management-compliance",
    name: "Prolify Compliance",
    tagline: "Already formed your U.S. company?",
    description: "Let Prolify manage the compliance so you don't miss deadlines, lose good standing, or deal with state paperwork alone.",
    price: 150,
    billing: "one-time",
    icon: "shield",
    image: "/WhatsApp_Image_2026-05-08_at_12.41.41.jpeg",
    coreFeatures: [
      "State Annual Report Filing",
      "Registered Agent Coverage",
      "Compliance Dashboard",
      "AI Chief of Staff for Compliance",
    ],
    alsoIncluded: [
      { icon: "clock", title: "Quarterly Compliance Review", description: "We review your company's compliance status every quarter." },
      { icon: "calendar", title: "Compliance Calendar Enrollment", description: "State and federal deadlines are added to your Prolify calendar." },
      { icon: "folder", title: "Document Vault", description: "Store annual reports, confirmations, EIN letter, and key company records." },
      { icon: "shield", title: "Good Standing Monitoring", description: "Reduce the risk of missed deadlines and loss of good standing." },
    ],
    popular: false,
    support: "Email Support",
  },
];

export const plans: Plan[] = [
  ...formationPlans.map((p) => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    price: p.price,
    billing: p.billing as "one-time",
    icon: p.icon,
    coreFeatures: p.coreFeatures,
    popular: p.popular,
  })),
  ...managementPlans.map((p) => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    price: p.price,
    billing: p.billing as "one-time",
    icon: p.icon,
    coreFeatures: p.coreFeatures,
    popular: p.popular,
  })),
];

export const getPlanById = (id: string): Plan | undefined => {
  return plans.find((plan) => plan.id === id);
};

export const getFormationPlanById = (id: string): FormationPlan | undefined => {
  return formationPlans.find((plan) => plan.id === id);
};

export const getManagementPlanById = (id: string): ManagementPlan | undefined => {
  return managementPlans.find((plan) => plan.id === id);
};
