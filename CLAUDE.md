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
├── pages/
│   ├── WritingsPage.tsx      # /writings - list all posts
│   └── WritingDetailPage.tsx # /writings/:slug - single post
├── writings/        # Markdown files for blog posts
│   └── hello-world.md
├── data/            # JSON content/metadata
│   ├── writings.json   # Post metadata (title, excerpt, date, slug)
│   ├── exp.json
│   ├── education.json
│   ├── interest.json
│   └── otherworks.json
└── assets/          # Images
```

## Routes

- `/` - Home page (default: personal content; toggle: resume/work experience)
- `/writings` - All writings list
- `/writings/:slug` - Individual writing detail page

## Adding New Writings

1. Create markdown file in `src/writings/` (e.g., `my-post.md`)
2. Add metadata to `src/data/writings.json`:

```json
{
  "title": "Post Title",
  "excerpt": "Short summary for listings",
  "date": "YYYY-MM-DD",
  "slug": "my-post"
}
```

The `slug` must match the markdown filename (without `.md`).

## Commands

```bash
bun install    # Install dependencies
bun dev        # Start dev server
bun build      # Build for production
```
