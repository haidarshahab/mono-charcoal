#!/bin/bash
# Upload all 50 articles to Supabase

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is required. Install with: brew install jq (macOS) or apt-get install jq (Linux)"
    exit 1
fi

SUPABASE_URL="https://rnjalauqcvamvhpenjtg.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc"

echo "🚀 Uploading 50 articles to Supabase..."
echo ""

success=0
failed=0

for i in {1..50}; do
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
    
    if echo "$response" | jq -e '.id' > /dev/null 2>&1; then
        title=$(jq -r '.title' "$file")
        scheduled=$(jq -r '.scheduled_publish // "none"' "$file")
        echo "✅ Article $i: $title (scheduled: $scheduled)"
        ((success++))
    else
        echo "❌ Failed: $file - $response"
        ((failed++))
    fi
done

echo ""
echo "📊 Summary:"
echo "   Success: $success"
echo "   Failed: $failed"