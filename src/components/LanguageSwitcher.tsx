"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "en", flag: "🇺🇸", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "ht", flag: "🇭🇹", name: "Kreyòl" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "pt", flag: "🇧🇷", name: "Português" },
];

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (code: string) => {
    setOpen(false);
    const segments = pathname.split("/");
    const locales = ["en", "fr", "ht", "es", "pt"];
    if (locales.includes(segments[1])) {
      segments[1] = code === "en" ? "" : code;
    } else {
      if (code !== "en") {
        segments.splice(1, 0, code);
      }
    }
    const newPath = segments.join("/").replace(/\/+/g, "/") || "/";
    router.push(newPath);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md text-xs font-bold text-black dark:text-black hover:bg-black/10 dark:hover:bg-black/10 transition-colors border-2 border-black dark:border-black"
        aria-label={t("switcher")}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3 opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#171717] border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] z-50 overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors text-left
                ${lang.code === locale
                  ? "bg-[#FFC107]/20 text-black dark:text-white"
                  : "text-black/70 dark:text-white/70 hover:bg-[#FFC107]/10 hover:text-black dark:hover:text-white"
                }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
              {lang.code === locale && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
