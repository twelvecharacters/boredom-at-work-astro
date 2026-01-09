# Migration Summary: WordPress → Astro

**Datum:** 9. Januar 2026
**Projekt:** boredom-at-work.com

---

## Was wurde gemacht

### 1. Astro-Projekt erstellt
- Astro 5 mit Tailwind CSS 4
- Content Collections für Blog-Posts
- Responsive Design (Mobile-first)

### 2. Layouts & Komponenten
- `BaseLayout.astro` - Basis-Layout mit SEO Meta-Tags
- `BlogPost.astro` - Blog-Post Layout mit Schema.org
- `Header.astro` - Navigation mit Mobile-Menü
- `Footer.astro` - Footer mit Links

### 3. Seiten
- Homepage (`/`)
- Blog-Übersicht (`/blog/`)
- Dynamische Blog-Posts (`/[slug]/`)

### 4. Blog-Artikel migriert (10 Stück)
1. `best-free-ai-courses.md`
2. `chatgpt-tutorial-beginners.md`
3. `google-ai-essentials-review.md`
4. `learn-ai-while-looking-busy.md`
5. `ai-certifications-in-a-week.md`
6. `best-ai-courses-coursera.md`
7. `free-vs-paid-ai-courses.md`
8. `prompt-engineering-afternoon.md`
9. `ai-skills-for-promotion.md`
10. `productive-things-bored-at-work.md`

### 5. SEO & Analytics
- Google Analytics 4 (GT-PL3RVFQX)
- Schema.org JSON-LD Markup
- Open Graph Meta-Tags
- Sitemap (`/sitemap-index.xml`)
- robots.txt

### 6. Deployment
- GitHub Repository: https://github.com/twelvecharacters/boredom-at-work-astro
- Hosting: Netlify
- Domain: boredom-at-work.com
- SSL: Automatisch via Netlify

### 7. DNS-Umstellung (Netcup)
- A-Record: `@` → `75.2.60.5`
- A-Record: `*` → `75.2.60.5`
- CNAME: `www` → `boredom-at-work.netlify.app`

---

## Projektstruktur

```
boredom-at-work-astro/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── content/
│   │   └── blog/
│   │       └── *.md (10 Artikel)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── blog/index.astro
│   │   └── [...slug].astro
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── public/
│   ├── images/
│   ├── robots.txt
│   └── favicon.ico
├── astro.config.mjs
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## Workflow für neue Posts

### Neuen Artikel erstellen:
```bash
# 1. Datei erstellen
touch src/content/blog/mein-artikel.md
```

### Post-Template:
```markdown
---
title: "Artikel Titel"
description: "SEO Beschreibung"
publishDate: 2026-01-09
author: "bored chap"
tags: ["Tag1", "Tag2"]
draft: false
---

Inhalt in Markdown...
```

### Veröffentlichen:
```bash
git add .
git commit -m "Add: Neuer Artikel"
git push
```

Netlify deployed automatisch (~30 Sekunden).

---

## Wichtige URLs

| Beschreibung | URL |
|--------------|-----|
| Live-Seite | https://boredom-at-work.com |
| Netlify Dashboard | https://app.netlify.com |
| GitHub Repo | https://github.com/twelvecharacters/boredom-at-work-astro |
| Google Analytics | https://analytics.google.com |
| Search Console | https://search.google.com/search-console |
| Sitemap | https://boredom-at-work.com/sitemap-index.xml |

---

## Technische Details

- **Framework:** Astro 5
- **CSS:** Tailwind CSS 4
- **Node Version:** 20
- **Build Zeit:** ~2 Sekunden
- **Generierte Seiten:** 12

---

## Noch zu erledigen

- [ ] Sitemap bei Google Search Console neu einreichen (nach DNS-Propagation)
- [ ] Altes WordPress-Hosting kündigen
- [ ] Backup der alten WordPress-Seite behalten
