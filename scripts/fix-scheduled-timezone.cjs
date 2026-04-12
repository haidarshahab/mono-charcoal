/**
 * Fix all scheduled articles to use Jakarta timezone
 * Run: node scripts/fix-scheduled-timezone.cjs
 */

const CONFIG = {
  supabaseUrl: 'https://rnjalauqcvamvhpenjtg.supabase.co',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc',
};

const JARKATA_OFFSET_HOURS = 7; // UTC+7 (WIB/Jakarta Time)

function toJakartaISO(isoDateStr) {
  if (!isoDateStr) return null;
  const utcDate = new Date(isoDateStr);
  const jakartaDate = new Date(utcDate.getTime() + JARKATA_OFFSET_HOURS * 60 * 60 * 1000);
  return jakartaDate.toISOString();
}

async function getAllScheduledArticles() {
  const url = `${CONFIG.supabaseUrl}/rest/v1/articles?select=id,scheduled_publish&scheduled_publish=not.is.null&published=eq.false`;
  
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
  console.log('Fetching all scheduled articles...');
  const articles = await getAllScheduledArticles();
  
  console.log(`Found ${articles.length} scheduled articles\n`);
  
  let updated = 0;
  for (const article of articles) {
    if (article.scheduled_publish) {
      const jakartaTime = toJakartaISO(article.scheduled_publish);
      const success = await updateScheduledTime(article.id, jakartaTime);
      if (success) {
        console.log(`Updated ${article.id}: ${article.scheduled_publish} → ${jakartaTime}`);
        updated++;
      }
    }
  }
  
  console.log(`\nDone! Updated ${updated} articles.`);
}

main().catch(console.error);