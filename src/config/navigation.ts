import { Dictionary } from "@/lib/i18n";

export interface NavItem {
    labelKey: keyof Dictionary['Navbar'];
    href: string;
}

export const NAV_ITEMS: NavItem[] = [
    { labelKey: 'guides', href: '/guides' },
    // { labelKey: 'maps', href: '/maps' },
    // { labelKey: 'mods', href: '/mods' }, // Mapped 'loadouts' to 'meta' key based on original code
    // { labelKey: 'tools', href: '/tools' },
];
