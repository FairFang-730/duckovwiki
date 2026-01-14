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

    // Fetch latest guides for "Latest Operations" section
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allGuides = await getAllArticles(locale, 'guides');
    const latestGuides = allGuides.slice(0, 3).map(guide => ({
        slug: guide.slug,
        title: guide.title,
        date: guide.date,
        description: guide.description,
        image: guide.image
    }));

    // Pass data as props to the Client Component
    return <HomeClient dict={dict} lang={locale} latestGuides={latestGuides} />;
}
