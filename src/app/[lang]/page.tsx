import { notFound } from "next/navigation";
import { getDictionary, Locale, locales } from "../../lib/i18n";
import { generateStaticSEO } from "../../config/seo";
import { getAllArticles } from "../../lib/mdx";
import HomeClient from "./HomeClient";

// 1. Server Component: Metadata Generation
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    // Validate locale
    if (!locales.includes(lang as Locale)) {
        return {};
    }
    return generateStaticSEO('home', lang as Locale, '/');
}

// 2. Server Component: Data Fetching & Rendering Client Component
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    // Validate locale: If invalid, fallback to 404
    if (!locales.includes(lang as Locale)) {
        notFound();
    }

    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    // Fetch latest content for "Latest Operations" section
    const [guides, maps, mods, tools] = await Promise.all([
        getAllArticles(locale, 'guides'),
        getAllArticles(locale, 'maps'),
        getAllArticles(locale, 'mods'),
        getAllArticles(locale, 'tools')
    ]);

    const allContent = [
        ...guides.map(item => ({ ...item, type: 'guides' })),
        ...maps.map(item => ({ ...item, type: 'maps' })),
        ...mods.map(item => ({ ...item, type: 'mods' })),
        ...tools.map(item => ({ ...item, type: 'tools' }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const latestContent = allContent.slice(0, 3).map(item => ({
        slug: item.slug,
        title: item.title,
        date: item.date,
        description: item.description,
        image: item.image,
        type: item.type
    }));

    // Pass data as props to the Client Component
    return <HomeClient dict={dict} lang={locale} latestContent={latestContent} />;
}
