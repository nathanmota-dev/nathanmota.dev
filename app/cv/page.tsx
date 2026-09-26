import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { IoIosGlobe } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { getResumeData } from "@/data/resume-data";
import { getTranslations } from "next-intl/server";

import { ProjectCard } from "@/components/cards/project-card/project-card";
import { Section } from "@/components/section/section";

import { Button } from "@/components/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar/avatar";
import { Card, CardHeader, CardContent } from "@/components/cards/card/card";
import { Badge } from "@/components/badge/badge";


export async function generateMetadata(): Promise<Metadata> {
    const resume = getResumeData(await getTranslations("resume"));
    return {title: `${resume.name} | ${resume.about}`, description: resume.summary};
}

export default function Cv() {
    const t = useTranslations("cv");
    const resume = getResumeData(useTranslations("resume"));
    return (
        <main className="max-w-3xl mx-auto py-2 px-4 sm:px-0">
            <div className="py-4 flex justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-6">
                    {resume.name}
                </h2>
            </div>
            <section className="mx-auto w-full space-y-8 print:space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1.5">
                        <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground">
                            {resume.about}
                        </p>
                        <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
                            <a
                                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                                href={resume.locationLink}
                                target="_blank"
                            >
                                <IoIosGlobe className="h-3 w-3" />
                                {resume.location}
                            </a>
                        </p>
                        <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
                            {resume.contact.email ? (
                                <Button
                                    className="h-8 w-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`mailto:${resume.contact.email}`}>
                                        <CiMail className="h-4 w-4" />
                                    </a>
                                </Button>
                            ) : null}
                            {resume.contact.tel ? (
                                <Button
                                    className="h-8 w-8"
                                    variant="outline"
                                    size="icon"
                                    asChild
                                >
                                    <a href={`tel:${resume.contact.tel}`}>
                                        <FiPhone className="h-4 w-4" />
                                    </a>
                                </Button>
                            ) : null}
                            {resume.contact.social
                                .filter((social) => social.showOnCv ?? true)
                                .map((social) => (
                                    <Button
                                        key={social.name}
                                        className="h-8 w-8"
                                        variant="outline"
                                        size="icon"
                                        asChild
                                    >
                                        <a href={social.url}>
                                            <social.icon className="h-4 w-4" />
                                        </a>
                                    </Button>
                                ))}
                        </div>
                        <div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
                            {resume.contact.email ? (
                                <a href={`mailto:${resume.contact.email}`}>
                                    <span className="underline">{resume.contact.email}</span>
                                </a>
                            ) : null}
                            {resume.contact.tel ? (
                                <a href={`tel:${resume.contact.tel}`}>
                                    <span className="underline">{resume.contact.tel}</span>
                                </a>
                            ) : null}
                        </div>
                    </div>

                    <Avatar className="h-28 w-28">
                        <AvatarImage alt={resume.name} src={resume.avatarUrl} />
                        <AvatarFallback>{resume.initials}</AvatarFallback>
                    </Avatar>
                </div>
                <Section>
                    <h2 className="text-xl font-bold">{t("about")}</h2>
                    <p className="text-pretty font-mono text-sm text-muted-foreground">
                        {resume.summary}
                    </p>
                </Section>
                <Section>
                    <h2 className="text-xl font-bold">{t("work")}</h2>
                    {resume.work.map((work) => {
                        const workKey = `${work.company}-${work.title}-${work.start}-${work.end}`;
                        const workDescriptionItems = work.description
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean);

                        return (
                            <Card key={workKey}>
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="inline-flex items-center justify-center gap-x-3 font-semibold leading-none">
                                            <a className="hover:underline" href={work.link}>
                                                {work.company}
                                            </a>

                                            <span className="inline-flex gap-x-1">
                                                {work.badges.map((badge) => (
                                                    <Badge
                                                        variant="secondary"
                                                        className="align-middle text-xs"
                                                        key={`${workKey}-${badge}`}
                                                    >
                                                        {badge}
                                                    </Badge>
                                                ))}
                                            </span>
                                        </h3>
                                        <div className="text-sm tabular-nums text-gray-500">
                                            {work.start} - {work.end}
                                        </div>
                                    </div>

                                    <h4 className="font-mono text-sm leading-none">
                                        {work.title}
                                    </h4>
                                </CardHeader>
                                <CardContent className="mt-2 text-xs">
                                    <ul className="list-disc space-y-2 pl-4">
                                        {workDescriptionItems.map((item) => (
                                            <li key={`${workKey}-${item}`}>{item}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Section>
                <Section>
                    <h2 className="text-xl font-bold">{t("education")}</h2>
                    {resume.education.map((education) => {
                        return (
                            <Card key={education.school}>
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-x-2 text-base">
                                        <h3 className="font-semibold leading-none">
                                            {education.school}
                                        </h3>
                                        <div className="text-sm tabular-nums text-gray-500">
                                            {education.start} - {education.end}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="mt-2">{education.degree}</CardContent>
                            </Card>
                        );
                    })}
                </Section>
                <Section>
                    <h2 className="text-xl font-bold">{t("skills")}</h2>
                    <div className="flex flex-wrap gap-1">
                        {resume.skills.map((skill) => {
                            return <Badge key={skill}>{skill}</Badge>;
                        })}
                    </div>
                </Section>

                <Section className="print-force-new-page scroll-mb-16">
                    <h2 className="text-xl font-bold">{t("projects")}</h2>
                    <div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
                        {resume.projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    description={project.description}
                                    tags={project.techStack}
                                    link={"link" in project ? project.link.href : undefined}
                                />
                            );
                        })}
                    </div>
                </Section>
            </section>
        </main>
    );
}
