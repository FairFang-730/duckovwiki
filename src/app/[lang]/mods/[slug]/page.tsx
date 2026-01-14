import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
import ModDetailClient from "./ModDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }) {
    const { slug, lang } = await params;
    const mod = await getArticleBySlug(slug, lang, 'mods');

    if (!mod) {
        return { title: 'Mod Not Found' };
    }

    return {
        title: mod.seoTitle || `${mod.title} Download | DuckovWiki`,
        description: mod.seoDescription || mod.description,
        keywords: mod.seoKeywords || mod.tags,
        alternates: {
            canonical: `https://duckovwiki.fun/${lang}/mods/${slug}`,
            languages: {
                'en': `https://duckovwiki.fun/en/mods/${slug}`,
                'zh-Hans': `https://duckovwiki.fun/zh/mods/${slug}`,
                'x-default': `https://duckovwiki.fun/en/mods/${slug}`,
            }
        }
    };
}

export default async function ModDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    const { slug, lang } = await params;
    const locale = lang as Locale;
    const mod = await getArticleBySlug(slug, locale, 'mods');

    if (!mod) {
        notFound();
    }

    // Get all mods to determine Prev/Next
    const allMods = await getAllArticles(locale, 'mods');
    const currentIndex = allMods.findIndex(m => m.slug === slug);

    const prevArticle = currentIndex > 0 ? allMods[currentIndex - 1] : null;
    const nextArticle = currentIndex < allMods.length - 1 ? allMods[currentIndex + 1] : null;

    const cleanArticle = JSON.parse(JSON.stringify(mod));
    const cleanPrev = prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null;
    const cleanNext = nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null;

    // Construct JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': mod.schemaType || 'HowTo',
        name: mod.seoTitle || mod.title,
        description: mod.seoDescription || mod.description,
        author: mod.author,
        datePublished: mod.date,
        ...(mod.schemaData || {}),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <ModDetailClient lang={locale} mod={cleanArticle} prevArticle={cleanPrev} nextArticle={cleanNext} />
        </>
    );
}
