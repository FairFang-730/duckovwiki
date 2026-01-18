export const dynamic = 'force-static';

import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { siteConfig } from '@/config/site'
import { locales } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url
    // const locales = ['en', 'zh'] // Removed, imported from lib/i18n

    // 1. Hub Pages (High Priority, frequently updated with new content)
    const hubRoutes = [
        '/maps',
        '/mods',
        '/tools',
        '/guides',
    ]

    // 2. Info & Legal Pages (Low Priority, rarely changed)
    const infoRoutes = [
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/disclaimer',
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Generate for all locales
    for (const locale of locales) {
        // A. Home Page (Highest Priority)
        sitemapEntries.push({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        })

        // B. Hub Pages
        for (const route of hubRoutes) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9,
            })
        }

        // C. Info Pages
        for (const route of infoRoutes) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(), // Could be specific date if tracked, but build date is safe fallback
                changeFrequency: 'monthly',
                priority: 0.3,
            })
        }

        // D. Dynamic Articles (High Priority Content)
        // Guides
        const guides = await getAllArticles(locale, 'guides')
        for (const guide of guides) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/guides/${guide.slug}`,
                lastModified: new Date(guide.date),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }

        // Maps
        const maps = await getAllArticles(locale, 'maps')
        for (const map of maps) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/maps/${map.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }

        // Mods
        const mods = await getAllArticles(locale, 'mods')
        for (const mod of mods) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/mods/${mod.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }

        // Tools
        const tools = await getAllArticles(locale, 'tools')
        for (const tool of tools) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/tools/${tool.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8,
            })
        }
    }

    return sitemapEntries
}
