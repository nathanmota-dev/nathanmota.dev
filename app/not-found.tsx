import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center space-y-6">
      <h1 className="text-3xl font-bold">404 — {t("common.notFound")}</h1>
      <Link href="/" className="underline">{t("nav.home")}</Link>
    </main>
  );
}
