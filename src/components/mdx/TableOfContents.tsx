import Link from "next/link";
import React from "react";

interface TableOfContentsProps {
    headings: { level: number; text: string; slug: string }[];
    className?: string;
}

export function TableOfContents({ headings, className = "" }: TableOfContentsProps) {
    if (!headings || headings.length === 0) return null;

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault();
        const element = document.getElementById(slug);
        if (element) {
            // Precise calculation: Element Position - Sticky Header (64px) - Breathing Room (36px)
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Optional: Update URL hash without jumping
            window.history.pushState(null, "", `#${slug}`);
        }
    };

    return (
        <div className={`bg-neutral-900/60 backdrop-blur-md border border-white/5 rounded-xl p-6 shadow-xl ${className}`}>
            <h3 className="text-[10px] font-mono text-yellow-500/80 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full animate-pulse"></span>
                Table of Contents
            </h3>

            <nav className="space-y-px">
                {headings.map((heading) => (
                    <a
                        key={heading.slug}
                        href={`#${heading.slug}`}
                        onClick={(e) => handleScroll(e, heading.slug)}
                        className={`group flex items-center gap-3 py-2 transition-all duration-300 cursor-pointer ${heading.level === 2
                                ? 'text-neutral-200 hover:text-white hover:bg-white/5 pl-3 rounded-md'
                                : 'text-neutral-500 hover:text-neutral-300 pl-8 text-xs'
                            }`}
                    >
                        {/* Tactical Marker for H2 */}
                        {heading.level === 2 && (
                            <span className="w-1 h-3 bg-neutral-700/50 group-hover:bg-yellow-500 rounded-full transition-colors"></span>
                        )}

                        {/* Hierarchy Line for H3 */}
                        {heading.level === 3 && (
                            <span className="w-px h-full absolute left-4 top-0 bg-white/5 -z-10"></span>
                        )}

                        <span className={`leading-5 ${heading.level === 2 ? 'font-medium text-sm' : 'font-normal'}`}>
                            {heading.text}
                        </span>

                        {/* Endcap Decoration on Hover */}
                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500/50 text-[10px]">
                            {heading.level === 2 ? 'CALL' : 'SUB'}
                        </span>
                    </a>
                ))}
            </nav>

            {/* HUD Footer Decoration */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center opacity-30">
                <div className="h-1 w-8 bg-current rounded-full"></div>
                <div className="text-[10px] font-mono tracking-widest">SYS.NAV</div>
            </div>
        </div>
    );
}
