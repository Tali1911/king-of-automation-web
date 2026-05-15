## Goal
Move the 8 hardcoded blog posts in `src/data/blogPosts.ts` into the `blog_posts` Supabase table so they show up in the admin Blog CMS and can be edited like any other post.

## Approach

1. **Seed the database** — Insert all 8 static posts into the `blog_posts` table using the insert tool (data operation, not schema). Each post will be mapped:
   - `title`, `excerpt`, `content` → direct copy
   - `slug` → generated from title (e.g. `the-future-of-automation-in-small-business`)
   - `featured_image` → `image` URL
   - `status` → `published`
   - `published_at` → parsed from the `date` field (e.g. "May 15, 2025")
   - `created_at` → same as published_at to preserve order
   - `author_id` → null (static authors like "Sarah Johnson" aren't real admin users)
   - Idempotent: use `ON CONFLICT (slug) DO NOTHING` so re-runs are safe.

2. **Update public blog pages to read from DB** — Currently `BlogPage`, `FeaturedPosts`, `RecentPosts`, `RelatedPosts`, and `BlogPostPage` likely read from the static `blogPosts.ts`. After seeding, these need to fetch from `blog_posts` (filtered to `status = 'published'`) so edits in the CMS actually surface on the public site. Otherwise seeding alone is cosmetic — admin can edit, but visitors still see the static file.
   - Reuse existing `useBlogPosts` hook or create a public `usePublishedBlogPosts` variant (no auth required, RLS already allows public read of published posts — to be confirmed when reading the table policy).

3. **Retire `src/data/blogPosts.ts`** — Once the public pages read from the DB, delete the file (or keep as a one-time seed reference). Author name/role aren't in the schema, so they'll be dropped unless we want to extend the schema (out of scope unless requested).

## Technical notes

- Schema fields not present for static data: `author` (name) and `authorRole`. These will be lost unless we add columns. Recommend dropping for now since the CMS doesn't manage them either.
- `readTime` and `category` are also not in `blog_posts`. Same trade-off — drop unless schema is extended.
- Seeding runs once via the Supabase insert tool; no migration needed.

## Questions before I implement

1. **Lossy fields** — `author` (e.g. "Sarah Johnson"), `authorRole`, `category`, and `readTime` aren't in the `blog_posts` schema. Options:
   - (a) Drop them (simplest, fastest)
   - (b) Add columns to `blog_posts` so they're preserved and editable in the CMS
2. **Public site rewiring** — Should I also switch the public blog pages (`BlogPage`, post detail, featured/recent/related) to read from the DB so CMS edits actually appear live? Strongly recommended; otherwise seeding has no visible effect on visitors.
