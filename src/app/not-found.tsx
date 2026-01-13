import { Metadata } from 'next';
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: '404 - Not Found | DuckovWiki',
    description: 'System Failure. Page not found.',
};

export default async function NotFound() {
    // Default to English for global 404
    const dict = await getDictionary('en');

    return (
        <>
            <Navbar dict={dict} lang="en" />

            <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-20 min-h-[60vh]">
                <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                    <div className="inline-block mb-6 px-3 py-1 bg-red-900/20 border border-red-500/30 rounded text-red-500 text-xs font-mono tracking-widest animate-pulse">
                        SYSTEM_FAILURE // ERROR_CODE_404
                    </div>

                    <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 drop-shadow-sm mb-2 tracking-tighter">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-3xl text-amber-500 font-bold mb-6 tracking-tight uppercase">
                        Page Not Found
                    </h2>

                    <p className="text-zinc-400 text-lg mb-10 leading-relaxed text-center mx-auto max-w-lg">
                        The requested resource could not be located in the tactical database.
                    </p>

                    <div className="flex justify-center flex-col gap-4">
                        <Link
                            href="/en"
                            className="px-8 py-4 bg-zinc-900 text-zinc-300 font-bold border border-zinc-700 hover:border-amber-500 hover:text-amber-500 transition-all duration-300 backdrop-blur-sm"
                        >
                            &lt; Return to Base /&gt;
                        </Link>
                    </div>
                </div>
            </main>

            <Footer dict={dict} lang="en" />
        </>
    );
}
