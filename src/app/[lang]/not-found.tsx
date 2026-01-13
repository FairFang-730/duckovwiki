"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Isolated translations to avoid bundling large JSON files
const translations = {
    en: {
        h1: "404",
        h2: "MIA - Missing In Action",
        text: "The intelligence you are looking for has been redacted or does not exist. Return to base before you attract attention.",
        button: "Return to Home"
    },
    zh: {
        h1: "404",
        h2: "MIA - 行动中失踪",
        text: "您寻找的情报已被编入黑箱或根本不存在。在引起注意之前立即返回基地。",
        button: "返回基地"
    }
};

export default function NotFound() {
    const pathname = usePathname();
    // Derive state directly from props/context during render
    // This avoids hydration mismatch flickering and useState overhead
    const isZh = pathname?.startsWith("/zh") ?? false;

    useEffect(() => {
        // Update document title dynamically
        document.title = isZh
            ? "404 - 页面未找到 | DuckovWiki"
            : "404 - Page Not Found | DuckovWiki";
    }, [isZh]);

    // Select dictionary based on language
    const t = isZh ? translations.zh : translations.en;

    return (
        <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-20 min-h-[60vh]">
            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                <div className="inline-block mb-6 px-3 py-1 bg-red-900/20 border border-red-500/30 rounded text-red-500 text-xs font-mono tracking-widest animate-pulse">
                    SYSTEM_FAILURE // ERROR_CODE_404
                </div>

                <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 drop-shadow-sm mb-2 tracking-tighter">
                    {t.h1}
                </h1>

                <h2 className="text-2xl md:text-3xl text-amber-500 font-bold mb-6 tracking-tight uppercase">
                    {t.h2}
                </h2>

                <p className="text-zinc-400 text-lg mb-10 leading-relaxed text-center mx-auto max-w-lg">
                    {t.text}
                </p>

                <div className="flex justify-center flex-col gap-4">
                    <Link
                        href={isZh ? "/zh" : "/en"}
                        className="px-8 py-4 bg-zinc-900 text-zinc-300 font-bold border border-zinc-700 hover:border-amber-500 hover:text-amber-500 transition-all duration-300 backdrop-blur-sm"
                    >
                        &lt; {t.button} /&gt;
                    </Link>
                </div>
            </div>
        </main>
    );
}
