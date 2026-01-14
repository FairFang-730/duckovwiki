import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { Locale } from "@/lib/i18n";
import GuideDetailClient from "./GuideDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/config/i18n";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { WeaponTable } from '@/components/mdx/WeaponTable';
import { GuideTable } from '@/components/mdx/GuideTable';

export async function generateStaticParams() {
    const params = [];
    for (const lang of locales) {
        const articles = await getAllArticles(lang, 'guides');
        for (const article of articles) {
            params.push({ lang, slug: article.slug });
        }
    }
    return params;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;

    // We can fetch the frontmatter to get the dynamic title
    const article = await getArticleBySlug(slug, lang, 'guides');

    if (!article) {
        return {
            title: 'Guide Not Found',
        };
    }

    return {
        title: article.seoTitle || `${article.title} | DuckovWiki`,
        description: article.seoDescription || article.description,
        keywords: article.seoKeywords || article.tags,
        alternates: {
            canonical: `https://duckovwiki.fun/${lang}/guides/${slug}`,
            languages: {
                'en': `https://duckovwiki.fun/en/guides/${slug}`,
                'zh-Hans': `https://duckovwiki.fun/zh/guides/${slug}`,
                'x-default': `https://duckovwiki.fun/en/guides/${slug}`,
            }
        }
    };
}




export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const locale = lang as Locale;

    const article = await getArticleBySlug(slug, locale, 'guides');

    if (!article) {
        notFound();
    }

    // Get all guides to determine Prev/Next
    const allGuides = await getAllArticles(locale, 'guides');
    const currentIndex = allGuides.findIndex(g => g.slug === slug);

    // Note: The list is sorted by date desc (Newest first).
    // So "Previous" in list (index-1) is Newest/Future. "Next" in list (index+1) is Older/Past.
    // However, for "Prev/Next" navigation:
    // "Previous Post" usually means "Back to newer/left" or "Chronologically previous"?
    // Let's standard: 
    // Prev Button = Newer Post (Index - 1)
    // Next Button = Older Post (Index + 1)
    const prevArticle = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
    const nextArticle = currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

    // With 'serialize' strategy (LEGACY), article.content is a JSON object.
    // BUT we are switching to RSC strategy to fix hooks issues.
    // We use article.rawContent which we exposed in mdx.ts
    const cleanArticle = JSON.parse(JSON.stringify(article));

    // Server-side MDX Rendering
    // We must define components here to pass them to MDXRemote
    const components = {
        WeaponTable: (props: any) => <WeaponTable {...props} lang={locale} />,
        GuideTable: (props: any) => <GuideTable {...props} lang={locale} />,
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

    const cleanPrev = prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null;
    const cleanNext = nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null;

    // Construct JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': article.schemaType || 'HowTo',
        name: article.seoTitle || article.title,
        description: article.seoDescription || article.description,
        author: {
            '@type': 'Person',
            name: article.author || 'DuckovWiki Team',
        },
        datePublished: article.date,
        ...(article.schemaData || {}),
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <GuideDetailClient
                lang={locale}
                article={cleanArticle}
                prevArticle={cleanPrev}
                nextArticle={cleanNext}
            >
                <MDXRemote source={article.rawContent} components={components} />
            </GuideDetailClient>
        </>
    );
}
