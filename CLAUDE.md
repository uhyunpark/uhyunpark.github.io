# uhyun.me

Personal blog/portfolio site built with Vite + React + TypeScript.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite (use `bun` as package manager)
- **Routing:** React Router
- **Styling:** Tailwind CSS + @tailwindcss/typography
- **Markdown:** react-markdown

## Project Structure

```
src/
├── main.tsx         # Entry point with routing
├── App.tsx          # Home page (toggle between personal/resume)
├── lib/
│   └── writings.ts           # Loads src/writings/*.md, parses frontmatter, sorted list + lookup
├── pages/
│   ├── WritingsPage.tsx      # /writing - list all posts, grouped by year
│   └── WritingDetailPage.tsx # /writing/:slug - single post
├── writings/        # Markdown posts with frontmatter (slug = filename)
├── data/            # JSON content/metadata
│   ├── exp.json
│   ├── education.json
│   ├── interest.json
│   └── otherworks.json
└── assets/          # Images
```

## Routes

- `/` - Home page (default: personal content; toggle: resume/work experience)
- `/writing` - All writing list
- `/writing/:slug` - Individual writing detail page

## Adding New Writings

Create `src/writings/<slug>.md`. The filename (without `.md`) is the slug.

```md
---
title: Post Title
date: 2026-01-03
excerpt: Optional short summary for the list page
---

Markdown body (GFM tables, footnotes, code blocks supported).
```

- `title` and `date` (YYYY-MM-DD) are required. `excerpt` is optional.
- Images: put files in `public/writing/<slug>/` and reference them as `![alt](/writing/<slug>/file.png)`.
- External posts: add `url: https://...` to the frontmatter. The post links out (new tab) and the body can be empty.

## Commands

```bash
bun install    # Install dependencies
bun dev        # Start dev server
bun build      # Build for production
```
