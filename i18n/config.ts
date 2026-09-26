export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export function isLocale(value: unknown): value is Locale {
  return locales.some((locale) => locale === value);
}
