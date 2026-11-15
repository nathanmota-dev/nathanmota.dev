import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/cards/card/card";
import { Badge } from "@/components/badge/badge";
import type { ExpandedProjectCardProps } from "@/types/project-card";

export function ExpandedProjectCard({
    title,
    description,
    tags,
    image,
    githubLink,
    deployLink,
    type,
    href,
}: ExpandedProjectCardProps) {
    const t = useTranslations("projects");
    return (
        <Card className="group relative flex flex-col overflow-hidden border border-border/50 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:bg-black/2">

            {/* Seção da Imagem */}
            <div className="relative w-full h-56 md:h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={t("preview", {title})}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
                    priority={false}
                />
            </div>

            {/* Seção de Conteúdo */}
            <div className="flex flex-col flex-1 p-6">
                <CardHeader className="p-0 space-y-2 mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {t(type)}
                        </span>

                        {/* Links: above the card-wide link so they stay clickable */}
                        <div className="relative z-10 flex gap-3">
                            {githubLink && (
                                <a
                                    href={githubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    title={t("github")}
                                >
                                    <FiGithub className="w-5 h-5" />
                                </a>
                            )}
                            {deployLink && (
                                <a
                                    href={deployLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                    title={t("online")}
                                >
                                    <FiExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <CardTitle className="text-xl md:text-2xl font-bold">
                        {href ? (
                            <Link
                                href={href}
                                className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-primary"
                            >
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                    </CardTitle>

                    <CardDescription className="text-sm text-muted-foreground">
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-0 mt-auto pt-4">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                className="bg-background/50 px-2 py-1 text-xs"
                                variant="secondary"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {href && (
                        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                            {t("details")}
                            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}
