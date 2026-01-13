import Link from 'next/link';
import { Dictionary } from '@/lib/i18n';

export default function Footer({ dict, lang }: { dict: Dictionary, lang: string }) {
    // Bilibili Icon
    const BilibiliIcon = (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.264 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.872 0 17.36V9.987c.036-1.511.556-2.765 1.56-3.76C2.564 5.23 3.823 4.707 5.333 4.653h.854L3.483 1.95c-.326-.326-.195-.814.195-1.106.39-.293.879-.163 1.204.163l3.708 3.708h6.82l3.708-3.708c.325-.326.814-.456 1.204-.163.39.292.52.78.195 1.106L17.813 4.653zM6.5 13.5c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm9 0c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2z" />
        </svg>
    );

    // Steam Icon
    const SteamIcon = (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M11.979 0C5.666 0 .548 5.135.548 11.472c0 2.923 1.096 5.6 2.912 7.64l.056.059 4.314-1.78a2.951 2.951 0 01-.06-.554c0-1.637 1.328-2.964 2.965-2.964s2.964 1.327 2.964 2.964c0 1.638-1.328 2.965-2.964 2.965a2.95 2.95 0 01-1.666-.516l-3.266 4.093a11.408 11.408 0 006.176 1.849c6.314 0 11.432-5.135 11.432-11.472S18.293 0 11.979 0zM7.34 16.03c.89 0 1.611.724 1.611 1.617 0 .894-.721 1.618-1.611 1.618-.89 0-1.612-.724-1.612-1.618 0-.893.722-1.617 1.612-1.617zm.582 1.487c-.672.483-1.604.321-2.085-.353-.48-.675-.32-1.61.352-2.094.672-.483 1.603-.321 2.084.354.481.674.321 1.61-.351 2.093z" />
        </svg>
    );

    return (
        <footer className="border-t border-neutral-900 bg-neutral-950 py-8 text-center text-sm font-sans">
            <div className="container mx-auto px-4">

                {/* --- Tier 1: Site Nav & Community (SEO & UX High Priority) --- */}
                <div className="mb-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 font-medium text-neutral-400 text-sm">

                    {/* Internal Links - Hover Brand Yellow */}
                    <Link href={`/${lang}/about`} className="hover:text-yellow-500 transition-colors duration-200">
                        {dict.Footer.about}
                    </Link>
                    <Link href={`/${lang}/contact`} className="hover:text-yellow-500 transition-colors duration-200">
                        {dict.Footer.contact}
                    </Link>
                    <Link href={`/${lang}/sitemap`} className="hover:text-yellow-500 transition-colors duration-200">
                        {dict.Footer.sitemap}
                    </Link>

                    {/* External Community Links */}

                    {/* Bilibili */}
                    <a
                        href="https://space.bilibili.com/3546815985092830"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center gap-2 hover:text-[#23ADE5] transition-colors duration-200 group"
                    >
                        <span className="group-hover:animate-bounce">{BilibiliIcon}</span>
                        <span>{dict.Footer.bilibili_label}</span>
                    </a>

                    {/* Steam */}
                    <a
                        href="https://store.steampowered.com/app/3167020/Escape_From_Duckov/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center gap-2 hover:text-[#c7d5e0] transition-colors duration-200 group"
                    >
                        <span className="group-hover:animate-pulse">{SteamIcon}</span>
                        <span>{dict.Footer.steam_label}</span>
                    </a>
                </div>

                {/* --- Separator --- */}
                <div className="mx-auto mb-6 h-px w-12 bg-neutral-800"></div>

                {/* --- Tier 2: Legal (AdSense Compliance) --- */}
                {/* Smaller font, lighter color */}
                <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500">
                    <Link href={`/${lang}/privacy`} className="hover:text-neutral-300 transition-colors">
                        {dict.Footer.privacy}
                    </Link>
                    <span className="text-neutral-800">•</span>
                    <Link href={`/${lang}/terms`} className="hover:text-neutral-300 transition-colors">
                        {dict.Footer.terms}
                    </Link>
                    <span className="text-neutral-800">•</span>
                    <Link href={`/${lang}/disclaimer`} className="hover:text-neutral-300 transition-colors">
                        {dict.Footer.disclaimer}
                    </Link>
                </div>

                {/* --- Tier 3: Copyright & Attribution --- */}
                <div className="space-y-1 text-xs text-neutral-600 leading-relaxed">
                    <p>
                        © 2026 DuckovWiki. <span className="text-neutral-500">{dict.Footer.copyright_suffix}</span>
                    </p>
                    <p>
                        {dict.Footer.assets_declaration} <strong className="text-neutral-500 font-medium">Team Soda</strong>.
                        <br className="hidden sm:inline" />
                        <span className="sm:ml-1">{dict.Footer.affiliation}</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}
