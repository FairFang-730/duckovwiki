'use client';

import { Breadcrumb } from "../../../components/ui/Breadcrumbs";
import { Locale, Dictionary } from "../../../lib/i18n";

export default function ContactClient({ lang, dict }: { lang: Locale, dict: Dictionary }) {
    const locale = lang;
    const t = dict.Contact;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 pl-0">
                <Breadcrumb
                    items={[
                        { label: 'HOME', href: `/${locale}` },
                        { label: 'CONTACT', href: `/${locale}/contact` }
                    ]}
                />
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="prose prose-invert prose md:prose-lg prose-yellow max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-neutral-300 [&_p]:text-neutral-300 prose-p:leading-8 prose-li:text-neutral-300 [&_li]:text-neutral-300 prose-strong:text-white">
                    <header className="mb-8 border-b border-neutral-800 pb-8">
                        <div className="text-yellow-500 font-mono text-sm mb-2 uppercase tracking-widest">{t.eyebrow}</div>
                        <h1 className="text-4xl font-bold text-white mb-4">{t.title}</h1>
                        <p className="lead text-xl text-neutral-400">
                            {t.intro}
                        </p>
                    </header>

                    <p>
                        {t.desc}
                    </p>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 mt-8 not-prose">
                        <h2 className="text-xl font-bold text-white mb-4">{t.card_title}</h2>
                        <p className="text-neutral-400 mb-6 max-w-2xl">
                            {t.card_desc}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-lg">
                            <span className="text-neutral-500 font-mono text-sm uppercase tracking-wider">{t.email_label}</span>
                            <a href="mailto:contact@duckovwiki.fun" className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors">
                                contact@duckovwiki.fun
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
