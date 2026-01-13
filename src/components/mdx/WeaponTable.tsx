import { Locale } from "@/lib/i18n";
import weapons from "@/data/weapons.json";

interface WeaponTableProps {
    id: string; // Passed from MDX: <WeaponTable id="ak47" />
    lang?: Locale; // MDX might not pass this, so we might need a context or pass it explicitly. 
    // However, for RSC MDX components, getting current lang context is tricky if not passed.
    // The user mentioned "Component self-judgment". 
    // Since we are in RSC land (next-mdx-remote/rsc), we can't easily use hooks for lang.
    // Strategy: The parent page (GuideDetailPage) knows the lang. 
    // We can pass it via `components` scope OR we can just accept it as prop if the user writes <WeaponTable id="ak47" lang="zh" />?
    // User said: "MDX Write: <WeaponTable id="ak47" /> (same for EN/ZH)". 
    // This implies the context must be injected. 
    // We will solve this by updating `compileMDX` in `src/lib/mdx.ts` to pass `lang` via scope or components closure.
}

export function WeaponTable({ id, lang }: WeaponTableProps) {
    const weapon = weapons.find(w => w.id === id);
    if (!weapon) return <div className="p-4 bg-red-900/20 text-red-500 border border-red-500 rounded">Weapon ID &quot;{id}&quot; not found.</div>;

    // Fallback to EN if lang is missing (or handle it in fetcher)
    const locale = lang || 'en';
    const name = weapon.name[locale as 'en' | 'zh'] || weapon.name.en;
    const description = weapon.description[locale as 'en' | 'zh'] || weapon.description.en;

    const labels = {
        en: {
            ergo: "Ergonomics",
            accuracy: "Accuracy",
            vRecoil: "Vertical Recoil",
            hRecoil: "Horizontal Recoil",
            fireRate: "Fire Rate (RPM)",
            caliber: "Caliber"
        },
        zh: {
            ergo: "人机工效",
            accuracy: "精准度",
            vRecoil: "垂直后座",
            hRecoil: "水平后座",
            fireRate: "射速 (RPM)",
            caliber: "口径"
        }
    };

    const t = labels[locale as 'en' | 'zh'] || labels.en;

    return (
        <div className="my-8 border border-neutral-700 rounded-lg overflow-hidden bg-neutral-900/50">
            <div className="bg-neutral-800 px-4 py-3 border-b border-neutral-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white m-0">{name}</h3>
                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2 py-1 rounded border border-neutral-700">
                    {weapon.type.toUpperCase()}
                </span>
            </div>

            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatBox label={t.caliber} value={weapon.caliber} />
                <StatBox label={t.fireRate} value={weapon.stats.fireRate} />
                <StatBox label={t.ergo} value={weapon.stats.ergonomics} />
                <StatBox label={t.accuracy} value={weapon.stats.accuracy} />
                <StatBox label={t.vRecoil} value={weapon.stats.verticalRecoil} color="text-red-400" />
                <StatBox label={t.hRecoil} value={weapon.stats.horizontalRecoil} color="text-red-400" />
            </div>

            <div className="bg-neutral-950/50 px-4 py-3 text-sm text-neutral-400 border-t border-neutral-800 italic">
                {description}
            </div>
        </div>
    );
}

function StatBox({ label, value, color = "text-yellow-500" }: { label: string, value: string | number, color?: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{label}</span>
            <span className={`font-mono font-bold text-lg ${color}`}>{value}</span>
        </div>
    );
}
