import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import type { ProjectCaseStudy, ProjectGalleryImage } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "projects");
const SLUG_PATTERN = /^[a-z0-9-]+$/;

function isGalleryImage(value: unknown): value is ProjectGalleryImage {
    const item = value as Partial<ProjectGalleryImage> | null;
    return typeof item?.src === "string" && typeof item.alt === "string" && typeof item.caption === "string";
}

/**
 * Reads the case study written for a project in projects/<slug>.<pt|en>.md,
 * falling back to the other language. Returns null when none exists.
 */
export async function getProjectCaseStudy(slug: string, locale: string): Promise<ProjectCaseStudy | null> {
    if (!SLUG_PATTERN.test(slug)) return null;

    const preferred = locale === "pt-BR" ? ["pt", "en"] : ["en", "pt"];
    for (const language of preferred) {
        const fullPath = path.join(PROJECTS_DIR, `${slug}.${language}.md`);
        if (!fs.existsSync(fullPath)) continue;

        const { data, content } = matter(fs.readFileSync(fullPath, "utf-8"));
        const processed = await remark().use(gfm).use(html).process(content);
        const gallery = Array.isArray(data.gallery) ? data.gallery.filter(isGalleryImage) : [];
        return { html: processed.toString(), gallery };
    }

    return null;
}
