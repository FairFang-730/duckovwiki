import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
// Client component
import MapDetailClient from "./MapDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/config/i18n";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { WeaponTable } from '@/components/mdx/WeaponTable';

export async function generateStaticParams() {
    const params = [];
    for (const lang of locales) {
        const articles = await getAllArticles(lang, 'maps');
        for (const article of articles) {
            params.push({ lang, slug: article.slug });
        }
    }
    return params;
}

export const dynamicParams = false;

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

    // Server-side MDX Rendering
    // We must define components here to pass them to MDXRemote
    const components = {
        WeaponTable: (props: any) => <WeaponTable {...props} lang={locale} />,
        h2: (props: any) => <h2 {...props} className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2 after:content-[''] after:h-px after:flex-1 after:bg-white/10" />,
        h3: (props: any) => <h3 {...props} className="text-lg font-bold text-white mt-6 mb-3" />,
        img: (props: any) => (
            <img
                {...props}
                className="rounded-xl border border-white/5 shadow-2xl my-8 w-full"
                loading="lazy"
            />
        ),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <MapDetailClient
                lang={locale}
                map={cleanArticle}
                prevArticle={cleanPrev}
                nextArticle={cleanNext}
            >
                <MDXRemote source={map.rawContent} components={components} />
            </MapDetailClient>
        </>
    );
}
