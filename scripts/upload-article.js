/**
 * Article Upload Script for Automated Blog System
 * 
 * Usage: node scripts/upload-article.js
 * 
 * This script is used by GitHub Actions to upload articles to Supabase.
 * It uploads an article from JSON file and triggers sitemap regeneration.
 * 
 * Input: articles/daily/[number].json
 * Output: Creates article in Supabase, updates sitemap
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  domain: 'monocharcoal.com',
  supabaseUrl: 'https://rnjalauqcvamvhpenjtg.supabase.co',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc',
};

/**
 * Upload article to Supabase
 */
async function uploadArticle(article) {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      keywords: article.keywords,
      date: article.date || new Date().toISOString().split('T')[0],
      read_time: article.read_time || `${Math.ceil(article.content.split(' ').length / 200)} min read`,
      published: false, // Draft mode - requires manual approval
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload article: ${error}`);
  }

  const result = await response.json();
  return result[0];
}

/**
 * Generate sitemap after article upload
 */
async function generateSitemap() {
  // Fetch all published articles
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?select=slug,published&published=eq.true`;
  
  const response = await fetch(url, {
    headers: {
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
    },
  });

  const articles = await response.json();

  // Static pages
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

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  for (const page of staticPages) {
    sitemap += `
  <url>
    <loc>https://${CONFIG.domain}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  // Add blog articles
  for (const article of articles) {
    if (article.slug) {
      sitemap += `
  <url>
    <loc>https://${CONFIG.domain}/blog/${article.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }

  sitemap += `
</urlset>`;

  // Write sitemap
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap updated with ${articles.length} articles`);
}

/**
 * Main function
 */
async function main() {
  // Get article number from command line
  const articleNumber = process.argv[2] || '1';
  const articlePath = path.join(__dirname, `../articles/daily/${articleNumber}.json`);
  
  console.log(`\n🚀 Starting article upload...`);
  console.log(`📄 Reading: ${articlePath}\n`);
  
  // Check if file exists
  if (!fs.existsSync(articlePath)) {
    console.error(`❌ Article file not found: ${articlePath}`);
    console.log(`\nUsage: node scripts/upload-article.js [article-number]`);
    console.log(`Example: node scripts/upload-article.js 1`);
    process.exit(1);
  }
  
  // Read article JSON
  const articleData = JSON.parse(fs.readFileSync(articlePath, 'utf8'));
  
  console.log(`📝 Article: ${articleData.title}`);
  console.log(`📂 Category: ${articleData.category}`);
  console.log(`🏷️  Keywords: ${articleData.keywords?.join(', ')}`);
  
  // Upload to Supabase
  console.log(`\n📤 Uploading to Supabase...`);
  const result = await uploadArticle(articleData);
  console.log(`✅ Article uploaded! ID: ${result?.id}`);
  
  // Update sitemap
  console.log(`\n🗺️  Updating sitemap...`);
  await generateSitemap();
  
  console.log(`\n✨ Article upload complete!`);
  console.log(`   Status: DRAFT (awaiting approval)`);
  console.log(`   Next step: Review in Admin and publish\n`);
}

// Run
main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});