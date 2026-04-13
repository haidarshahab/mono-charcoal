/**
 * Sitemap Generator Script
 * 
 * Run this script to generate sitemap.xml from Supabase articles.
 * Usage: node scripts/generate-sitemap.js
 * 
 * This runs automatically before build if added to package.json:
 * "prebuild": "node scripts/generate-sitemap.js"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CONFIG = {
  domain: 'monocharcoal.com',
  supabaseUrl: process.env.VITE_SUPABASE_URL || 'https://rnjalauqcvamvhpenjtg.supabase.co',
  supabaseKey: process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4ODg5MTAsImV4cCI6MjA5MTQ2NDkxMH0.vDk1vxDeohAfOVnB4cD-bvUcJhNSyjQx5rsPfcgXovU',
};

// Static pages that should always be included
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/products', priority: '0.9', changefreq: 'monthly' },
  { url: '/products/shisha', priority: '0.8', changefreq: 'monthly' },
  { url: '/products/bbq', priority: '0.8', changefreq: 'monthly' },
  { url: '/oem', priority: '0.7', changefreq: 'monthly' },
  { url: '/quality', priority: '0.7', changefreq: 'monthly' },
  { url: '/export', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
];

/**
 * Fetch published articles from Supabase
 */
async function fetchArticles() {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?select=slug,published&published=eq.true`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': CONFIG.supabaseKey,
      'Authorization': `Bearer ${CONFIG.supabaseKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status}`);
  }

  return response.json();
}

// Languages for multilingual sitemap
const languages = ['en', 'ar', 'de', 'fr', 'tr', 'ru', 'ja'];

/**
 * Generate sitemap XML with hreflang tags
 */
function generateSitemap(articles) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Add static pages with all language variants
  for (const page of staticPages) {
    const baseUrl = `https://${CONFIG.domain}`;
    
    // Generate hreflang alternates for each language
    let hreflangTags = '';
    for (const lang of languages) {
      const langUrl = lang === 'en' ? `${baseUrl}${page.url}` : `${baseUrl}/${lang}${page.url}`;
      hreflangTags += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${langUrl}"/>`;
    }
    // Add x-default
    hreflangTags += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}"/>`;

    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${hreflangTags}
  </url>`;
  }

  // Add dynamic blog articles (only English for now)
  for (const article of articles) {
    if (article.slug) {
      xml += `
  <url>
    <loc>https://${CONFIG.domain}/blog/${article.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return xml;
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Generating sitemap...\n');

  try {
    // Fetch articles from Supabase
    console.log('📡 Fetching articles from Supabase...');
    const articles = await fetchArticles();
    console.log(`✅ Found ${articles.length} published articles\n`);

    // Log found articles
    if (articles.length > 0) {
      console.log('📄 Published articles:');
      articles.forEach((article, index) => {
        console.log(`   ${index + 1}. /blog/${article.slug}`);
      });
      console.log('');
    }

    // Generate sitemap
    console.log('🎯 Generating sitemap.xml...');
    const sitemap = generateSitemap(articles);

    // Write to file
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Sitemap saved to: public/sitemap.xml\n`);

    // Summary
    const totalUrls = staticPages.length + articles.length;
    console.log('📊 Summary:');
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Blog articles: ${articles.length}`);
    console.log(`   - Total URLs: ${totalUrls}`);
    console.log('\n✅ Sitemap generated successfully!');

  } catch (error) {
    console.error('\n❌ Error generating sitemap:', error.message);
    
    // Fallback: generate with just static pages if Supabase fails
    console.log('\n🔄 Generating fallback sitemap with static pages only...');
    const sitemap = generateSitemap([]);
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Fallback sitemap saved (no articles)`);
  }
}

// Run the script
main();