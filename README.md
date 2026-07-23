# ☕️ Boredom at Work

> Transform your 9-to-5 downtime into personal growth. From mastering AI skills to starting a 3D printing hobby or finding the perfect camera gear — we help you make every boring minute count.

[boredom-at-work.com](https://boredom-at-work.com)

## 🚀 Features

- **Blog Content**: Regularly updated articles on AI, 3D printing, photography, and more.
- **Stealth Learning Paths**: Documentation-style guides designed for discreet learning at work.
- **Full-Text Search**: Powered by [Pagefind](https://pagefind.app/) for fast, client-side searching.
- **Optimized Images**: Automatic thumbnail generation and WebP conversion for performance.
- **SEO & Content Optimization**: Automated linting, SEO scoring, and traffic reporting to ensure high quality.
- **Modern Tech Stack**: Built with Astro 7 and Tailwind CSS 4.

## 🛠 Tech Stack

- **Framework**: [Astro 7](https://astro.build/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Search**: [Pagefind](https://pagefind.app/)
- **Processing**: [Sharp](https://sharp.pixelplumbing.com/) (for image optimization)
- **Language**: TypeScript

## 📂 Project Structure

```text
/
├── public/          # Static assets (images, favicon, etc.)
├── scripts/         # Utility scripts (thumbnail generation)
├── src/
│   ├── components/  # Astro & UI components
│   ├── content/     # Blog posts and collections
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route-based pages
│   ├── styles/      # Global CSS and Tailwind
│   └── utils/       # Helper functions
├── astro.config.mjs
└── package.json
```

## 📈 Article Statistics

| Year | Month | Articles |
| :--- | :--- | :--- |
| 2026 | 09 - Sep | 10 |
| 2026 | 08 - Aug | 30 |
| 2026 | 07 - Jul | 31 |
| 2026 | 06 - Jun | 26 |
| 2026 | 05 - May | 29 |
| 2026 | 04 - Apr | 29 |
| 2026 | 03 - Mar | 25 |
| 2026 | 02 - Feb | 36 |
| 2026 | 01 - Jan | 26 |
| 2025 | 12 - Dec | 9 |
| **Total** | | **251** |


## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs dependencies |
| `pnpm run dev` | Starts local dev server at `localhost:4321` |
| `pnpm run build` | Builds for production (includes Pagefind indexing) |
| `pnpm run preview` | Preview production build locally |
| `pnpm run optimize` | Run the Unified Content Optimization Tool (Daily Dashboard, SEO Scores, Linting) |
| `pnpm run lint:content` | Run content linting (frontmatter, outdated patterns, prices) |
| `pnpm run lint:content:fix` | Fix content linting issues |
| `pnpm run traffic` | Fetch traffic reports from Google Search Console and Bing |
| `pnpm run indexnow` | Submit changed URLs to IndexNow |
| `pnpm run stats` | Update article statistics in README.md |
| `pnpm run export:articles` | Export all article metadata to a CSV for analysis |

## 📬 Contact

- **Author**: bored chap
- **Reddit**: [r/boredom_at_work](https://www.reddit.com/r/boredom_at_work/)
- **Email**: twelvecharacters@proton.me

