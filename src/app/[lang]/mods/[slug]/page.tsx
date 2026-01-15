import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
// Client component
import ModDetailClient from "./ModDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/config/i18n";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { WeaponTable } from '@/components/mdx/WeaponTable';

export async function generateStaticParams() {
    const params = [];
    for (const lang of locales) {
        const articles = await getAllArticles(lang, 'mods');
        for (const article of articles) {
            params.push({ lang, slug: article.slug });
        }
    }
    return params;
}

export const dynamicParams = false;

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
            <ModDetailClient
                lang={locale}
                mod={cleanArticle}
                prevArticle={cleanPrev}
                nextArticle={cleanNext}
            >
                <MDXRemote source={mod.rawContent} components={components} />
            </ModDetailClient>
        </>
    );
}
