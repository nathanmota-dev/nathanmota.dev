import { getArticles } from "@/utils/articles";
import moment from "moment";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/cards/card/card";
import { Badge } from "@/components/badge/badge";
import { Section } from "@/components/section/section";

export default function Articles() {
    const articles = getArticles();

    return (
        <main className="max-w-3xl mx-auto py-2 px-4 sm:px-0">
            <div className="py-4 flex justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] pb-6">
                    Articles
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
                                        {moment(article.date).format("MMM YYYY")}
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
