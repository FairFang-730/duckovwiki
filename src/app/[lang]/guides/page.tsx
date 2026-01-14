import { Locale, locales, getDictionary } from "@/lib/i18n";
import { generateStaticSEO } from "@/config/seo";
import { getAllArticles } from "@/lib/mdx";
import GuidesClient from "./GuidesClient";

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('guides', lang as Locale, '/guides');
}

export default async function GuidesIndexPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);
    const guides = await getAllArticles(locale, 'guides');

    return <GuidesClient lang={locale} guides={guides} dictionary={dictionary} />;
}
