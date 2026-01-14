import { getDictionary, Locale } from "../../../lib/i18n";
import PrivacyClient from "./PrivacyClient";

export const dynamicParams = false;

import { generateStaticSEO } from "../../../config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('privacy', lang as Locale, '/privacy');
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return <PrivacyClient lang={locale} dict={dict} />;
}
