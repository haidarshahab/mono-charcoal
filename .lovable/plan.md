

# Admin Blog System with Simple Password Gate

## Overview
Add a password-protected admin page at `/admin` where you can write and publish blog posts. Blog data will be stored in localStorage (no database needed). The public blog section will read from this same store, falling back to the current hardcoded posts.

## What gets built

### 1. Admin login gate (`/admin`)
- Simple password input screen styled with the Mono brand
- Password stored as a constant (you can change it anytime in the code)
- Session kept in `sessionStorage` so refreshing stays logged in

### 2. Blog post editor (`/admin` after login)
- List of all posts with edit/delete actions
- "New Post" form with: title, excerpt, cover image URL (optional), and a rich body textarea (Markdown-friendly)
- Publish/unpublish toggle and date picker
- Clean, minimal admin UI using existing shadcn components (Card, Button, Input, Textarea)

### 3. Blog post storage
- All posts saved to `localStorage` under a `mono-blog-posts` key
- Each post: `{ id, title, excerpt, body, date, published, coverImage }`
- Seed with the 3 existing hardcoded posts on first load

### 4. Public blog updates
- `BlogSection.tsx` reads from localStorage instead of the hardcoded array, showing only `published` posts
- Add a `/blog/:id` route for full post pages with the body content rendered

### 5. Routing
- `/admin` — password gate + post manager
- `/blog/:id` — individual blog post page

## Technical details
- New files: `src/pages/Admin.tsx`, `src/pages/BlogPost.tsx`, `src/lib/blog-storage.ts`
- Modified: `src/App.tsx` (routes), `src/components/BlogSection.tsx` (read from storage)
- No database or Supabase needed — purely client-side with localStorage
- Admin password defined as a constant in `Admin.tsx`

## Limitations
- localStorage is per-browser — posts written on one device won't appear on another
- If you later want multi-device sync, we can migrate to Supabase with minimal changes

