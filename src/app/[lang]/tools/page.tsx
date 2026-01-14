import { Locale, locales, getDictionary } from "@/lib/i18n";
import ToolsClient from "./ToolsClient";
import { getAllArticles } from "@/lib/mdx";

export const dynamicParams = false;


import { generateStaticSEO } from "@/config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('tools', lang as Locale, '/tools');
}

export default async function ToolsIndexPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dictionary = await getDictionary(locale);
    const tools = await getAllArticles(locale, 'tools');

    return <ToolsClient lang={locale} tools={tools} dictionary={dictionary} />;
}
