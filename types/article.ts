export interface Article {
    id: string;
    tags: string[];
    title: string;
    date: string;
}

export interface ArticleProps {
    html: string;
}

export interface ArticleTagProps {
    tag: string;
}

export interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}
