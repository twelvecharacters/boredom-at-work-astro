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

- [x] Sitemap bei Google Search Console neu einreichen (nach DNS-Propagation)
- [ ] Altes WordPress-Hosting kündigen
- [ ] Backup der alten WordPress-Seite behalten

---

# Migration 2: Netlify → GitHub Pages

**Datum:** 9-10. Januar 2026

## Grund der Migration
- Netlify Credits aufgebraucht (300 Builds an einem Tag)
- "Site not available - usage limits reached" Fehlermeldung

## Was wurde gemacht

### 1. GitHub Pages Setup
- Repository öffentlich gemacht (GitHub Pages erfordert public repo oder Pro-Plan)
- GitHub Actions Workflow erstellt: `.github/workflows/deploy.yml`
- CNAME-Datei erstellt: `public/CNAME` → `boredom-at-work.com`

### 2. DNS-Konfiguration (Netcup) - Aktualisiert
**A-Records (Apex Domain):**
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**CNAME-Record (www):**
- www → twelvecharacters.github.io

### 3. GitHub Pages Einstellungen
- Source: GitHub Actions
- Custom Domain: www.boredom-at-work.com (primär)
- Enforce HTTPS: aktiviert

## Probleme während der Migration
1. **Workflow Push fehlgeschlagen** - GitHub OAuth Token brauchte `workflow` scope
   - Lösung: `gh auth login -h github.com -p https -w -s workflow`

2. **GitHub Pages nicht verfügbar** - Repository war privat
   - Lösung: Repository öffentlich gemacht

3. **DNS Check unsuccessful** - DNS-Propagation dauerte mehrere Stunden
   - Alte Netlify-IPs waren noch gecacht
   - Lösung: Warten + lokalen DNS-Cache leeren (`sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder`)

4. **Apex Domain Warnung** - GitHub zeigt weiterhin rot für boredom-at-work.com
   - www.boredom-at-work.com funktioniert (primäre Domain)
   - Apex Domain leitet korrekt um (301)

## Aktuelle URLs
- **Primär:** https://www.boredom-at-work.com
- **Redirect:** http://boredom-at-work.com → www

## SEO Status (nach Migration)
- **Google Search Console:** Verifiziert für https://boredom-at-work.com
- **Sitemap:** /sitemap.xml eingereicht, 8 Seiten gefunden (von 12)
- **robots.txt:** vorhanden
- **FAQ Schema:** auf 3 Artikeln implementiert
- **Breadcrumbs:** implementiert mit Schema.org Markup
- **Related Posts:** implementiert

## Neue/Geänderte Dateien
- `.github/workflows/deploy.yml` - GitHub Actions Deployment
- `public/CNAME` - Custom Domain für GitHub Pages
- `src/styles/global.css` - Code-Block Styling (schwarze Boxen entfernt)
- `src/components/Breadcrumbs.astro` - Breadcrumbs Komponente
- `src/components/RelatedPosts.astro` - Related Posts Komponente
- `src/layouts/BlogPost.astro` - FAQ Schema + Breadcrumbs integriert

## Workflow für neue Posts (aktualisiert)

```bash
git add .
git commit -m "Add: Neuer Artikel"
git push
```

GitHub Actions deployed automatisch (~1-2 Minuten).

## Nächste Schritte
- [ ] Netlify-Projekt löschen
- [ ] Warten bis GitHub Apex-Domain grün zeigt
- [ ] GSC Sitemap neu einreichen wenn alle 12 Seiten indexiert werden sollen

---

# Content-Strategie Erweiterung

**Datum:** 10. Januar 2026

## Ursprüngliche Idee
Die Seite war bisher nur auf AI-Kurse fokussiert.

## Neue Ausrichtung
"Boredom at Work" als Dachmarke für alles, was man während der Arbeitslangeweile recherchieren/lernen kann.

## Geplante Kategorien

| Kategorie | Beispiel-Artikel |
|-----------|------------------|
| **Hobbies** | "3D Printing for Beginners - Everything You Need to Know" |
| **Photography** | "Best Entry-Level Cameras in 2026" |
| **Japan Shopping** | "Buyee vs Sendico - How to Buy from Japan" |
| **Tech & Gadgets** | "Is a Kindle Worth It?" |
| **Learning** | AI courses (existing content) |
| **Productivity** | "Productive Things to Do When Bored at Work" |

## Themenideen (von Bruder)
- 3D Drucker
- Fotokameras
- Japan-Shopping (Sendico, Buyee)
- Kleinigkeiten im Alltag als Endkonsument

## Keyword-Potenzial (English)
- "how to buy from japan" - wenig Konkurrenz, Nischen-Thema
- "best beginner 3d printer 2026" - hohes Suchvolumen
- "mirrorless camera for beginners" - Affiliate-Potenzial

## Affiliate-Möglichkeiten
- Amazon (global)
- Buyee/Sendico Affiliate-Programme
- B&H Photo (Kameras)
- Creality/Prusa (3D-Drucker)

## Backlink-Strategien
1. Gastbeiträge auf anderen Blogs
2. HARO/Qwoted - Journalisten-Anfragen beantworten
3. Reddit/Quora mit Mehrwert
4. Broken Link Building
5. Ressourcen-Listen kontaktieren
6. LinkedIn/Medium Artikel

## Erstellte Ressourcen
- `CONTENT-PROMPTS.md` - Prompt-Templates für Artikel-Erstellung
  - Article Generator Prompt
  - Quick Article Ideas Prompt
  - Product Comparison Prompt
  - Beginner Guide Prompt
  - Japan Shopping Guide Prompt
