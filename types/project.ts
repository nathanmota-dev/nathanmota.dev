export interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export interface ProjectGalleryImage {
    src: string;
    alt: string;
    caption: string;
}

export interface ProjectCaseStudy {
    html: string;
    /** Screens shown in the carousel at the top, from the markdown frontmatter. */
    gallery: ProjectGalleryImage[];
}

export interface ProjectGalleryProps {
    images: ProjectGalleryImage[];
}
