# Projekt-Regeln und Kontext für boredom-at-work.com

> Diese Datei wird bei jeder Claude Code Sitzung automatisch gelesen.

---

## Aktueller Stand (18. Februar 2026)

### Cluster-Status

| Cluster | Artikel | Bilder | Status |
|---------|---------|--------|--------|
| AI/Productivity | 10 | ✅ | Komplett |
| AI/Travel | 17 | ✅ | Komplett (Publish: März-Juni) |
| 3D Printing | 14 | ✅ | Komplett (inkl. Hub Page) |
| Photography | 8 | ✅ | Komplett (inkl. Hub Page + RapidRAW) |
| Home Office / Desk Setup | 15 | ✅ | Komplett (5 Basis + 10 Expansion) |
| Finance / Investing | 13 | ✅ | Komplett (Hub + 12 Supporting) |
| Japan Shopping | 3 | ✅ | Komplett |
| Tech & Gadgets | 10 | ✅ | Komplett |

**Alle Featured Images komplett.** Home Office (15/15) + Finance (13/13) + alle anderen Cluster.

### Hub Pages (5 komplett)

```
AI/Productivity ─► ai-tools-guide (15+ Artikel)
AI Learning ─────► learn-ai-guide (10+ Artikel)
ChatGPT ─────────► chatgpt-guide (8+ Artikel)
3D Printing ─────► 3d-printing-guide (14 Artikel)
Photography ─────► photography-guide (7 Artikel)
```

### Schema.org (10 Typen aktiv)

```
Organization, Article, BreadcrumbList, FAQPage, Product+Review,
ItemList, VideoObject, HowTo, SoftwareApplication, Course
```

### YouTube

| Video | URL | Status |
|-------|-----|--------|
| ChatGPT Plus vs Free | https://youtu.be/b6o1JZjI7dU | Live |
| Best AI Tools 2026 | https://youtu.be/IoGF-x_prXQ | Live |
| Learn AI Roadmap | https://youtu.be/h-V_Lu_J_hw | Unlisted → **7. März public** |
| ChatGPT Guide | https://youtu.be/0YHgavdF_3E | Unlisted → **10. März public** + in chatgpt-guide.md einbetten |
| Dubai Fountain (Short) | https://youtube.com/shorts/npcqic4geOA | Live |
| chatgpt-guide.md Video | — | TODO |

**Kanal:** https://www.youtube.com/@boredom-at-work

### Web 2.0 Satellite Sites

| Plattform | Artikel | Account | Status |
|-----------|---------|---------|--------|
| Medium | Claude vs ChatGPT | `@mohammadmehdivazirian` | ✅ Live |
| Dev.to | Best AI Tools for Office | `twelvecharacters` | ✅ Live |
| LinkedIn | Free AI Courses | Company Page: `boredom-at-work` | ✅ Live |
| LinkedIn | AI Certifications | Company Page: `boredom-at-work` | Draft fertig |

Drafts in `medium-drafts/` (in `.gitignore`).

### Offene TODOs

- [ ] Web 2.0 Satellites: LinkedIn #5 (AI Certifications) — ab ~20. Feb posten
- [ ] Video für `chatgpt-guide.md` erstellen
- [ ] **7. März:** learn-ai-guide Video → PUBLIC
- [ ] **10. März:** chatgpt-guide Video → PUBLIC + in Artikel einbetten
- [ ] Amazon Associates beantragen
- [ ] Secretlab / Branch / FlexiSpot Affiliate beantragen
- [ ] Email-Liste/Newsletter starten

### Finance Cluster Details

**Angle:** Tools & Learning — keine Anlageberatung! YMYL-Disclaimer in jedem Finance-Artikel.

**Top Affiliate-Partner:** Webull (bis $1.400/Ref), Robinhood ($20/Signup), Koinly (20% recurring), TradingView (50%), Seeking Alpha (~$15-20/Sub), Kalshi ($10-50/Ref)

### IndexNow API

| Detail | Wert |
|--------|------|
| Key | `33eb690ddefc36d78165765c86948671` |
| Script | `scripts/indexnow.js` (`npm run indexnow`) |
| CI | `.github/workflows/deploy.yml` — auto nach Build |

---

## Projekt-Übersicht

- **Website:** https://www.boredom-at-work.com
- **Framework:** Astro 5 mit Tailwind CSS 4 + SCSS
- **Hosting:** GitHub Pages (automatisches Deployment via GitHub Actions)
- **Repository:** https://github.com/twelvecharacters/boredom-at-work-astro
- **Zielgruppe:** Office-Worker, die während der Arbeitszeit produktiv lernen wollen

---

## Monetarisierung

### Zwei-Säulen-Strategie

| Säule | Cluster | Einnahmequelle |
|-------|---------|----------------|
| **Traffic** | AI/Productivity | Display Ads |
| **Conversion** | 3D Printing | Affiliate-Produktempfehlungen |

### Affiliate-Programme

**AI Tools:** Jasper (30% recurring), Copy.ai (45% first year), Writesonic (30% recurring), Grammarly ($0.20-$20/signup)

**3D Printing:** Amazon (4%), Bambu Lab (5-8%), 3DJake (5-8%), Elegoo (5%)

**Home Office:** Secretlab (12%), Branch (5%), FlexiSpot (3-7.5%), Uplift (3%), Amazon (1-4%)

### 12-Monats-Plan

| Phase | Monate | Fokus | Ziel |
|-------|--------|-------|------|
| Foundation | 1-3 | Content + Amazon/AdSense | €0-50/Mo |
| Growth | 4-6 | Traffic skalieren | €100-300/Mo |
| Monetization | 7-12 | Mediavine + Produkte | €500-2.000/Mo |

---

## Workflow-Regeln

### Blog-Beiträge erstellen
1. **IMMER vor dem Pushen fragen:** "Wann soll der Artikel veröffentlicht werden?"
   - **Sofort:** `publishDate` auf heutiges Datum setzen
   - **Geplant:** `publishDate` auf Zukunftsdatum setzen

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

3. **Für Blog-Abfragen immer `getPublishedPosts()` aus `src/utils/blog.ts` verwenden**

4. **IMMER American English verwenden** (Zielgruppe: Nordamerika)

   | British ❌ | American ✅ |
   |-----------|-------------|
   | colour, favour | color, favor |
   | centre, theatre | center, theater |
   | organise, realise | organize, realize |
   | whilst, amongst | while, among |
   | grey | gray |
   | learnt, spelt | learned, spelled |
   | judgement | judgment |

   **Ausnahmen:** `e-reader` und `e-book` mit Bindestrich OK.

5. **FAQ Schema mit echter Suchintention** (Pillar: 4-6 FAQs, Normal: 2-4)

6. **Vergleichs-Sections:** Echte Fees, Pro/Contra, Tabelle, Empfehlung

### Fact-Checking-Prozess (PFLICHT!)

**Vor dem Schreiben:** Offizielle Quellen identifizieren, aktuelle Preise mit Datum

**Während des Schreibens:**
- Keine Zahlen ohne Quelle
- Preise flexibel: "~$199" oder "starting at $199"
- Versionsnummern angeben

**Vor dem Pushen:**
```
□ Produkt-Specs gegen offizielle Quellen geprüft
□ Preise aktuell (max 30 Tage alt)
□ Externe Links getestet (keine 404s)
□ Software-Features noch aktuell
□ Vergleichstabellen verifiziert
```

**Quellen-Hierarchie:** 1. Hersteller-Seite → 2. Offizielle Docs → 3. Pressemitteilungen → 4. Verifizierte Reviews → 5. ❌ Andere Blogs NIEMALS als Primärquelle

**Fact-Check Hook AKTIV:**
```
.git/hooks/pre-commit       # Blockiert ohne Bestätigung
~/.claude/confirm-fact-check.sh  # 1h gültig
```
Bei neuem Clone: `cp ~/.claude/fact-check-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit`

---

## Design-System

### Farbschema (src/styles/app.css)
| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-primary` | `#11153b` | Dunkles Indigo |
| `--color-accent` | `#7c3aed` | Violet (Links, CTAs) |
| `--color-accent-hover` | `#6d28d9` | Hover |
| `--color-accent-alt` | `#e11d48` | Rose/Pink Highlights |
| `--color-text` | `#1e1b4b` | Haupttext |
| `--color-background` | `#ffffff` | Weiß |
| `--color-background-alt` | `#f5f6ff` | Alt-Sections |

### Typografie
- **Headings:** `Outfit` (600-700), `letter-spacing: -0.02em`
- **Body:** `Inter` (400-500)

### Layout
- Content: `max-w-4xl`, Grids: `max-w-6xl`
- Section Padding: `py-16` bis `py-24`, Horizontal: `px-4`
- Cards: `rounded-xl shadow-sm hover:shadow-md`
- Utility: `.glass`, `.mesh-gradient`, `.floating`

---

## Bildoptimierung (AUTOMATISCH!)

```bash
# PNG/JPG zu WebP konvertieren (Qualität 75)
cwebp -q 75 bildname.png -o bildname.webp

# Bei > 200 KB erst skalieren:
sips -Z 1200 bildname.png --out temp.png
cwebp -q 75 temp.png -o bildname.webp
rm temp.png
```

| Zielwert | |
|----------|--|
| Format | WebP |
| Max. Breite/Höhe | 1200px |
| Qualität | 75 |
| Max. Dateigröße | 150-200 KB |

---

## Wichtige Dateien

### Konfiguration
- `src/config.ts` — Navigation, Kategorien, Footer
- `src/content.config.ts` — Blog Collection Schema (Zod)
- `src/styles/app.css` — Theme-Variablen
- `src/styles/global.scss` — Base Styles, Prose

### Layouts
- `src/layouts/BaseLayout.astro` — SEO Meta-Tags
- `src/layouts/BlogPost.astro` — Schema.org

### Komponenten
- `Header.astro`, `Footer.astro`, `Hero.astro`
- `Search.astro` — Pagefind Volltextsuche
- `ScrollToTop.astro`, `Breadcrumbs.astro`, `RelatedPosts.astro`
- `FaqSchema.astro`, `TableOfContents.astro`, `OptimizedImage.astro`
- `VideoSchema.astro`, `HowToSchema.astro`, `SoftwareAppSchema.astro`, `CourseSchema.astro`

### Utilities
- `src/utils/blog.ts` — `getPublishedPosts()` (filtert Drafts + Zukunft)

---

## Content-Kategorien & Artikel-Zeitpläne

### Ausstehende Artikel Februar 2026
| Datum | Artikel | Slug |
|-------|---------|------|
| 19. Feb | PLA vs PETG vs ABS | `/pla-vs-petg-vs-abs/` |
| 20. Feb | How to Use AI at Work Safely | `/how-to-use-ai-at-work-safely/` |
| 21. Feb | Cura Settings for Beginners | `/cura-settings-beginners/` |
| 23. Feb | AI Writing Tools Comparison | `/ai-writing-tools-comparison/` |
| 24. Feb | 3D Print Not Sticking Fixes | `/3d-print-not-sticking-fixes/` |
| 25. Feb | Best Free macOS Software | `/best-free-macos-software/` |
| 26. Feb | Best AI Chrome Extensions | `/best-ai-chrome-extensions/` |
| 27. Feb | Best Sites Free 3D Models | `/best-sites-free-3d-models/` |
| 28. Feb | AI Travel Planning (Hub) | `/ai-travel-planning/` |

### Home Office Cluster (März-April 2026) — ✅ KOMPLETT
| Datum | Artikel | Slug |
|-------|---------|------|
| 9. März | Best Standing Desks | `/best-standing-desks/` |
| 10. März | Best Office Chairs | `/best-office-chairs/` |
| 11. März | Claude AI Review | `/claude-ai-review/` |
| 12. März | Best Monitor Arms | `/best-monitor-arms/` |
| 13. März | Cable Management Tips | `/cable-management-tips/` |
| 15. März | Desk Upgrade Guide (Hub) | `/desk-upgrade-guide/` |
| 24. März | Best Monitors for WFH | `/best-monitors-working-from-home/` |
| 26. März | Best USB-C Docking Stations | `/best-usb-c-docking-stations/` |
| 31. März | Best Ergonomic Mice | `/best-ergonomic-mice/` |
| 2. April | Best Monitor Light Bars | `/best-monitor-light-bars/` |
| 7. April | Best Webcams for WFH | `/best-webcams-working-from-home/` |
| 9. April | Best NC Headphones | `/best-noise-canceling-headphones-office/` |
| 14. April | Best Desk Mats | `/best-desk-mats/` |
| 16. April | Best Laptop Stands | `/best-laptop-stands/` |
| 21. April | Dual Monitor Setup Guide | `/dual-monitor-setup-guide/` |
| 23. April | Best Under-Desk Footrests | `/best-footrests/` |

### Finance/Investing Cluster (April-Juni 2026) — ✅ KOMPLETT
| Datum | Artikel | Slug |
|-------|---------|------|
| 28. April | Best Paper Trading Apps | `/best-paper-trading-apps/` |
| 30. April | Free Investing Courses | `/best-free-investing-courses/` |
| 5. Mai | Investing Tools Guide (Hub) | `/investing-tools-guide/` |
| 7. Mai | Polymarket vs Kalshi | `/polymarket-vs-kalshi/` |
| 12. Mai | Best Stock Screeners | `/best-free-stock-screeners/` |
| 14. Mai | Investing Apps for Beginners | `/best-investing-apps-beginners/` |
| 19. Mai | Crypto Portfolio Trackers | `/best-crypto-portfolio-trackers/` |
| 21. Mai | Stock News Apps | `/best-stock-news-apps/` |
| 26. Mai | ChatGPT for Stock Research | `/chatgpt-stock-research/` |
| 28. Mai | How Prediction Markets Work | `/prediction-markets-guide/` |
| 2. Juni | Dividend Tracker Apps | `/best-dividend-trackers/` |
| 4. Juni | Finance Subreddits | `/best-finance-subreddits/` |
| 9. Juni | Investing Podcasts | `/best-investing-podcasts/` |

### AI Travel Planning Cluster (März-Juni 2026) — ✅ KOMPLETT
| Datum | Artikel | Slug |
|-------|---------|------|
| 1. März | First AI-Planned Trip Tutorial | `/chatgpt-trip-planning-tutorial/` |
| 8. März | ChatGPT Travel Prompts | `/chatgpt-travel-planning-prompts/` |
| 15. März | Best AI Trip Planners | `/best-ai-trip-planners/` |
| 22. März | Malaysia Trip with ChatGPT | `/chatgpt-malaysia-trip-planning/` |
| 29. März | AI Travel Planning Mistakes | `/ai-travel-planning-mistakes/` |
| 5. April | Claude vs ChatGPT for Travel | `/claude-vs-chatgpt-travel-planning/` |
| 12. April | Free AI Travel Tools | `/free-ai-travel-tools/` |
| 19. April | AI Packing Lists | `/ai-packing-list-travel-checklist/` |
| 26. April | Gemini for Travel | `/gemini-travel-planning/` |
| 3. Mai | Perplexity for Travel | `/perplexity-travel-research/` |
| 10. Mai | AI Flight Search Agent | `/build-ai-flight-search-agent/` |
| 17. Mai | Southeast Asia Trip 2026 | `/ai-planning-southeast-asia-trip-2026/` |
| 24. Mai | AI Trip: Japan | `/ai-trip-planning-japan/` |
| 31. Mai | AI Trip: Vietnam | `/ai-trip-planning-vietnam/` |
| 7. Juni | AI Trip: Cambodia | `/ai-trip-planning-cambodia/` |
| 14. Juni | Japan vs Vietnam vs Cambodia | `/japan-vietnam-cambodia-comparison/` |

---

## SEO-Checkliste für neue Artikel

- [ ] Title mit Hauptkeyword (50-60 Zeichen)
- [ ] Meta Description (150-160 Zeichen)
- [ ] Featured Image als WebP (`/images/artikel-name.webp`)
- [ ] 3-5 relevante Tags
- [ ] FAQ-Section (3 Fragen) für Schema.org
- [ ] Interne Verlinkung zu 2-3 verwandten Artikeln
- [ ] ~~llms.txt + llms-full.txt aktualisieren~~ (automatisch bei Build via `src/pages/llms.txt.ts` + `llms-full.txt.ts`)

---

## LLM-Optimierung

| Datei | URL |
|-------|-----|
| `src/pages/llms.txt.ts` | https://boredom-at-work.com/llms.txt |
| `src/pages/llms-full.txt.ts` | https://boredom-at-work.com/llms-full.txt |

**Automatisch generiert bei jedem Build** aus veröffentlichten Artikeln. Keine manuelle Pflege nötig.

---

## Traffic & Marketing

### Aktive Kanäle
| Kanal | Status |
|-------|--------|
| Google (SEO) | Search Console aktiv |
| Bing | Webmaster Tools aktiv |
| Reddit | Posts aktiv |
| Pinterest | Business Account + Boards |
| YouTube | @boredom-at-work |

### Reddit-Strategie
**Beste Subreddits:** r/3Dprinting, r/learnmachinelearning, r/artificial, r/photography, r/productivity, r/ChatGPT, r/ClaudeAI, r/remotework

**Regeln:** Nicht spammy, Frage am Ende, 14-20 Uhr MEZ, auf Kommentare antworten

---

## Kontaktformular

- **Service:** Web3Forms (kostenlos)
- **E-Mail:** twelvecharacters@proton.me
- **Access Key:** In `src/pages/contact/index.astro`

---

## Deployment

```bash
git add . && git commit -m "Add: Neuer Artikel" && git push
```

### Scheduled Posts
Täglicher Cron in `.github/workflows/deploy.yml`: `0 5 * * *` (5:00 UTC)

**Manueller Rebuild:** `git commit --allow-empty -m "Trigger rebuild" && git push`

---

## Post-Publish-Check (AUTOMATISCH!)

1. `gh run list --limit 5` — Deployment prüfen
2. Artikel-URL aufrufen
3. SEO-Checkliste: Title, Description, Bild, Tags, FAQ, Links, llms.txt
4. Fehlende Punkte automatisch beheben

---

*Letzte Aktualisierung: 18. Februar 2026*
