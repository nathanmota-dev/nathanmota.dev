import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale } from "./config";

export default getRequestConfig(async () => {
  const savedLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const acceptedLanguages = (await headers()).get("accept-language") ?? "";
  const preferredLocale = acceptedLanguages.split(",").map((entry) => {
    const [language, quality] = entry.trim().split(";q=");
    return { language: language.toLowerCase(), quality: quality ? Number(quality) : 1 };
  }).filter((entry) => entry.quality > 0).sort((a, b) => b.quality - a.quality)
    .find(({ language }) => /^(en|pt)(-|$)/.test(language));
  const locale = isLocale(savedLocale) ? savedLocale
    : preferredLocale?.language.startsWith("pt") ? "pt-BR" : defaultLocale;
  return {
    locale,
    messages: (await import(`../public/i18n/${locale === "pt-BR" ? "pt" : "en"}.json`)).default,
  };
});
