import { Metadata } from 'next';
import HomePage from './[lang]/page';

// Force static for the root page to ensure compatibility with output: 'export'
// This creates a physical index.html at the root.
export const dynamic = 'force-static';

// SEO Configuration:
// 1. Canonical: Points to /en to consolidate ranking signals (prevent duplicate content)
// 2. Hreflang: Helps Google distinguish regional/language versions
// 3. x-default: Tells Google that the root URL is the default entry point (or points to default content)
export const metadata: Metadata = {
    title: 'Escape from Duckov Wiki',
    alternates: {
        canonical: 'https://duckovwiki.fun/en',
        languages: {
            'en': 'https://duckovwiki.fun/en',
            'zh': 'https://duckovwiki.fun/zh',
            'x-default': 'https://duckovwiki.fun',
        },
    },
};

export default function RootPage() {
    // Mirror Strategy:
    // Directly render the English homepage component.
    // We pass a resolved Promise for params to match Next.js 15+ Async Server Component pattern.
    return <HomePage params={Promise.resolve({ lang: 'en' })} />;
}
