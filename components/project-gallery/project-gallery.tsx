"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImageLightbox } from "@/components/image-lightbox/image-lightbox";
import type { ProjectGalleryProps } from "@/types/project";

const arrowClassName = "absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-black/80 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * Carousel built on native CSS scroll snapping: the browser handles touch
 * swipes and keyboard scrolling, and the arrows only scroll the track.
 */
export function ProjectGallery({ images }: ProjectGalleryProps) {
    const t = useTranslations("projects");
    const trackRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const [expanded, setExpanded] = useState<{ slide: number; ratio: number } | null>(null);
    const last = images.length - 1;

    // The current slide follows the scroll position, whatever moved it.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            setIndex(Math.min(last, Math.max(0, Math.round(track.scrollLeft / track.clientWidth))));
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        track.addEventListener("scroll", schedule, { passive: true });
        return () => {
            track.removeEventListener("scroll", schedule);
            cancelAnimationFrame(frame);
        };
    }, [last]);

    const goTo = (target: number, instant = false) => {
        const track = trackRef.current;
        if (!track) return;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const slide = Math.min(last, Math.max(0, target));
        track.scrollTo({ left: slide * track.clientWidth, behavior: instant || reduceMotion ? "auto" : "smooth" });
    };

    // The carousel follows the lightbox, so closing it lands on the image that was open.
    // The rendered slide knows the image's real proportions; 16:9 until it has loaded.
    const expandTo = (slide: number) => {
        const image = trackRef.current?.children[slide]?.querySelector("img");
        const ratio = image?.naturalWidth && image.naturalHeight ? image.naturalWidth / image.naturalHeight : 16 / 9;
        setExpanded({ slide, ratio });
        goTo(slide, true);
    };

    const current = expanded?.slide ?? null;
    const expandedImage = expanded && { src: images[expanded.slide].src, alt: images[expanded.slide].alt, ratio: expanded.ratio };

    if (images.length === 0) return null;

    return (
        <section aria-roledescription="carousel" aria-label={t("gallery")} className="mb-6">
            <div className="relative">
                <div
                    ref={trackRef}
                    className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl border border-border/50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {images.map((image, slide) => (
                        <div
                            key={image.src}
                            role="group"
                            aria-roledescription="slide"
                            aria-label={t("slide", { current: slide + 1, total: images.length })}
                            // Off-screen slides stay out of the tab order and the accessibility tree.
                            inert={slide !== index}
                            className="relative aspect-video w-full shrink-0 snap-center snap-always"
                        >
                            <button
                                type="button"
                                onClick={() => expandTo(slide)}
                                aria-label={t("expand", { alt: image.alt })}
                                className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    priority={slide === 0}
                                    sizes="(min-width: 768px) 768px, 100vw"
                                    className="object-cover object-top"
                                />
                            </button>
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => goTo(index - 1)}
                            disabled={index === 0}
                            aria-label={t("previous")}
                            title={t("previous")}
                            className={`${arrowClassName} left-3`}
                        >
                            <FiChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(index + 1)}
                            disabled={index === last}
                            aria-label={t("next")}
                            title={t("next")}
                            className={`${arrowClassName} right-3`}
                        >
                            <FiChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            <p className="mt-3 px-1 text-center text-sm text-muted-foreground" aria-live="polite">
                <span className="mr-2 font-[family-name:var(--font-geist-mono)] tabular-nums">
                    {index + 1}/{images.length}
                </span>
                {images[index].caption}
            </p>

            <ImageLightbox
                image={expandedImage}
                closeLabel={t("close")}
                onClose={() => setExpanded(null)}
                navigation={current === null || images.length < 2 ? undefined : {
                    previousLabel: t("previous"),
                    nextLabel: t("next"),
                    onPrevious: current > 0 ? () => expandTo(current - 1) : undefined,
                    onNext: current < last ? () => expandTo(current + 1) : undefined,
                    position: `${current + 1}/${images.length}`,
                }}
            />
        </section>
    );
}
