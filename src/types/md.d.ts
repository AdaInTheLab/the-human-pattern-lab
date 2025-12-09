declare module "*.md" {
    // frontmatter
    const attributes: Record<string, any>;

    // rendered HTML
    const html: string;

    // raw markdown content
    const markdown: string;

    export { attributes, html, markdown };
}
