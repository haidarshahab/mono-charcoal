# Automated Daily Blog System

## Overview

This system automatically generates and publishes blog articles daily through GitHub Actions.

## Components

```
├── articles/
│   └── daily/
│       ├── 1.json   # Day 1 article
│       ├── 2.json   # Day 2 article
│       └── 50.json  # Day 50 article
├── scripts/
│   ├── generate-sitemap.js    # Generates sitemap
│   └── upload-article.js      # Uploads article to Supabase
├── .github/
│   └── workflows/
│       └── daily-article.yml   # GitHub Actions workflow
└── public/
    └── sitemap.xml            # Auto-updated sitemap
```

## How It Works

1. **Daily at 8:00 UTC** - GitHub Actions triggers automatically
2. **Selects Article** - Uses day of month to select article (1-50)
3. **Uploads to Supabase** - Article saved as DRAFT (not published)
4. **Updates Sitemap** - sitemap.xml regenerated
5. **Commits & Pushes** - Changes pushed to GitHub
6. **Vercel Deploys** - New sitemap goes live

## Usage

### Manual Trigger

Go to GitHub → Actions → "Daily Blog Article Generator" → "Run workflow"

### Adding New Articles

Add JSON files to `articles/daily/[number].json`:

```json
{
  "title": "Your Article Title",
  "slug": "your-article-slug",
  "excerpt": "Brief summary...",
  "category": "Industry Knowledge",
  "keywords": ["keyword1", "keyword2"],
  "date": "2024-01-01",
  "read_time": "8 min read",
  "content": "Full article content..."
}
```

### Article Review Flow

1. Article uploads as DRAFT
2. Check Admin panel `/admin/articles`
3. Review content
4. Click Publish when ready

## Environment Variables

Required in GitHub Secrets:
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for Supabase

## Configuration

Edit `.github/workflows/daily-article.yml` to modify:
- Schedule time (cron)
- Article selection logic

## Support

For issues or questions, contact the development team.