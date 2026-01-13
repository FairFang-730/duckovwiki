'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Locale, Dictionary } from "@/lib/i18n";
import { BookOpen, Map, Wrench, Package, Search as SearchIcon, ArrowRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

interface SearchClientProps {
    lang: Locale;
    dict: Dictionary;
    allContent: Article[];
}

export default function SearchClient({ lang, dict, allContent }: SearchClientProps) {
    const locale = lang;
    const t = dict.Search;
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);

    // Filter results
    const results = useMemo(() => {
        if (!query.trim()) return [];

        // Helper: Remove non-alphanumeric chars for fuzzy matching (e.g. "AK-47" -> "ak47")
        const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

        // Split query into individual search terms (tokens)
        const rawTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
        const normalizedTerms = rawTerms.map(normalize);

        return allContent.filter(item => {
            const title = item.title.toLowerCase();
            const description = item.description?.toLowerCase() || '';
            const tags = item.tags?.map(t => t.toLowerCase()).join(' ') || '';

            const rawText = `${title} ${description} ${tags}`;
            const normalizedText = normalize(rawText);

            // Match Strategy:
            // 1. Check if terms exist in raw text (Standard)
            // 2. OR check if normalized terms exist in normalized text (Fuzzy for "AK47" vs "AK-47")
            return rawTerms.every((term, idx) => {
                const normTerm = normalizedTerms[idx];
                return rawText.includes(term) || (normTerm.length > 0 && normalizedText.includes(normTerm));
            });
        });
    }, [query, allContent]);

    // Update state if URL changes
    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    // get Icon based on type/category
    const getIcon = (item: Article & { contentType?: string }) => {
        switch (item.contentType) {
            case 'maps': return <Map className="w-6 h-6" strokeWidth={1.5} />;
            case 'tools': return <Wrench className="w-6 h-6" strokeWidth={1.5} />;
            case 'mods': return <Package className="w-6 h-6" strokeWidth={1.5} />;
            default: return <BookOpen className="w-6 h-6" strokeWidth={1.5} />;
        }
    };

    const getTypeLabel = (type?: string) => {
        switch (type) {
            case 'maps': return t.types.maps;
            case 'tools': return t.types.tools;
            case 'mods': return t.types.mods;
            case 'guides': return t.types.guides;
            default: return t.types.doc;
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 font-[family-name:var(--font-geist-sans)] selection:bg-yellow-500/30 selection:text-yellow-200 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-3xl font-bold text-white mb-8 tracking-tight">
                        {t.title_prefix} <span className="text-yellow-500">{t.title_highlight}</span> {t.title_suffix}
                    </h1>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-zinc-400" strokeWidth={2} />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 placeholder:italic placeholder:font-normal rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all font-mono text-sm shadow-2xl"
                                placeholder={t.placeholder}
                                autoFocus
                            />
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-8 border-b border-zinc-800 pb-4 flex justify-between items-center">
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                        {t.results_for} "{query}"
                    </span>
                    <span className="bg-zinc-900 border border-zinc-800 text-yellow-500 px-3 py-1 rounded text-xs font-mono font-bold">
                        {results.length} {t.found_badge}
                    </span>
                </div>

                {/* Grid */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/${locale}/${(item as any).contentType || 'guides'}/${item.slug}`}
                                className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/10 h-full"
                            >
                                {/* Image / Placeholder Area */}
                                <div className="relative aspect-video w-full bg-zinc-800 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <div className="absolute inset-0 bg-zinc-800/50 flex flex-col items-center justify-center gap-2">
                                            <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-yellow-500 group-hover:border-yellow-500/20 transition-all duration-300">
                                                {getIcon(item as any)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Type Badge */}
                                    <div className="absolute top-0 right-0 bg-zinc-900/90 text-zinc-400 border-l border-b border-zinc-800 px-3 py-1 rounded-bl-xl font-mono font-bold text-[10px] tracking-widest uppercase shadow-md pointer-events-none z-10">
                                        {getTypeLabel((item as any).contentType)}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {item.description}
                                    </p>

                                    {/* Footer Action */}
                                    <div className="flex items-center text-xs font-mono text-zinc-500 font-bold group-hover:text-yellow-500 transition-colors mt-auto uppercase tracking-wider">
                                        <span>{t.access_action}</span>
                                        <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
                        <SearchIcon className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-zinc-400 font-bold text-lg mb-2">{t.no_results_title}</h3>
                        <p className="text-zinc-500 text-sm max-w-md mx-auto">
                            {t.no_results_desc}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
