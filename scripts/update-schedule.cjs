const fs = require('fs');
const path = require('path');

const JARKATA_OFFSET_HOURS = 7;

const wibToUTC = (year, month, day, hour = 9, minute = 0) => {
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - JARKATA_OFFSET_HOURS, minute));
  return utcDate.toISOString();
};

const startDate = new Date('2026-04-13');
const year = startDate.getUTCFullYear();
const month = startDate.getUTCMonth() + 1;
const day = startDate.getUTCDate();

for (let i = 1; i <= 50; i++) {
  const filePath = path.join(__dirname, `articles/daily/${i}.json`);
  
  if (fs.existsSync(filePath)) {
    const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const publishDate = new Date(year, month - 1, day + (i - 1));
    const publishYear = publishDate.getUTCFullYear();
    const publishMonth = publishDate.getUTCMonth() + 1;
    const publishDay = publishDate.getUTCDate();
    
    article.scheduled_publish = wibToUTC(publishYear, publishMonth, publishDay, 9, 0);
    
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
    console.log(`Article ${i}: ${article.scheduled_publish}`);
  }
}

console.log('\nDone! All 50 articles scheduled at 09:00 AM WIB');