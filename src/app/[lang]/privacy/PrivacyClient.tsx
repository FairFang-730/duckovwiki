'use client';

import { Breadcrumb } from "../../../components/ui/Breadcrumbs";
import { Locale, Dictionary } from "../../../lib/i18n";

export default function PrivacyClient({ lang, dict }: { lang: Locale, dict: Dictionary }) {
    const locale = lang;
    const t = dict.Privacy;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 pl-0">
                <Breadcrumb
                    items={[
                        { label: 'HOME', href: `/${locale}` },
                        { label: 'PRIVACY', href: `/${locale}/privacy` }
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <article className="prose prose-invert prose md:prose-lg prose-yellow max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-neutral-300 [&_p]:text-neutral-300 prose-p:leading-8 prose-li:text-neutral-300 [&_li]:text-neutral-300 prose-strong:text-white">
                    <header className="mb-12 border-b border-neutral-800 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">{t.title}</h1>

                        <div className="flex flex-col gap-2 font-mono text-sm border-l-2 border-yellow-500 pl-4 py-1">
                            <span className="text-yellow-500/80 font-bold tracking-wider">{t.eyebrow}</span>
                            <p className="text-neutral-400 leading-relaxed m-0">
                                {t.desc}
                            </p>
                            <div className="text-xs text-neutral-500 mt-2 pt-2 border-t border-white/5 uppercase">
                                {t.date_tag}
                            </div>
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
                    {/* @ts-ignore */}
                    {t.h8 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h8}</h2>
                            <p>{t.p8}</p>
                        </>
                    )}

                    {/* @ts-ignore */}
                    {t.h9 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h9}</h2>
                            <p>{t.p9}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h10 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h10}</h2>
                            <p>{t.p10}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h11 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h11}</h2>
                            <p>{t.p11}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h12 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h12}</h2>
                            <p>{t.p12}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h13 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h13}</h2>
                            <p>{t.p13}</p>
                        </>
                    )}
                    {/* @ts-ignore */}
                    {t.h13 && (
                        <>
                            <h2 className="text-xl font-bold text-white mt-8 mb-4">{t.h13}</h2>
                            <p>{t.p13}</p>
                        </>
                    )}

                    <div className="mt-12 p-6 bg-neutral-900 border border-neutral-800 rounded">
                        <h4 className="text-white mt-0">{t.contact_title}</h4>
                        <p className="mb-0 text-sm">
                            {t.contact_desc} <code>privacy@duckovwiki.fun</code>.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
