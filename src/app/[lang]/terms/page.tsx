import { getDictionary, Locale } from "../../../lib/i18n";
import TermsClient from "./TermsClient";

export const dynamicParams = false;


import { generateStaticSEO } from "../../../config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('terms', lang as Locale, '/terms');
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return <TermsClient lang={locale} dict={dict} />;
}
