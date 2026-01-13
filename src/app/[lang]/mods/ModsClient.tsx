'use client';

import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { Breadcrumb } from "@/components/ui/Breadcrumbs";
import { Package, ArrowRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModsClient({ lang, mods, dictionary }: { lang: Locale, mods: Article[], dictionary: any }) {
    const locale = lang;

    // Group mods by subcategory
    const groupedMods = mods.reduce((acc: Record<string, Article[]>, mod) => {
        const key = mod.subcategory || 'Classified Mods';
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(mod);
        return acc;
    }, {} as Record<string, Article[]>);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 pl-0">
                <Breadcrumb
                    items={[
                        { label: 'HOME', href: `/${locale}` },
                        { label: 'MODS', href: `/${locale}/mods` }
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        Modification <span className="text-yellow-500">Database</span>
                    </h1>
                    <p className="text-neutral-400 max-w-2xl font-mono text-sm leading-relaxed border-l-2 border-yellow-500 pl-4">
                        {`// THIRD_PARTY_SOFTWARE_DETECTED`} <br />
                        Enhancement packages, UI modifications, and performance tweaks.
                    </p>
                </header>

                <div className="space-y-16">
                    {Object.entries(groupedMods).map(([category, categoryMods]) => (
                        <section key={category}>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                                    {dictionary.categories?.[category] || category}
                                </h2>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryMods.map((mod) => (
                                    <Link
                                        key={mod.slug}
                                        href={`/${locale}/mods/${mod.slug}`}
                                        className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/10 h-full"
                                    >
                                        {/* Image / Placeholder Area */}
                                        <div className="relative aspect-video w-full bg-zinc-800 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
                                            {mod.image ? (
                                                <img src={mod.image} alt={mod.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <div className="absolute inset-0 bg-zinc-800/50 flex flex-col items-center justify-center gap-2">
                                                    <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-yellow-500 group-hover:border-yellow-500/20 transition-all duration-300">
                                                        <Package className="w-6 h-6" strokeWidth={1.5} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-6 flex flex-col flex-1">
                                            {/* Date & Read Time */}
                                            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2 tracking-wider">
                                                <span>{new Date(mod.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                {mod.readTime && (
                                                    <span className="text-zinc-400">{mod.readTime}</span>
                                                )}
                                            </div>

                                            <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                                                {mod.title}
                                            </h3>
                                            <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {mod.description}
                                            </p>

                                            {/* Tags */}
                                            {mod.tags && mod.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {mod.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="text-[10px] font-mono uppercase bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 px-2 py-1 rounded flex items-center">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Footer Action */}
                                            <div className="flex items-center text-xs font-mono text-zinc-500 font-bold group-hover:text-yellow-500 transition-colors mt-auto uppercase tracking-wider">
                                                <span>View Mod</span>
                                                <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
