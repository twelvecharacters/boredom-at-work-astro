# ☕️ Boredom at Work

> Transform your 9-to-5 downtime into personal growth. From mastering AI skills to starting a 3D printing hobby or finding the perfect camera gear — we help you make every boring minute count.

[boredom-at-work.com](https://boredom-at-work.com)

## 🚀 Features

- **Blog Content**: Regularly updated articles on AI, 3D printing, photography, and more.
- **Stealth Learning Paths**: Documentation-style guides designed for discreet learning at work.
- **Full-Text Search**: Powered by [Pagefind](https://pagefind.app/) for fast, client-side searching.
- **Optimized Images**: Automatic thumbnail generation and WebP conversion for performance.
- **Modern Tech Stack**: Built with Astro 5 and Tailwind CSS 4.

## 🛠 Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
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

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Builds for production (includes Pagefind indexing) |
| `npm run preview` | Preview production build locally |
| `npm run thumbnails` | Generate missing blog thumbnails |

## 📬 Contact

- **Author**: bored chap
- **Reddit**: [r/boredom_at_work](https://www.reddit.com/r/boredom_at_work/)
- **Email**: twelvecharacters@proton.me

