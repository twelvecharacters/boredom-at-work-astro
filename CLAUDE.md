# Projekt-Regeln und Kontext für boredom-at-work.com

> Diese Datei wird bei jeder Claude Code Sitzung automatisch gelesen.

---

## ⚠️ ERINNERUNGEN (Stand: 29. Januar 2026)

### 🚨 TODO für 29. Januar 2026 (Mittwoch)

**1. Post-Publish Check:**
- [ ] AirPods vs Galaxy Buds vs Sony Artikel prüfen (geht heute live)

**2. Pinterest-Pin posten:**
- [ ] AirPods Pro 3 Review → Board: Learn AI & Tech Skills

**Pinterest-Pin Text:**
```
Title: AirPods Pro 3 Review: Worth the Upgrade? (2026)

Description:
Honest review of Apple's AirPods Pro 3 after one week of daily use. Better ANC, longer battery (8 hours), IP57 water resistance - but is it worth $279?

Key upgrades over AirPods Pro 2:
✓ Upgraded H2 chip with improved noise cancellation
✓ Adaptive Audio mode (game changer!)
✓ 8 hours battery vs 6 hours
✓ Better hearing health features

#AirPodsPro3 #AirPods #Apple #TechReview #Earbuds #WirelessEarbuds #TechGadgets

Link: https://boredom-at-work.com/airpods-pro-3-review/
```

**3. Reddit-Posts vorbereiten (für 31. Jan):**
- [ ] DSLR vs Mirrorless Text schreiben
- [ ] ChatGPT Tutorial Text schreiben

---

### 🚨 TODO für 31. Januar 2026 (Freitag)
**Reddit Posts posten:**
- [ ] DSLR vs Mirrorless → r/AskPhotography
- [ ] ChatGPT Tutorial → r/ChatGPT

---

### Letzte Sitzung (28. Januar 2026)

**✅ Reddit-Post veröffentlicht:**
- AirPods Pro 3 Review → r/airpods ✅

**✅ American English Konsistenz:**
- Alle Artikel geprüft — bereits sauber
- `Co-Worker` → `Coworker` korrigiert
- American English Style Guide in Workflow-Regeln hinzugefügt

**✅ Februar-Artikel neu terminiert:**
- Selling 3D Prints Online: 3. Feb
- Samsung S26 Rumors: 6. Feb
- macOS Tahoe Tricks: 9. Feb

**✅ antigravity-Analyse KOMPLETT (27.-28. Jan):**
- TL;DR Box Komponente + 6 Summaries
- Product/Review Schema (5 Artikel mit Google-Sternen)
- ItemList Schema (9 Listicle-Artikel)
- Author Bio mit Reddit-Link
- 3 Hub-Pages (Desk, AI Learning, Photography)
- 5 Artikel mit Work-Context Abschnitten

### Vorherige Sitzung (27. Januar 2026)

**✅ AI Travel Cluster komplett abgeschlossen:**
- 16/16 Bilder erstellt und optimiert (~2.8 MB gesamt)
- 16/16 Artikel geplant (März-Juni 2026, draft: false)

**✅ AirPods Pro 3 Posts vorbereitet:**
- Reddit-Post für r/airpods
- Pinterest-Pin (verschoben)

### Vorherige Sitzung (26. Januar 2026)
✅ **Pagefind Search komplett überarbeitet:**
- Breite: Desktop 200px, Mobile 150px
- Dunkles Dropdown-Design passend zum Header-Gradient
- Clear-Button Fix, Mobile max-height 300px

✅ **Accessibility & Performance Fixes:**
- Kontrastfarben angepasst für WCAG AA
- Non-Blocking Fonts, Logo optimiert, Mobile Tabellen

✅ **Weitere Features:**
- ScrollToTop Button, SEO optimiert
- AirPods Pro 3 Review erstellt (publiziert am 28. Jan)

### Vorherige Sitzung (23. Januar 2026)
✅ Alle 9 Februar-Bilder hinzugefügt und gepusht

### Reddit-Posts starten! 🚀
**5 vorbereitete Posts ab heute posten** (siehe unten bei "VORBEREITETE REDDIT-POSTS")
- Post 1: Best Cameras → r/AskPhotography ✅ 22. Jan gepostet
- Post 2: Kindle → r/kindle (24. Jan)
- Post 3: Japan Guide → r/JapaneseProducts (25. Jan)
- Post 4: DSLR vs Mirrorless → r/AskPhotography (26. Jan)
- Post 5: ChatGPT Tutorial → r/ChatGPT (27. Jan)

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

4. **IMMER American English verwenden** (Zielgruppe: Nordamerika)

   | British ❌ | American ✅ |
   |-----------|-------------|
   | colour, favour, behaviour | color, favor, behavior |
   | centre, theatre, metre | center, theater, meter |
   | organise, realise, recognise | organize, realize, recognize |
   | whilst, amongst | while, among |
   | grey | gray |
   | co-worker, co-operate | coworker, cooperate |
   | learnt, spelt, burnt | learned, spelled, burned |
   | judgement | judgment |
   | catalogue, dialogue | catalog, dialog |

   **Ausnahmen:** `e-reader` und `e-book` mit Bindestrich sind auch im American English akzeptiert.

---

## Design-System

### Farbschema (src/styles/app.css)
| Variable | Wert | Verwendung |
|----------|------|------------|
| `--color-primary` | `#11153b` | Dunkles Indigo (Header, Footer, Headlines) |
| `--color-primary-light` | `#2d1f4a` | Lila-Ton für Gradienten |
| `--color-accent` | `#7c3aed` | **Violet** - Hauptakzentfarbe (Links, CTAs, Buttons) |
| `--color-accent-hover` | `#6d28d9` | Dunkleres Violet für Hover-States |
| `--color-accent-alt` | `#e11d48` | Rose/Pink für besondere Highlights |
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

## Bildoptimierung (AUTOMATISCH durchführen!)

**Bei jedem neuen Bild diese Schritte ausführen:**

### 1. Bild nach public/images kopieren
```bash
cp /pfad/zum/bild.png /Users/mehdivazirian/boredom-at-work/public/images/
```

### 2. In WebP konvertieren und optimieren
```bash
cd /Users/mehdivazirian/boredom-at-work/public/images

# PNG zu WebP konvertieren (Qualität 75)
cwebp -q 75 bildname.png -o bildname.webp

# ODER wenn Bild zu groß ist (> 200 KB), erst skalieren:
dwebp bildname.webp -o temp.png
sips -Z 1200 temp.png --out temp-resized.png
cwebp -q 75 temp-resized.png -o bildname.webp
rm temp.png temp-resized.png
```

### 3. Original-PNG löschen
```bash
rm bildname.png
```

### Zielwerte
| Eigenschaft | Zielwert |
|-------------|----------|
| Format | WebP |
| Max. Breite/Höhe | 1200px |
| Qualität | 75 |
| Ziel-Dateigröße | < 150 KB (max 200 KB) |

### Verfügbare Tools
- `cwebp` - PNG/JPG zu WebP konvertieren
- `dwebp` - WebP zu PNG konvertieren
- `sips` - Bilder skalieren (macOS)

---

## Wichtige Dateien

### Konfiguration
- `src/config.ts` - Site-Einstellungen, Navigation, Kategorien, Footer-Links
- `src/content.config.ts` - Blog Collection Schema (Zod)
- `src/styles/app.css` - Theme-Variablen und Font-Imports
- `src/styles/global.scss` - Base Styles, Prose, Komponenten

### Komponenten
- `src/components/Header.astro` - Navigation mit Mobile-Menü und Suche
- `src/components/Footer.astro` - Footer mit Links und Contact CTA
- `src/components/Hero.astro` - Wiederverwendbare Hero-Section
- `src/components/Search.astro` - **Pagefind Volltextsuche** (Desktop 200px, Mobile 150px, dunkles Design)
- `src/components/ScrollToTop.astro` - **Scroll-to-Top Button** (erscheint nach 300px)
- `src/components/CategoryCard.astro` - Kategorie-Karten
- `src/components/Pagination.astro` - Blog-Pagination
- `src/components/TagCloud.astro` - Tag-Übersicht
- `src/components/Breadcrumbs.astro` - Breadcrumbs mit Schema.org
- `src/components/RelatedPosts.astro` - Verwandte Artikel
- `src/components/OptimizedImage.astro` - Bild-Optimierung (WebP)
- `src/components/FaqSchema.astro` - FAQ Schema Markup
- `src/components/TableOfContents.astro` - Auto-generiertes Inhaltsverzeichnis

### Seiten
- `src/pages/contact/index.astro` - Kontaktformular (Web3Forms)
- `src/pages/contact/success.astro` - Erfolgsseite nach Formular-Submit

### Layouts
- `src/layouts/BaseLayout.astro` - Basis-Layout mit SEO Meta-Tags
- `src/layouts/BlogPost.astro` - Blog-Post Layout mit Schema.org

### Blog-Features (automatisch in jedem Artikel)
- **Reading Time** - Geschätzte Lesezeit (200 Wörter/Minute)
- **Table of Contents** - Auto-generiertes Inhaltsverzeichnis aus H2/H3
- **FAQ Schema** - Strukturierte Daten für FAQ-Sections
- **Breadcrumbs** - Mit Schema.org Markup
- **Related Posts** - Verwandte Artikel basierend auf Tags

### Utilities
- `src/utils/blog.ts` - `getPublishedPosts()` für gefilterte Blog-Abfragen

---

## Content-Kategorien

| Kategorie | Anzahl Artikel | Status |
|-----------|----------------|--------|
| AI/Learning | 10 | Aktiv |
| AI/Travel | 16 | Draft (März-Juni) |
| 3D Printing | 6 | Aktiv |
| Photography | 7 | Aktiv |
| Japan Shopping | 3 | Aktiv |
| Tech & Gadgets | 5 | Aktiv |

### Geplante Artikel (Januar 2026)
| Datum | Artikel | Kategorie |
|-------|---------|-----------|
| 17. Jan | How to Buy from Japan: Beginner Guide | Japan Shopping |
| 19. Jan | Best Japanese Products to Import | Japan Shopping |
| 21. Jan | Is a Kindle Worth It | Tech & Gadgets |
| 23. Jan | Kindle vs Kobo | Tech & Gadgets |
| 25. Jan | Best Mechanical Keyboards for Beginners | Tech & Gadgets |
| 27. Jan | Best Tech Gifts Under $50 | Tech & Gadgets |
| 29. Jan | AirPods vs Galaxy Buds vs Sony | Tech & Gadgets |

### Geplante Artikel (Februar 2026) - AI/Productivity Fokus
| Datum | Artikel | Kategorie | Status |
|-------|---------|-----------|--------|
| 2. Feb | Claude vs ChatGPT | AI | ✅ Geschrieben |
| 5. Feb | Perplexity AI: The Google Killer for Research | AI | ✅ Geschrieben |
| 8. Feb | Best AI Tools for Office Work (2026) | AI/Productivity | ✅ Geschrieben |
| 11. Feb | Microsoft Copilot: Is It Worth the Price? | AI | ✅ Geschrieben |
| 14. Feb | AI Meeting Assistants: Never Take Notes Again | AI/Productivity | ✅ Geschrieben |
| 17. Feb | Notion AI vs Obsidian AI: Best for Note-Taking | AI/Productivity | ✅ Geschrieben |
| 20. Feb | How to Use AI at Work (Without Getting in Trouble) | AI/Productivity | ✅ Geschrieben |
| 23. Feb | AI Writing Tools: Grammarly vs Jasper vs Claude | AI | ✅ Geschrieben |
| 26. Feb | Best AI Chrome Extensions for Productivity | AI/Productivity | ✅ Geschrieben |

### AI Travel Planning Cluster (März-Juni 2026) - NEU!
**Status:** ✅ Alle 16 Artikel geschrieben (Draft)
**Noch zu tun:** Bilder erstellen (16 Stück), Publish-Dates setzen

**Pillar + Core Guides (6 Artikel):**
| Datum | Artikel | Slug |
|-------|---------|------|
| 1. März | How to Plan Your Perfect Trip with AI | `/ai-travel-planning-guide/` |
| 8. März | ChatGPT Travel Prompts (19 Prompts) | `/chatgpt-travel-planning-prompts/` |
| 15. März | Best AI Trip Planners 2026 | `/best-ai-trip-planners/` |
| 22. März | Malaysia Trip with ChatGPT ⭐ | `/chatgpt-malaysia-trip-planning/` |
| 29. März | AI Travel Planning Mistakes | `/ai-travel-planning-mistakes/` |
| 12. April | Free AI Travel Tools | `/free-ai-travel-tools/` |

**Tool-Vergleiche (4 Artikel):**
| Datum | Artikel | Slug |
|-------|---------|------|
| 5. April | Claude vs ChatGPT for Travel | `/claude-vs-chatgpt-travel-planning/` |
| 19. April | AI Packing Lists & Checklists | `/ai-packing-list-travel-checklist/` |
| 26. April | Google Gemini for Travel Planning | `/gemini-travel-planning/` |
| 3. Mai | Perplexity AI for Travel Research | `/perplexity-travel-research/` |

**Flight Agent + Destinations (6 Artikel):**
| Datum | Artikel | Slug |
|-------|---------|------|
| 10. Mai | Build Your Own AI Flight Search Agent | `/build-ai-flight-search-agent/` |
| 17. Mai | My Southeast Asia Trip 2026 (Case Study) | `/ai-planning-southeast-asia-trip-2026/` |
| 24. Mai | AI Trip Planning: Japan | `/ai-trip-planning-japan/` |
| 31. Mai | AI Trip Planning: Vietnam | `/ai-trip-planning-vietnam/` |
| 7. Juni | AI Trip Planning: Cambodia | `/ai-trip-planning-cambodia/` |
| 14. Juni | Japan vs Vietnam vs Cambodia Comparison | `/japan-vietnam-cambodia-comparison/` |

**Besondere Features in allen Artikeln:**
- ✅ **Glutenfreie Essensauswahl** - Prompts, sichere Gerichte, Restaurant-Karten, Übersetzungen
- ✅ **Reisekrankenversicherung** - AI-Prompts, länderspezifische Tipps, Evakuierung

**Länderspezifische Versicherungstipps:**
| Land | Healthcare | Evakuierung | Besonderheit |
|------|------------|-------------|--------------|
| Japan | Teuer, gut | Selten nötig | Vorauszahlung oft erforderlich |
| Vietnam | Variabel | Wichtig | Motorrad-Deckung essentiell! |
| Cambodia | Begrenzt | Essentiell | $50,000+ Evakuierungsdeckung |

**Glutenfrei-Ranking:**
1. Japan (Reis-basiert, Bewusstsein vorhanden)
2. Cambodia (Fischsauce meist sicher, wenig Soja)
3. Vietnam (Herausfordernd - Sojasauce überall)

**Malaysia-Artikel Details (echte Reise Nov 2025):**
- Route: KL (2N) → Penang (3N) → Langkawi (5N) → KL (3N)
- Budget: ~$150/Tag
- Besonderheit: Zöliakie/Glutenfrei-Winkel, Grab statt Uber, Lokale SIM-Karte
- Hotels: Sky Villa Suites, Urban Suites, The Riyaz Lavanya, The Platinum
- Highlights: Petronas Towers, Batu Caves (Dresscode + Affen!), Penang Hill, Kek Lok Si, Jetski Tour (600 MYR), Scooter (40 MYR/Tag), Duty-Free Langkawi

**Benötigte Bilder (16 Stück):**
- `ai-travel-planning-guide.webp`
- `chatgpt-travel-prompts.webp`
- `best-ai-trip-planners.webp`
- `chatgpt-malaysia-trip.webp`
- `ai-travel-mistakes.webp`
- `claude-vs-chatgpt-travel.webp`
- `free-ai-travel-tools.webp`
- `ai-packing-list.webp`
- `gemini-travel-planning.webp`
- `perplexity-travel-research.webp`
- `ai-flight-search-agent.webp`
- `ai-southeast-asia-trip-2026.webp`
- `ai-trip-planning-japan.webp`
- `ai-trip-planning-vietnam.webp`
- `ai-trip-planning-cambodia.webp`
- `japan-vietnam-cambodia-comparison.webp`

---

## SEO-Checkliste für neue Artikel

- [ ] Title mit Hauptkeyword (50-60 Zeichen)
- [ ] Meta Description (150-160 Zeichen)
- [ ] Featured Image als WebP (`/images/artikel-name.webp`)
- [ ] 3-5 relevante Tags
- [ ] FAQ-Section (3 Fragen mit Antworten) für Schema.org
- [ ] Interne Verlinkung zu 2-3 verwandten Artikeln innerhalb der Kategorie
- [ ] Cross-Category Links wo sinnvoll (z.B. Japan Shopping → Photography für Kameras)
- [ ] **llms.txt aktualisieren** - Neuen Artikel zur passenden Kategorie hinzufügen

---

## LLM-Optimierung

Die Website ist für LLMs (ChatGPT, Claude, Perplexity etc.) optimiert.

### Dateien
| Datei | URL | Beschreibung |
|-------|-----|--------------|
| `public/llms.txt` | https://boredom-at-work.com/llms.txt | Kompakte Übersicht (~4 KB) |
| `public/llms-full.txt` | https://boredom-at-work.com/llms-full.txt | Ausführlich mit FAQs (~11 KB) |
| `public/robots.txt` | https://boredom-at-work.com/robots.txt | Erlaubt AI-Crawler |

### llms.txt Pflege
Bei neuen Artikeln **beide Dateien** aktualisieren:

**llms.txt** - Nur Link hinzufügen:
```markdown
- [Artikel Titel](https://boredom-at-work.com/artikel-slug/): Kurzbeschreibung
```

**llms-full.txt** - Mit Details hinzufügen:
```markdown
### Artikel Titel
**URL:** https://boredom-at-work.com/artikel-slug/
**Reading Time:** X minutes
Ausführliche Beschreibung des Artikels mit Key Insights.
```

### Spezifikation
- Format: Markdown (für LLMs optimiert)
- Standard: https://llmstxt.org

### Indexierung Status (Stand: 20. Januar 2026)

**Google Search Console:**
- ✅ Website verifiziert
- ✅ `sitemap-index.xml` eingereicht (Status: Success)
- ⚠️ llms.txt NICHT als Sitemap einreichen (Fehler!) → stattdessen via "URL-Prüfung" indexieren
- 📊 3 Seiten indexiert (Stand: 20. Jan), Rest in Bearbeitung

**Bing Webmaster Tools:**
- ✅ Eingerichtet (Import von Google Search Console)
- Wichtig für ChatGPT (nutzt Bing als Suchmaschine)

**robots.txt:**
- ✅ Alte WordPress-URLs blockiert (/feed, /comments/, /archives/, /search/, /sample-page/)

**Nächste Schritte:**
1. Wichtige URLs manuell zur Indexierung anfordern (URL-Prüfung in GSC)
2. Warten auf Indexierung (1-4 Wochen)

---

## Traffic & Marketing (Stand: 20. Januar 2026)

### Aktive Kanäle

| Kanal | Status | Account |
|-------|--------|---------|
| Google (SEO) | ⏳ 3 Seiten indexiert | Search Console aktiv |
| Bing | ✅ Eingerichtet | Webmaster Tools |
| Reddit | ✅ Posts erstellt | - |
| Pinterest | ✅ Account + 1 Pin | Boards erstellt |

### Reddit-Strategie

**Status: ✅ ERFOLGREICH** (Stand: 22. Januar 2026)
- Backlinks generiert
- Direkter Traffic signifikant

**Beste Subreddits für unsere Inhalte:**
- r/3Dprinting - 3D Printing Artikel
- r/learnmachinelearning - AI Kurse
- r/artificial - AI allgemein
- r/photography - Kamera-Guides
- r/productivity - Productivity/AI Tools (NEU)
- r/ChatGPT - ChatGPT/Claude Vergleiche (NEU)

**Post-Regeln:**
- Nicht spammy formulieren - echten Mehrwert bieten
- Frage am Ende stellen (Diskussion anregen)
- Beste Zeit: 14-20 Uhr MEZ (US wach)
- Auf Kommentare antworten

**Bereits gepostet:**
- ✅ 3D Printing Beginner Mistakes → r/3Dprinting (Erfolg!)
- ✅ Best Free AI Courses → r/learnmachinelearning (Erfolg!)
- ✅ Best Cameras Under $500 → r/AskPhotography (22. Jan)
- ✅ ChatGPT Tutorial for Beginners → r/learnmachinelearning (27. Jan)

**Nächste Posts (Februar-Content):**
- [ ] Claude vs ChatGPT → r/ChatGPT, r/ClaudeAI
- [ ] Perplexity AI Guide → r/perplexity_ai
- [ ] Best AI Tools for Office → r/productivity
- [ ] AI Meeting Assistants → r/remotework

---

### 📋 VORBEREITETE REDDIT-POSTS (Posten ab 23. Januar 2026)

**Posting-Zeitplan:**
| # | Artikel | Subreddit | Datum |
|---|---------|-----------|-------|
| 1 | Best Cameras Under $500 | r/AskPhotography | ✅ 22. Jan |
| 2 | Is a Kindle Worth It | r/kindle | 24. Jan |
| 3 | How to Buy from Japan | r/JapaneseProducts | 25. Jan |
| 4 | DSLR vs Mirrorless | r/AskPhotography | 26. Jan |
| 5 | ChatGPT Tutorial | r/ChatGPT | 27. Jan |

**Beste Posting-Zeit:** 15-17 Uhr MEZ (US Ostküste wach)

---

#### Post 1: Best Cameras Under $500 → r/photography

**Title:** `I put together a guide for budget cameras under $500 - would love feedback from more experienced photographers`

**Body:**
```
Hey everyone,

I've been researching budget-friendly cameras for a while and finally wrote up my findings. Focused on what's actually worth buying in 2026 for beginners who want to step up from smartphones but don't want to break the bank.

Covered mirrorless, some DSLRs (used market), and a few compact options. Tried to focus on real-world value rather than just specs.

Here's the guide: https://boredom-at-work.com/best-cameras-under-500/

Curious what this community thinks - did I miss any hidden gems in the sub-$500 range? Always looking to learn from people with more experience.
```

---

#### Post 2: Is a Kindle Worth It → r/kindle

**Title:** `Wrote an honest assessment of whether Kindles are still worth it in 2026 - interested in this community's take`

**Body:**
```
I've been using a Kindle for a while and recently wrote up my honest thoughts on whether they're actually worth buying in 2026.

Covered the pros (battery life, eye strain, distraction-free reading) and cons (Amazon lock-in, PDF handling, the "do I really need another device" question).

Link if anyone's interested: https://boredom-at-work.com/is-kindle-worth-it/

For those of you who've had Kindles for years - do you think they're still as good a value as they used to be? Or has the smartphone Kindle app caught up enough?
```

---

#### Post 3: How to Buy from Japan → r/JapaneseProducts

**Title:** `Complete guide to buying from Japan using proxy services - took me months to figure this out`

**Body:**
```
Finally wrote up everything I learned about importing from Japan. Proxy services like Buyee and Sendico, Yahoo Auctions Japan, Mercari JP, the whole process.

Took me a while to figure out all the fees, shipping options, and which services are actually reliable. Hopefully saves someone else the learning curve.

Full guide here: https://boredom-at-work.com/how-to-buy-from-japan-beginners-guide/

What's been your experience? Any tips I might have missed? Always looking to learn from people who've been doing this longer.
```

---

#### Post 4: DSLR vs Mirrorless → r/AskPhotography

**Title:** `DSLR vs Mirrorless for beginners in 2026 - wrote a comparison, curious if you agree`

**Body:**
```
The DSLR vs mirrorless debate comes up a lot, so I wrote a detailed comparison specifically for beginners trying to decide.

My take: mirrorless is the future, but used DSLRs offer insane value right now. Tried to be balanced about when each makes sense.

Here's the full breakdown: https://boredom-at-work.com/dslr-vs-mirrorless-beginners/

Interested in what this community thinks - for someone buying their first "real" camera in 2026, would you still recommend a DSLR? Or is mirrorless the only sensible choice now?
```

---

#### Post 5: ChatGPT Tutorial → r/ChatGPT

**Title:** `Made a beginner's guide to ChatGPT for people who are just getting started`

**Body:**
```
A lot of friends and coworkers have been asking me how to actually use ChatGPT effectively, so I wrote up a comprehensive beginner's guide.

Covers the basics but also some prompting techniques that took me a while to figure out. Tried to make it practical rather than theoretical.

Guide here: https://boredom-at-work.com/chatgpt-tutorial-beginners/

For the experienced users here - what do you wish you'd known when you first started? Might update the guide based on feedback.
```

---

*Nach dem Posten: Status hier aktualisieren und Notiz oben löschen.*

### Pinterest-Strategie

**Account:** Eingerichtet (Business Account)

**Boards erstellt:**
- 3D Printing Tips & Guides
- Photography for Beginners
- Learn AI & Tech Skills

**Pin-Format:**
- Größe: 1000 x 1500 px (vertikal)
- Tool: Canva (kostenlose Templates mit Filter "Preis → Kostenlos")

**Erstellte Pins:**
- ✅ 10 3D Printing Mistakes
- ✅ Best Cameras Under $500 (27. Jan) — https://www.pinterest.com/pin/1123014857097046894/
- ✅ 7 Free AI Courses (27. Jan) — https://www.pinterest.com/pin/1123014857097047528/

**Nächste Pins erstellen:**

**Pin 2: Best Cameras Under $500**
```
Titel: Best Cameras Under $500 for Beginners (2026 Guide)

Beschreibung:
Looking for your first real camera? These are the best cameras under $500 for beginners in 2026. Mirrorless, DSLR, and compact options compared. Perfect for learning photography without breaking the bank.

📸 Includes specs, pros/cons, and which to pick

#photography #camera #beginnerphotography #cameragear #mirrorless #sonycamera #canoncamera #nikoncamera

Link: https://boredom-at-work.com/best-cameras-under-500/
Board: Photography for Beginners
```

**Pin 3: Free AI Courses**
```
Titel: 7 Actually Free AI Courses (No Hidden Paywalls)

Beschreibung:
Want to learn AI without spending money? These 7 courses are genuinely free - including some with free certificates. From Google AI Essentials to OpenAI Academy. Perfect for career development during lunch breaks.

⏱️ All under 10 hours to complete

#artificialintelligence #ai #onlinelearning #freecourses #careerdevelopment #chatgpt #machinelearning #upskilling

Link: https://boredom-at-work.com/best-free-ai-courses/
Board: Learn AI & Tech Skills
```

**Pinterest-Tipps:**
- 3-5 Pins pro Woche (Konsistenz wichtig)
- Jeden Artikel mehrfach pinnen (verschiedene Designs)
- Beste Zeit: Abends und Wochenenden

### Traffic-Erwartungen

| Zeitraum | Erwartung |
|----------|-----------|
| Monat 1-2 | Indexierung, kaum organischer Traffic |
| Monat 3-4 | Erste Rankings, 50-200 Besucher/Monat |
| Monat 6+ | Stabiler organischer Traffic |

**Schnelle Wins:** Reddit-Posts können sofort Traffic bringen

---

## Kontaktformular

- **URL:** https://boredom-at-work.com/contact/
- **Service:** Web3Forms (kostenlos)
- **E-Mail:** twelvecharacters@proton.me
- **Access Key:** In `src/pages/contact/index.astro` gespeichert

---

## Deployment

```bash
# Änderungen pushen (GitHub Actions deployed automatisch)
git add .
git commit -m "Add: Neuer Artikel"
git push
```

Build-Zeit: ~1-2 Minuten via GitHub Actions

### Scheduled Posts (Wichtig!)

**Problem:** Bei statischen Seiten (Astro + GitHub Pages) werden Artikel mit Zukunfts-`publishDate` erst beim nächsten Build live geschaltet — NICHT automatisch am Veröffentlichungstag.

**Lösung:** Täglicher Cron-Job in `.github/workflows/deploy.yml`:
```yaml
schedule:
  - cron: '0 6 * * *'  # Täglich 6:00 UTC (7:00 MEZ / 8:00 MESZ)
```

**Manueller Rebuild** (falls nötig):
```bash
git commit --allow-empty -m "Trigger rebuild for scheduled posts" && git push
```

### Artikel-Zeitplan prüfen
```bash
# Alle publishDates anzeigen (sortiert)
grep "publishDate:" src/content/blog/*.md | sort -t: -k3
```

---

## Post-Publish-Check (AUTOMATISCH durchführen!)

**Wenn der Benutzer nach einem geplanten Artikel fragt oder ein Artikel heute veröffentlicht werden sollte:**

### 1. Deployment prüfen
```bash
# Letzten GitHub Actions Run prüfen
gh run list --limit 5
```
- Cron-Job sollte täglich ~6:00-8:00 UTC laufen
- Status muss "success" sein

### 2. Artikel online prüfen
- Artikel-URL direkt aufrufen: `https://boredom-at-work.com/[slug]/`
- Blog-Übersicht prüfen: Artikel sollte als erster erscheinen
- Bei Cache-Problemen: Hard-Refresh empfehlen (`Cmd + Shift + R`)

### 3. SEO-Checkliste verifizieren
| Check | Befehl/Aktion |
|-------|---------------|
| Title (50-60 Zeichen) | Im Frontmatter prüfen |
| Description (150-160 Zeichen) | Im Frontmatter prüfen |
| WebP-Bild vorhanden | `ls public/images/[bild].webp` |
| Tags (3-5) | Im Frontmatter prüfen |
| FAQ-Section (3 Fragen) | Im Frontmatter prüfen |
| Interne Links (2-3) | Im Artikel-Body prüfen |
| llms.txt aktualisiert | `grep "[slug]" public/llms.txt` |
| llms-full.txt aktualisiert | `grep "[slug]" public/llms-full.txt` |

### 4. Ergebnis melden
- Alle Checks bestanden → "Alles erledigt"
- Fehlende Punkte → Automatisch beheben oder User informieren

---

## Prompt-Templates

Siehe `CONTENT-PROMPTS.md` für vorgefertigte Prompts:
- Article Generator Prompt
- Product Comparison Prompt
- Beginner Guide Prompt
- Japan Shopping Guide Prompt

---

*Letzte Aktualisierung: 27. Januar 2026 (Travel Cluster Bilder 1/16)*
