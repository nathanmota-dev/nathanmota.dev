export type ProjectType = "frontend" | "backend" | "fullstack";

export interface ExpandedProjectCardProps {
    title: string;
    description: string;
    tags: readonly string[];
    image: string;
    githubLink?: string;
    deployLink?: string;
    type: ProjectType;
    /** Case study page; when set, the whole card links to it. */
    href?: string;
}

export interface ProjectCardProps {
    title: string;
    description: string;
    tags: readonly string[];
    link?: string;
}
