/**
 * Upload all scheduled articles from JSON files to Supabase
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  supabaseUrl: 'https://rnjalauqcvamvhpenjtg.supabase.co',
  serviceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc',
};

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
      date: article.date,
      read_time: article.read_time,
      published: false,
      scheduled_publish: article.scheduled_publish,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload: ${error}`);
  }

  return response.json();
}

async function main() {
  console.log('🚀 Starting article upload...\n');
  
  let successCount = 0;
  let errorCount = 0;

  for (let i = 1; i <= 50; i++) {
    const filePath = path.join(__dirname, `articles/daily/${i}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }

    try {
      const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      await uploadArticle(article);
      console.log(`✅ Uploaded: ${article.title} (scheduled: ${article.scheduled_publish})`);
      successCount++;
    } catch (error) {
      console.log(`❌ Error uploading article ${i}: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
}

main().catch(console.error);