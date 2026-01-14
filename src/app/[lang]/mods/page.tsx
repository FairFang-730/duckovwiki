import { Locale, locales, getDictionary } from "@/lib/i18n";
import ModsClient from "./ModsClient";
import { getAllArticles } from "@/lib/mdx";

import { generateStaticSEO } from "@/config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('mods', lang as Locale, '/mods');
}

export default async function ModsIndexPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);
    const mods = await getAllArticles(locale, 'mods');

    return <ModsClient lang={locale} mods={mods} dictionary={dictionary} />;
}
