"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

const HIDDEN_PATHS_SEGMENTS = ["signup", "login"];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const pathSegments = pathname.split("/").filter(Boolean);
  const locales = ["en", "fr", "ht", "es", "pt"];
  const relevantSegment = locales.includes(pathSegments[0])
    ? pathSegments[1]
    : pathSegments[0];

  if (user || HIDDEN_PATHS_SEGMENTS.includes(relevantSegment)) {
    return null;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const productItems = [
    { name: t("formation"), href: "/formation" },
    { name: t("bookkeeping"), href: "/bookkeeping" },
    { name: t("taxes"), href: "/taxes" },
    { name: t("analytics"), href: "/analytics" },
    { name: t("aiChiefOfStaff"), href: "/ai-chief-of-staff" },
    { name: t("compliance"), href: "/compliance" },
    { name: t("bankingGuidance"), href: "/banking-guidance" },
  ];

  const forFoundersItems = [
    { name: t("saasFounders"), href: "/saas-founders" },
    { name: t("ecommerceSellers"), href: "/ecommerce-sellers" },
    { name: t("realEstateInvestors"), href: "/real-estate-investors" },
    { name: t("courseCreators"), href: "/course-creators" },
    { name: t("coachesConsultants"), href: "/coaches-consultants" },
    { name: t("newsletterCreators"), href: "/newsletter-creators" },
  ];

  const resourcesItems = [
    { name: t("blog"), href: "/blog" },
    { name: t("ebooks"), href: "/e-books" },
    { name: t("events"), href: "/events" },
    { name: t("prolifyMarketplace"), href: "/prolify-marketplace" },
    { name: t("prolifyUniversity"), href: "/prolify-university" },
    { name: t("aboutUs"), href: "/about-us" },
    { name: t("vipClub"), href: "/vip-club" },
    { name: t("taxCalculator"), href: "/tax-calculator" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <header className="max-w-5xl mx-auto rounded-xl bg-[#FFC107] dark:bg-[#FFD54F] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] border-2 border-black dark:border-white transition-all duration-300 tracking-tight relative">
        <div className="px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-lg font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors"
                aria-label="Postly Home">
                <Image src="https://i.imgur.com/z6DcpqB.png" alt="Prolify" width={320} height={104} className="h-20 w-auto" />
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors flex items-center gap-1"
                      aria-label={t("product")}>
                      {t("product")}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-4 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]" align="start" sideOffset={10}>
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider mb-2">{t("productsServices")}</div>
                      <div className="flex flex-wrap gap-2">
                        {productItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group px-3 py-1.5 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#262626] hover:bg-[#FFC107] dark:hover:bg-[#FFD54F] dark:hover:text-black transition-all duration-200 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors flex items-center gap-1"
                      aria-label={t("forFounders")}>
                      {t("forFounders")}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-4 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]" align="start" sideOffset={10}>
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider mb-2">{t("forFounders")}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {forFoundersItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group px-3 py-1.5 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#262626] hover:bg-[#FFC107] dark:hover:bg-[#FFD54F] dark:hover:text-black transition-all duration-200 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Link
                  href="/partners"
                  className="text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors"
                  aria-label={t("partners")}>
                  {t("partners")}
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors"
                  aria-label={t("pricing")}>
                  {t("pricing")}
                </Link>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors flex items-center gap-1"
                      aria-label={t("resources")}>
                      {t("resources")}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px] p-4 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]" align="start" sideOffset={10}>
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider mb-2">{t("resourcesCommunity")}</div>
                      <div className="flex flex-wrap gap-2">
                        {resourcesItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group px-3 py-1.5 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#262626] hover:bg-[#FFC107] dark:hover:bg-[#FFD54F] dark:hover:text-black transition-all duration-200 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </nav>
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              {!loading && (
                user ? (
                  <Link href="/dashboard" className="inline-flex items-center justify-center whitespace-nowrap font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3 text-xs bg-black dark:bg-white hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white border-2 border-black dark:border-white">
                    {t("dashboard")}
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="inline-flex items-center justify-center whitespace-nowrap font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3 text-xs text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black border-2 border-black dark:border-white">
                      {t("login")}
                    </Link>
                    <Link href="/signup" className="inline-flex items-center justify-center whitespace-nowrap font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3 text-xs bg-black dark:bg-white hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white border-2 border-black dark:border-white">
                      {t("startFree")}
                    </Link>
                  </>
                )
              )}
            </div>
            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-black dark:text-black hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black rounded-md transition-colors border-2 border-black dark:border-white"
                aria-label="Toggle mobile menu">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-black dark:border-white px-6 py-4 space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center justify-between w-full text-left text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors py-2">
                  {t("product")}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-3rem)] max-w-sm p-4 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]" align="start" sideOffset={10}>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider mb-2">{t("productsServices")}</div>
                  <div className="flex flex-wrap gap-2">
                    {productItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group px-3 py-1.5 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#262626] hover:bg-[#FFC107] dark:hover:bg-[#FFD54F] dark:hover:text-black transition-all duration-200 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center justify-between w-full text-left text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors py-2">
                  {t("forFounders")}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-3rem)] max-w-sm p-4 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]" align="start" sideOffset={10}>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider mb-2">{t("forFounders")}</div>
                  <div className="grid grid-cols-1 gap-2">
                    {forFoundersItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group px-3 py-1.5 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#262626] hover:bg-[#FFC107] dark:hover:bg-[#FFD54F] dark:hover:text-black transition-all duration-200 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Link
              href="/partners"
              className="block w-full text-left text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}>
              {t("partners")}
            </Link>
            <Link
              href="/pricing"
              className="block w-full text-left text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}>
              {t("pricing")}
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center justify-between w-full text-left text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors py-2">
                  {t("resources")}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-3rem)] max-w-sm p-4 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]" align="start" sideOffset={10}>
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider mb-2">{t("resourcesCommunity")}</div>
                  <div className="flex flex-wrap gap-2">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group px-3 py-1.5 text-xs font-bold text-black dark:text-white bg-white dark:bg-[#262626] hover:bg-[#FFC107] dark:hover:bg-[#FFD54F] dark:hover:text-black transition-all duration-200 rounded-lg border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="pt-4 space-y-3 border-t-2 border-black dark:border-white">
              {!loading && (
                user ? (
                  <Link href="/dashboard" className="block w-full text-center bg-black dark:bg-white hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white text-sm font-bold py-2 px-4 rounded-md transition-colors border-2 border-black dark:border-white">
                    {t("dashboard")}
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="block w-full text-left text-sm font-bold text-black dark:text-black hover:text-black/70 dark:hover:text-black/70 transition-colors py-2">
                      {t("login")}
                    </Link>
                    <Link href="/signup" className="block w-full text-center bg-black dark:bg-white hover:bg-white dark:hover:bg-black text-white dark:text-black hover:text-black dark:hover:text-white text-sm font-bold py-2 px-4 rounded-md transition-colors border-2 border-black dark:border-white">
                      {t("startFree")}
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
