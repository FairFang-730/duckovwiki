import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
// Client component
import ToolDetailClient from "@/app/[lang]/tools/[slug]/ToolDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    const { slug, lang } = await params;
    const tool = await getArticleBySlug(slug, lang, 'tools');

    if (!tool) {
        return { title: 'Tool Not Found' };
    }

    return {
        title: tool.seoTitle || `${tool.title} Download | DuckovWiki`,
        description: tool.seoDescription || tool.description,
        keywords: tool.seoKeywords || tool.tags,
    };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    const { slug, lang } = await params;
    const locale = lang as Locale;
    const tool = await getArticleBySlug(slug, locale, 'tools');

    if (!tool) {
        notFound();
    }

    // Get all tools to determine Prev/Next
    const allTools = await getAllArticles(locale, 'tools');
    const currentIndex = allTools.findIndex(m => m.slug === slug);

    const prevArticle = currentIndex > 0 ? allTools[currentIndex - 1] : null;
    const nextArticle = currentIndex < allTools.length - 1 ? allTools[currentIndex + 1] : null;

    const cleanArticle = JSON.parse(JSON.stringify(tool));
    const cleanPrev = prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null;
    const cleanNext = nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null;

    // Construct JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': tool.schemaType || 'HowTo',
        name: tool.seoTitle || tool.title,
        description: tool.seoDescription || tool.description,
        operatingSystem: 'Windows',
        applicationCategory: 'GameApplication',
        ...(tool.schemaData || {}),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <ToolDetailClient lang={locale} tool={cleanArticle} prevArticle={cleanPrev} nextArticle={cleanNext} />
        </>
    );
}
