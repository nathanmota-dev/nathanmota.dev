"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import type { ImageLightboxProps } from "@/types/image-lightbox";

// Dark and above the image: the buttons may sit over the image's edges.
const controlClassName = "fixed z-10 rounded-full bg-black/70 p-2 text-white ring-1 ring-white/20 transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const arrowClassName = `${controlClassName} top-1/2 -translate-y-1/2 p-2.5`;

// A modal <dialog> brings Esc to close, focus handling and an inert page for free.
export function ImageLightbox({ image, closeLabel, onClose, navigation }: ImageLightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const open = image !== null;

    // Depends on `open`, not on the image: moving to another image must not close and reopen the dialog.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !open) return;

        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = "";
            if (dialog.open) dialog.close();
        };
    }, [open]);

    // A wide image scrolled sideways on a phone starts from its left edge again.
    useEffect(() => {
        dialogRef.current?.scrollTo({ left: 0, top: 0 });
    }, [image?.src]);

    // Listens on the window: when an arrow button disappears at either end, focus leaves the dialog.
    const onPrevious = navigation?.onPrevious;
    const onNext = navigation?.onNext;
    useEffect(() => {
        if (!open || (!onPrevious && !onNext)) return;
        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            const move = event.key === "ArrowLeft" ? onPrevious : event.key === "ArrowRight" ? onNext : undefined;
            if (!move) return;
            event.preventDefault();
            move();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onPrevious, onNext]);

    const close = () => dialogRef.current?.close();

    return (
        <dialog
            ref={dialogRef}
            aria-label={image?.alt}
            onClose={onClose}
            // Clicking the backdrop (anything but the image or the buttons) closes it.
            onClick={(event) => { if (event.target === event.currentTarget) close(); }}
            // Safe centering keeps the image's left edge reachable when it is wider than the screen.
            className="m-0 h-dvh max-h-none w-screen max-w-none items-center-safe justify-center-safe overflow-auto overscroll-contain bg-transparent p-4 open:flex backdrop:bg-black/90 backdrop:backdrop-blur-sm sm:p-6"
        >
            {image && (
                <>
                    <button
                        type="button"
                        onClick={close}
                        aria-label={closeLabel}
                        title={closeLabel}
                        autoFocus
                        className={`${controlClassName} top-4 right-4`}
                    >
                        <FiX className="h-6 w-6" />
                    </button>
                    {navigation?.onPrevious && (
                        <button
                            type="button"
                            onClick={navigation.onPrevious}
                            aria-label={navigation.previousLabel}
                            title={navigation.previousLabel}
                            className={`${arrowClassName} left-3 sm:left-4`}
                        >
                            <FiChevronLeft className="h-6 w-6" />
                        </button>
                    )}
                    {navigation?.onNext && (
                        <button
                            type="button"
                            onClick={navigation.onNext}
                            aria-label={navigation.nextLabel}
                            title={navigation.nextLabel}
                            className={`${arrowClassName} right-3 sm:right-4`}
                        >
                            <FiChevronRight className="h-6 w-6" />
                        </button>
                    )}
                    {navigation?.position && (
                        <p
                            aria-live="polite"
                            className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 font-[family-name:var(--font-geist-mono)] text-sm text-white tabular-nums ring-1 ring-white/20"
                        >
                            {navigation.position}
                        </p>
                    )}
                    {/* Sizing and the dark-mode treatment live in globals.css (.lightbox-image). */}
                    <figure className="lightbox-image" style={{ "--ratio": image.ratio } as CSSProperties}>
                        {/* Markdown images have no known size, so next/image does not fit here. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image.src} alt={image.alt} />
                    </figure>
                </>
            )}
        </dialog>
    );
}
