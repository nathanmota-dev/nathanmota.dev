"use client";

import { memo, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useLocale } from "next-intl";
import { highlight } from "sugar-high";
import { ImageLightbox } from "@/components/image-lightbox/image-lightbox";
import type { LightboxImage } from "@/types/image-lightbox";

type Heading = { id: string; text: string; depth: number };

const ArticleBody = memo(function ArticleBody({ html, articleRef }: {
    html: string;
    articleRef: RefObject<HTMLElement | null>;
}) {
    return (
        <article
            ref={articleRef}
            className="gap-6! text-lg leading-[1.75] [&_h2]:relative [&_h2]:scroll-mt-24 [&_h2]:leading-[1.3] [&_h3]:relative [&_h3]:scroll-mt-24 [&_h3]:leading-[1.3] [&_:is(h2,h3)]:before:mr-2 [&_:is(h2,h3)]:before:font-[family-name:var(--font-geist-mono)] [&_:is(h2,h3)]:before:text-[.9rem] [&_:is(h2,h3)]:before:font-normal [&_:is(h2,h3)]:before:leading-normal [&_:is(h2,h3)]:before:text-muted-foreground [&_:is(h2,h3)]:before:content-[attr(data-marker)] min-[1400px]:[&_:is(h2,h3)]:before:absolute min-[1400px]:[&_:is(h2,h3)]:before:right-[calc(100%+.65rem)] min-[1400px]:[&_:is(h2,h3)]:before:mr-0 min-[1400px]:[&_h2]:before:top-[2.4rem] min-[1400px]:[&_h3]:before:top-[1.3rem]"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
});

export function Article({ html, children, contentsLabel }: { html: string; children?: ReactNode; contentsLabel?: string }) {
    const articleRef = useRef<HTMLElement>(null);
    const readingRef = useRef<HTMLDivElement>(null);
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState("");
    const [progress, setProgress] = useState(0);
    const [readingStarted, setReadingStarted] = useState(false);
    const [readingMinutes, setReadingMinutes] = useState(0);
    const [expandedImage, setExpandedImage] = useState<LightboxImage | null>(null);
    const remainingMinutes = Math.ceil(readingMinutes * (1 - progress / 100));
    const portuguese = useLocale() === "pt-BR";
    const label = contentsLabel ?? (portuguese ? "Neste post" : "In this post");

    useEffect(() => {
        const article = articleRef.current;
        const reading = readingRef.current;
        if (!article || !reading) return;

        article.querySelectorAll("pre code").forEach((code) => {
            code.innerHTML = highlight(code.textContent ?? "");
            code.querySelectorAll<HTMLElement>(".sh__line").forEach((line, index) => {
                line.dataset.line = String(index + 1);
            });
        });

        const usedIds = new Set<string>();
        const elements = Array.from(article.querySelectorAll<HTMLElement>("h2, h3"));
        const entries = elements.map((heading) => {
            const text = heading.textContent ?? "";
            const base = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-") || "section";
            let id = base;
            let suffix = 2;
            while (usedIds.has(id)) id = `${base}-${suffix++}`;
            usedIds.add(id);
            heading.id = id;
            const depth = Number(heading.tagName.slice(1));
            heading.dataset.marker = "#".repeat(depth);
            return { id, text, depth };
        });

        // Images open enlarged in a lightbox, by click or by keyboard.
        article.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-haspopup", "dialog");
        });
        const expandImage = (event: Event) => {
            const image = event.target;
            if (!(image instanceof HTMLImageElement)) return;
            if (event instanceof KeyboardEvent) {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
            }
            const ratio = image.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 16 / 10;
            setExpandedImage({ src: image.currentSrc || image.src, alt: image.alt, ratio });
        };
        article.addEventListener("click", expandImage);
        article.addEventListener("keydown", expandImage);

        article.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
            if (link.origin !== window.location.origin) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
        });

        let frame = 0;
        const update = () => {
            frame = 0;
            const bounds = reading.getBoundingClientRect();
            const distance = bounds.height - window.innerHeight + 64;
            // The navbar scrolls away with the page; by the time the title reaches the top it is gone.
            setReadingStarted(bounds.top <= 64);
            setProgress(Math.round(Math.min(1, Math.max(0,
                distance > 0 ? (64 - bounds.top) / distance : bounds.top <= 64 ? 1 : 0,
            )) * 100));
            let current = "";
            for (const heading of elements) {
                if (heading.getBoundingClientRect().top <= 140) current = heading.id;
                else break;
            }
            if (bounds.bottom <= window.innerHeight && elements.length) current = elements[elements.length - 1].id;
            setActiveId(current);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        const initial = requestAnimationFrame(() => {
            setHeadings(entries);
            setReadingMinutes((article.textContent?.trim().split(/\s+/).length ?? 0) / 200);
            // Heading IDs are assigned after hydration, so restore incoming anchors.
            const target = elements.find((heading) => `#${encodeURIComponent(heading.id)}` === window.location.hash || `#${heading.id}` === window.location.hash);
            target?.scrollIntoView();
            update();
        });
        const observer = new ResizeObserver(schedule);
        observer.observe(reading);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(initial);
            cancelAnimationFrame(frame);
            observer.disconnect();
            article.removeEventListener("click", expandImage);
            article.removeEventListener("keydown", expandImage);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [html]);

    const links = headings.map((heading) => (
        <li key={heading.id} className={`mb-3 ${heading.depth === 3 ? "pl-4" : ""}`}>
            <a className="block border-l-2 border-transparent pl-3 hover:text-primary aria-[current=location]:border-primary aria-[current=location]:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href={`#${heading.id}`} aria-current={activeId === heading.id ? "location" : undefined}>
                {heading.text}
            </a>
        </li>
    ));

    return (
        <>
            <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
                <div className="h-[3px] bg-muted" role="progressbar" aria-label={portuguese ? "Progresso de leitura" : "Reading progress"} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                    <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${progress / 100})` }} />
                </div>
                <span aria-hidden={!readingStarted} className={`float-right mt-2 mr-4 rounded-sm bg-background px-[.65rem] py-1 font-[family-name:var(--font-geist-mono)] text-xs leading-[1.5] text-muted-foreground transition-opacity duration-200 motion-reduce:transition-none ${readingStarted ? "opacity-100" : "opacity-0"}`}>{progress}% {portuguese ? "lido" : "read"} · {portuguese ? `faltam ${remainingMinutes} min` : `${remainingMinutes} min left`}</span>
            </div>
            <div className="mx-auto flex w-full flex-col items-start gap-6 min-[1400px]:grid min-[1400px]:grid-cols-[0_minmax(0,1fr)] min-[1400px]:gap-0">
                <aside className="w-full overflow-y-auto font-[family-name:var(--font-geist-mono)] text-[.8rem] leading-[1.6] text-muted-foreground [scrollbar-color:var(--muted)_transparent] [scrollbar-width:thin] min-[1400px]:sticky min-[1400px]:top-16 min-[1400px]:-ml-72 min-[1400px]:max-h-[calc(100dvh-6rem)] min-[1400px]:w-60">
                    {headings.length > 0 && <nav aria-label={label}>
                        <div className="hidden min-[1400px]:block"><p className="mb-4 tracking-[.08em] uppercase">{label}</p><ul>{links}</ul></div>
                        <details className="border-b border-muted pb-4 min-[1400px]:hidden"><summary className="cursor-pointer tracking-[.08em] uppercase">{label}</summary><ul className="mt-4 max-h-[45dvh] overflow-y-auto">{links}</ul></details>
                    </nav>}
                </aside>
                <div ref={readingRef} className="w-full min-w-0">
                    {children}
                    <ArticleBody html={html} articleRef={articleRef} />
                </div>
            </div>
            <ImageLightbox
                image={expandedImage}
                closeLabel={portuguese ? "Fechar imagem" : "Close image"}
                onClose={() => setExpandedImage(null)}
            />
        </>
    );
}
