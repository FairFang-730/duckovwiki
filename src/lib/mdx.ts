import { compileMDX } from 'next-mdx-remote/rsc';
import GithubSlugger from 'github-slugger';
import { WeaponTable } from '@/components/mdx/WeaponTable';
import { Locale } from './i18n';
import React from 'react';

// Components are now dynamic based on lang
const getComponents = (lang: Locale) => ({
    WeaponTable: (props: React.ComponentProps<typeof WeaponTable>) => React.createElement(WeaponTable, { ...props, lang }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

// Use Webpack's require.context to load all MDX files at build time
// contentContext keys example: "./en/guides/ak47-guide.mdx"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contentContext = (require as any).context('../../content', true, /\.mdx$/);

// ... imports

// Helper to determine subcategory
function getSubcategory(frontmatter: any, category: string, subfolder?: string): string | undefined {
    // 1. Explicit frontmatter override
    if (frontmatter.subcategory) return frontmatter.subcategory;

    // 2. Folder-based inference
    if (subfolder && subfolder !== category) {
        // Capitalize first letter of subfolder for nicer display (e.g., "loadouts" -> "Loadouts")
        return subfolder.charAt(0).toUpperCase() + subfolder.slice(1);
    }

    // 3. Fallback logic based on category type (if needed for legacy compat, mostly unused now)
    return undefined;
}

export async function getArticleBySlug(slug: string, lang: string, directory: string) {
    const locale = lang as Locale;
    // We can't construct the key directly because the file might be in a subfolder.
    // We need to find the key that matches the slug.
    const prefix = `./${lang}/${directory}/`;
    const searchSuffix = `/${slug}.mdx`;

    // Find the matching file key
    const allKeys = contentContext.keys();
    const key = allKeys.find((k: string) => k.startsWith(prefix) && k.endsWith(searchSuffix));

    if (!key) {
        console.error(`Article not found for slug: ${slug} in ${directory}`);
        return null;
    }

    try {
        const source = contentContext(key);
        // Extract subfolder from key if present
        // key format: ./en/guides/loadouts/ak47.mdx OR ./en/guides/ak47.mdx
        // relative path inside directory: loadouts/ak47.mdx OR ak47.mdx
        const relativePath = key.replace(prefix, '');
        const parts = relativePath.split('/');
        const subfolder = parts.length > 1 ? parts[0] : undefined;



        const { default: rehypeSlug } = await import('rehype-slug');
        const { serialize } = await import('next-mdx-remote/serialize');

        // Extract headings logic
        const sourceString = source as string;
        const headings: { level: number; text: string; slug: string }[] = [];
        const headingRegex = /^(#{2,3})\s+(.+)$/gm;

        const slugger = new GithubSlugger();

        let match;
        while ((match = headingRegex.exec(sourceString)) !== null) {
            const level = match[1].length;
            const text = match[2];
            const slug = slugger.slug(text);
            headings.push({ level, text, slug });
        }

        const serialized = await serialize(source, {
            parseFrontmatter: true,
            mdxOptions: {
                development: process.env.NODE_ENV === 'development',
                rehypePlugins: [rehypeSlug],
            }
        });

        const frontmatter = serialized.frontmatter || {};
        const category = directory; // 'guides', 'maps', etc.
        const subcategory = getSubcategory(frontmatter, directory, subfolder);

        // Auto-extract first image if not present in frontmatter
        let image = frontmatter.image;
        if (!image) {
            // Match standard markdown image: ![alt](url)
            const mdImageMatch = /!\[.*?\]\((.*?)\)/.exec(sourceString);
            if (mdImageMatch) {
                image = mdImageMatch[1];
            } else {
                // Match HTML image: <img src="url" ... />
                const htmlImageMatch = /<img[^>]+src=["']([^"']+)["']/.exec(sourceString);
                if (htmlImageMatch) {
                    image = htmlImageMatch[1];
                }
            }
        }

        return {
            ...frontmatter,
            slug,
            image,
            content: serialized,
            headings,
            category,     // Enforce top-level category
            subcategory,  // Enforce internal grouping
        } as unknown as Article;

    } catch (e) {
        console.error(`MDX Load Error for ${slug}:`, e);
        return null;
    }
}

export async function getAllArticles(lang: string, directory: string): Promise<Article[]> {
    try {
        const prefix = `./${lang}/${directory}/`;
        const keys = contentContext.keys().filter((key: string) => key.startsWith(prefix));

        const articles = await Promise.all(
            keys.map(async (key: string) => {
                const slug = key.split('/').pop()?.replace(/\.mdx$/, '') || '';
                const source = contentContext(key);

                // Extract subfolder
                const relativePath = key.replace(prefix, '');
                const parts = relativePath.split('/');
                const subfolder = parts.length > 1 ? parts[0] : undefined;

                const { serialize } = await import('next-mdx-remote/serialize');
                const serialized = await serialize(source, { parseFrontmatter: true });
                const frontmatter = serialized.frontmatter || {};

                // Auto-extract first image if not present in frontmatter
                let image = frontmatter.image;
                if (!image) {
                    const sourceString = source as string;
                    // Match standard markdown image: ![alt](url)
                    const mdImageMatch = /!\[.*?\]\((.*?)\)/.exec(sourceString);
                    if (mdImageMatch) {
                        image = mdImageMatch[1];
                    } else {
                        // Match HTML image: <img src="url" ... />
                        const htmlImageMatch = /<img[^>]+src=["']([^"']+)["']/.exec(sourceString);
                        if (htmlImageMatch) {
                            image = htmlImageMatch[1];
                        }
                    }
                }

                return {
                    ...frontmatter,
                    slug,
                    image, // Injected or original
                    category: directory,
                    subcategory: getSubcategory(frontmatter, directory, subfolder),
                    date: frontmatter.date || new Date().toISOString(), // Ensure date exists for sorting
                } as Article;
            })
        );

        return articles.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (e) {
        console.error(`Error reading directory content/${lang}/${directory}:`, e);
        return [];
    }
}
