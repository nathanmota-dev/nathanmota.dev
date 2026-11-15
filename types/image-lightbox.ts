export interface LightboxImage {
    src: string;
    alt: string;
    /** Width divided by height, used to grow the image as much as the screen allows. */
    ratio: number;
}

export interface ImageLightboxProps {
    /** Image being shown; null keeps the lightbox closed. */
    image: LightboxImage | null;
    closeLabel: string;
    onClose: () => void;
}
