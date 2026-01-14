import HomePage, { generateMetadata as generateHomeMetadata } from './[lang]/page';
import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// 1. Metadata Generation with Canonical & Hreflang
export async function generateMetadata(): Promise<Metadata> {
    // Reuse existing English metadata generation
    const baseMetadata = await generateHomeMetadata({ params: Promise.resolve({ lang: 'en' }) });

    return {
        ...baseMetadata,
        alternates: {
            canonical: 'https://duckovwiki.fun/en',
            languages: {
                'en': 'https://duckovwiki.fun/en',
                'zh-Hans': 'https://duckovwiki.fun/zh', // zh-Hans is standard for Simplified Chinese
                'x-default': 'https://duckovwiki.fun/',
            },
        },
    };
}

// 2. Render English Homepage Content Directly with Layout
export default async function RootPage() {
    const dict = await getDictionary('en');

    return (
        <>
            <Navbar dict={dict} lang="en" />
            <main className="flex-grow z-10 relative">
                <HomePage params={Promise.resolve({ lang: 'en' })} />
            </main>
            <Footer dict={dict} lang="en" />
        </>
    );
}
