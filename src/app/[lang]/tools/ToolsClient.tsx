'use client';

import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { Breadcrumb } from "@/components/ui/Breadcrumbs";
import { Terminal, ArrowRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ToolsClient({ lang, tools, dictionary }: { lang: Locale, tools: Article[], dictionary: any }) {
    const locale = lang;

    // Group tools by subcategory
    const groupedTools = tools.reduce((acc: Record<string, Article[]>, tool) => {
        const key = tool.subcategory || 'Tactical Utilities';
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(tool);
        return acc;
    }, {} as Record<string, Article[]>);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 pl-0">
                <Breadcrumb
                    items={[
                        { label: 'HOME', href: `/${locale}` },
                        { label: 'TOOLS', href: `/${locale}/tools` }
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        Combat <span className="text-yellow-500">Tools</span>
                    </h1>
                    <p className="text-neutral-400 max-w-2xl font-mono text-sm leading-relaxed border-l-2 border-yellow-500 pl-4">
                        {`// EXECUTABLE_ACCESS_GRANTED`} <br />
                        Calculators, ballistics charts, and external assistance programs.
                    </p>
                </header>

                <div className="space-y-16">
                    {Object.entries(groupedTools).map(([category, categoryTools]) => (
                        <section key={category}>
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                                    {dictionary.categories?.[category] || category}
                                </h2>
                                <div className="h-px bg-white/10 flex-1" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryTools.map((tool) => {
                                    return (
                                        <Link
                                            key={tool.slug}
                                            href={`/${locale}/tools/${tool.slug}`}
                                            className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/10 h-full"
                                        >
                                            {/* Image / Placeholder Area */}
                                            <div className="relative aspect-video w-full bg-zinc-800 border-b border-zinc-800 flex items-center justify-center overflow-hidden">
                                                {tool.image ? (
                                                    <img src={tool.image} alt={tool.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2">
                                                        <div className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-yellow-500 group-hover:border-yellow-500/20 transition-all duration-300">
                                                            <Terminal className="w-6 h-6" strokeWidth={1.5} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-6 flex flex-col flex-1">
                                                {/* Date & Read Time */}
                                                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2 tracking-wider">
                                                    <span>{new Date(tool.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                    {tool.readTime && (
                                                        <span className="text-zinc-400">{tool.readTime}</span>
                                                    )}
                                                </div>

                                                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                                                    {tool.title}
                                                </h3>
                                                <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                                    {tool.description}
                                                </p>

                                                {/* Tags */}
                                                {tool.tags && tool.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {tool.tags.slice(0, 3).map((tag) => (
                                                            <span key={tag} className="text-[10px] font-mono uppercase bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 px-2 py-1 rounded flex items-center">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Footer Action */}
                                                <div className="flex items-center text-xs font-mono text-zinc-500 font-bold group-hover:text-yellow-500 transition-colors mt-auto uppercase tracking-wider">
                                                    <span>View Tool</span>
                                                    <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
