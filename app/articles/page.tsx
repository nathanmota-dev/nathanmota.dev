import { useLocale, useTranslations } from "next-intl";
import { getArticles } from "@/utils/articles";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/cards/card/card";
import { Badge } from "@/components/badge/badge";
import { Section } from "@/components/section/section";

export default function Articles() {
    const t = useTranslations("articles");
    const locale = useLocale();
    const articles = getArticles(locale);

    return (
        <main className="max-w-3xl mx-auto py-2 px-4 sm:px-0">
            <div className="py-4 flex justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-6">
                    {t("title")}
                </h2>
            </div>
            <Section className="flex flex-col gap-4">
                {articles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`}>
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader>
                                <div className="flex items-center justify-between gap-x-2 text-base">
                                    <h3 className="font-semibold leading-none">
                                        {article.title}
                                    </h3>
                                    <div className="text-sm tabular-nums text-muted-foreground">
                                        {new Intl.DateTimeFormat(locale, {month: "short", year: "numeric", timeZone: "UTC"}).format(new Date(article.date))}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="mt-2 flex flex-wrap gap-2">
                                {article.tags?.map((tag) => (
                                    <Badge
                                        variant="secondary"
                                        className="align-middle text-xs"
                                        key={tag}
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </Section>
        </main>
    );
}
