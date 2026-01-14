import { Locale, getDictionary } from "@/lib/i18n";
import { generateStaticSEO } from "@/config/seo";
import { getAllArticles } from "@/lib/mdx";
import SearchClient from "./SearchClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    // We can reuse a generic SEO or specific search SEO
    return {
        title: `Search Database | DuckovWiki`,
        description: 'Search the Tactical Database for guides, maps, tools, and mods.',
    }
}

import { Suspense } from "react";

// ... existing imports ...

// ... generateMetadata ...

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    // Fetch all content types in parallel
    const [guides, maps, mods, tools] = await Promise.all([
        getAllArticles(locale, 'guides'),
        getAllArticles(locale, 'maps'),
        getAllArticles(locale, 'mods'),
        getAllArticles(locale, 'tools')
    ]);

    // Tag them with type
    const allContent = [
        ...guides.map(item => ({ ...item, contentType: 'guides' })),
        ...maps.map(item => ({ ...item, contentType: 'maps' })),
        ...mods.map(item => ({ ...item, contentType: 'mods' })),
        ...tools.map(item => ({ ...item, contentType: 'tools' })),
    ];

    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950 pt-24 text-center text-zinc-500">Loading Search...</div>}>
            <SearchClient lang={locale} dict={dict} allContent={allContent} />
        </Suspense>
    );
}
