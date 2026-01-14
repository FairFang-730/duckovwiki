import { getDictionary, Locale } from "../../../lib/i18n";
import AboutClient from "./AboutClient";
import { generateStaticSEO } from "../../../config/seo";

export const dynamicParams = false;


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('about', lang as Locale, '/about');
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return <AboutClient lang={locale} dict={dict} />;
}
