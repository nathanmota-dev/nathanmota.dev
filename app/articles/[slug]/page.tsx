
import { Article } from "@/components/article/article";
import { getArticleData } from "@/utils/articles";
import Link from "next/link";
import type { ArticlePageProps, ArticleTagProps } from "@/types/article";


function Tag({ tag }: ArticleTagProps) {
    return (
        <div className="text-muted-foreground border-border bg-muted/40 flex size-4 w-fit items-center justify-center rounded-full border px-2 py-3 text-xs">
            #{tag}
        </div>
    );
}

export default async function ArticlePage({
    params,
}: ArticlePageProps) {
    const { slug } = await params;

    let articleData;
    try {
        articleData = await getArticleData(slug);
    } catch (error) {
        if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") {
            throw error;
        }

        return (
            <div className="flex flex-col items-center justify-center gap-6 py-16">
                <h1 className="text-5xl max-sm:text-3xl">
                    This article doesn&apos;t exist.
                </h1>
                <Link
                    href="/articles"
                    className="text-foreground underline decoration-primary/70 underline-offset-4"
                >
                    Read something else
                </Link>
            </div>
        );
    }

    return (
        <main className="max-w-3xl mx-auto px-4 lg:px-0 py-2">
            <div className="py-4 flex justify-center text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-2">
                    {articleData.title}
                </h1>
            </div>
            <div className="flex flex-col items-center justify-center pb-8">
                <div className="flex w-full max-w-prose flex-col items-center justify-center gap-4 px-4 pb-6 pt-1">
                    <div className="flex flex-wrap gap-x-3">
                        {articleData.tags.map((tag: string) => (
                            <Tag tag={tag} key={tag} />
                        ))}
                    </div>
                </div>
                <div className="text-muted-foreground text-sm max-sm:text-xs">
                    {articleData.date}
                </div>
            </div>
            <Article html={articleData.contentHtml} />
        </main>
    );
}
