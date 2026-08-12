"use client";

import { useState } from "react";
import { ExpandedProjectCard } from "@/components/cards/card-project-expanded/card-project-expanded";
import { RESUME_DATA } from "@/data/resume-data";
import { SegmentedControl } from "@/components/segmented-control/segmented-control";
import type { ProjectFilterType } from "@/types/segmented-control";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<ProjectFilterType>("all");

    const filteredProjects = RESUME_DATA.projects.filter((project) => {
        if (activeFilter === "all") return true;
        return project.type === activeFilter;
    });

    return (
        <div className="max-w-3xl mx-auto py-2 px-4 sm:px-0">
            <div className="py-4 flex flex-col items-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-2">
                    Projects
                </h2>

                <SegmentedControl
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            </div>

            <main>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-125 content-start px-4 lg:px-0">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ExpandedProjectCard
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                tags={project.techStack}
                                image={project.image.startsWith("/") ? project.image : `/${project.image}`}
                                githubLink={project.githubUrl}
                                deployLink={"deployUrl" in project ? project.deployUrl || undefined : undefined}
                                type={project.type as "frontend" | "backend" | "fullstack"}
                            />
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 text-center py-12 text-muted-foreground">
                            No projects were found for this category.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
