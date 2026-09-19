"use client";

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { RESUME_DATA } from "@/data/resume-data";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const GitHubCalendar = dynamic(
    () => import('react-github-calendar').then((module) => module.GitHubCalendar),
    {
        ssr: false,
    }
);


export default function MyGithubCalendar() {
    const grayscaleTheme = {
        light: ['#18181b', '#52525b', '#a1a1aa', '#f4f4f5', '#ffffff'],
        dark: ['#18181b', '#27272a', '#52525b', '#a1a1aa', '#f4f4f5'],
    };

    return (
        <Link
            href={RESUME_DATA.contact.social[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bento-card md:col-span-12 px-6 py-4 border border-border/50 rounded-3xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[1.02]" >
            <div className="flex justify-between pb-6">
                <div className={`flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1`}>
                    <FaGithub className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Github Activity</h3>
                </div>
                <div>
                    <FaExternalLinkAlt />
                </div>
            </div>
            <div className="overflow-hidden w-full transition-all duration-150 cursor-pointer">
                <GitHubCalendar
                    username="nathanmota-dev"
                    theme={grayscaleTheme}
                    blockSize={10}
                    blockMargin={3}
                    fontSize={12}
                    labels={{
                        totalCount: "{{count}} contributions",
                    }}
                />
            </div>
        </Link>
    );
}
