/**
 * Fix all article JSON files for Supabase upload
 */

const fs = require('fs');
const path = require('path');

const startDate = new Date('2026-04-28T08:00:00Z');

for (let i = 16; i <= 50; i++) {
  const filePath = path.join(__dirname, `articles/daily/${i}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${filePath}`);
    continue;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let article = JSON.parse(content);
    
    // Fix the article structure
    const fixedArticle = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category || article.category,
      keywords: article.tags || article.keywords || [],
      date: article.date || new Date().toISOString().split('T')[0],
      read_time: article.read_time || "8 min read",
      scheduled_publish: new Date(startDate.getTime() + (i - 16) * 24 * 60 * 60 * 1000).toISOString(),
      published: false
    };
    
    fs.writeFileSync(filePath, JSON.stringify(fixedArticle, null, 2));
    console.log(`✅ Fixed article ${i}: ${fixedArticle.title}`);
  } catch (err) {
    console.log(`❌ Error with article ${i}: ${err.message}`);
  }
}

console.log('\n✨ All files fixed!');