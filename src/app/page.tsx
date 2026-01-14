import HomePage, { generateMetadata as generateHomeMetadata } from './[lang]/page';
import { Metadata } from 'next';

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

// 2. Render English Homepage Content Directly
export default function RootPage() {
    return <HomePage params={Promise.resolve({ lang: 'en' })} />;
}
