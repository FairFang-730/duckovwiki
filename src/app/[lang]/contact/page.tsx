import { getDictionary, Locale } from "../../../lib/i18n";
import ContactClient from "./ContactClient";

export const dynamicParams = false;

import { generateStaticSEO } from "../../../config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('contact', lang as Locale, '/contact');
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return <ContactClient lang={locale} dict={dict} />;
}
