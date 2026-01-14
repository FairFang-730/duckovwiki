import { Metadata } from 'next';
import { Locale } from '../lib/i18n';

import { siteConfig } from './site';

// export const siteConfig = ... (Removed, using imported)
export { siteConfig }; // Re-export for compatibility if needed, or just let users import from site.ts

type SEOData = {
    title: string;
    description: string;
    keywords?: string[];
};

type SupportedPages =
    | 'home'
    | 'about'
    | 'contact'
    | 'privacy'
    | 'terms'
    | 'tools'
    | 'mods'
    | 'maps'
    | 'guides'
    | 'disclaimer';

export const staticSEO: Record<SupportedPages, Record<Locale, SEOData>> = {
    home: {
        en: {
            title: 'DuckovWiki: #1 Unofficial Escape from Duckov Wiki - Guides',
            description: 'DuckovWiki is your unofficial survival bible. Stop dying in Ground Zero—access interactive maps, verified mods. Not affiliated with Team Soda.',
            keywords: ['Escape from Duckov wiki', 'unofficial fan site', 'DuckovWiki', 'survival guide', 'game maps']
        },
        zh: {
            title: 'DuckovWiki: 逃离鸭科夫非官方维基 - 萌新生存圣经与地图',
            description: 'DuckovWiki是《逃离鸭科夫》玩家的非官方生存圣经。 拒绝落地成盒！这里有全地图撤离点、武器数据及汉化MOD。本站独立于Team Soda。',
            keywords: ['逃离鸭科夫', 'DuckovWiki', '非官方维基', '生存指南', '游戏地图', '新手攻略']
        }
    },
    guides: {
        en: {
            title: 'Escape from Duckov Strategy Guides: Survive, Loot & Extract',
            description: 'Master the game with verified community guides. From "Tetris" inventory management to cheese strategies for bosses. Level up fast with our unofficial walkthroughs.',
            keywords: ['Escape from Duckov guides', 'survival tips', 'boss cheese strategies', 'leveling guide', 'loot guide']
        },
        zh: {
            title: '逃离鸭科夫进阶攻略：从萌新到大佬的生存与撤离指南',
            description: '掌握活下来的艺术。 浏览DuckovWiki的深度攻略库：零号大坝跑图路线、保险箱使用技巧及BOSS“逃课”打法。助您快速脱贫致富。',
            keywords: ['逃离鸭科夫攻略', '生存技巧', 'BOSS打法', '快速升级', '赚钱攻略']
        }
    },
    mods: {
        en: {
            title: 'Safe Escape from Duckov Mods: Translations, FPS Boost & Tools',
            description: 'Download virus-free, community-tested mods. Enhance your experience with English patches, inventory expanders, and ReShade presets. Safe, unofficial, and free.',
            keywords: ['Escape from Duckov mods', 'safe mod download', 'fps boost', 'english patch', 'virus-free mods']
        },
        zh: {
            title: '逃离鸭科夫MOD下载：安全无毒的汉化补丁与辅助工具',
            description: '拒绝病毒与封号风险。 下载经社区验证的安全MOD：最新汉化补丁、FPS帧数优化及大背包工具。让您的游戏体验更上一层楼。',
            keywords: ['逃离鸭科夫MOD', '安全下载', '汉化补丁', '帧数优化', '游戏辅助']
        }
    },
    maps: {
        en: {
            title: 'Escape from Duckov Interactive Maps: All Exfils & Loot Locations',
            description: 'Never get lost in Ground Zero again. View high-res maps pinpointing every extraction point, hidden stash, and keycard room. Plan your route before you deploy.',
            keywords: ['Escape from Duckov maps', 'interactive map', 'extraction points', 'loot locations', 'Ground Zero map']
        },
        zh: {
            title: '逃离鸭科夫全地图指引：撤离点、钥匙房与资源分布图',
            description: '再也不要在零号大坝迷路了。 查看高清交互式地图，精准定位所有撤离点、隐藏资源堆及红卡房位置。在部署前规划您的完美路线。',
            keywords: ['逃离鸭科夫地图', '撤离点地图', '资源分布', '钥匙房位置', '地图工具']
        }
    },
    tools: {
        en: {
            title: 'Escape from Duckov Tools: Ammo Damage Chart & Market Prices',
            description: 'Stop guessing which ammo is best. Use our interactive damage calculator, loadout builder, and real-time market tracker to optimize your economy and combat.',
            keywords: ['Escape from Duckov tools', 'ammo chart', 'damage calculator', 'market tracker', 'loadout optimizer']
        },
        zh: {
            title: '逃离鸭科夫必备工具箱：弹药伤害表与实时物价查询',
            description: '告别玄学，科学配装。 使用我们的弹药穿透计算器、负重模拟器及实时市场物价表。用数据优化您的每一场战斗和交易。',
            keywords: ['弹药伤害表', '伤害计算器', '物价查询', '游戏工具', '配装推荐']
        }
    },
    about: {
        en: {
            title: 'About DuckovWiki - Built by Fans, For Fans (Unofficial)',
            description: 'DuckovWiki is a labor of love by veteran players. We are a non-profit volunteer team dedicated to documenting Escape from Duckov while respecting Team Soda\'s IP.',
            keywords: ['About DuckovWiki', 'fan community', 'volunteer team', 'gaming wiki', 'unofficial site']
        },
        zh: {
            title: '关于DuckovWiki - 玩家共建的非官方避难所',
            description: 'DuckovWiki由一群热爱游戏的资深玩家“用爱发电”维护。 我们是一个非营利性社区，旨在服务玩家，同时严格尊重Team Soda的知识产权。',
            keywords: ['关于我们', '玩家社区', '志愿者', '游戏维基', '非官方站点']
        }
    },
    contact: {
        en: {
            title: 'Contact DuckovWiki - Submit Guides & Feedback',
            description: 'We want to hear from you. Whether it\'s a guide submission, a bug report, or a partnership proposal, reach out to the DuckovWiki team via our official channels.',
            keywords: ['Contact us', 'submit guide', 'feedback', 'report bug', 'business inquiry']
        },
        zh: {
            title: '联系DuckovWiki - 攻略投稿与意见反馈通道',
            description: '我们需要您的声音。 无论是投稿新攻略、反馈网站Bug，还是商务合作，请通过官方渠道联系我们。让我们一起完善这个社区。',
            keywords: ['联系我们', '攻略投稿', '意见反馈', '商务合作', '联系方式']
        }
    },
    terms: {
        en: {
            title: 'Terms of Use - DuckovWiki User Agreement & Rules',
            description: 'Read the rules of our community. This agreement governs your access to DuckovWiki, defining user rights, copyright compliance, and acceptable conduct.',
            keywords: ['Terms of use', 'user agreement', 'community rules', 'copyright policy', 'legal']
        },
        zh: {
            title: '使用条款 - DuckovWiki 用户协议与社区规则',
            description: '请阅读我们的社区规则。 本协议规范您对DuckovWiki的访问权限，明确用户权利、版权合规要求及社区行为准则。',
            keywords: ['使用条款', '用户协议', '社区规则', '版权政策', '法律声明']
        }
    },
    privacy: {
        en: {
            title: 'Privacy Policy - How DuckovWiki Protects Your Data',
            description: 'Your privacy matters to us. This policy explains how DuckovWiki collects data, uses cookies, and ensures your information remains secure and compliant.',
            keywords: ['Privacy policy', 'data protection', 'cookie usage', 'user privacy', 'security']
        },
        zh: {
            title: '隐私政策 - DuckovWiki 数据保护与Cookie声明',
            description: '我们在乎您的隐私安全。 本政策详细说明DuckovWiki如何收集数据、使用Cookie，以及我们为保护您的信息安全所采取的措施。',
            keywords: ['隐私政策', '数据保护', 'Cookie声明', '用户隐私', '信息安全']
        }
    },
    disclaimer: {
        en: {
            title: 'Disclaimer - Unofficial Fan Site & Copyright Notice',
            description: 'DuckovWiki is an independent fan site, not affiliated with Team Soda. All game assets belong to their respective owners. We do not claim ownership of official content.',
            keywords: ['Disclaimer', 'unofficial site', 'copyright notice', 'Team Soda', 'fan site policy']
        },
        zh: {
            title: '免责声明 - 非官方粉丝站与版权归属声明',
            description: 'DuckovWiki是独立的第三方粉丝网站，与Team Soda无附属关系。 站内所有游戏素材版权归原作者所有。我们不主张对官方内容的所有权。',
            keywords: ['免责声明', '非官方网站', '版权声明', '独立站点', '法律声明']
        }
    },
};

export function generateStaticSEO(page: SupportedPages, lang: Locale, path?: string): Metadata {
    // Fallback to 'en' if the language is not supported or data is missing
    const effectiveLang = staticSEO[page] && staticSEO[page][lang] ? lang : 'en';
    const data = staticSEO[page][effectiveLang];

    if (!data) {
        console.warn(`[SEO] Missing data for page: ${page}, lang: ${lang}`);
        return {
            title: siteConfig.name,
            description: siteConfig.name
        };
    }

    const defaultTitle = `${data.title} | ${siteConfig.name}`;
    const templateTitle = `%s | ${siteConfig.name}`;
    const absoluteTitle = data.title;

    // Construct base metadata
    const metadata: Metadata = {
        title: absoluteTitle
            ? { default: defaultTitle, template: templateTitle, absolute: absoluteTitle }
            : { default: defaultTitle, template: templateTitle },
        description: data.description,
        keywords: data.keywords,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'website',
            siteName: siteConfig.name,
        }
    };

    // Add alternates if path is provided
    if (path) {
        // Ensure path starts with /
        const safePath = path.startsWith('/') ? path : `/${path}`;
        // If path is exactly '/', treat it as empty for concatenation to avoid trailing slash
        // unless you explicitly want https://domain/en/
        // Next.js default is no trailing slash.
        const urlSuffix = safePath === '/' ? '' : safePath;

        metadata.alternates = {
            canonical: `https://duckovwiki.fun/${lang}${urlSuffix}`,
            languages: {
                'en': `https://duckovwiki.fun/en${urlSuffix}`,
                'zh-Hans': `https://duckovwiki.fun/zh${urlSuffix}`,
                'x-default': `https://duckovwiki.fun/en${urlSuffix}`,
            }
        };
    }

    return metadata;
}
