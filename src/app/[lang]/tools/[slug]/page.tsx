import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
// Client component
import ToolDetailClient from "@/app/[lang]/tools/[slug]/ToolDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/config/i18n";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { WeaponTable } from '@/components/mdx/WeaponTable';

export async function generateStaticParams() {
    const params = [];
    for (const lang of locales) {
        const articles = await getAllArticles(lang, 'tools');
        for (const article of articles) {
            params.push({ lang, slug: article.slug });
        }
    }
    return params;
}

export const dynamicParams = false;

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
        alternates: {
            canonical: `https://duckovwiki.fun/${lang}/tools/${slug}`,
            languages: {
                'en': `https://duckovwiki.fun/en/tools/${slug}`,
                'zh-Hans': `https://duckovwiki.fun/zh/tools/${slug}`,
                'x-default': `https://duckovwiki.fun/en/tools/${slug}`,
            }
        }
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
            <ToolDetailClient
                lang={locale}
                tool={cleanArticle}
                prevArticle={cleanPrev}
                nextArticle={cleanNext}
            >
                <MDXRemote
                    source={tool.rawContent}
                    components={components}
                    options={{ parseFrontmatter: true }}
                />
            </ToolDetailClient>
        </>
    );
}
