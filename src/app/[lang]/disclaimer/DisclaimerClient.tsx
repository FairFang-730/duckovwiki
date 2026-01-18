'use client';

import { Breadcrumb } from "../../../components/ui/Breadcrumbs";
import { Locale, Dictionary } from "../../../lib/i18n";

export default function DisclaimerClient({ lang, dict }: { lang: Locale, dict: Dictionary }) {
    const locale = lang;
    const t = dict.Disclaimer;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 pl-0">
                <Breadcrumb
                    items={[
                        { label: 'HOME', href: `/${locale}` },
                        { label: 'DISCLAIMER', href: `/${locale}/disclaimer` }
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <article className="prose prose-invert prose md:prose-lg prose-yellow max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-neutral-300 [&_p]:text-neutral-300 prose-p:leading-8 prose-li:text-neutral-300 [&_li]:text-neutral-300 prose-strong:text-white">
                    <header className="mb-12 border-b border-neutral-800 pb-8">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-6">
                            {t.title}
                        </h1>
                        <div className="h-0.5 w-24 bg-yellow-500/50" />
                        <div className="text-xs text-neutral-500 mt-4 uppercase">
                            {t.date_tag}
                        </div>
                    </header>

                    <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h1}</h2>
                    <p>{t.p1}</p>
                    <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h2}</h2>
                    <p>{t.p2}</p>
                    <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h3}</h2>
                    <p>{t.p3}</p>
                    <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h4}</h2>
                    <p>{t.p4}</p>
                    {/* @ts-ignore */}
                    {t.h5 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h5}</h2>
                            <p>{t.p5}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h6 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h6}</h2>
                            <p>{t.p6}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h7 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h7}</h2>
                            <p>{t.p7}</p>
                        </>
                    )}
                </article>
            </div>
        </div>
    );
}
