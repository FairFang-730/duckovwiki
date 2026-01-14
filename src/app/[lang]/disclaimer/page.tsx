import { getDictionary, Locale } from "../../../lib/i18n";
import DisclaimerClient from "./DisclaimerClient";

export const dynamicParams = false;

import { generateStaticSEO } from "../../../config/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    return generateStaticSEO('disclaimer', lang as Locale, '/disclaimer');
}

export default async function DisclaimerPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return <DisclaimerClient lang={locale} dict={dict} />;
}
