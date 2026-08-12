import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/cards/card/card";
import { Badge } from "@/components/badge/badge";
import type { ProjectCardProps } from "@/types/project-card";

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
    return (
        <Card className="group flex h-full flex-col overflow-hidden p-3 transition-all duration-300 hover:bg-black/2 hover:shadow-xl hover:shadow-primary/5">
            <CardHeader className="">
                <div className="space-y-1">
                    <CardTitle className="text-base">
                        {link ? (
                            <a
                                href={link}
                                target="_blank"
                                className="inline-flex items-center gap-1 hover:underline"
                            >
                                {title}{" "}
                                <span className="h-1 w-1 rounded-full bg-green-500"></span>
                            </a>
                        ) : (
                            title
                        )}
                    </CardTitle>
                    <div className="hidden font-mono text-xs underline print:visible">
                        {link?.replace("https://", "").replace("www.", "").replace("/", "")}
                    </div>
                    <CardDescription className="font-mono text-xs">
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="mt-auto flex">
                <div className="mt-2 flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <Badge
                            className="px-1 py-0 text-[10px]"
                            variant="secondary"
                            key={tag}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
