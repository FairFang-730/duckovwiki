"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Dictionary } from '@/lib/i18n';
import { NAV_ITEMS } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export default function Navbar({ dict, lang }: { dict: Dictionary, lang: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Helper to switch language in current URL
    const switchLang = (newLang: 'en' | 'zh') => {
        if (!pathname) return `/${newLang}`;
        const segments = pathname.split('/');
        segments[1] = newLang; // Assuming /lang/... structure
        return segments.join('/');
    };

    // navLinks removed, using NAV_ITEMS directly in render

    return (
        <header className="sticky top-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <Link href={`/${lang}`} className="text-white font-bold text-xl tracking-tighter">
                            Duckov<span className="text-yellow-500">Wiki</span>
                        </Link>

                        {/* Patch Label (Desktop Only) */}
                        <span className="hidden md:inline-flex bg-green-900/30 text-green-400 text-xs font-mono px-2 py-1 rounded border border-green-800/50">
                            {siteConfig.gameVersion}
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex space-x-6">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === `/${lang}${item.href}`;
                                return (
                                    <Link
                                        key={item.href}
                                        href={`/${lang}${item.href}`}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive
                                            ? 'text-yellow-500'
                                            : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                                            }`}
                                    >
                                        {dict.Navbar[item.labelKey]}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Language Switcher (Desktop) */}
                        <div className="flex items-center gap-2 border-l border-neutral-700 pl-6">
                            <Link
                                href={switchLang('en')}
                                className={`text-xs font-bold px-2 py-1 rounded ${lang === 'en' ? 'bg-yellow-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                            >
                                EN
                            </Link>
                            <Link
                                href={switchLang('zh')}
                                className={`text-xs font-bold px-2 py-1 rounded ${lang === 'zh' ? 'bg-yellow-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                            >
                                中
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Mobile Language Switcher (Compact) */}
                        <div className="flex items-center gap-1">
                            <Link href={switchLang('en')} className={`text-xs ${lang === 'en' ? 'text-yellow-500' : 'text-neutral-500'}`}>EN</Link>
                            <span className="text-neutral-700">/</span>
                            <Link href={switchLang('zh')} className={`text-xs ${lang === 'zh' ? 'text-yellow-500' : 'text-neutral-500'}`}>中</Link>
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-neutral-300 hover:text-white p-2"
                        >
                            <span className="sr-only">Open menu</span>
                            {/* Hamburger Icon */}
                            {!isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-neutral-900 border-b border-neutral-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={`/${lang}${item.href}`}
                                onClick={() => setIsOpen(false)}
                                className="text-neutral-300 hover:text-white hover:bg-neutral-800 block px-3 py-2 rounded-md text-base font-medium"
                            >
                                {dict.Navbar[item.labelKey]}
                            </Link>
                        ))}
                    </div>
                    {/* Mobile Patch Label */}
                    <div className="px-5 py-3 border-t border-neutral-800">
                        <span className="text-neutral-500 text-xs font-mono">Current: {siteConfig.gameVersion}</span>
                    </div>
                </div>
            )}
        </header>
    );
}
