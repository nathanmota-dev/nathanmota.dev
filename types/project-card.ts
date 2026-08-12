export type ProjectType = "frontend" | "backend" | "fullstack";

export interface ExpandedProjectCardProps {
    title: string;
    description: string;
    tags: readonly string[];
    image: string;
    githubLink?: string;
    deployLink?: string;
    type: ProjectType;
}

export interface ProjectCardProps {
    title: string;
    description: string;
    tags: readonly string[];
    link?: string;
}
