import { Metadata } from 'next';
import HomePage, { generateMetadata as generateHomeMetadata } from './[lang]/page';
import LangLayout from './[lang]/layout';

// Force static for the root page to ensure compatibility with output: 'export'
export const dynamic = 'force-static';

// SEO Configuration
// Reuse the English metadata generation logic to ensure TDK consistency.
export async function generateMetadata(): Promise<Metadata> {
    // 1. Get base metadata from the actual Home Page component (for English)
    const baseMetadata = await generateHomeMetadata({ params: Promise.resolve({ lang: 'en' }) });

    // 2. Override specific fields for the Root URL structure
    return {
        ...baseMetadata,
        alternates: {
            canonical: 'https://duckovwiki.fun/en',
            languages: {
                'en': 'https://duckovwiki.fun/en',
                'zh-Hans': 'https://duckovwiki.fun/zh',
                'x-default': 'https://duckovwiki.fun/en',
            },
        },
    };
}

export default function RootPage() {
    // Shared params for both Layout and Page to ensure consistency (lang='en')
    const paramsPromise = Promise.resolve({ lang: 'en' });

    return (
        <LangLayout params={paramsPromise}>
            <HomePage params={paramsPromise} />
        </LangLayout>
    );
}
