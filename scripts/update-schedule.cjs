const fs = require('fs');
const path = require('path');

const startDate = new Date('2026-04-13T08:00:00Z');

for (let i = 1; i <= 50; i++) {
  const filePath = path.join(__dirname, `articles/daily/${i}.json`);
  
  if (fs.existsSync(filePath)) {
    const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const publishDate = new Date(startDate);
    publishDate.setDate(startDate.getDate() + (i - 1));
    
    article.scheduled_publish = publishDate.toISOString();
    
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
    console.log(`Updated article ${i}: ${article.scheduled_publish}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

console.log('Done updating all articles!');