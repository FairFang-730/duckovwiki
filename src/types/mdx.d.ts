// Global Type Definitions for MDX Content
// This file is automatically included by TypeScript

/**
 * Fields strictly present in the MDX YAML Frontmatter.
 * Slug is NOT included here because it comes from the filename.
 */
interface ArticleFrontmatter {
    title: string;
    description: string;
    date: string;
    author?: string;
    // === Common Fields ===
    tags?: string[];
    readTime?: string;
    image?: string;

    // === SEO Overrides (Engine-Facing) ===
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];

    // === Categorization Overrides ===
    /**
     * Optional: Override the automatic folder-based subcategory.
     * Only use this if you want to group this article differently from its parent folder.
     */
    subcategory?: string;

    // === JSON-LD Schema Overrides ===
    schemaType?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schemaData?: any;
}

/**
 * The full Article object used within the application.
 * This includes all Frontmatter fields PLUS derived fields like slug.
 */
interface Article extends ArticleFrontmatter {
    slug: string;
    content: MDXRemoteSerializeResult;
    rawContent: string;
    headings?: { level: number; text: string; slug: string }[];

    // Explicitly override to ensure these exist on the final object
    category: string;
    subcategory?: string;

    // SEO Fields (Optional in runtime object too)
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];

    // Schema
    schemaType?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schemaData?: any;
}
