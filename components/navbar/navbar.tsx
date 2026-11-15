"use client";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../language-switcher/language-switcher"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiArrowLeft } from "react-icons/fi"
import { ThemeToggle } from "../theme-toggle/theme-toggle"

export default function Navbar() {
    const t = useTranslations("nav");
    const pathname = usePathname()
    const isHome = pathname === "/"
    // Back goes one level up: /projects/<slug> -> /projects, /projects -> /.
    const backHref = pathname.split("/").slice(0, -1).join("/") || "/"
    const backSection = backHref.slice(1)
    const backLabel = backHref !== "/" && t.has(backSection)
        ? t("backTo", { page: t(backSection) })
        : t("home")

    return (
        <div className="max-w-3xl mx-auto space-y-8 py-2 px-4 lg:px-0">
            <nav className="grid grid-cols-[1fr_auto] items-center gap-y-4 py-4 md:grid-cols-[1fr_auto_1fr]">
                <div className="col-start-1 row-start-1 flex items-center justify-self-start">
                {isHome ? (
                    <div className="flex items-center font-display font-bold text-base md:text-lg">
                        Nathan Mota
                    </div>
                ) : (
                    <Link
                        href={backHref}
                        aria-label={backLabel}
                        title={backLabel}
                        // Same square as the language and theme buttons on the right.
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background text-foreground/80 outline-none transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <FiArrowLeft className="size-5" aria-hidden="true" />
                    </Link>
                )}
                </div>
                <div className="col-span-2 row-start-2 flex items-center justify-center gap-6 md:col-span-1 md:col-start-2 md:row-start-1">
                    <Link
                        href="/projects"
                        className={`nav-link ${pathname === "/projects" ? "active" : ""}`}
                    >
                        /{t("projects")}
                    </Link>

                    <Link
                        href="/articles"
                        className={`nav-link ${pathname === "/articles" ? "active" : ""}`}
                    >
                        /{t("articles")}
                    </Link>

                    <Link
                        href="/contact"
                        className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                    >
                        /{t("contact")}
                    </Link>
                </div>
                    <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-2 md:col-start-3">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>
            </nav>
        </div>
    )
}
