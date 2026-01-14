export const dynamic = 'force-static';

import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { siteConfig } from '@/config/site'
import { locales } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url
    // const locales = ['en', 'zh'] // Removed, imported from lib/i18n

    // Static Routes
    const routes = [
        '',
        '/maps',
        '/mods',
        '/tools',
        '/guides',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/disclaimer',
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Generate for all locales
    for (const locale of locales) {
        // 1. Static Pages
        for (const route of routes) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            })
        }

        // 2. Dynamic Articles (Guides)
        const guides = await getAllArticles(locale, 'guides')
        for (const guide of guides) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/guides/${guide.slug}`,
                lastModified: new Date(guide.date),
                changeFrequency: 'monthly',
                priority: 0.7,
            })
        }

        // 3. Dynamic Articles (Maps)
        const maps = await getAllArticles(locale, 'maps')
        for (const map of maps) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/maps/${map.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            })
        }

        // 4. Dynamic Articles (Mods)
        const mods = await getAllArticles(locale, 'mods')
        for (const mod of mods) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/mods/${mod.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            })
        }

        // 5. Dynamic Articles (Tools)
        const tools = await getAllArticles(locale, 'tools')
        for (const tool of tools) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/tools/${tool.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            })
        }
    }

    return sitemapEntries
}
