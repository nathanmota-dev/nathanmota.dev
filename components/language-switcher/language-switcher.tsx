"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LuCheck, LuLanguages } from "react-icons/lu";
import { setLocale } from "@/i18n/actions";
import { isLocale } from "@/i18n/config";

const languages = [
  { value: "pt-BR", label: "Português", code: "PT", lang: "pt-BR" },
  { value: "en", label: "English", code: "EN", lang: "en" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={t("language")}
          title={t("language")}
          disabled={pending}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background text-foreground/80 outline-none transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 data-[state=open]:bg-foreground/5"
        >
          <LuLanguages className="size-5" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          side="bottom"
          sideOffset={8}
          collisionPadding={12}
          aria-label={t("language")}
          className="z-50 min-w-20 rounded-xl border border-border/50 bg-background p-1.5 text-foreground shadow-lg shadow-black/10"
        >
          <DropdownMenu.RadioGroup
            value={locale}
            onValueChange={(value) => {
              if (value === locale || !isLocale(value)) return;
              startTransition(async () => {
                await setLocale(value);
                router.refresh();
              });
            }}
          >
            {languages.map((language) => (
              <DropdownMenu.RadioItem
                key={language.value}
                value={language.value}
                disabled={pending}
                className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-foreground/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <DropdownMenu.ItemIndicator className="absolute left-2.5 inline-flex items-center">
                  <LuCheck className="size-3.5" aria-hidden="true" />
                </DropdownMenu.ItemIndicator>
                <span lang={language.lang} aria-label={language.label} className="font-medium tracking-wider">
                  {language.code}
                </span>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
