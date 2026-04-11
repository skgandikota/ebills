#!/usr/bin/env node
/**
 * Sitemap generator — builds sitemap.xml with all pages
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Import blog slugs from generated TS (extract via regex from the compiled file)
const blogData = readFileSync(join(ROOT, "src/data/blog-posts.ts"), "utf-8");
const blogSlugs = [...blogData.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);
const blogDates = [...blogData.matchAll(/"date":\s*"([^"]+)"/g)].map((m) => m[1]);

// Template page slugs
const tplData = readFileSync(join(ROOT, "src/data/template-pages.ts"), "utf-8");
const tplSlugs = [...tplData.matchAll(/"slug":\s*"([^"]+)"/g)].map((m) => m[1]);

const today = new Date().toISOString().split("T")[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ebills.co.in/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ebills.co.in/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

// Template pages (high priority)
for (const slug of tplSlugs) {
  xml += `  <url>
    <loc>https://ebills.co.in/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

// Blog posts
for (let i = 0; i < blogSlugs.length; i++) {
  xml += `  <url>
    <loc>https://ebills.co.in/blog/${blogSlugs[i]}</loc>
    <lastmod>${blogDates[i] || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
}

xml += `</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml, "utf-8");
console.log(`Sitemap generated: ${2 + tplSlugs.length + blogSlugs.length} URLs`);
