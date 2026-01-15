# Projekt-Regeln und Kontext für boredom-at-work.com

> Diese Datei wird bei jeder Claude Code Sitzung automatisch gelesen.

---

## Projekt-Übersicht

- **Website:** https://www.boredom-at-work.com
- **Framework:** Astro 5 mit Tailwind CSS 4 + SCSS
- **Hosting:** GitHub Pages (automatisches Deployment via GitHub Actions)
- **Repository:** https://github.com/twelvecharacters/boredom-at-work-astro
- **Zielgruppe:** Office-Worker, die während der Arbeitszeit produktiv lernen wollen

---

## Workflow-Regeln

### Blog-Beiträge erstellen
1. **IMMER vor dem Pushen fragen:** "Wann soll der Artikel veröffentlicht werden?"
   - **Sofort:** `publishDate` auf heutiges Datum setzen
   - **Geplant:** `publishDate` auf Zukunftsdatum setzen (Artikel erscheint automatisch am angegebenen Tag)

2. **Artikel-Template verwenden:**
```markdown
---
title: "Artikel Titel"
description: "SEO Beschreibung (150-160 Zeichen)"
publishDate: YYYY-MM-DD
author: "bored chap"
image: "/images/artikel-bild.webp"
tags: ["Tag1", "Tag2"]
draft: false
faq:
  - question: "Frage 1?"
    answer: "Antwort 1"
---
```

3. **Für Blog-Abfragen immer `getPublishedPosts()` aus `src/utils/blog.ts` verwenden** - diese Funktion filtert automatisch:
   - Keine Drafts (`draft: false`)
   - Nur Artikel mit `publishDate` in der Vergangenheit oder heute

---

## Design-System

### Farbschema (src/styles/app.css)
| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-primary` | `#11153b` | Dunkles Indigo (Header, Footer, Headlines) |
| `--color-primary-light` | `#2d1f4a` | Lila-Ton für Gradienten |
| `--color-accent` | `#8b5cf6` | **Violet** - Hauptakzentfarbe (Links, CTAs, Buttons) |
| `--color-accent-hover` | `#7c3aed` | Dunkleres Violet für Hover-States |
| `--color-accent-alt` | `#f43f5e` | Rose/Pink für besondere Highlights |
| `--color-text` | `#1e1b4b` | Haupttext (Dunkel-Indigo) |
| `--color-text-light` | `#4c4e82` | Sekundärtext |
| `--color-background` | `#ffffff` | Weiß |
| `--color-background-alt` | `#f5f6ff` | Leicht bläuliches Weiß für Sections |

### Typografie
- **Headings:** `Outfit` (font-weight: 600-700)
- **Body:** `Inter` (font-weight: 400-500)
- Headlines haben `letter-spacing: -0.02em`

### Buttons
- **Primary:** `bg-accent text-white px-6 py-3 rounded-lg font-semibold`
- **Secondary:** `border-2 border-accent text-accent` (wird violet auf hover)

### Cards
- Weiße Karten mit `rounded-xl` oder `rounded-2xl`
- `shadow-sm` mit `hover:shadow-md transition-shadow`
- Border: `border border-primary/5`

### Utility-Klassen
- `.glass` - Glassmorphism-Effekt (`bg-white/70 backdrop-blur-md`)
- `.mesh-gradient` - Lila/Violet Mesh-Gradient für Hero-Sections
- `.floating` - Schwebende Animation

### Layout
- Max-Width Content: `max-w-4xl`
- Max-Width Grids: `max-w-6xl`
- Section Padding: `py-16` bis `py-24`
- Horizontal Padding: `px-4`

---

## Wichtige Dateien

### Konfiguration
- `src/config.ts` - Site-Einstellungen, Navigation, Kategorien, Footer-Links
- `src/content.config.ts` - Blog Collection Schema (Zod)
- `src/styles/app.css` - Theme-Variablen und Font-Imports
- `src/styles/global.scss` - Base Styles, Prose, Komponenten

### Komponenten
- `src/components/Header.astro` - Navigation mit Mobile-Menü
- `src/components/Footer.astro` - Footer mit Links
- `src/components/Hero.astro` - Wiederverwendbare Hero-Section
- `src/components/CategoryCard.astro` - Kategorie-Karten
- `src/components/Pagination.astro` - Blog-Pagination
- `src/components/TagCloud.astro` - Tag-Übersicht
- `src/components/Breadcrumbs.astro` - Breadcrumbs mit Schema.org
- `src/components/RelatedPosts.astro` - Verwandte Artikel
- `src/components/OptimizedImage.astro` - Bild-Optimierung (WebP)
- `src/components/FaqSchema.astro` - FAQ Schema Markup

### Layouts
- `src/layouts/BaseLayout.astro` - Basis-Layout mit SEO Meta-Tags
- `src/layouts/BlogPost.astro` - Blog-Post Layout mit Schema.org

### Utilities
- `src/utils/blog.ts` - `getPublishedPosts()` für gefilterte Blog-Abfragen

---

## Content-Kategorien

| Kategorie | Anzahl Artikel | Status |
|-----------|----------------|--------|
| AI/Learning | 10 | Aktiv |
| 3D Printing | 6 | Aktiv |
| Photography | 7 | Aktiv |
| Japan Shopping | - | Geplant |
| Tech & Gadgets | - | Geplant |

---

## SEO-Checkliste für neue Artikel

- [ ] Title mit Hauptkeyword (50-60 Zeichen)
- [ ] Meta Description (150-160 Zeichen)
- [ ] Featured Image als WebP (`/images/artikel-name.webp`)
- [ ] 3-5 relevante Tags
- [ ] FAQ-Section (3 Fragen mit Antworten) für Schema.org
- [ ] Interne Verlinkung zu 2-3 verwandten Artikeln

---

## Deployment

```bash
# Änderungen pushen (GitHub Actions deployed automatisch)
git add .
git commit -m "Add: Neuer Artikel"
git push
```

Build-Zeit: ~1-2 Minuten via GitHub Actions

---

## Prompt-Templates

Siehe `CONTENT-PROMPTS.md` für vorgefertigte Prompts:
- Article Generator Prompt
- Product Comparison Prompt
- Beginner Guide Prompt
- Japan Shopping Guide Prompt

---

*Letzte Aktualisierung: Januar 2026*
