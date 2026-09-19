"use client";

import { useEffect } from "react";
import { highlight } from "sugar-high";
import type { ArticleProps } from "@/types/article";

export function Article({ html }: ArticleProps) {
    const handleFormatCode = () => {
        const codes = document.querySelectorAll("pre code");
        codes.forEach((code) => {
            const html = highlight(code.textContent as string);
            code.innerHTML = html;

            code.querySelectorAll<HTMLElement>(".sh__line").forEach((line, index) => {
                line.dataset.line = String(index + 1);
            });
        });

        const titles = document.querySelectorAll("h2");
        titles.forEach((title) => {
            title.id = title.textContent?.toLowerCase().replace(/\s/g, "-") as string;
        });

        const links = document.querySelectorAll("article a") as NodeListOf<HTMLAnchorElement>;
        links.forEach((link) => {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });
    };
    useEffect(handleFormatCode, []);
    return <article dangerouslySetInnerHTML={{ __html: html }} />;
}
