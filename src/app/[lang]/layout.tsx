import { getDictionary, Locale } from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const runtime = 'edge';

// Metadata is now inherited from Root Layout, but can be overridden per lang if needed (seo.ts handles that in page.tsx)

export default async function LangLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    return (
        <>
            <Navbar dict={dict} lang={locale} />
            <main className="flex-grow z-10 relative">
                {children}
            </main>
            <Footer dict={dict} lang={locale} />
        </>
    );
}
