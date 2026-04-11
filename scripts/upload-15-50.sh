#!/bin/bash
# Upload articles 15-50 to Supabase

SUPABASE_URL="https://rnjalauqcvamvhpenjtg.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc"

echo "🚀 Uploading articles 15-50..."
echo ""

success=0
failed=0

for i in $(seq 15 50); do
    file="articles/daily/${i}.json"
    
    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        continue
    fi
    
    # Read the JSON file and upload
    response=$(curl -s -X POST "$SUPABASE_URL/rest/v1/articles" \
        -H "Content-Type: application/json" \
        -H "apikey: $SERVICE_KEY" \
        -H "Authorization: Bearer $SERVICE_KEY" \
        -H "Prefer: return=representation" \
        -d @"$file")
    
    if echo "$response" | grep -q '"id"'; then
        title=$(grep -o '"title"[[:space:]]*:[[:space:]]*"[^"]*"' "$file" | head -1 | sed 's/"title": "//;s/"$//')
        scheduled=$(grep -o '"scheduled_publish"[[:space:]]*:[[:space:]]*"[^"]*"' "$file" | head -1 | sed 's/"scheduled_publish": "//;s/"$//')
        echo "✅ Article $i: $title (scheduled: $scheduled)"
        ((success++))
    else
        echo "❌ Failed: $file"
        ((failed++))
    fi
done

echo ""
echo "📊 Summary:"
echo "   Success: $success"
echo "   Failed: $failed"