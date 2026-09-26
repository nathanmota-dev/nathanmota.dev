import { useTranslations } from "next-intl";
import { RESUME_DATA } from "@/data/resume-data";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    const t = useTranslations("common");
    return (
        <div className="max-w-3xl mx-auto py-2">
            <footer className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em] pb-4 px-4 lg:px-0">
                <a 
                className="flex justify-center gap-2"
                href="https://github.com/nathanmota-dev/portfolio-v2"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaGithub className="w-4 h-4 text-muted-foreground" />
                    {t("code")}
                </a>
                <p>2026 © {RESUME_DATA.name} — Dev</p>
            </footer>
        </div >
    )
}