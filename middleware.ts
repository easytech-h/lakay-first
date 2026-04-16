import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "ht", "es", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
