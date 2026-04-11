#!/bin/bash

SUPABASE_URL="https://rnjalauqcvamvhpenjtg.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc"

# Article 17-50 - upload each
# Let's do a few test

echo "Uploading article 17..."
curl -s -X POST "$SUPABASE_URL/rest/v1/articles" \
  -H "Content-Type: application/json" \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -d '{"title":"Nordic Charcoal Markets","slug":"nordic-charcoal-markets-sweden-denmark-finland","excerpt":"Sweden Denmark Finland premium markets","category":"Market Insights","keywords":["Sweden","Denmark","Finland","Nordic","Premium","Sustainable","BBQ"],"date":"2024-01-31","read_time":"8 min read","scheduled_publish":"2026-04-29T08:00:00Z","published":false}'