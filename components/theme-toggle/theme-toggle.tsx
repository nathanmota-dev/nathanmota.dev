"use client";
import { useTranslations } from "next-intl";


import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function isThemeSetToDark() {
    if (typeof window === "undefined") return false;

    return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
}

export function ThemeToggle() {
    const t = useTranslations("common");
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkMode = isThemeSetToDark();

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        const frame = requestAnimationFrame(() => setIsDarkMode(darkMode));
        return () => cancelAnimationFrame(frame);
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        } else {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="group relative inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background text-foreground/80 outline-none transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t("theme")}
        >
            {isDarkMode ? (
                <IoMoonOutline
                    strokeWidth={1.4}
                    className="size-5 fill-gray-700 transition-transform"
                />
            ) : (
                <IoSunnyOutline
                    strokeWidth={1.4}
                    className="size-5 fill-yellow-300 transition-transform sm:hover:rotate-45"
                />
            )}
        </button>
    );
}