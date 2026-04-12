const CONFIG = {
  supabaseUrl: 'https://rnjalauqcvamvhpenjtg.supabase.co',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc',
};

const JARKATA_OFFSET_HOURS = 7;

function toWIB(jakartaDateStr) {
  if (!jakartaDateStr) return null;
  const utcDate = new Date(jakartaDateStr);
  return new Date(utcDate.getTime() + JARKATA_OFFSET_HOURS * 60 * 60 * 1000);
}

function toUTCWIB(year, month, day, hour = 9, minute = 0) {
  return new Date(Date.UTC(year, month - 1, day, hour - JARKATA_OFFSET_HOURS, minute)).toISOString();
}

async function getAllScheduledArticles() {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?select=id,scheduled_publish&scheduled_publish=not.is.null&published=eq.false&order=scheduled_publish`;
  
  const response = await fetch(url, {
    headers: {
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
    },
  });

  return response.json();
}

async function updateScheduledTime(id, newScheduledPublish) {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?id=eq.${id}`;
  
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': CONFIG.serviceKey,
      'Authorization': `Bearer ${CONFIG.serviceKey}`,
    },
    body: JSON.stringify({ scheduled_publish: newScheduledPublish }),
  });

  return response.ok;
}

async function main() {
  console.log('Fetching scheduled articles...\n');
  const articles = await getAllScheduledArticles();
  
  console.log(`Found ${articles.length} scheduled articles\n`);
  
  let updated = 0;
  for (const article of articles) {
    if (article.scheduled_publish) {
      const wibDate = toWIB(article.scheduled_publish);
      const wibHour = wibDate.getUTCHours();
      
      if (wibHour !== 9) {
        const publishYear = wibDate.getUTCFullYear();
        const publishMonth = wibDate.getUTCMonth() + 1;
        const publishDay = wibDate.getUTCDate();
        
        const newScheduledPublish = toUTCWIB(publishYear, publishMonth, publishDay, 9, 0);
        
        await updateScheduledTime(article.id, newScheduledPublish);
        
        console.log(`Article ${article.id}: ${article.scheduled_publish} → ${newScheduledPublish} (09:00 WIB)`);
        updated++;
      }
    }
  }
  
  console.log(`\nDone! Updated ${updated} articles to 09:00 AM WIB`);
}

main().catch(console.error);