'use client';

import { Breadcrumb } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { MDXRemote } from 'next-mdx-remote';
import { WeaponTable } from '@/components/mdx/WeaponTable';
import { TableOfContents } from "@/components/mdx/TableOfContents";

interface ModDetailClientProps {
    lang: Locale;
    mod: Article;
    prevArticle?: { title: string; slug: string } | null;
    nextArticle?: { title: string; slug: string } | null;
}

const components = {
    WeaponTable: (props: any) => <WeaponTable {...props} />,
};

export default function ModDetailClient({ mod, lang, prevArticle, nextArticle }: ModDetailClientProps) {
    const locale = lang;

    const hydratedComponents = {
        ...components,
        WeaponTable: (props: any) => <WeaponTable {...props} lang={locale} />,
        h2: (props: any) => <h2 {...props} className="text-xl font-bold text-white mt-8 mb-4" />,
        h3: (props: any) => <h3 {...props} className="text-lg font-bold text-white mt-6 mb-3" />,
    };

    return (
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="mb-8 pl-0">
                <Breadcrumb
                    items={[
                        { label: 'HOME', href: `/${locale}` },
                        { label: 'MODS', href: `/${locale}/mods` },
                        { label: mod.title.toUpperCase(), href: `/${locale}/mods/${mod.slug}` }
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Main Content (Article) */}
                    <div className="lg:col-span-8">
                        {/* Header */}
                        <header className="mb-12 border-b border-white/5 pb-12">
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                                {mod.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 mb-8 font-mono text-sm border-l-2 border-yellow-500 pl-4">
                                {mod.subcategory && (
                                    <span className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20 text-xs font-bold uppercase">
                                        {mod.subcategory}
                                    </span>
                                )}
                                <div className="flex items-center text-neutral-500">
                                    <span className="mr-2">UPDATED:</span>
                                    <span className="text-neutral-300">{mod.date}</span>
                                </div>
                            </div>

                            <p className="text-xl text-neutral-400 leading-relaxed font-light">
                                {mod.description}
                            </p>
                        </header>

                        {/* Mobile TOC */}
                        <TableOfContents
                            headings={mod.headings || []}
                            className="mb-12 lg:hidden"
                        />

                        {/* Content */}
                        <div className="prose prose-invert prose md:prose-lg prose-yellow max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight 
                                prose-p:text-neutral-300 [&_p]:text-neutral-300 prose-p:leading-8
                                prose-li:text-neutral-300 [&_li]:text-neutral-300
                                prose-strong:text-white">
                            <MDXRemote {...mod.content} components={hydratedComponents} />
                        </div>

                        {/* Prev/Next Navigation */}
                        <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {prevArticle ? (
                                <Link
                                    href={`/${locale}/mods/${prevArticle.slug}`}
                                    className="group flex flex-col items-start p-4 rounded-lg border border-white/5 hover:border-yellow-500/50 bg-neutral-900/30 transition-all text-left"
                                >
                                    <span className="text-xs text-neutral-500 font-mono mb-2 group-hover:text-yellow-500">
                                        {'< PREVIOUS_INTEL'}
                                    </span>
                                    <span className="text-white font-bold group-hover:text-yellow-500 transition-colors">
                                        {prevArticle.title}
                                    </span>
                                </Link>
                            ) : <div />}

                            {nextArticle ? (
                                <Link
                                    href={`/${locale}/mods/${nextArticle.slug}`}
                                    className="group flex flex-col items-end p-4 rounded-lg border border-white/5 hover:border-yellow-500/50 bg-neutral-900/30 transition-all text-right"
                                >
                                    <span className="text-xs text-neutral-500 font-mono mb-2 group-hover:text-yellow-500">
                                        {'NEXT_INTEL >'}
                                    </span>
                                    <span className="text-white font-bold group-hover:text-yellow-500 transition-colors">
                                        {nextArticle.title}
                                    </span>
                                </Link>
                            ) : <div />}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 font-mono text-xs text-neutral-600">
                            {`// END_OF_FILE`}
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-[100px] hidden lg:block">
                            <TableOfContents
                                headings={mod.headings || []}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
