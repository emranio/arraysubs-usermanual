# ArraySubs User Manual — Static Site Generator

## Overview

Build a Node.js CLI tool that converts the `markdowns/` directory into a fully functional static documentation site. The output should be a self-contained `dist/` folder ready for deployment to any static host (Netlify, GitHub Pages, S3, etc.).

---

## Source Structure

```
user-manual/
├── .env                   # Site configuration
├── project-requirements.md
├── markdowns/             # Source content (input)
│   ├── README.md          # → dist/index.html (site home)
│   ├── getting-started/
│   │   ├── README.md      # → dist/getting-started/index.html
│   │   ├── overview.md    # → dist/getting-started/overview.html
│   │   └── ...
│   ├── customer-portal/
│   ├── general-settings/
│   ├── manage-subscription-admin/
│   ├── member-access/
│   ├── plan-switching/
│   ├── cancellation-and-retention-offers/
│   ├── store-credit/
│   ├── feature-manager/
│   ├── automatic-payment-gateways/
│   └── toolkit/
├── src/                   # Generator source code
└── dist/                  # Generated output (gitignored)
```

### Markdown Conventions

- **No YAML frontmatter.** Every `.md` file starts with an `# Info` block containing metadata as bullet points (Module, Plugin/Availability, Last updated).
- Internal links use **relative paths** with `.md` extensions (e.g., `./overview.md`, `../customer-portal/README.md`).
- **Images are co-located** next to their `.md` files in the same directory (e.g., `photo ai (1).png` lives alongside the `.md` that references it).
- Image references use standard Markdown syntax: `![Alt](filename.png)`.
- Filenames may contain spaces and special characters.
- `README.md` in any directory is the index page for that section.

---

## Output Structure

```
dist/
├── index.html                              # from markdowns/README.md
├── getting-started/
│   ├── index.html                          # from getting-started/README.md
│   ├── overview.html                       # from getting-started/overview.md
│   └── create-subscription-products/
│       ├── index.html
│       ├── simple-product.html
│       └── variable-product.html
├── customer-portal/
│   ├── index.html
│   └── *.html
├── ... (mirrors markdowns/ tree)
├── assets/
│   ├── style.css
│   ├── script.js
│   ├── favicon.*                           # copied from static/
│   └── logo.*                              # copied from static/
├── llms.txt                                # LLM-friendly site dump
└── sitemap.xml                             # XML sitemap
```

### File Mapping Rules

| Source | Output | Rule |
|--------|--------|------|
| `README.md` | `index.html` | Every `README.md` becomes the directory's `index.html` |
| `page-name.md` | `page-name.html` | Every other `.md` becomes a sibling `.html` |
| Non-`.md` files (images, PDFs, etc.) | Copied as-is | Preserve relative path and filename exactly (including spaces) |
| Internal `.md` links | Rewritten to `.html` | `./overview.md` → `./overview.html`, `../portal/README.md` → `../portal/` |

### Image & Attachment Handling

Images and other non-`.md` files live **alongside the markdown files** that reference them.

**Source example:**
```
markdowns/cancellation-and-retention-offers/
├── admin-subscription-detail-actions.md
├── photo ai (1).png                        ← co-located image
├── customer-portal-flow.md
└── settings-page.md
```

**Output:**
```
dist/cancellation-and-retention-offers/
├── admin-subscription-detail-actions.html
├── photo ai (1).png                        ← copied as-is to same relative path
├── customer-portal-flow.html
└── index.html
```

**Rules:**
- Copy every non-`.md` file from `markdowns/` into `dist/` preserving its exact relative directory path and filename.
- Do **not** rename files or strip spaces. `photo ai (1).png` stays `photo ai (1).png`.
- In the generated HTML, image `src` attributes must URL-encode spaces: `photo%20ai%20(1).png`.
- The Markdown renderer handles this automatically — `![Image](photo ai (1).png)` renders with the correct encoded `src`.
- Support common image formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`.
- Support other attachment types: `.pdf`, `.zip`, `.mp4`, etc. (just copy, no special rendering).
- Images in the rendered HTML should be wrapped in a `<figure>` with an optional `<figcaption>` when alt text is provided.
- Add `loading="lazy"` to all `<img>` tags for performance.
- Images should be responsive: `max-width: 100%; height: auto;`.

### Link Rewriting Details

- `./file.md` → `./file.html`
- `./file.md#section` → `./file.html#section`
- `./README.md` → `./` (directory index)
- `../dir/README.md` → `../dir/`
- `../dir/file.md` → `../dir/file.html`
- External links (`https://...`) are left untouched
- Anchor-only links (`#section`) are left untouched

---

## Environment Configuration (`.env`)

```env
SITE_TITLE=ArraySubs Documentation
SITE_TAGLINE=WooCommerce Subscription Plugin User Manual
SITE_BASE_URL=/docs/
FAVICON_FILENAME=favicon.ico
LOGO_FILENAME=logo.svg
PORT=3000
```

| Variable | Description | Example |
|----------|-------------|----------|
| `SITE_TITLE` | Page `<title>` prefix and header text | `ArraySubs Documentation` |
| `SITE_TAGLINE` | Subtitle shown below the title in the header | `WooCommerce Subscription Plugin User Manual` |
| `SITE_BASE_URL` | Base path for all generated URLs (supports subdirectory hosting) | `/docs/` or `/` |
| `FAVICON_FILENAME` | Favicon file name (placed in `static/` folder) | `favicon.ico` |
| `LOGO_FILENAME` | Logo file name (placed in `static/` folder) | `logo.svg` |
| `PORT` | Dev server port | `3000` |

---

## Static Assets

A `static/` folder at the project root holds files that are copied directly into `dist/assets/`:

```
user-manual/
├── static/
│   ├── favicon.ico
│   ├── logo.svg
│   └── (any other static asset)
```

These are referenced in the `.env` by filename only.

---

## HTML Template & Layout

Every generated page uses the same shell layout:

### Page Structure

```
┌──────────────────────────────────────────────────────┐
│  Header: Logo + Site Title + Tagline                 │
├────────────┬─────────────────────────────────────────┤
│            │                                         │
│  Sidebar   │  Main Content                           │
│  (nav)     │  ┌───────────────────────────────────┐  │
│            │  │ Breadcrumb                        │  │
│  - Section │  │ Page Title (from first # heading) │  │
│    - Page  │  │ Rendered Markdown body             │  │
│    - Page  │  │                                   │  │
│  - Section │  │                                   │  │
│    - Page  │  │                                   │  │
│            │  └───────────────────────────────────┘  │
│            │                                         │
│            │  On-this-page (Table of Contents)       │
│            │  (from ## and ### headings)              │
├────────────┴─────────────────────────────────────────┤
│  Footer: "Built with ArraySubs Docs" + year          │
└──────────────────────────────────────────────────────┘
```

### Sidebar Navigation

- Auto-generated from the `markdowns/` folder structure.
- Top-level directories are sections (collapsible groups).
- Pages within each section listed alphabetically, with `README.md` (index) as the first item.
- Current page is highlighted. Current section is expanded.
- Section labels derived from folder names: `getting-started` → `Getting Started`.
- Page labels derived from the first `# User Guide` or first `#` heading in the file. Fallback to filename: `simple-product.md` → `Simple Product`.

### Breadcrumb

- Shows: `Home / Section / Page`
- Each segment is a link except the current page.
- Example: `Home / Getting Started / Create Subscription Products / Simple Product`

### Table of Contents (On This Page)

- Generated from `##` and `###` headings within the current page.
- Displayed as a right-side sticky panel on wide screens.
- Collapses below the content on narrow screens.
- Each entry links to the heading's anchor.

### Responsive Behavior

- **Desktop (≥1024px):** 3-column layout — sidebar, content, ToC.
- **Tablet (768–1023px):** 2-column — sidebar collapses to hamburger, ToC moves below content.
- **Mobile (<768px):** Single column — hamburger nav, ToC below content.

---

## Markdown Rendering

- Use a proven Markdown library (e.g., `marked`, `markdown-it`).
- Support GitHub Flavored Markdown: tables, task lists, fenced code blocks, strikethrough, autolinks.
- Syntax highlighting for fenced code blocks (e.g., `highlight.js` or `prism`).
- Auto-generate heading anchors (GitHub-style slugs) for `##` and `###` headings.
- Parse the `# Info` block at the top to extract metadata (Module, Availability/Plugin, Last updated) — use it for `<meta>` tags and display but do **not** render it as visible page content.
- The first `# User Guide` heading (or first `#` if no `# User Guide`) becomes the page `<title>` and visible page title. If the page has no `# User Guide` heading, use the first `#` heading instead. The `# Info` header must not be used as the page title.
- **Availability metadata**: The `# Info` block may contain `Availability: Pro`, `Availability: Shared`, `Plugin: Pro`, or `Plugin: Free`. When the value is `Pro`, render a visible **Pro badge** next to the page title and in the sidebar nav item.

### Image Rendering

- `![Alt text](image.png)` renders as:
  ```html
  <figure>
    <img src="image.png" alt="Alt text" loading="lazy" />
    <figcaption>Alt text</figcaption>
  </figure>
  ```
- If alt text is empty (`![](image.png)`), skip the `<figcaption>` and render a plain `<img>` with `loading="lazy"`.
- URL-encode spaces in `src` attributes: `photo ai (1).png` → `photo%20ai%20(1).png`.
- Image paths are relative to the `.md` file — since images are co-located, paths stay correct after copy.

### Mermaid Diagrams

- Some markdown files contain fenced code blocks with ` ```mermaid`. These should be rendered as `<pre><code class="language-mermaid">` blocks.
- Optionally support client-side Mermaid rendering via a small JS snippet, but this is not required for the initial build. If skipped, they display as code blocks.

---

## Generated Files

### `llms.txt`

A plain-text file at `dist/llms.txt` containing the full site content in a format friendly to LLMs:

```
# {SITE_TITLE}

> {SITE_TAGLINE}

## Table of Contents

- Getting Started: /getting-started/
  - Overview: /getting-started/overview.html
  - Simple Product: /getting-started/create-subscription-products/simple-product.html
  ...

## Full Content

---
URL: /getting-started/overview.html
Title: Subscription Products Overview
---

{raw markdown body without the # Info block}

---
URL: /getting-started/create-subscription-products/simple-product.html
Title: Create a Simple Subscription Product
---

{raw markdown body without the # Info block}

...
```

### `sitemap.xml`

Standard XML sitemap at `dist/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>{SITE_BASE_URL}</loc>
    <lastmod>2026-03-28</lastmod>
  </url>
  <url>
    <loc>{SITE_BASE_URL}getting-started/</loc>
    <lastmod>2026-03-16</lastmod>
  </url>
  ...
</urlset>
```

- `lastmod` is taken from the `# Info` block's `Last updated` field when available. Falls back to build date.
- URLs use `SITE_BASE_URL` as the prefix.

---

## Build System

### Commands

```bash
npm run build        # Full production build → dist/
npm run dev          # Development mode: watch markdowns + rebuild + live reload
npm run design       # Template design mode: hot-reload layout with dummy content
npm run clean        # Remove dist/
```

### Build Pipeline

1. **Clean** `dist/`.
2. **Scan** `markdowns/` recursively — collect all `.md` files and non-`.md` assets (images, PDFs, etc.).
3. **Parse** each `.md` file:
   - Extract `# Info` metadata (Module, Availability, Last updated).
   - Extract page title from first heading after `# Info`.
   - Convert Markdown to HTML.
   - Rewrite internal `.md` links to `.html` (and `README.md` links to directory paths).
4. **Build navigation tree** from the folder structure.
5. **Render** each page into the HTML template with sidebar, breadcrumb, ToC.
6. **Copy** non-`.md` assets (images, attachments) from `markdowns/` preserving relative directory paths.
7. **Copy** `static/` contents into `dist/assets/`.
8. **Generate** `llms.txt`.
9. **Generate** `sitemap.xml`.
10. **Write** all files to `dist/`.

### Dev Server (`npm run dev`)

- Watch `markdowns/`, `static/`, and `src/` for changes.
- Rebuild affected pages on save.
- Serve `dist/` on `http://localhost:3000` (configurable via `PORT` env var).
- **Live reload** — injects a small script that auto-refreshes the browser when files change.

### Template Design Mode (`npm run design`)

A dedicated mode for designing and iterating on the HTML layout template without needing real markdown content.

**How it works:**

1. Loads a dummy content file (`src/templates/dummy-content.html`) that contains representative rendered HTML — headings, paragraphs, code blocks, tables, images, lists, blockquotes, and all other Markdown-generated elements.
2. Renders that dummy content into the full page shell (header, sidebar, breadcrumb, ToC, footer) using the real template.
3. Watches `src/templates/`, `src/style.css`, and `src/script.js` for changes.
4. **Hot-reloads** on every save — CSS changes inject instantly without full page refresh; HTML/JS changes trigger a quick browser refresh.
5. Serves on `http://localhost:3001` (separate port from dev server so both can run simultaneously).

**What the dummy content includes:**

- All heading levels (`h1`–`h6`)
- Paragraphs with inline formatting (bold, italic, code, links)
- Ordered and unordered lists, nested lists, task lists
- Fenced code blocks with syntax highlighting (multiple languages)
- Tables (simple and complex)
- Blockquotes and nested blockquotes
- Images with captions (to test the `<figure>` rendering)
- Mermaid diagrams (rendered as code blocks)
- Horizontal rules
- A realistic sidebar with multiple sections and pages
- Breadcrumb with 3–4 levels
- ToC with 8–10 entries

**File structure for template design:**

```
src/
├── templates/
│   ├── layout.html          # The main page shell template
│   ├── dummy-content.html   # Representative content for design mode
│   └── partials/
│       ├── header.html
│       ├── sidebar.html
│       ├── breadcrumb.html
│       ├── toc.html
│       └── footer.html
├── style.css
└── script.js
```

This way, you can design the full site layout, tweak CSS, adjust the sidebar behavior, and iterate on the template visually — all with instant feedback — before running an actual build against the real markdown content.

---

## Styling

- Clean, professional documentation theme.
- Use **vanilla CSS** (no frameworks, no Tailwind, no CSS-in-JS).
- CSS file: `src/style.css` → copied/built into `dist/assets/style.css`.
- Light color scheme. Readable typography (system font stack or similar).
- Consistent spacing, subtle borders, and clear visual hierarchy.
- Code blocks styled with a syntax highlighting theme (light-friendly).
- Smooth scrolling for anchor links.
- Print-friendly styles (hide sidebar and nav, full-width content).
- **Images**: responsive (`max-width: 100%; height: auto`), optional border/shadow, wrapped in `<figure>` when alt text exists.
- **Pro badge**: pages where `# Info` has `Availability: Pro` or `Plugin: Pro` should show a visible "Pro" badge next to the page title.

---

## JavaScript

- Minimal vanilla JS — no frameworks, no bundlers needed.
- JS file: `src/script.js` → copied into `dist/assets/script.js`.
- Features:
  - Sidebar toggle on mobile (hamburger menu).
  - ToC active-heading highlight on scroll.
  - Sidebar current-section expand/collapse.
  - Copy-to-clipboard button on code blocks.
  - Smooth scroll for anchor links.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Runtime | Node.js (18+) |
| Markdown | `markdown-it` (or `marked`) |
| Syntax highlighting | `highlight.js` |
| Templating | Simple string templates or a lightweight engine (e.g., `ejs`, `nunjucks`) |
| File watching | `chokidar` |
| Dev server | `live-server` or built-in `http` module |
| Env | `dotenv` |

No heavy build tools like Webpack or Vite. This is a simple file-to-file transformation pipeline.

---

## Constraints

- **No TypeScript.** Plain JavaScript only.
- **No CSS frameworks.** Vanilla CSS.
- **No client-side frameworks.** Vanilla JS.
- **Zero client-side routing.** Every page is a standalone `.html` file.
- **No external CDN dependencies.** All CSS/JS assets are local.
- All generated HTML must be valid, semantic, and accessible (proper heading hierarchy, landmark roles, alt attributes).
- Output must work when opened directly from the file system (`file://`) as well as from a web server, with the caveat that `SITE_BASE_URL` is respected for absolute paths.

---

## Project Setup

```
user-manual/
├── .env                       # Site configuration
├── .gitignore                 # dist/, node_modules/
├── package.json
├── project-requirements.md
├── static/                    # Favicon, logo, other static files
│   ├── favicon.ico
│   └── logo.svg
├── markdowns/                 # Source markdown content (with co-located images)
│   ├── README.md
│   ├── getting-started/
│   │   ├── README.md
│   │   ├── overview.md
│   │   └── ...
│   └── cancellation-and-retention-offers/
│       ├── admin-subscription-detail-actions.md
│       ├── photo ai (1).png   ← image co-located with its markdown
│       └── ...
├── src/                       # Generator source code
│   ├── index.js               # Entry point / CLI (build, dev, design commands)
│   ├── parser.js              # Markdown parsing + metadata extraction
│   ├── renderer.js            # HTML template rendering
│   ├── navigation.js          # Sidebar + breadcrumb generation
│   ├── links.js               # Link rewriting logic
│   ├── assets.js              # Copy images/attachments from markdowns/
│   ├── sitemap.js             # Sitemap generator
│   ├── llms.js                # llms.txt generator
│   ├── dev-server.js          # Dev server with live reload
│   ├── design-server.js       # Template design server with hot reload
│   ├── style.css              # Site stylesheet
│   ├── script.js              # Client-side JS
│   └── templates/             # HTML templates
│       ├── layout.html        # Main page shell
│       ├── dummy-content.html # Dummy content for design mode
│       └── partials/
│           ├── header.html
│           ├── sidebar.html
│           ├── breadcrumb.html
│           ├── toc.html
│           └── footer.html
└── dist/                      # Build output (gitignored)
```