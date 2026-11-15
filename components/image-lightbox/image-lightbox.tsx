"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { FiX } from "react-icons/fi";
import type { ImageLightboxProps } from "@/types/image-lightbox";

// A modal <dialog> brings Esc to close, focus handling and an inert page for free.
export function ImageLightbox({ image, closeLabel, onClose }: ImageLightboxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !image) return;

        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = "";
            if (dialog.open) dialog.close();
        };
    }, [image]);

    const close = () => dialogRef.current?.close();

    return (
        <dialog
            ref={dialogRef}
            aria-label={image?.alt}
            onClose={onClose}
            // Clicking the backdrop (anything but the image or the button) closes it.
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
                        // Dark and above the image: it may sit over the image's corner.
                        className="fixed top-4 right-4 z-10 rounded-full bg-black/70 p-2 text-white ring-1 ring-white/20 transition-colors hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <FiX className="h-6 w-6" />
                    </button>
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
