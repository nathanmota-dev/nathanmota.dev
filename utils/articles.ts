import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import en from "@/public/i18n/en.json";
import pt from "@/public/i18n/pt.json";

function getLocalizedArticle(id: string, locale: string) {
    const posts = (locale === "pt-BR" ? pt : en).articles.posts;
    return posts[id as keyof typeof posts];
}
import { remark } from "remark";
import html from "remark-html";
import type { Article } from "@/types/article";

const ARTICLES_DIR = path.join(process.cwd(), "articles");

export function getAllTags() {
    const tags = new Set();
    const files = fs.readdirSync(ARTICLES_DIR);

    for (const file of files) {
        const fullPath = path.join(ARTICLES_DIR, file);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const matterResult = matter(fileContents);
        const tagsInFile = matterResult.data.tags || [];
        for (const tag of tagsInFile) {
            if (tags.has(tag)) {
                continue;
            }
            tags.add(tag);
        }
    }

    return Array.from(tags);
}

export function getArticles(locale = "en"): Article[] {
    const files = fs.readdirSync(ARTICLES_DIR);

    const allArticlesData = files.map((file) => {
        const id = file.replace(/\.md$/, "");
        const fullPath = path.join(ARTICLES_DIR, file);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const matterResult = matter(fileContents);

        return {
            id,
            title: getLocalizedArticle(id, locale)?.title ?? matterResult.data.title,
            tags: matterResult.data.tags,
            date: moment(matterResult.data.date).format("YYYY-MM-DD"),
        };
    });

    return allArticlesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else if (a.date > b.date) {
            return -1;
        } else {
            return 0;
        }
    });
}

export async function getArticleData(id: string, locale = "en") {
    const fullPath = path.join(ARTICLES_DIR, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(getLocalizedArticle(id, locale)?.content ?? matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        title: getLocalizedArticle(id, locale)?.title ?? matterResult.data.title,
        tags: matterResult.data.tags || [],
        location: matterResult.data.location || "",
        date: new Intl.DateTimeFormat(locale, {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"}).format(new Date(matterResult.data.date)),
    };
}
