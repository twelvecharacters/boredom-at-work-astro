# Projekt-Regeln und Kontext für boredom-at-work.com

> Diese Datei wird bei jeder Claude Code Sitzung automatisch gelesen.

---

## ⚠️ ERINNERUNGEN (Stand: 7. Februar 2026)

### Letzte Sitzung (7. Februar 2026)

**✅ Post-Publish Check & Fixes: Manis neue Artikel (ClawDBot + RapidRAW)**

Mani (Bruder) hat 5 Commits gepusht mit:
- `clawdbot-openclaw-guide.md` (Publish: 7. Feb)
- `rapid-raw-image-editor-guide.md` (Publish: 12. Feb)
- Learning Paths entfernt (Redirects → Homepage)
- Index-Seite: Random Category Display

**Fixes durchgeführt:**

| Artikel | Fixes | Highlights |
|---------|-------|------------|
| `clawdbot-openclaw-guide.md` | 4 | "Moltbot" Kontext korrigiert, LLM API Privacy-Caveat (Ollama), 3 interne Links, FAQ korrigiert |
| `rapid-raw-image-editor-guide.md` | 4 | Title 81→47 Zeichen, Lizenz GPL→AGPL-3.0, 3 interne Links, Bild optimiert (287→102 KB) |

**llms.txt + llms-full.txt:** Beide Artikel nachgetragen.

**Commit:** `64bdfe0 fix: post-publish fixes for ClawDBot + RapidRAW articles`

---

**✅ Fact-Check Korrekturen: 3 Artikel von Mani, 13 Fixes**

| Artikel | Publish | Fixes | Highlights |
|---------|---------|-------|------------|
| `pearcleaner-homebrew-guide.md` | 15. Feb | 3 | "open-source" → "source-available" (Apache 2.0 + Commons Clause), `brew doctor` unverified entfernt, "(v2)" entfernt |
| `kindle-modding-guide.md` | 18. Feb | 6 | WinterBreak/AdBreak als aktuelle Methoden, Scribe-Caveat, "official" → "community-run" Wiki, Bricking-Warnung verstärkt, Custom Fonts = kein Jailbreak |
| `macos-tahoe-tricks-and-hacks.md` | 9. Feb | 4 | LLM Siri → "spring 2026", Phone App: FaceTime Audio → Cellular + Call Screening/Hold Assist, Quick Actions korrigiert, Intel-Mac-Liste präzisiert |

**Commit:** `4acd650 fix: fact-check corrections for Pearcleaner, Kindle Modding, macOS Tahoe`

**Hinweis:** Mani soll zukünftig den Fact-Check selbst vor dem Commit durchführen.

---

### Sitzung (6. Februar 2026 - Abend)

**✅ Fact-Check Korrekturen: 8 Artikel, ~67 Fixes**

| Artikel | Publish | Fixes | Highlights |
|---------|---------|-------|------------|
| `best-ai-tools-office-work.md` | 8. Feb | 13 | Tome → Canva AI, Claude Web Search, Notion AI Pricing, ~10 Preise korrigiert |
| `chatgpt-for-excel.md` | 10. Feb | 12 | Free Tier Upload, Copilot Free Option, Excel 2021+ Funktionen |
| `microsoft-copilot-review.md` | 11. Feb | 6 | GPT-4→GPT-5.2, Individual-Pläne, Prompt Gallery |
| `10-things-to-print-new-3d-printer.md` | 12. Feb | 1 | Thingiverse "largest" → "one of the most well-known" |
| `chatgpt-custom-instructions.md` | 13. Feb | 6 | UI-Update: Personality Dropdown + Single Field |
| `macos-tahoe-tricks-and-hacks.md` | 9. Feb | 11 | LLM Siri → macOS 26.4, iPhone Mirroring → Sequoia, Shortcuts korrigiert |
| `ai-meeting-assistants.md` | 14. Feb | 13 | Granola Pricing + "local processing" falsch, Fathom/tl;dv Pricing, Free Tier Limits |
| `ai-planned-london-weekend.md` | 15. Feb | 5 | Clawd.bot Open-Source, Stansted Express Contactless-Warnung, Ratings gehedgt |

**Commits:**
- `7da478b fix: fact-check corrections across 6 articles (~49 fixes)`
- `8c1993d fix: fact-check corrections for Feb 14+15 articles`

---

### Sitzung (6. Februar 2026 - Nachmittag)

**✅ Post-Publish Check: Samsung S26 Rumors**

| Check | Status |
|-------|--------|
| Artikel online | ✅ Live unter `/samsung-s26-rumors/` |
| Title (52 Zeichen) | ✅ |
| Description (155 Zeichen) | ✅ |
| WebP-Bild | ✅ |
| Tags (5) | ✅ |
| FAQ (3) | ✅ |
| Interne Links (2) | ✅ |
| llms.txt + llms-full.txt | ✅ Nachgetragen |

**✅ Fact-Check: Google Gemini Review (Publish: 7. Feb)**

| # | Problem | Fix |
|---|---------|-----|
| 1 | Model-Lineup veraltet (2.0/1.5) | → Gemini 3 Flash/Pro + 2.5 Pro/Flash |
| 2 | "Gemini Advanced" Branding | → "Google AI Pro" (durchgängig) |
| 3 | "Plugin ecosystem" (falsch!) | → GPT Store + Custom GPTs |
| 4 | Sora ohne Gemini-Pendant | → Sora 2 + Gemini hat jetzt Veo 3 |
| 5 | Claude Image Features ❌ | → Aufgeteilt: Analysis ✅ / Generation ❌ |
| 6 | Imagen 3 | → Imagen 4 |

**Commit:** `a5472bf fix: update Gemini review facts + add Samsung S26 to llms.txt`

---

### Sitzung (6. Februar 2026 - Vormittag)

**✅ Neuer Artikel: AI-Planned London Weekend**

| Detail | Wert |
|--------|------|
| Slug | `/ai-planned-london-weekend/` |
| Publish | 15. Februar 2026 |
| Bilder | 4 (Chinatown, Dumplings, MJ Musical, Theater) |
| Cluster | AI Travel Planning |

**Inhalt:** Echter Trip Report mit Clawd.bot. MJ Musical, Chinatown spontan, 3 GF-Restaurants (Brick Lane Coffee, Ugly Dumpling, Wicked Fish). Stansted Express Ticket-Fehler als Lesson Learned.

**Interne Verlinkung:**
- `best-ai-trip-planners.md` → Link zum London-Artikel
- `chatgpt-malaysia-trip-planning.md` → "More Trip Reports" Sektion
- `llms.txt` + `llms-full.txt` aktualisiert

---

**📢 Reddit-Posts für Februar-Content:**

| Subreddit | Artikel | Status |
|-----------|---------|--------|
| r/ChatGPT | Claude vs ChatGPT | ✅ Gepostet |
| r/ClaudeAI | Claude vs ChatGPT | ✅ Gepostet |
| r/perplexity_ai | Perplexity AI Guide | ✅ Gepostet |

**Nächste Reddit-Posts (noch offen):**
- [x] Best AI Tools for Office → r/productivity ✅ Gepostet (8. Feb)
- [x] AI Meeting Assistants → r/remotework ✅ Gepostet (8. Feb)
- [ ] AI-Planned London Weekend → r/travel, r/solotravel (nach 15. Feb)

---

### Sitzung (5. Februar 2026 - Nacht)

**✅ Internes Linking optimiert (Home Office Cluster):**

| Datei | Neuer Link |
|-------|------------|
| `best-ai-tools-office-work.md` | → `/desk-upgrade-guide/` |
| `best-tech-gifts-under-50.md` | → `/desk-upgrade-guide/` |
| `best-mechanical-keyboards-beginners.md` | → `/desk-upgrade-guide/`, `/best-office-chairs/` |
| `ai-tools-guide.md` | → `/desk-upgrade-guide/` (neue Related Section) |
| `best-standing-desks.md` | → `/best-office-chairs/` |

**🧹 Image-Ordner aufgeräumt:**
- 64 Source-Dateien gelöscht (PNG/JPG)
- **150 MB** Speicherplatz freigemacht
- WebP-Versionen in `public/images/` bleiben (101 Dateien, ~8 MB)

---

### Sitzung (5. Februar 2026 - Spätabend)

**✅ Umfassender Fact-Check durchgeführt — 26 Artikel korrigiert:**

| Kategorie | Korrekturen |
|-----------|-------------|
| **Preise** | Bambu A1 Mini ($280→$219), AirPods Pro 3 ($279→$249), Kindle Scribe ($339→$499), Z50 II ($860→$960) |
| **Kursdauer** | Elements of AI (6h→25-50h), IBM AI Foundations (6h→~20h), Prompt Eng (5h→~2h) |
| **Marketplace** | Cults3D (8-20%→20% flat), MyMiniFactory (30%→10-15%) |
| **Software** | Notion AI ($10 Add-on → in Business inkl.), Gemini Limits dokumentiert |
| **Veraltetes** | ChatGPT Plugins (April 2024 eingestellt) → "Custom GPTs" + "Web Search" |

**Korrigierte Artikel (Top-Priorität):**
- `bambu-a1-mini-vs-creality-ender-3.md` — Preise + Specs
- `airpods-pro-3-review.md` — Preis $249
- `kindle-vs-kobo.md` — Komplette Lineup-Aktualisierung
- `notion-ai-vs-obsidian-ai.md` — Pricing-Modell
- `best-ai-trip-planners.md` — Plugin → Web Search
- `claude-vs-chatgpt.md` — Plugins → Custom GPTs

**Commit:** `f78bede fix: comprehensive fact-check corrections across 26 articles`

---

### Sitzung (5. Februar 2026 - Nachmittag/Abend)

**🏠 Home Office Cluster komplett:**

| Artikel | Slug | Publish | Status |
|---------|------|---------|--------|
| Best Standing Desks | `/best-standing-desks/` | 8. März | ✅ Geschrieben |
| Best Office Chairs | `/best-office-chairs/` | 10. März | ✅ Geschrieben |
| Desk Upgrade Guide (Hub) ⭐ | `/desk-upgrade-guide/` | 15. März | ✅ Geschrieben |
| Best Monitor Arms | `/best-monitor-arms/` | 12. März | ✅ Geschrieben |
| Cable Management Tips | `/cable-management-tips/` | 14. März | ✅ Geschrieben |

**✅ Fact-Checking Prozess etabliert:**
| Tier | Maßnahme |
|------|----------|
| 1 | Offizielle Hersteller-Specs prüfen |
| 2 | Hedging-Sprache bei Preisen ("~$500", "starting at") |
| 3 | Quellen dokumentieren (Tom's Guide, TechRadar etc.) |
| 4 | Verifikationsdatum im Artikel notieren |

**✅ Author Bio verbessert (E-E-A-T):**
- Neue Bio: "Tech enthusiast with 10+ years in online marketing..."
- 3 Credential Badges: 🧪 50+ AI tools tested | 🖨️ 3D printing since 2019 | ✈️ 6 countries with AI
- Social Links erweitert: YouTube + Reddit + Email
- Avatar geändert: ✍️ → 🧪

**✅ YouTube Videos erstellt (2 + 3):**
| Video | URL | Status |
|-------|-----|--------|
| Best AI Tools 2026 | https://youtu.be/IoGF-x_prXQ | ✅ Live |
| Learn AI Roadmap | https://youtu.be/h-V_Lu_J_hw | 🔒 Unlisted → **7. März** |

**✅ Hub Pages erstellt (Koray Framework):**

| Hub Page | Slug | Artikel | Publish |
|----------|------|---------|---------|
| 3D Printing Guide | `/3d-printing-guide/` | 14 | 5. März |
| Photography Guide | `/photography-guide/` | 7 | 6. März |

**🎉 Alle 5 Hub Pages jetzt komplett:**
```
AI/Productivity ─► ai-tools-guide (15+ Artikel)
AI Learning ─────► learn-ai-guide (10+ Artikel)
ChatGPT ─────────► chatgpt-guide (8+ Artikel)
3D Printing ─────► 3d-printing-guide (14 Artikel)
Photography ─────► photography-guide (7 Artikel)
```

**📺 YouTube Videos Status:**
| Artikel | Video | Status |
|---------|-------|--------|
| `chatgpt-plus-vs-free.md` | ✅ https://youtu.be/b6o1JZjI7dU | Live |
| `ai-tools-guide.md` | ✅ https://youtu.be/IoGF-x_prXQ | Live (Artikel: 4. März) |
| `learn-ai-guide.md` | ✅ https://youtu.be/h-V_Lu_J_hw | Unlisted → **7. März public** |
| `chatgpt-guide.md` | ❌ TODO | |

**⏰ TODO:**
- [ ] Video für `chatgpt-guide.md` erstellen
- [ ] **7. März:** learn-ai-guide Video auf PUBLIC schalten
- [x] ~~Home Office Cluster ausbauen~~ ✅ KOMPLETT (5 Artikel + Hub Page)

**🔍 Fact-Check Erkenntnisse (für zukünftige Artikel):**
- Preise ändern sich schnell — immer "~$XXX" oder "starting at" verwenden
- ChatGPT Plugins gibt es nicht mehr (seit April 2024) — nur noch GPTs + native Features
- Kursdauern auf offiziellen Seiten prüfen (oft falsch geschätzt)
- E-Reader Lineup ändert sich häufig — vor Publish prüfen
- Marketplace-Gebühren variieren — immer offizielle Docs checken

**🤖 Fact-Check Hook AKTIV (BLOCKIEREND):**

| Schritt | Aktion |
|---------|--------|
| 1. | `git add` Blog-Artikel |
| 2. | `git commit` → **BLOCKIERT** mit Checkliste |
| 3. | `~/.claude/confirm-fact-check.sh` ausführen |
| 4. | `git commit` → **ERLAUBT** (1h gültig) |

```
Hooks:
  .git/hooks/pre-commit             # Git Hook (blockiert echt!)
  ~/.claude/confirm-fact-check.sh   # Bestätigt Fact-Check
Ignoriert:
  .fact-check-confirmed             # Temporäre Bestätigungsdatei
```

⚠️ **WICHTIG:** Hook liegt in `.git/hooks/` (nicht versioniert!). Bei neuem Clone:
```bash
cp ~/.claude/fact-check-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

---

### Sitzung (5. Februar 2026 - Vormittag)

**🧹 Cleanup:**
- **clawdbot deinstalliert** — Drittanbieter-Tool das API-Kosten verursacht hat
- **API-Key gelöscht** — In Anthropic Console rotiert

**✅ Blog-Fix: 17 Artikel mit fehlendem `draft: false` korrigiert:**
- 2× Januar (CAD Software, Olympus PEN)
- 8× Februar (3D Printing Cluster)
- 7× März (AI Cluster Hub Pages + Supporting Articles)

---

### Sitzung (4. Februar 2026 - Abend)

**🎉 YouTube Kanal gestartet!**

- **Kanal:** @boredom-at-work
- **URL:** https://www.youtube.com/@boredom-at-work

**✅ Erstes Video hochgeladen:**
- Titel: "ChatGPT Plus vs Free: Is $20/Month Actually Worth It? (2026)"
- URL: https://youtu.be/b6o1JZjI7dU
- Erstellt mit NotebookLM (Audio Overview)
- Custom Thumbnail erstellt (Split-Design Free/Plus)

**✅ Video in Artikel eingebettet:**
- `chatgpt-plus-vs-free.md` — YouTube iframe nach Intro eingefügt

**YouTube Workflow etabliert:**
1. Script erstellen → NotebookLM für Audio
2. Video in Clipchamp/CapCut zusammenbauen
3. 5000+ Zeichen Description (SEO-optimiert)
4. Custom Thumbnail (1280x720, max 2MB)

**Nächste YouTube-Schritte (für morgen):**
- [ ] Weitere Videos aus bestehenden Artikeln erstellen
- [ ] Shorts testen (60 Sek aus Artikel-Highlights)
- [ ] Reddit Promo für Video

---

### Sitzung (4. Februar 2026 - Vormittag)

**✅ Artikel-Update: `selling-3d-prints-online.md`**

1. **FAQ Schema überarbeitet** — Neue Fragen mit echter Suchintention:
   - "How much money can you make selling 3D prints?"
   - "What 3D printer is best for starting a printing business?"
   - "Is it legal to sell 3D printed items?"
   - "Where is the best place to sell 3D prints online?"

2. **Platform-Vergleich komplett neu** — Erweitert von 4 auf 6 Plattformen:
   - Physical: Etsy, eBay, Facebook Marketplace/Craigslist (neu)
   - Digital: Cults3D (Fees korrigiert: 8-20% statt pauschal 20%), MyMiniFactory, Thangs (neu)
   - Own Brand: Shopify

3. **Neue Struktur:** "The Smart Strategy" — Layer-Ansatz (Test → Scale → Diversify → Graduate)

4. **Fees korrigiert:** Etsy ~10-12% total (nicht nur 6.5%), Cults3D 8-20% gestaffelt

**✅ Pillar Pages FAQ-Upgrade (3 Hub Articles):**

| Artikel | Neue FAQs |
|---------|-----------|
| `ai-tools-guide.md` | 6 FAQs — ChatGPT vs Claude, Multi-Tool-Workflow, Kosten, Datenschutz |
| `learn-ai-guide.md` | 6 FAQs — Einstieg ohne Erfahrung, Coding nicht nötig, beste Kurse, Skills für Jobs |
| `chatgpt-guide.md` | 6 FAQs — GPT-4o erklärt, bessere Antworten bekommen, ChatGPT vs Google |

**✅ Workflow-Regeln aktualisiert:**
- Neue Regel 5: FAQ Schema mit echter Suchintention
- Neue Regel 6: Vergleichs-Sections bei Tool/Platform-Artikeln

---

### Sitzung (3. Februar 2026 - Nachmittag)

**✅ AI Cluster Phase 2 komplett — 8 Artikel (~28.200 Wörter):**

| Artikel | Datum | Bild |
|---------|-------|------|
| AI Tools Guide (Hub) ⭐ | 4. März | ✅ 127 KB |
| Learn AI Guide (Hub) ⭐ | 7. März | ✅ 105 KB |
| ChatGPT Mastery Guide (Hub) ⭐ | 10. März | ✅ 42 KB |
| Claude AI Review | 12. März | ✅ 93 KB |
| ChatGPT Alternatives | 14. März | ✅ 40 KB |
| AI for Email Writing | 16. März | ✅ 75 KB |
| AI PDF Summarizers | 18. März | ✅ 73 KB |
| Copilot Word Tutorial | 20. März | ✅ 97 KB |

**Alle 3 Pillar Pages für AI Cluster sind jetzt fertig.**

**✅ Publish-Dates angepasst:**
- ChatGPT Plus vs Free: 5. Feb → **4. Feb**
- Google Gemini Review: 8. Feb → **7. Feb**
- Best Free macOS Apps: 12. Feb → **25. Feb**
- AI Travel Planning Guide: 1. März → **28. Feb**

**Nächste Session (4. Feb 10:30):** 3D Printing Cluster Phase 2
- How Long Does 3D Printing Take?
- Best 3D Printers Under $200
- Resin 3D Printing for Beginners

---

### Vorherige Sitzung (3. Februar 2026 - Vormittag)

**✅ 3D Printing Cluster Phase 1 komplett (~10.600 Wörter):**

| Artikel | Datum | Bild |
|---------|-------|------|
| PLA vs PETG vs ABS | 19. Feb | ✅ |
| Cura Settings for Beginners | 21. Feb | ✅ |
| 3D Print Not Sticking Fixes | 24. Feb | ✅ |
| Best Sites for Free 3D Models | 27. Feb | ✅ |
| FDM vs Resin Printing | 2. März | ✅ |

**✅ Build-Logik Fix für publishDate**

**✅ Artikel live:** `selling-3d-prints-online.md` — 3. Feb 2026

---

### Sitzung (2. Februar 2026)

**✅ 5 neue Artikel geschrieben & gepusht (~14.700 Wörter):**

| Artikel | Datum | Bild |
|---------|-------|------|
| ChatGPT Plus vs Free | 4. Feb | ✅ |
| Google Gemini Review | 7. Feb | ✅ |
| ChatGPT for Excel | 10. Feb | ✅ |
| ChatGPT Custom Instructions | 13. Feb | ✅ |
| AI Presentation Makers | 16. Feb | ✅ |

**✅ Topical Map erstellt:** `TOPICAL-MAP-AI-PRODUCTIVITY.md`

---

### Vorherige Sitzung (2. Februar 2026 - Vormittag)

- A11y/Perf Optimierungen, SEO Fixes
- Content Updates (ChatGPT Tutorial, Claude vs ChatGPT)
- Focus Mode + Sticky ToC
- CLAUDE.md auf aktuellen Stand gebracht

---

### Geplanter Artikel (Draft)

**Ray-Ban Meta Review:**
- Datum: 11. März 2026
- Status: Draft (nach 3 Wochen Nutzung schreiben)
- ✅ Bild: `ray-ban-meta-review.webp` (58 KB)

---

### Wichtige Erinnerungen

**✅ Scheduled Posts:** GitHub Actions eigener Cron (`0 5 * * *`) reicht aus — externer Cron-Job (cron-job.org) wurde entfernt, kein separater Token mehr nötig.

---

### Verlauf (Januar 2026 - Zusammenfassung)

**29. Jan:** Specs-Korrekturen nach Reddit-Feedback (AirPods, Kindle, Kobo), Homepage optimiert, Produkt-Specs Workflow eingeführt

**28. Jan:** Reddit-Post r/airpods ✅, American English Konsistenz, Februar-Artikel terminiert

**27. Jan:** AI Travel Cluster komplett (16/16 Bilder + Artikel), AirPods Posts vorbereitet

**26. Jan:** Pagefind Search überarbeitet, A11y/Perf Fixes, ScrollToTop, AirPods Pro 3 Review

**23. Jan:** Alle 9 Februar-Bilder gepusht

**22. Jan:** Reddit-Kampagne gestartet (Best Cameras → r/AskPhotography)

---

## Projekt-Übersicht

- **Website:** https://www.boredom-at-work.com
- **Framework:** Astro 5 mit Tailwind CSS 4 + SCSS
- **Hosting:** GitHub Pages (automatisches Deployment via GitHub Actions)
- **Repository:** https://github.com/twelvecharacters/boredom-at-work-astro
- **Zielgruppe:** Office-Worker, die während der Arbeitszeit produktiv lernen wollen

---

## 💰 Monetarisierung (Strategie ab Feb 2026)

### Zwei-Säulen-Strategie

| Säule | Cluster | Zweck | Einnahmequelle |
|-------|---------|-------|----------------|
| **Traffic** | AI/Productivity | Volumen-Spiel | Display Ads |
| **Conversion** | 3D Printing | Affiliate-Fokus | Produktempfehlungen |

### Warum diese Kombination?

**AI/Productivity:**
- Riesiges Suchvolumen
- Hohe CPMs bei Tech-Audience ($15-40 RPM)
- Gut für digitale Produkte (Prompts, Templates)

**3D Printing:**
- Klare Produktempfehlungen (Drucker, Filament)
- Kaufbereite Enthusiasten-Audience
- Wiederkehrende Käufe (Filament = Verbrauchsmaterial)
- High-Ticket Items ($200-1500)

### Affiliate-Programme

**AI Tools:**
| Tool | Kommission |
|------|------------|
| Jasper AI | 30% recurring |
| Copy.ai | 45% first year |
| Writesonic | 30% recurring |
| Grammarly | $0.20-$20/signup |

**3D Printing:**
| Partner | Kommission |
|---------|------------|
| Amazon Associates | 4% |
| Bambu Lab (direkt) | 5-8% |
| 3DJake (EU) | 5-8% |
| Elegoo | 5% |

**Home Office / Desk Setup:**
| Partner | Kommission | Cookie | Anmeldung |
|---------|------------|--------|-----------|
| Secretlab | 12% | 7 Tage | [secretlab.co/pages/affiliates](https://secretlab.co/pages/affiliates) |
| Branch Furniture | 5% | 30 Tage | [branchfurniture.com/pages/affiliate-program](https://www.branchfurniture.com/pages/affiliate-program) |
| FlexiSpot | 3-7.5% | 30 Tage | [flexispot.com/affiliate-program](https://www.flexispot.com/affiliate-program) |
| Uplift Desk | 3% | 30 Tage | [upliftdesk.com/affiliate](https://www.upliftdesk.com/affiliate/) |
| Amazon Associates | 1-4% | 24 Std | Deckt VIVO, HON, Ergotron, Kabel-Zubehör ab |

*Kein Affiliate: Herman Miller, Ergotron (nur B2B Reseller)*

### 12-Monats-Plan

| Phase | Monate | Fokus | Ziel-Einnahmen |
|-------|--------|-------|----------------|
| Foundation | 1-3 | Content + Amazon/AdSense | €0-50/Mo |
| Growth | 4-6 | Traffic skalieren | €100-300/Mo |
| Monetization | 7-12 | Mediavine + Produkte | €500-2.000/Mo |

### Digitale Produkte (ab Monat 6-8)

**AI Cluster:**
- "100 ChatGPT Prompts for Work" (PDF) — €9-19
- AI Productivity Notion Template — €19-39
- Mini-Kurs "Learn AI in a Weekend" — €49-99

**3D Printing:**
- Beginner's First Prints STL Bundle — €9-15
- Troubleshooting Cheatsheet — €5-9
- Desk Organization STL Pack — €12-20

### Nächste Schritte

- [ ] Amazon Associates beantragen (deckt mehrere Cluster ab)
- [ ] Secretlab Affiliate beantragen (12% — höchste Kommission)
- [ ] Branch Furniture Affiliate beantragen (5% + hoher AOV)
- [ ] FlexiSpot Affiliate beantragen (meistempfohlene Standing Desk)
- [ ] 3DJake Affiliate beantragen
- [ ] Email-Liste/Newsletter starten
- [ ] Bei 10k Pageviews: Ezoic testen
- [ ] Bei 50k Sessions: Mediavine beantragen

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

5. **FAQ Schema mit echter Suchintention schreiben:**
   - Fragen formulieren, die Leute wirklich googlen (nicht generische Fragen)
   - Antworten mit konkreten Zahlen/Details (nicht vage)
   - Gut: "How much money can you make selling 3D prints?"
   - Schlecht: "Is 3D printing profitable?"
   - Pro Pillar Page: 4-6 FAQs
   - Pro normaler Artikel: 2-4 FAQs (wenn relevant)

6. **Vergleichs-Sections bei Tool/Platform-Artikeln:**
   - Immer echte Fees/Kosten recherchieren
   - Pro/Contra für jede Option
   - Zusammenfassende Tabelle
   - "Smart Strategy" oder Empfehlung am Ende

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

### Produkt-Specs verifizieren (WICHTIG!)

**Bei allen Artikeln mit technischen Produktdaten (Reviews, Vergleiche, Buying Guides):**

1. **IMMER offizielle Hersteller-Specs prüfen** bevor der Artikel gepusht wird:
   - Apple: support.apple.com/specs oder apple.com/[product]/specs
   - Samsung: samsung.com/[product]
   - Sony: sony.com/electronics
   - Amazon (Kindle): amazon.com Produktseite
   - Kobo: kobobooks.com
   - Kamera-Hersteller: Canon, Nikon, Sony, Fujifilm offizielle Seiten

2. **Kritische Specs die oft falsch sind:**
   | Kategorie | Häufige Fehler |
   |-----------|----------------|
   | Earbuds | Akkulaufzeit, Chip-Generation, IP-Rating |
   | E-Reader | Bildschirmgröße, Preis, Gewicht |
   | Kameras | Preis mit Kit-Lens, Autofokus-Punkte, Video-Specs |
   | Smartphones | Chip, RAM, Kamera-MP |

3. **Workflow:**
   ```
   1. Artikel schreiben
   2. Alle Produkt-Specs in Tabellen identifizieren
   3. Gegen offizielle Quellen prüfen (WebSearch/WebFetch)
   4. Korrekturen vornehmen
   5. Erst dann pushen
   ```

4. **Bei Preisen:** Preise ändern sich häufig — Formulierungen wie "~$XXX" oder "starting at $XXX" verwenden

### Fact-Checking-Prozess (PFLICHT!)

**Gilt für ALLE Artikel — nicht nur Produkt-Reviews!**

#### 1. Vor dem Schreiben
| Check | Aktion |
|-------|--------|
| Offizielle Quellen | Für jedes Produkt/Tool die offizielle Website identifizieren |
| Aktuelle Preise | Mit Datum notieren (Preise ändern sich!) |
| Software-Versionen | Aktuelle Version + Erscheinungsdatum prüfen |
| Feature-Listen | Von offiziellen Seiten, nicht aus anderen Blogs |

#### 2. Während des Schreibens
| Regel | Beispiel |
|-------|----------|
| Keine Zahlen ohne Quelle | ❌ "90% der Nutzer..." ✅ "Laut OpenAI Blog (Jan 2026)..." |
| Preise flexibel formulieren | ❌ "$199" ✅ "~$199" oder "starting at $199" |
| Versionsnummern angeben | ❌ "ChatGPT kann..." ✅ "GPT-4o (Stand: Feb 2026) kann..." |
| Affiliate-Fees verifizieren | Gegen aktuelle Partner-Dashboards prüfen |

#### 3. Vor dem Pushen — Checkliste
```
□ Alle Produkt-Specs gegen offizielle Quellen geprüft
□ Alle Preise auf Aktualität geprüft (max 30 Tage alt)
□ Alle externen Links getestet (keine 404s)
□ Software-Features noch aktuell (AI-Tools ändern sich monatlich!)
□ Vergleichstabellen: Alle Werte verifiziert
□ Screenshots aktuell (UI-Änderungen?)
```

#### 4. Kategorienspezifische Checks

**AI Tools:**
| Check | Quelle |
|-------|--------|
| Preise/Tiers | Offizielle Pricing-Seite |
| Features | Changelog/Release Notes |
| Modell-Versionen | API-Dokumentation |
| Limits (Tokens, Requests) | Offizielle Docs |

**3D Printing:**
| Check | Quelle |
|-------|--------|
| Drucker-Specs | Hersteller-Produktseite |
| Filament-Temperaturen | Hersteller-Datenblatt |
| Build Volume | Offizielle Specs (nicht Marketing!) |
| Preise | Amazon/3DJake aktuell |

**Photography:**
| Check | Quelle |
|-------|--------|
| Kamera-Specs | Hersteller-Specs-Seite |
| Preis mit/ohne Kit-Lens | Unterscheiden! |
| Sensor-Größe | Offizielle technische Daten |
| Video-Specs | Genau: 4K30 ≠ 4K60 |

**Tech & Gadgets:**
| Check | Quelle |
|-------|--------|
| Akkulaufzeit | Hersteller (mit Testbedingungen!) |
| Chip/Prozessor | Offizielle Specs |
| IP-Rating | Zertifizierung prüfen |
| Kompatibilität | Aktuelle OS-Versionen |

#### 5. Regelmäßige Wartung

| Intervall | Aktion |
|-----------|--------|
| **Monatlich** | AI-Tool-Artikel auf Feature-Änderungen prüfen |
| **Quartalsweise** | Preise in Top-10-Artikeln aktualisieren |
| **Halbjährlich** | Alle Vergleichstabellen überprüfen |
| **Bei großen Updates** | Betroffene Artikel sofort aktualisieren |

#### 6. Quellen-Hierarchie (Vertrauenswürdigkeit)

| Rang | Quelle | Beispiel |
|------|--------|----------|
| 1 | Offizielle Hersteller-Seite | apple.com/specs |
| 2 | Offizielle Dokumentation | docs.anthropic.com |
| 3 | Pressemitteilungen | newsroom.apple.com |
| 4 | Verifizierte Reviews (Wirecutter, RTINGS) | Nur als Ergänzung |
| 5 | Andere Blogs | ❌ NIEMALS als Primärquelle |

#### 7. Fact-Check-Log führen

Bei jedem Artikel im Frontmatter optional:
```yaml
factChecked: 2026-02-05
factCheckNotes: "Preise aktualisiert, GPT-4o-Limits verifiziert"
```

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
| AI/Travel | 17 | Aktiv (1 Feb) + Draft (März-Juni) |
| 3D Printing | 6 | Aktiv |
| Photography | 8 | Aktiv (+RapidRAW) |
| Japan Shopping | 3 | Aktiv |
| Tech & Gadgets | 10 | Aktiv (+ClawDBot, macOS Tahoe, Pearcleaner, Kindle Modding) |

### Veröffentlichte Artikel (Januar 2026) ✅
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

### Geplante Artikel (Februar 2026) - Mani / Tech & Gadgets
| Datum | Artikel | Kategorie | Status |
|-------|---------|-----------|--------|
| 7. Feb | ClawDBot (OpenClaw) Guide | Tech & Gadgets | ✅ Geschrieben (Mani) |
| 9. Feb | macOS Tahoe: 25 Tips & Hidden Features | Tech & Gadgets | ✅ Geschrieben (Mani) |
| 12. Feb | RapidRAW Image Editor Guide | Photography / Open Source | ✅ Geschrieben (Mani) |
| 15. Feb | Pearcleaner Homebrew Guide | Tech & Gadgets / macOS | ✅ Geschrieben (Mani) |
| 15. Feb | AI-Planned London Weekend (Trip Report) | AI Travel | ✅ Geschrieben |
| 18. Feb | Kindle Modding Guide | Tech & Gadgets / E-Reader | ✅ Geschrieben (Mani) |

### Geplante Artikel (März 2026) - Tech Reviews
| Datum | Artikel | Kategorie | Status |
|-------|---------|-----------|--------|
| 11. März | Ray-Ban Meta Review: 3 Weeks with Smart Glasses | Tech & Gadgets | 📝 Draft |

### AI Travel Planning Cluster (März-Juni 2026)
**Status:** ✅ Komplett — 16 Artikel + 16 Bilder fertig, Publish-Dates gesetzt

**Pillar + Core Guides (6 Artikel):**
| Datum | Artikel | Slug |
|-------|---------|------|
| 1. März | Step-by-Step: Your First AI-Planned Trip | `/chatgpt-trip-planning-tutorial/` |
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

**Bereits gepostet (Januar):**
- ✅ 3D Printing Beginner Mistakes → r/3Dprinting
- ✅ Best Free AI Courses → r/learnmachinelearning
- ✅ Best Cameras Under $500 → r/AskPhotography
- ✅ ChatGPT Tutorial → r/learnmachinelearning
- ✅ AirPods Pro 3 Review → r/airpods

**Nächste Posts (Februar-Content):**
- [ ] Claude vs ChatGPT → r/ChatGPT, r/ClaudeAI
- [ ] Perplexity AI Guide → r/perplexity_ai
- [ ] Best AI Tools for Office → r/productivity
- [ ] AI Meeting Assistants → r/remotework

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
  - cron: '0 5 * * *'  # Täglich 5:00 UTC (6:00 MEZ / 7:00 MESZ)
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

*Letzte Aktualisierung: 2. Februar 2026*
