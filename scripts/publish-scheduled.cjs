/**
 * Publish Scheduled Articles Script
 * 
 * This script is used by GitHub Actions to automatically publish
 * articles that have reached their scheduled publish date.
 * 
 * Usage: node scripts/publish-scheduled.cjs
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  domain: 'monocharcoal.com',
  supabaseUrl: 'https://rnjalauqcvamvhpenjtg.supabase.co',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc',
};

const JARKATA_OFFSET_HOURS = 7;

function getJakartaNow() {
  const now = new Date();
  return new Date(now.getTime() + JARKATA_OFFSET_HOURS * 60 * 60 * 1000);
}

function toUTC(jakartaDateStr) {
  if (!jakartaDateStr) return null;
  const jakartaDate = new Date(jakartaDateStr);
  const utcDate = new Date(jakartaDate.getTime() - JARKATA_OFFSET_HOURS * 60 * 60 * 1000);
  return utcDate.toISOString();
}

/**
 * Get articles that are scheduled to be published (Jakarta time)
 */
async function getScheduledArticles() {
  const jakartaNow = getJakartaNow().toISOString();
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?select=id,title,slug,scheduled_publish,published&scheduled_publish=lte.${jakartaNow}&published=eq.false`;
  
  const response = await fetch(url, {
    headers: {
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
    },
  });

  const articles = await response.json();
  return articles;
}

/**
 * Publish an article
 */
async function publishArticle(id, scheduledPublish) {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?id=eq.${id}`;
  
  // Extract date from scheduled_publish (e.g., "2026-04-13T08:00:00+00:00" -> "2026-04-13")
  const publishDate = scheduledPublish ? scheduledPublish.split('T')[0] : new Date().toISOString().split('T')[0];
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      published: true,
      date: publishDate,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to publish article: ${error}`);
  }

  return response.json();
}

/**
 * Generate sitemap
 */
async function generateSitemap() {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?select=slug,published&published=eq.true`;
  
  const response = await fetch(url, {
    headers: {
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
    },
  });

  const articles = await response.json();

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

  for (const page of staticPages) {
    sitemap += `
  <url>
    <loc>https://${CONFIG.domain}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

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

  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`✅ Sitemap updated with ${articles.length} published articles`);
}

/**
 * Main function
 */
async function main() {
  console.log(`\n🔄 Checking for scheduled articles to publish...\n`);
  
  const scheduledArticles = await getScheduledArticles();
  
  if (scheduledArticles.length === 0) {
    console.log(`📭 No articles scheduled for publishing today.`);
    console.log(`   Next check: Tomorrow at 9:00 UTC\n`);
    return;
  }
  
  console.log(`📋 Found ${scheduledArticles.length} article(s) to publish:\n`);
  
  for (const article of scheduledArticles) {
    console.log(`   - ${article.title}`);
    await publishArticle(article.id, article.scheduled_publish);
    console.log(`     ✅ Published!`);
  }
  
  console.log(`\n🗺️  Updating sitemap...`);
  await generateSitemap();
  
  console.log(`\n✨ Scheduled publishing complete!`);
  console.log(`   Published: ${scheduledArticles.length} article(s)\n`);
}

main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});