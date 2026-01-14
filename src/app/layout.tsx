import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Force Edge Runtime for Cloudflare Pages compatibility
export const runtime = 'edge';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DuckovWiki | The Ultimate Escape From Duckov Database & Guide",
    description: "Community wiki for Escape From Duckov. Interactive maps, ammo charts, weapon builds, and quest guides. Updated for Patch v1.2.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-200 flex flex-col min-h-screen relative overflow-x-hidden`}
            >
                {/* Global Visual Overlays */}
                <div className="bg-noise" />
                <div className="vignette" />

                {children}
            </body>
        </html>
    );
}
