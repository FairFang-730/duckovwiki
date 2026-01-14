import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
import MapDetailClient from "./MapDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    const { slug, lang } = await params;
    const map = await getArticleBySlug(slug, lang, 'maps');

    if (!map) {
        return { title: 'Map Not Found' };
    }

    return {
        title: map.seoTitle || `${map.title} Map | Extractions & Loot`,
        description: map.seoDescription || `Detailed map of ${map.title} with all extracts, boss locations, and loot spawns.`,
        keywords: map.seoKeywords || map.tags,
        alternates: {
            canonical: `https://duckovwiki.fun/${lang}/maps/${slug}`,
            languages: {
                'en': `https://duckovwiki.fun/en/maps/${slug}`,
                'zh-Hans': `https://duckovwiki.fun/zh/maps/${slug}`,
                'x-default': `https://duckovwiki.fun/en/maps/${slug}`,
            }
        }
    };
}


export default async function MapDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    const { slug, lang } = await params;
    const locale = lang as Locale;
    const map = await getArticleBySlug(slug, locale, 'maps');

    if (!map) {
        notFound();
    }

    // Get all maps to determine Prev/Next
    const allMaps = await getAllArticles(locale, 'maps');
    const currentIndex = allMaps.findIndex(m => m.slug === slug);

    const prevArticle = currentIndex > 0 ? allMaps[currentIndex - 1] : null;
    const nextArticle = currentIndex < allMaps.length - 1 ? allMaps[currentIndex + 1] : null;

    const cleanArticle = JSON.parse(JSON.stringify(map));
    const cleanPrev = prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null;
    const cleanNext = nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null;

    // Construct JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': map.schemaType || 'HowTo',
        name: map.seoTitle || map.title,
        description: map.seoDescription || map.description,
        ...(map.schemaData || {}),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <MapDetailClient lang={locale} map={cleanArticle} prevArticle={cleanPrev} nextArticle={cleanNext} />
        </>
    );
}
