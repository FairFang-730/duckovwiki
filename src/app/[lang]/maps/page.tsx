import { Locale, locales, getDictionary } from "@/lib/i18n";
import MapsClient from "./MapsClient";
import { getAllArticles } from "@/lib/mdx";

import { generateStaticSEO } from "@/config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('maps', lang as Locale);
}

export default async function MapsIndexPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);
    const maps = await getAllArticles(locale, 'maps');

    return <MapsClient lang={locale} maps={maps} dictionary={dictionary} />;
}
