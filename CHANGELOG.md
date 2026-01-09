# Boredom at Work - Projekt Changelog

## Migration & Setup (Januar 2026)

### WordPress zu Astro Migration
- Komplette Migration von WordPress zu Astro 5
- Tailwind CSS 4 mit @theme Variablen
- Content Collections mit Zod Schema
- Komponenten: Header, Footer
- Layouts: BaseLayout, BlogPost
- 10 Blog-Artikel migriert

### Deployment
- GitHub Repository: `twelvecharacters/boredom-at-work-astro`
- Netlify Deployment mit automatischem Build
- Custom Domain: boredom-at-work.com
- DNS bei Netcup konfiguriert (A Record + CNAME)

---

## SEO Optimierungen

### Google Search Console
- Sitemap eingereicht
- Redirect von `/sitemap.xml` zu `/sitemap-index.xml` in netlify.toml

### Meta Tags & Structured Data
- Open Graph Tags (Facebook)
- Twitter Cards
- Schema.org JSON-LD (Organization, Article)
- Canonical URLs
- Meta Description für alle Seiten

### Featured Images
Alle 10 Artikel haben Featured Images:
- ai-certifications-in-a-week.md → /images/ai-certifications.jpg
- ai-skills-for-promotion.md → /images/ai-skills-promotion.jpg
- best-ai-courses-coursera.md → /images/coursera-courses.jpg
- best-free-ai-courses.md → /images/best-ai-free-courses.jpg
- chatgpt-tutorial-beginners.md → /images/chatgpt.jpg
- free-vs-paid-ai-courses.md → /images/free-vs-paid.jpg
- google-ai-essentials-review.md → /images/google-ai.jpg
- learn-ai-while-looking-busy.md → /images/looking-busy.jpg
- productive-things-bored-at-work.md → /images/productive-work.jpg
- prompt-engineering-afternoon.md → /images/prompt-engineering.jpg

### Interne Verlinkung
Alle 10 Artikel sind untereinander verlinkt (3-4 Links pro Artikel):
- productive-things-bored-at-work → google-ai-essentials-review, ai-certifications-in-a-week, learn-ai-while-looking-busy
- best-free-ai-courses → prompt-engineering-afternoon, ai-certifications-in-a-week, chatgpt-tutorial-beginners
- chatgpt-tutorial-beginners → prompt-engineering-afternoon, google-ai-essentials-review, best-ai-courses-coursera
- ai-skills-for-promotion → prompt-engineering-afternoon, google-ai-essentials-review, chatgpt-tutorial-beginners
- google-ai-essentials-review → prompt-engineering-afternoon, best-free-ai-courses
- learn-ai-while-looking-busy → google-ai-essentials-review, ai-skills-for-promotion, chatgpt-tutorial-beginners
- best-ai-courses-coursera → google-ai-essentials-review, prompt-engineering-afternoon, ai-skills-for-promotion
- free-vs-paid-ai-courses → google-ai-essentials-review, best-ai-courses-coursera, ai-certifications-in-a-week
- prompt-engineering-afternoon → ai-skills-for-promotion, ai-certifications-in-a-week
- ai-certifications-in-a-week → prompt-engineering-afternoon, learn-ai-while-looking-busy, ai-skills-for-promotion

---

## Performance Optimierungen

### PageSpeed Verbesserungen
- **Ausgangswert Mobile:** 73
- **Aktueller Wert Mobile:** ~85

### Durchgeführte Optimierungen
1. **WebP Bilder** - Alle JPG zu WebP konvertiert (16 Bilder)
2. **Hero Section** - Background Image durch CSS Gradient ersetzt
3. **Lazy Loading** - Bilder in Blog-Posts auf lazy loading umgestellt
4. **SEO Struktur** - Description Text VOR dem Featured Image angezeigt
5. **Responsive Images** - Mobile/Desktop Varianten für Hero

### Bildgrößen (WebP)
- hero-background-mobile.webp: 21KB
- hero-background.webp: 78KB
- Alle anderen Bilder optimiert

---

## Noch offen (TODO)

### SEO
- [ ] robots.txt erstellen
- [ ] FAQ Schema für relevante Artikel
- [ ] Breadcrumbs mit Schema Markup
- [ ] Related Posts Section
- [ ] RSS Feed
- [ ] Alt-Text Optimierung prüfen
- [ ] Keyword-Optimierung (Title Tags, H1s)

### Technisch
- [ ] 404 Seite gestalten
- [ ] Sitemap in Footer verlinken
- [ ] Google Analytics Events tracken

---

## Dateien & Struktur

```
src/
├── components/
│   ├── Header.astro
│   └── Footer.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogPost.astro
├── pages/
│   ├── index.astro
│   ├── blog/
│   │   └── index.astro
│   └── [...slug].astro
├── content/
│   └── blog/
│       └── [10 Markdown Artikel]
└── styles/
    └── global.css

public/
└── images/
    └── [WebP optimierte Bilder]

netlify.toml (Sitemap Redirect)
```

---

*Letzte Aktualisierung: Januar 2026*
