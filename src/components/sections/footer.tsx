"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import { TermsModal } from "@/components/TermsModal";
import { useTranslations } from "next-intl";

const HIDDEN_PATH_SEGMENTS = ["signup", "login"];

const Footer = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const t = useTranslations("footer");

  const pathSegments = pathname.split("/").filter(Boolean);
  const locales = ["en", "fr", "ht", "es", "pt"];
  const relevantSegment = locales.includes(pathSegments[0])
    ? pathSegments[1]
    : pathSegments[0];

  if (user || HIDDEN_PATH_SEGMENTS.includes(relevantSegment)) {
    return null;
  }

  const footerLinks = [
    {
      title: t("services"),
      links: [
        { label: t("links.formation"), href: "/formation" },
        { label: t("links.bookkeeping"), href: "/bookkeeping" },
        { label: t("links.taxes"), href: "/taxes" },
        { label: t("links.compliance"), href: "/compliance" },
        { label: t("links.analytics"), href: "/analytics" },
        { label: t("links.aiChiefOfStaff"), href: "/ai-chief-of-staff" },
        { label: t("links.bankingGuidance"), href: "/banking-guidance" },
      ],
    },
    {
      title: t("forFounders"),
      links: [
        { label: t("links.saasFounders"), href: "/saas-founders" },
        { label: t("links.ecommerceSellers"), href: "/ecommerce-sellers" },
        { label: t("links.courseCreators"), href: "/course-creators" },
        { label: t("links.coachesConsultants"), href: "/coaches-consultants" },
        { label: t("links.newsletterCreators"), href: "/newsletter-creators" },
        { label: t("links.realEstateInvestors"), href: "/real-estate-investors" },
      ],
    },
    {
      title: t("resourcesLabel"),
      links: [
        { label: t("links.blog"), href: "/blog" },
        { label: t("links.ebooksGuides"), href: "/e-books" },
        { label: t("links.eventsWebinars"), href: "/events" },
        { label: t("links.prolifyUniversity"), href: "/prolify-university" },
        { label: t("links.marketplace"), href: "/prolify-marketplace" },
        { label: t("links.taxCalculator"), href: "/tax-calculator" },
        { label: t("links.vipClub"), href: "/vip-club" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("links.aboutUs"), href: "/about-us" },
        { label: t("links.partners"), href: "/partners" },
        { label: t("links.pricing"), href: "/pricing" },
        { label: t("links.login"), href: "/login" },
        { label: t("links.getStarted"), href: "/signup" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t-4 border-[#FFC107]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-14 border-b border-black/8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-md">
              <Link href="/" className="text-2xl font-black text-black tracking-tight">
                Prolify
              </Link>
              <p className="text-sm text-black/50 leading-relaxed mt-3 font-medium">
                {t("tagline")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#FFC107] text-black text-sm font-bold rounded-xl hover:bg-[#FFB300] transition-all duration-200 border-2 border-[#FFC107]"
              >
                {t("startYourLLC")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black/12 text-black/70 text-sm font-bold rounded-xl hover:border-black hover:text-black transition-all duration-200"
              >
                {t("viewPricing")}
              </Link>
            </div>
          </div>
        </div>

        <div className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 border-b border-black/8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-black text-black mb-5 text-xs uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/45 hover:text-black transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8">
          <p className="text-xs text-black/35 leading-relaxed mb-6 max-w-4xl">
            {t("disclaimer")}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-black/35 font-medium">
              {t("copyright")}
            </p>
            <div className="flex gap-5 text-xs text-black/35">
              <a href="/privacy-policy" className="hover:text-black/60 cursor-pointer transition-colors font-medium">{t("privacyPolicy")}</a>
              <TermsModal className="hover:text-black/60 cursor-pointer transition-colors font-medium">{t("termsOfService")}</TermsModal>
              <a href="/cookie-policy" className="hover:text-black/60 cursor-pointer transition-colors font-medium">{t("cookiePolicy")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
