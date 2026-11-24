export interface LightboxImage {
    src: string;
    alt: string;
    /** Width divided by height, used to grow the image as much as the screen allows. */
    ratio: number;
}

export interface LightboxNavigation {
    previousLabel: string;
    nextLabel: string;
    /** Left out on the first image, which hides the previous arrow. */
    onPrevious?: () => void;
    /** Left out on the last image, which hides the next arrow. */
    onNext?: () => void;
    /** Shown under the image, such as "2/6". */
    position?: string;
}

export interface ImageLightboxProps {
    /** Image being shown; null keeps the lightbox closed. */
    image: LightboxImage | null;
    closeLabel: string;
    onClose: () => void;
    /** Arrows and arrow keys to move between images, for a gallery. */
    navigation?: LightboxNavigation;
}
