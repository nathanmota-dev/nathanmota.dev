import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { FiExternalLink, FiGithub } from "react-icons/fi";

import { Article } from "@/components/article/article";
import { Badge } from "@/components/badge/badge";
import { ProjectGallery } from "@/components/project-gallery/project-gallery";
import { getResumeData } from "@/data/resume-data";
import { getProjectCaseStudy } from "@/utils/projects";
import type { ProjectPageProps } from "@/types/project";

const linkClassName = "relative inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary";

async function findProject(slug: string) {
    const resume = getResumeData(await getTranslations("resume"));
    return resume.projects.find((project) => "slug" in project && project.slug === slug);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await findProject(slug);
    if (!project) return {};
    return { title: `${project.title} | Nathan Mota`, description: project.description };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const [project, locale, t] = await Promise.all([
        findProject(slug),
        getLocale(),
        getTranslations("projects"),
    ]);
    const caseStudy = project ? await getProjectCaseStudy(slug, locale) : null;
    if (!project || !caseStudy) notFound();

    const deployUrl = "deployUrl" in project ? project.deployUrl : undefined;

    return (
        <main data-article-page className="mx-auto max-w-3xl px-4 pt-2 pb-16 lg:px-0">
            <Article html={caseStudy.html} contentsLabel={t("contents")}>
                <header className="space-y-5 pt-2 pb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t(project.type)}
                    </span>
                    <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                        {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-3">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={linkClassName}>
                                <FiGithub className="h-4 w-4" />
                                {t("github")}
                            </a>
                        )}
                        {deployUrl && (
                            <a href={deployUrl} target="_blank" rel="noreferrer" className={linkClassName}>
                                <FiExternalLink className="h-4 w-4" />
                                {t("online")}
                            </a>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <Badge key={tech} className="bg-background/50 px-2 py-1 text-xs" variant="secondary">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </header>

                {caseStudy.gallery.length > 0 ? (
                    <ProjectGallery images={caseStudy.gallery} />
                ) : (
                    <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-3xl border border-border/50">
                        <Image
                            src={`/${project.image}`}
                            alt={t("preview", { title: project.title })}
                            fill
                            priority
                            sizes="(min-width: 768px) 768px, 100vw"
                            className="object-cover object-top"
                        />
                    </div>
                )}
            </Article>
        </main>
    );
}
