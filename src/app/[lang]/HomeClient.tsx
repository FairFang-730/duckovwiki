'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Locale, Dictionary } from "../../lib/i18n";
import {
    BookOpen,
    Map,
    Crosshair,
    Wrench,
    Search,
    ChevronDown,
    Image as ImageIcon
} from 'lucide-react';

interface Article {
    slug: string;
    title: string;
    date: string;
    description?: string;
    image?: string;
    type: string;
}

export default function HomeClient({ dict, lang, latestContent }: { dict: Dictionary, lang: Locale, latestContent: Article[] }) {
    const locale = lang;
    const t = dict.Home;
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('q');
        if (query) {
            router.push(`/${locale}/search?q=${encodeURIComponent(query.toString())}`);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 font-[family-name:var(--font-geist-sans)] selection:bg-yellow-500/30 selection:text-yellow-200">

            {/* LAYER 1: COMMAND CENTER (HERO) */}
            <header className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-zinc-800">
                {/* Visual: Background + Mesh */}
                <div className="absolute inset-0 z-0 bg-zinc-950">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl block max-w-4xl mx-auto leading-tight whitespace-pre-wrap">
                        {t.Hero.h1}
                    </h1>

                    <h2 className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t.Hero.h2}
                    </h2>

                    {/* Search Bar (Visual Entry Point) */}
                    <div className="max-w-2xl mx-auto mb-10 group">
                        <form onSubmit={handleSearch} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-yellow-500 transition-colors" strokeWidth={2} />
                            </div>
                            <input
                                type="text"
                                name="q"
                                autoComplete="off"
                                className="block w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 placeholder:italic placeholder:font-normal rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all font-mono text-sm shadow-2xl"
                                placeholder={t.Hero.search_placeholder}
                            />
                        </form>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Link
                            href={`/${locale}/guides`}
                            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-transform active:scale-95 shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] text-sm"
                        >
                            {t.Hero.cta_primary}
                        </Link>
                        <Link
                            href={`/${locale}/tools`}
                            className="px-8 py-3 border border-zinc-700 bg-zinc-900/50 text-zinc-100 hover:bg-zinc-800 hover:border-zinc-500 font-medium rounded-lg transition-all backdrop-blur-sm text-sm"
                        >
                            {t.Hero.cta_secondary}
                        </Link>
                    </div>

                    <div>
                        <a
                            href="https://store.steampowered.com/app/3167020/Escape_From_Duckov/"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-2 px-6 py-2 bg-[#171a21] hover:bg-[#2a475e] text-[#c7d5e0] font-bold rounded-lg transition-all border border-white/10 hover:border-[#66c0f4] hover:shadow-[0_0_15px_rgba(102,192,244,0.3)] text-sm"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M11.979 0C5.666 0 .548 5.135.548 11.472c0 2.923 1.096 5.6 2.912 7.64l.056.059 4.314-1.78a2.951 2.951 0 01-.06-.554c0-1.637 1.328-2.964 2.965-2.964s2.964 1.327 2.964 2.964c0 1.638-1.328 2.965-2.964 2.965a2.95 2.95 0 01-1.666-.516l-3.266 4.093a11.408 11.408 0 006.176 1.849c6.314 0 11.432-5.135 11.432-11.472S18.293 0 11.979 0zM7.34 16.03c.89 0 1.611.724 1.611 1.617 0 .894-.721 1.618-1.611 1.618-.89 0-1.612-.724-1.612-1.618 0-.893.722-1.617 1.612-1.617zm.582 1.487c-.672.483-1.604.321-2.085-.353-.48-.675-.32-1.61.352-2.094.672-.483 1.603-.321 2.084.354.481.674.321 1.61-.351 2.093z" />
                            </svg>
                            <span>{t.Hero.play_steam_btn}</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* LAYER 2: TRUST BAR */}
            <div className="w-full border-y border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="w-fit mx-auto sm:w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-6 text-xs font-mono tracking-wide text-zinc-400">

                        {/* Status (Green) */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span>{t.TrustBar.status} <span className="text-white font-bold">{t.TrustBar.status_val}</span></span>
                        </div>

                        {/* Patch (Blue) */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                            </span>
                            <span>{t.TrustBar.patch_label} <span className="text-white font-bold">{t.TrustBar.patch_val}</span></span>
                        </div>

                        {/* Database (Yellow) */}
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                            </span>
                            <span>{t.TrustBar.wipe_label} <span className="text-white font-bold">{t.TrustBar.wipe_val}</span></span>
                        </div>

                    </div>
                </div>
            </div>

            {/* LAYER 3: SILO GRID */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Guides */}
                    <Link href={`/${locale}/guides`} className="group bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 rounded-xl p-6 transition-all hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                            <BookOpen className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{t.SiloGrid.card1_title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{t.SiloGrid.card1_sub}</p>
                    </Link>

                    {/* Card 2: Maps */}
                    <Link href={`/${locale}/maps`} className="group bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 rounded-xl p-6 transition-all hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                            <Map className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{t.SiloGrid.card2_title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{t.SiloGrid.card2_sub}</p>
                    </Link>

                    {/* Card 3: Weapons */}
                    <Link href={`/${locale}/tools`} className="group bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 rounded-xl p-6 transition-all hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                            <Crosshair className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{t.SiloGrid.card3_title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{t.SiloGrid.card3_sub}</p>
                    </Link>

                    {/* Card 4: Hideout */}
                    <Link href={`/${locale}/mods`} className="group bg-zinc-900 border border-zinc-800 hover:border-yellow-500/50 rounded-xl p-6 transition-all hover:bg-zinc-800/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                            <Wrench className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{t.SiloGrid.card4_title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{t.SiloGrid.card4_sub}</p>
                    </Link>
                </div>
            </section>

            {/* LAYER 4: QUICK INTEL */}
            <section className="mb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Tip */}
                    <div className="bg-zinc-900 rounded-xl p-8 border-l-4 border-yellow-500 shadow-lg group relative overflow-hidden">
                        {/* Flag Badge */}
                        <div className="absolute top-0 right-0 bg-yellow-500 text-black px-4 py-1 rounded-bl-xl font-mono font-bold text-[10px] tracking-widest uppercase shadow-md pointer-events-none">
                            {t.QuickIntel.tip_badge}
                        </div>

                        <h4 className="text-yellow-500 font-bold mb-5 uppercase tracking-wider text-sm flex items-center gap-2 border-b border-zinc-800 pb-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            {t.QuickIntel.tip_title}
                        </h4>
                        <p className="text-zinc-200 text-sm leading-relaxed font-medium mb-8">
                            {t.QuickIntel.tip_content}
                        </p>
                        <div className="text-right text-zinc-500 font-mono text-xs italic">
                            {t.QuickIntel.tip_author}
                        </div>
                    </div>

                    {/* Meta Ranking */}
                    <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 border-l-4 border-l-zinc-600 shadow-lg group relative overflow-hidden">
                        {/* Flag Badge */}
                        <div className="absolute top-0 right-0 bg-zinc-600 text-white px-4 py-1 rounded-bl-xl font-mono font-bold text-[10px] tracking-widest uppercase shadow-md pointer-events-none">
                            {t.QuickIntel.meta_badge}
                        </div>

                        <h4 className="text-zinc-400 font-bold mb-5 uppercase tracking-wider text-sm border-b border-zinc-800 pb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-zinc-500 animate-pulse"></span>
                            {t.QuickIntel.meta_title}
                        </h4>
                        <ul className="space-y-4">
                            {(t.QuickIntel.meta_list as string[]).map((item, idx) => ( // Cast to array as per JSON structure
                                <li key={idx} className="flex items-center group">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 text-sm font-bold flex items-center justify-center mr-4 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                        {idx + 1}
                                    </span>
                                    <span className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* LAYER 5: LATEST OPERATIONS (DYNAMIC) */}
            <section className="mb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-tight">{t.LatestOps.title}</h2>
                    <div className="h-px bg-zinc-800 flex-grow ml-6"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {latestContent.length > 0 ? (
                        latestContent.map((item, idx) => (
                            <Link href={`/${locale}/${item.type}/${item.slug}`} key={idx} className="group cursor-pointer block">
                                <article className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all hover:shadow-2xl">
                                    <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                                <ImageIcon className="w-10 h-10 text-zinc-700" strokeWidth={1} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500 font-mono">
                                            {/* @ts-ignore */}
                                            <span className="bg-zinc-800 px-2 py-1 rounded capitalize">{dict.Search.types[item.type] || item.type}</span>
                                            <time dateTime={item.date} className="text-zinc-600">{new Date(item.date).toLocaleDateString()}</time>
                                        </div>
                                        <h3 className="text-white font-bold text-lg leading-snug group-hover:text-yellow-500 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                </article>
                            </Link>
                        ))
                    ) : (
                        // Fallback if no guides
                        <div className="col-span-3 text-zinc-500 text-center py-12 italic border border-dashed border-zinc-800 rounded-xl">
                            No operations found.
                        </div>
                    )}
                </div>
            </section>

            {/* LAYER 6: FAQ */}
            <section className="mb-16 max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white text-center mb-10">{t.FAQ.title}</h2>
                <div className="space-y-4">
                    {[
                        { q: t.FAQ.q1, a: t.FAQ.a1 },
                        { q: t.FAQ.q2, a: t.FAQ.a2 },
                        { q: t.FAQ.q3, a: t.FAQ.a3 },
                        { q: t.FAQ.q4, a: t.FAQ.a4 },
                        { q: t.FAQ.q5, a: t.FAQ.a5 },
                    ].map((item, i) => (
                        <details key={i} className="group bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <summary className="flex justify-between items-center p-6 cursor-pointer list-none text-zinc-200 font-bold text-lg hover:text-yellow-500 transition-colors">
                                <span>{item.q}</span>
                                <span className="transition-transform group-open:rotate-180 text-zinc-500 group-hover:text-yellow-500">
                                    <ChevronDown className="w-5 h-5" />
                                </span>
                            </summary>
                            <div className="text-zinc-400 px-6 pb-6 leading-relaxed text-base border-t border-zinc-800/50 pt-4 mt-2 break-all">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </section>

            {/* LAYER 7: MISSION BRIEFING (SEO) */}
            <section className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 font-mono text-sm text-zinc-500 leading-relaxed space-y-8">
                    <p className="font-bold tracking-widest border-b border-zinc-800 pb-2 inline-block text-zinc-400">
                        {t.MissionBriefing.header}
                    </p>
                    <p>{t.MissionBriefing.p1}</p>
                    <p>{t.MissionBriefing.p2}</p>
                    <p>{t.MissionBriefing.p3}</p>
                    <p className="text-yellow-500/50 pt-8 animate-pulse">
                        {'>'} {t.MissionBriefing.footer}<span className="inline-block w-2.5 h-4 bg-yellow-500/50 ml-1 align-middle"></span>
                    </p>
                </div>
            </section>

        </div>
    );
}
