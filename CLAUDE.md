# Projekt-Regeln und Kontext für boredom-at-work.com

> Diese Datei wird bei jeder Claude Code Sitzung automatisch gelesen.

---

## ⚠️ ERINNERUNGEN (Stand: 16. Februar 2026 Abend)

### Sitzung (16. Februar 2026 — Abend)

**✅ Home Office Cluster Expansion geplant (5 → 15 Artikel)**

| # | Artikel | Publish | Priorität |
|---|---------|---------|-----------|
| 1 | Best Monitors for WFH 2026 | 24. März | ✅ Geschrieben |
| 2 | Best USB-C Docking Stations | 26. März | TODO |
| 3 | Best Ergonomic Mice | 31. März | TODO |
| 4 | Best Monitor Light Bars | 2. April | TODO |
| 5 | Best Webcams for WFH | 7. April | TODO |
| 6 | Best NC Headphones for Office | 9. April | TODO |
| 7 | Best Desk Mats | 14. April | TODO |
| 8 | Best Laptop Stands | 16. April | TODO |
| 9 | Dual Monitor Setup Guide | 21. April | TODO |
| 10 | Best Under-Desk Footrests | 23. April | TODO |

**✅ NEUES Cluster: Finance/Investing at Work**

Angle: **Tools & Learning** — keine Anlageberatung! YMYL-Disclaimer in jedem Artikel.

| # | Artikel | Publish | Priorität |
|---|---------|---------|-----------|
| 1 | Best Paper Trading Apps | 28. April | ✅ Geschrieben |
| 2 | Free Investing Courses | 30. April | TODO |
| 3 | Investing Tools Guide (Hub) | 5. Mai | TODO |
| 4 | Polymarket vs Kalshi | 7. Mai | TODO |
| 5 | Best Stock Screeners | 12. Mai | TODO |
| 6 | Investing Apps for Beginners | 14. Mai | TODO |
| 7 | Crypto Portfolio Trackers | 19. Mai | TODO |
| 8 | Stock News Apps | 21. Mai | TODO |
| 9 | ChatGPT for Stock Research | 26. Mai | TODO |
| 10 | How Prediction Markets Work | 28. Mai | TODO |
| 11 | Dividend Tracker Apps | 2. Juni | TODO |
| 12 | Finance Subreddits | 4. Juni | TODO |
| 13 | Investing Podcasts | 9. Juni | TODO |

**Top Affiliate-Partner (Finance):**
- Webull (bis $1.400/Ref), Robinhood ($20/Signup), Koinly (20% recurring), TradingView (50%), Seeking Alpha (~$15-20/Sub), Kalshi ($10-50/Ref)

**Commit:** `6d27040 feat: add Best Monitors for WFH + Best Paper Trading Apps articles`

**Noch offen für beide Artikel:**
- Featured Images (WebP)
- llms.txt + llms-full.txt Update

---

### Sitzung (16. Februar 2026 — Nachmittag)

**✅ Fix: Zöliakie-Zuordnung im London-Artikel korrigiert**

| Stelle | Vorher | Nachher |
|--------|--------|---------|
| Intro | "I have celiac disease" | "my girlfriend has celiac disease" |
| FAQ | "I had zero reactions" | "she had zero reactions" |
| Ugly Dumpling | "As someone with celiac disease, I can't..." | "My girlfriend has celiac disease — she can't..." |
| Fazit | "I had zero reaction" | "she had zero reaction" |

**Commit:** `c29446e fix: correct celiac disease attribution in London trip article`

**✅ Konsistenz-Check: Alle Artikel geprüft**
- Malaysia, Southeast Asia, Japan/Vietnam/Cambodia Comparison: ✅ Korrekt ("partner has celiac disease")
- Dubai: ✅ Korrekt ("No dietary restrictions" — Freundin war nicht dabei)
- Prompt-Templates in Code-Blöcken: ✅ Generisch, OK
- London war der einzige inkonsistente Artikel

**✅ Personal Facts Memory angelegt**
- `~/.claude/projects/.../memory/personal-facts.md` — Persönliche Details die artikelübergreifend konsistent sein müssen
- Wichtigste Regel: **Freundin hat Zöliakie, NICHT der Autor**

---

### Sitzung (16. Februar 2026)

**✅ Internal Linking: London ↔ Dubai Trip Artikel**

| Richtung | Status | Details |
|----------|--------|---------|
| Dubai → London | ✅ Bereits vorhanden | Intro + Outro (2 Links) |
| London → Dubai | ✅ Neu hinzugefügt | Intro + Related Reading (2 Links) |

**Commit:** `f2102cf fix: add internal links from London trip to Dubai trip article`

**✅ Grey Hat SEO: Dev.to Satellite Site**

| Detail | Wert |
|--------|------|
| Dev.to Account | `twelvecharacters` |
| Artikel | [I Tested 50+ AI Tools for Office Work](https://dev.to/twelvecharacters/i-tested-50-ai-tools-for-office-work-these-15-are-the-only-ones-worth-your-time-435h) |
| Status | ✅ Live |
| Canonical URL | `/best-ai-tools-office-work/` |
| Backlinks | AI Tools Guide + Homepage |

**✅ YouTube Video: ChatGPT Guide**

| Detail | Wert |
|--------|------|
| URL | https://youtu.be/0YHgavdF_3E |
| Status | 🔒 Unlisted → **10. März** public schalten |
| Thumbnail | `thumbnail-chatgpt-guide-resized.png` |
| Einbetten in | `chatgpt-guide.md` (am 10. März) |

**✅ Reddit Posts: London Weekend**

| Subreddit | Status |
|-----------|--------|
| r/travel | ✅ Gepostet |
| r/Celiac | ✅ Gepostet |

**Web 2.0 Satellites Stand:**

| Plattform | Artikel | Status |
|-----------|---------|--------|
| Medium | #1 Claude vs ChatGPT | ✅ Live |
| Dev.to | #2 Best AI Tools for Office | ✅ Live |
| LinkedIn | #3 Free AI Courses | TODO |
| Hashnode | #4 ChatGPT Plus vs Free | TODO |
| LinkedIn | #5 AI Certifications | TODO |

---

### Sitzung (15. Februar 2026 — Abend)

**✅ Grey Hat SEO: IndexNow API Integration**

| Detail | Wert |
|--------|------|
| IndexNow Key | `33eb690ddefc36d78165765c86948671` |
| Key File | `public/33eb690ddefc36d78165765c86948671.txt` |
| Script | `scripts/indexnow.js` (batch-submit via IndexNow API) |
| CI Step | `.github/workflows/deploy.yml` — runs after build, `continue-on-error: true` |
| npm Script | `npm run indexnow` (uses `--changed` flag for git-diff-based URLs) |
| Endpoint | `https://api.indexnow.org/indexnow` (Bing, Yandex, etc.) |

**✅ Grey Hat SEO: 2 neue Schema-Typen (SoftwareApplication + Course)**

| Datei | Typ | Beschreibung |
|-------|-----|--------------|
| `src/components/SoftwareAppSchema.astro` | **Neu** | SoftwareApplication JSON-LD (Rating, OS, Category, Price) |
| `src/components/CourseSchema.astro` | **Neu** | Course JSON-LD (Provider, Duration, Free/Paid) |
| `src/content.config.ts` | Erweitert | `softwareAppSchema` + `courseSchema` Zod-Schemas |
| `src/layouts/BlogPost.astro` | Erweitert | Import + conditional render beider Schemas |

**Artikel mit SoftwareApplication Schema (5):**

| Artikel | Rating | OS | Preis |
|---------|--------|----|-------|
| `google-gemini-review.md` | 4/5 | Web, Android, iOS | Free–$20/mo |
| `microsoft-copilot-review.md` | 3.5/5 | Web, Windows, macOS | $21–$30/mo |
| `claude-ai-review.md` | 4.5/5 | Web, iOS, Android | Free–$20/mo |
| `chatgpt-plus-vs-free.md` | — | Web, iOS, Android, macOS, Windows | Free–$20/mo |
| `perplexity-ai-guide.md` | — | Web, iOS, Android | Free–$20/mo |

**Artikel mit Course Schema (2):**

| Artikel | Provider | Duration | Free? |
|---------|----------|----------|-------|
| `google-ai-essentials-review.md` | Google (Coursera) | PT10H | Nein ($49) |
| `learn-ai-guide.md` | Boredom at Work | PT4W | Ja |

**Schema-Übersicht (jetzt 10 Typen):**
```
Organization, Article, BreadcrumbList, FAQPage, Product+Review,
ItemList, VideoObject, HowTo, SoftwareApplication, Course
```

**✅ Grey Hat SEO: CTR-optimierte Titles & Descriptions (13 Artikel)**

| Artikel | Vorher (Title) | Nachher (Title) |
|---------|---------------|-----------------|
| `best-ai-tools-office-work.md` | Best AI Tools for Office Work in 2026: Actually Useful... | 15 Best AI Tools for Office Work (I Tested 50+) |
| `claude-vs-chatgpt.md` | Claude vs ChatGPT: Which AI Assistant... | Claude vs ChatGPT (2026): I Use Both Daily — Here's My Pick |
| `ai-writing-tools-comparison.md` | AI Writing Tools Compared: Grammarly vs... | Best AI Writing Tools 2026 [Tested]: Grammarly vs Jasper vs Claude |
| `best-ai-chrome-extensions.md` | Best AI Chrome Extensions for Productivity (2026) | 12 Best AI Chrome Extensions (2026) — Actually Worth Installing |
| `best-cameras-for-beginners.md` | Best Cameras for Beginners: Complete Guide (2026) | 8 Best Cameras for Beginners in 2026 [Tested & Ranked] |
| `3d-printing-beginners-guide.md` | 3D Printing for Beginners: The Complete Guide (2026) | 3D Printing for Beginners (2026): From Zero to First Print |
| `productive-things-bored-at-work.md` | 25 Productive Things to Do When Bored at Work | + (2026) suffix |
| `best-free-ai-courses.md` | Best Free AI Courses You Can Take at Work (2026) | 7 Best Free AI Courses (2026) — Take Them at Work |
| `ai-certifications-in-a-week.md` | 5 AI Certifications You Can Complete in a Week | 5 AI Certifications You Can Finish in One Week (2026) |
| `kindle-vs-kobo.md` | Kindle vs Kobo: Which E-Reader Should You Buy... | Kindle vs Kobo (2026): I Own Both — Here's Which to Buy |
| `is-kindle-worth-it.md` | Is a Kindle Worth It in 2026? An Honest Assessment | Is a Kindle Worth It in 2026? (Honest Answer After 3 Years) |
| `ai-tools-guide.md` | The Ultimate Guide to AI Tools for Work (2026) | AI Tools for Work: The Only Guide You Need (2026) |
| `chatgpt-guide.md` | ChatGPT Mastery: Everything You Need to Know (2026) | ChatGPT Guide 2026: Beginner to Power User in One Read |

**CTR-Patterns angewendet:** Zahlen im Title, [Brackets], First-Person Proof ("I Tested", "I Own Both"), Year Markers, Power Words, Curiosity Gaps

**Commit:** `3c579cd feat: add IndexNow API, SoftwareApplication/Course schemas, and CTR-optimized titles`

**✅ Grey Hat SEO: Web 2.0 Satellite Sites — Medium**

| Detail | Wert |
|--------|------|
| Medium Account | `@mohammadmehdivazirian` |
| Artikel #1 | [Claude vs ChatGPT (2026)](https://medium.com/@mohammadmehdivazirian/i-use-claude-and-chatgpt-every-day-heres-which-one-actually-wins-in-2026-fa449dc9f684) |
| Status | ✅ Live |
| Backlinks | `/claude-vs-chatgpt/` + Homepage |
| Hinweis | Medium erlaubt nur 1 Gratis-Artikel — restliche 4 auf Dev.to, Hashnode, LinkedIn |

**Noch offen (nächste Session "grey hat SEO action plan"):**

| Plattform | Artikel | Status |
|-----------|---------|--------|
| Dev.to | #2 Best AI Tools for Office | TODO |
| LinkedIn | #3 Free AI Courses | TODO |
| Hashnode | #4 ChatGPT Plus vs Free | TODO |
| LinkedIn | #5 AI Certifications | TODO |

Alle 5 Drafts liegen in `medium-drafts/` (in `.gitignore`).

---

### Sitzung (15. Februar 2026)

**✅ Post-Publish Check: 2 Artikel (15. Feb)**

| Artikel | URL | Status |
|---------|-----|--------|
| AI-Planned London Weekend | `/ai-planned-london-weekend/` | ✅ Live |
| Pearcleaner Homebrew Guide | `/pearcleaner-homebrew-guide/` | ✅ Live |

Beide Artikel: Title, Description, Bild, Tags, FAQs, interne Links, llms.txt — alles OK.

**✅ AirPods Pro 2 → Pro 3 Update: Earbuds Comparison**

| Detail | Vorher | Nachher |
|--------|--------|---------|
| Title | AirPods Pro 2 vs... | AirPods Pro 3 vs... |
| Battery (Buds) | 6h | 8h |
| Battery (Case) | 30h | 24h |
| Water Resistance | IPX4 | IP57 |
| ANC Ranking | Sony #1, AirPods #2 | AirPods #1, Sony #2 |
| Neue Features | — | Heart Rate, Hearing Test, Live Translation, 5 Ear Tips |

**Commit:** `0e3d0d7 fix: update earbuds comparison from AirPods Pro 2 to Pro 3`

**✅ Fact-Check: KW9 (23.–27. Feb) — 20 Fixes**

| Artikel | Fixes | Highlights |
|---------|-------|------------|
| `ai-writing-tools-comparison.md` | 3 | Jasper Pro $125→$69, Grammarly "Premium"→"Pro" + Enterprise, ProWritingAid Billing |
| `3d-print-not-sticking.md` | 0 | Alle Claims korrekt |
| `best-free-macos-software.md` | 7 | Alfred $60→~$42, Moom $10→$15, CleanMyMac ~$40/yr, Bartender $25, Little Snitch $59, iStat $12, Scrivener $60, Ulysses $40/yr |
| `best-ai-chrome-extensions.md` | 6 | Claude for Chrome (Aug 2025) hinzugefügt, Merlin $19/mo + URL, MaxAI ~$12/mo, Compose AI ~$15/mo |
| `best-sites-free-3d-models.md` | 4 | Thingiverse → MyMiniFactory Acquisition (Feb 2026), NASA URL Fix, NIH 3D Name, Pinshape → MakerWorld |

**Commit:** `dc915cd fix: fact-check corrections across 4 articles (20 fixes, KW9)`

**✅ Fact-Check: KW8 (16.–21. Feb, Wiederholung) — 8 Fixes**

| Artikel | Fixes | Highlights |
|---------|-------|------------|
| `ai-presentation-makers.md` | 5 | Beautiful.ai Enterprise→custom pricing, Copilot $21/mo Business, Google Slides Workspace-Bundling, Slidebean $12/mo Starter |
| `notion-ai-vs-obsidian-ai.md` | 3 | Add-on $8-10→$8, Google/Gemini als dritter Provider, GPT-5→GPT-5.2 |
| `kindle-modding-guide.md` | 0 | Korrekt |
| `pla-vs-petg-vs-abs.md` | 0 | Korrekt |
| `how-to-use-ai-at-work-safely.md` | 0 | Korrekt |
| `cura-settings-beginners.md` | 0 | Korrekt |

**Commit:** `2c9ac8e fix: fact-check corrections for KW8 articles (8 fixes)`

---

### Sitzung (14. Februar 2026)

**✅ Schema Markup Expansion — 2 neue Schema-Typen + 34 Artikel-Updates**

| Schema-Typ | Neu/Bestehend | Artikel |
|------------|---------------|---------|
| **VideoObject** | ✅ Neu | 5 (chatgpt-plus-vs-free, ai-tools-guide, learn-ai-guide, claude-planned-dubai-trip, ray-ban-meta-review) |
| **HowTo** | ✅ Neu | 8 (chatgpt-custom-instructions, chatgpt-trip-planning-tutorial, pearcleaner-homebrew-guide, kindle-modding-guide, cura-settings-beginners, cable-management-tips, selling-3d-prints-online, build-ai-flight-search-agent) |
| **ItemList** (isListicle) | Bestehend | 17 Artikel geflaggt (best-cameras, best-ai-courses, ai-certifications, 3d-printing-mistakes, photography-mistakes, productive-things, what-to-3d-print, cad-software, ai-presentation-makers, ai-meeting-assistants, best-sites-free-3d-models, best-free-macos, 10-things-to-print, ai-writing-tools, best-ai-trip-planners, macos-tahoe, free-ai-travel-tools) |
| **Product+Review** | Bestehend | 4 Artikel geflaggt (google-ai-essentials 4.5/5, microsoft-copilot 3.5/5, google-gemini 4/5, claude-ai 4.5/5) |

**Infrastruktur-Änderungen:**

| Datei | Änderung |
|-------|----------|
| `src/content.config.ts` | `videoSchema` + `howToSchema` Zod-Schemas + Felder in Collection |
| `src/components/VideoSchema.astro` | **Neu** — VideoObject JSON-LD (YouTube thumbnail, embedUrl) |
| `src/components/HowToSchema.astro` | **Neu** — HowTo JSON-LD mit HowToStep items |
| `src/layouts/BlogPost.astro` | Import + conditional render beider neuer Schemas |

**Schema-Übersicht (jetzt 8 Typen):**
```
Organization, Article, BreadcrumbList, FAQPage, Product+Review, ItemList, VideoObject, HowTo
```

**Commit:** `b0b91e0 feat: expand schema markup with VideoObject, HowTo, and flag missing isListicle/review`

**✅ Rich Results Validation (Live-Seiten geprüft)**

| Seite | Schemas | Status |
|-------|---------|--------|
| `/chatgpt-plus-vs-free/` | Organization, BreadcrumbList, Article, FAQPage, **VideoObject** | ✅ |
| `/chatgpt-custom-instructions/` | Organization, BreadcrumbList, Article, FAQPage, **HowTo** (5 Steps, PT15M) | ✅ |
| `/google-ai-essentials-review/` | Organization, BreadcrumbList, Article, FAQPage, **Product+Review** (4.5/5, Google) | ✅ |
| `/best-cameras-for-beginners/` | Organization, BreadcrumbList, Article, FAQPage, **ItemList** (8 Items) | ✅ |

Alle 4 neuen Schema-Kombinationen rendern korrekt auf der Live-Seite. Jede Seite hat 5 JSON-LD Blöcke: 3 Basis (Organization, Breadcrumbs, Article) + FAQPage + typ-spezifisches Schema.

**✅ Post-Publish Check: AI Meeting Assistants**

| Check | Status |
|-------|--------|
| Deployment (Cron 05:38 UTC) | ✅ |
| Artikel online `/ai-meeting-assistants/` | ✅ Live |
| Title (56 Zeichen) | ✅ |
| Description (134 Zeichen) | ✅ |
| WebP-Bild (84 KB) | ✅ |
| Tags (5) | ✅ |
| FAQ (3) | ✅ |
| llms.txt + llms-full.txt | ✅ |

**✅ Fact-Check: Pearcleaner Homebrew Guide — 5 Fixes**

| # | Problem | Fix |
|---|---------|-----|
| 1 | Tag `"Open Source"` | → `"Source-Available"` (Apache 2.0 + Commons Clause) |
| 2 | "Translucent Themes: Match Liquid Glass" | → Native System Appearance |
| 3 | "M1/M2/M3" | → M1/M2/M3/M4 |
| 4 | Sentinel "less than 5MB of RAM" | → "about 2MB" |
| 5 | "installation files" | → "pre-compiled binary packages" |

**Commit:** `59f1cd1 fix: fact-check corrections for Pearcleaner article (5 fixes)`

**✅ SEO-Fixes: Pearcleaner — 6 Fixes**

| # | Fix | Details |
|---|-----|---------|
| 1 | Description | 161 → **154 Zeichen** |
| 2 | Body-FAQs → Frontmatter | 3 → **6 FAQs** mit Schema.org |
| 3 | Interne Links | 1 → **3** (+Best Free macOS Apps, ClawDBot) |
| 4 | llms.txt | ✅ Nachgetragen |
| 5 | llms-full.txt | ✅ Nachgetragen |
| 6 | macOS Tahoe Link-Text | "open-source" → "source-available" |

**Commit:** `864ac93 fix: SEO fixes for Pearcleaner article (description, FAQs, links, llms.txt)`

**✅ Pearcleaner Artikel erweitert**

| Vorher | Nachher | Neue Sections |
|--------|---------|---------------|
| 941 Wörter | **1.394 Wörter** (+48%) | Pearcleaner vs AppCleaner (Vergleichstabelle), Visual Cask Overview, First-Run Setup (4 Schritte), What Pearcleaner Can't Do (Limitationen) |

- Incoming Link von `best-free-macos-software.md` → Pearcleaner als "Power user upgrade" unter AppCleaner

**Commit:** `5458653 fix: expand Pearcleaner article (+450 words) and add incoming link from macOS apps`

**🗑️ OpenAI DALL-E MCP Server entfernt**

- Grund: Billing-Limit erreicht, nicht kostenlos nutzbar
- `dalle` aus `~/.claude.json` entfernt
- OpenAI API-Key sollte im Dashboard rotiert/gelöscht werden

**✅ Ray-Ban Meta Review vorgezogen & LIVE**

| Detail | Wert |
|--------|------|
| Publish | 11. März → **14. Februar** (Valentinstag) |
| URL | `/ray-ban-meta-review/` |
| Post-Publish Check | ✅ Alle Checks bestanden |

**Commit:** `8496281 feat: publish Ray-Ban Meta review today (Valentine's Day gift angle)`

**✅ Reddit-Posts: Ray-Ban Meta Review**

| Subreddit | Status |
|-----------|--------|
| r/RayBanMeta | ✅ Gepostet |
| r/smartglasses | ✅ Gepostet |
| r/gadgets | ✅ Gepostet |

**✅ Fact-Check: 6 Artikel KW 8 (16.–21. Feb) — 21 Fixes**

| Artikel | Publish | Fixes | Highlights |
|---------|---------|-------|------------|
| `ai-presentation-makers.md` | 16. Feb | 7 | **Tome eingestellt** → Plus AI, Gamma Credits 40→10, Canva $13→$15, Copilot Pricing, Google AI Pro, Slidebean, Beautiful.ai |
| `notion-ai-vs-obsidian-ai.md` | 17. Feb | 5 | Obsidian Commercial License kostenlos (seit Feb 2025), Notion nutzt OpenAI+Anthropic, Modellwahl möglich, ollama.com |
| `kindle-modding-guide.md` | 18. Feb | 1 | Scribe von WinterBreak UND AdBreak ausgeschlossen |
| `pla-vs-petg-vs-abs.md` | 19. Feb | 4 | ABS UV-Claim falsch (PETG besser!), Strongest→Toughest, Moisture-Levels, Trocknungstemps pro Material |
| `how-to-use-ai-at-work-safely.md` | 20. Feb | 1 | "Claude for Business" → "Claude Team/Enterprise" |
| `cura-settings-beginners.md` | 21. Feb | 1 | "Ultimaker" → "UltiMaker", Wall Line Count |

**Commit:** `20e2bbe fix: fact-check corrections across 6 articles (21 fixes)`

**✅ Internes Linking: Ray-Ban Meta Review — 3 Incoming Links**

| Zielartikel | Link hinzugefügt |
|-------------|-----------------|
| `airpods-pro-3-review.md` | Ray-Ban Meta als hands-free Audio-Alternative |
| `best-tech-gifts-under-50.md` | Ray-Ban Meta Erwähnung in Audio-Section |
| `best-ai-trip-planners.md` | Dubai Trip Report mit Ray-Ban Meta Filming |

Ergebnis: Ray-Ban Meta incoming Links von **2** auf **5** erhöht.

**Commit:** `651acac fix: add incoming links to Ray-Ban Meta review from 3 articles`

**✅ Housekeeping**

| Item | Status |
|------|--------|
| März-Lücke (11. März frei nach Ray-Ban-Verschiebung) | ✅ Kein Problem — 10. März (2 Artikel) + 12. März (3 Artikel) |
| OpenAI API-Key rotieren | ⚠️ Manuell im [OpenAI Dashboard](https://platform.openai.com/api-keys) erledigen |

---

### Sitzung (12. Februar 2026)

**✅ YouTube Short: Dubai Fountain Show**

| Detail | Wert |
|--------|------|
| URL | https://youtube.com/shorts/npcqic4geOA |
| Inhalt | Dubai Fountain Show am Burj Khalifa |
| Aufgenommen mit | Ray-Ban Meta Smart Glasses (hands-free) |
| Format | Vertical (1552x2064), 60 Sekunden |
| Eingebettet in | `claude-planned-dubai-trip.md` + `ray-ban-meta-review.md` |

**YouTube Description:**
> The Dubai Fountain show at Burj Khalifa — filmed entirely hands-free with Ray-Ban Meta smart glasses. No phone, no gimbal, just tap and record.
>
> The world's largest choreographed fountain system, 900 ft long, shooting water up to 500 ft into the air. Free show every 30 minutes starting at 6 PM.
>
> 📖 Full Dubai trip report (planned by Claude AI): https://www.boredom-at-work.com/claude-planned-dubai-trip/
> 🕶️ Ray-Ban Meta review after 2 weeks: https://www.boredom-at-work.com/ray-ban-meta-review/
>
> 📍 Burj Khalifa, Downtown Dubai — February 2026
>
> #Shorts #Dubai #DubaiFountain #BurjKhalifa #RayBanMeta #SmartGlasses #POV #HandsFreeFilming #TravelDubai

**Gepinnter Kommentar:**
> No phone, no gimbal — just Ray-Ban Meta smart glasses 🕶️
>
> This is the Dubai Fountain show at Burj Khalifa, filmed completely hands-free. Full story of our 3-day Dubai trip (planned entirely by Claude AI): https://www.boredom-at-work.com/claude-planned-dubai-trip/
>
> Ray-Ban Meta review after 2 weeks of daily use: https://www.boredom-at-work.com/ray-ban-meta-review/

**Commit:** `bcbc2ff feat: embed Dubai Fountain YouTube Short in Dubai trip + Ray-Ban Meta articles`

**✅ Post-Publish SEO Fixes: 10 Things to 3D Print + RapidRAW**

| Fix | Vorher | Nachher |
|-----|--------|---------|
| 3D Print Bild | 679 KB (JPEG als .webp!) | **60 KB** (echtes WebP) |
| 3D Print Title | 78 Zeichen | **51 Zeichen** |
| 3D Print Description | 170 Zeichen | **120 Zeichen** |
| 3D Print interne Links | 1 | **4** (+Beginner Guide, PLA vs PETG, Not Sticking) |
| 3D Print llms.txt + llms-full.txt | Fehlte | ✅ Nachgetragen |
| RapidRAW eingehende Links | 0 | **1** (photography-guide Editing-Tabelle) |

**Commit:** `77e7926 fix: SEO fixes for 3D print + RapidRAW articles (title, image, links, llms.txt)`

---

### Letzte Sitzung (11. Februar 2026 - Abend)

**✅ Netlify komplett entfernt & Repo aufgeräumt**

| Aktion | Details |
|--------|---------|
| Netlify-Projekt gelöscht | Dashboard → Site deleted (verbrauchte unnötig Credits) |
| `netlify.toml` entfernt | Build-Config nicht mehr nötig (GitHub Pages) |
| `DEPLOYMENT.md` entfernt | Veraltete Netlify-Anleitung (Jan 2026) |
| `MIGRATION-SUMMARY.md` entfernt | WordPress→Netlify Migration, erledigt |
| `CHANGELOG.md` entfernt | Veraltetes Changelog (Jan 2026) |
| `CONTENT-PROMPTS.md` entfernt | Veraltet, superseded by CLAUDE.md |
| `TOPICAL-MAP-*.md` entfernt | Interne Planungsdateien |
| `__pycache__/` entfernt | Alter Python-Cache (WordPress-Migration) |
| `.env` lokal gelöscht | Alte WordPress-Credentials |
| `.gitignore` erweitert | `*.swp`, `*.swo`, `*~`, `__pycache__/` |

**Ergebnis:** ~1.626 Zeilen weniger im Repo, keine Netlify-Kosten mehr.

**Commits:**
- `929ab3e chore: remove netlify.toml (site moved to GitHub Pages)`
- `2cfd426 chore: remove outdated migration docs (Netlify/WordPress)`
- `694b281 chore: remove outdated files and improve .gitignore`

---

### Sitzung (11. Februar 2026)

**✅ Ray-Ban Meta Review geschrieben (LIVE: 14. Februar)**

| Detail | Wert |
|--------|------|
| Datei | `ray-ban-meta-review.md` |
| Slug | `/ray-ban-meta-review/` |
| Title | 48 Zeichen |
| Description | 128 Zeichen |
| Bild | `ray-ban-meta-review.webp` (58 KB, existierte bereits) |
| Tags | 5 (Tech & Gadgets, Smart Glasses, Meta, Ray-Ban, Review) |
| FAQ | 3 Fragen |
| Rating | 4/5 |
| Interne Links | 2 (AirPods Pro 3, Best AI Trip Planners) |
| llms.txt + llms-full.txt | ✅ |

**Inhalt:** Ehrlicher Review nach 2 Wochen Nutzung. Highlights:
- Helicopter-Flug über Dubai als Kamera-Test (stabile, scharfe Videos)
- Kein Zoom, 3-Min-Video-Limit als Minuspunkte
- Audio: Podcasts, WhatsApp, Video-Calls — ersetzt Kopfhörer
- Akku: 3–4h bei aktiver Kamera-Nutzung, 6h mit 28% bei gemischter Nutzung
- Fazit: "Würde sie nicht selbst kaufen, aber als Geschenk nutze ich sie täglich"

**✅ Fact-Check: Preis korrigiert $299 → $379**
- Gen 2 Wayfarer startet bei **$379** (nicht $299 wie im ursprünglichen Draft)
- Transitions: ~$459, Polarized: ~$409
- Korrektur in Artikel, FAQs, llms-full.txt durchgeführt

---

**✅ Claude-Planned Dubai Trip geschrieben & LIVE (11. Feb)**

| Detail | Wert |
|--------|------|
| Datei | `claude-planned-dubai-trip.md` |
| Slug | `/claude-planned-dubai-trip/` |
| Title | 52 Zeichen |
| Description | 148 Zeichen |
| Bild | `claude-dubai-trip.webp` (84 KB) — Burj Khalifa |
| Tags | 5 (AI, Travel, Dubai, Claude, Trip Planning) |
| FAQ | 3 Fragen |
| Interne Links | 4 (Trip Planners, Tutorial, London, Malaysia) |
| Bilder | 5 (Featured + Hotel + Mall Waterfall + Museum of the Future + Rüya) |
| llms.txt + llms-full.txt | ✅ |
| Status | ✅ **Live** unter `/claude-planned-dubai-trip/` |

**Inhalt:** Trip Report (9.–12. Feb 2026) geframed als "Claude hat geplant":
- Tag 0: Ankunft Mitternacht (EK128), Five Palm Jumeirah
- Tag 1: Dubai Mall, Burj Khalifa (nicht oben — nicht gebucht!), FRNDS + Secret Room (Einladung Geschäftspartner)
- Tag 2: Falcon Helitours 45 Min, Rüya Restaurant (Michelin Guide-recommended, ~$79/Person)
- Tag 3: Ausschlafen, Abreise (EK95)
- Budget: $80–120/Tag, Uber mit Lexus/Audi A8
- Hotel + Helikopter von Geschäftspartnern bezahlt
- Cross-Promo mit Ray-Ban Meta Review (Heli-Footage)

**✅ Fact-Check: Dubai Trip — 2 Fixes**

| # | Problem | Fix |
|---|---------|-----|
| 1 | Rüya "Michelin star since 2023" | → "Michelin Guide-recommended" (nicht Stern, nur empfohlen) |
| 2 | Audi A8 → A6 (falscher Fact-Check) | → Zurück auf A8 (vom Autor bestätigt) |

**Commits:**
- `2aa73e5 fix: fact-check corrections for Dubai trip article (3 fixes)`
- `437f4af fix: revert Audi A6 back to A8 (confirmed by author)`

---

**✅ Fact-Check: Copilot Review (erneut) — 3 Fixes**

| # | Problem | Fix |
|---|---------|-----|
| 1 | GPT-5 (Feb-10-Fix war falsch) | → GPT-5.2 (seit Dez 2025, Microsoft Blog bestätigt) |
| 2 | Copilot Add-on pauschal $30/mo | → $21/mo Business, $30/mo Enterprise + alle Berechnungen angepasst |
| 3 | Claude "up to 1M on newer models" | → "up to 1M via API" (1M nur API/Opus 4.6) |

**Commit:** `425d9c7 fix: fact-check corrections for Copilot review (3 fixes)`

**Hinweis:** Feb-10-Fix "GPT-5.2→GPT-5" war inkorrekt — GPT-5.2 wurde am 11. Dez 2025 per [Microsoft Blog](https://www.microsoft.com/en-us/microsoft-365/blog/2025/12/11/available-today-gpt-5-2-in-microsoft-365-copilot/) bestätigt.

---

### Sitzung (10. Februar 2026)

**✅ Fact-Check: 3 Artikel (10.–12. Feb) — 5 Fixes**

| Artikel | Publish | Fixes | Details |
|---------|---------|-------|---------|
| `chatgpt-for-excel.md` | 10. Feb | 2 | Upload-Limit 25MB→50MB/512MB, CONCAT "modern way"→"useful when joining ranges" |
| `microsoft-copilot-review.md` | 11. Feb | 3 | GPT-5.2→GPT-5, M365 Premium $10.83→$19.99/mo, Alt+I nur in Word (nicht alle Apps) |
| `rapid-raw-image-editor-guide.md` | 12. Feb | 0 | Alle 12 Claims verifiziert (Existenz, AGPL-3.0, Rust, WGSL, Tauri, AI Masking, ComfyUI) |

**Commit:** `68967c2 fix: fact-check corrections for ChatGPT Excel + Copilot Review (5 fixes)`

**✅ Post-Publish Check: ChatGPT for Excel**

| Check | Status |
|-------|--------|
| Artikel online | ✅ Live unter `/chatgpt-for-excel/` |
| Title (62 Zeichen) | ✅ |
| Description (152 Zeichen) | ✅ |
| WebP-Bild (22 KB) | ✅ |
| Tags (4) | ✅ |
| FAQ (3 Fragen) | ✅ Schema.org |
| Interne Links (5) | ✅ |
| Eingehende Links (6) | ✅ ai-tools-guide, chatgpt-guide, learn-ai-guide, ai-presentation-makers |
| llms.txt + llms-full.txt | ✅ |

---

### Sitzung (9. Februar 2026)

**✅ macOS Tahoe Artikel live geschaltet**

- `publishDate: 2026-02-09` → GitHub Actions Cron hatte **nicht** automatisch getriggert
- Manueller `workflow_dispatch` ausgelöst → Artikel ist jetzt live unter `/macos-tahoe-tricks-and-hacks/`

**✅ Cron-Zuverlässigkeit verbessert (doppelte Absicherung)**

| Maßnahme | Status |
|----------|--------|
| **Keepalive-Workflow** | ✅ Gepusht — `.github/workflows/keepalive.yml` (1. + 15. jedes Monats) |
| **Externer Cron (cron-job.org)** | 🔧 Manuell einzurichten — `workflow_dispatch` um 05:15 UTC täglich |

**Warum:** GitHub Actions Crons können verzögert werden/ausfallen + werden nach 60 Tagen Inaktivität deaktiviert.

**Commit:** `1294e85 ci: add keepalive workflow to prevent cron deactivation`

---

**✅ Post-Publish Check: macOS Tahoe**

| Check | Status |
|-------|--------|
| Artikel online | ✅ Live unter `/macos-tahoe-tricks-and-hacks/` |
| Title (49 Zeichen) | ✅ |
| Description (152 Zeichen) | ✅ |
| WebP-Bild (47 KB) | ✅ |
| Tags (5) | ✅ |
| FAQ (5 Fragen) | ✅ Schema.org |
| Interne Links (3+) | ✅ |
| llms.txt + llms-full.txt | ✅ |

---

**✅ Fact-Check: macOS Tahoe — 8 Fixes**

| # | Tip | Problem | Fix |
|---|-----|---------|-----|
| 1 | Type to Siri | "glass bar at bottom" (= iOS) | → "top-right corner" (macOS) |
| 2 | Theme Color | Pfad `Appearance > Theme > Color` unbestätigt | → `Appearance > Color` |
| 3 | Window Tiling | "AI-suggested layouts" falsch | → Snap-to-edge (seit Sequoia) |
| 4 | Stage Manager | "Keyboard switching" zwischen Groups falsch | → Realistische Beschreibung |
| 5 | Call Screening | Klang wie alle Anrufe | → Nur unbekannte Nummern |
| 6 | Quick Reply | Mac-Feature unbestätigt | → iPhone/Mac-Unterschied klargestellt |
| 7 | Remove Background | Als neu + AI dargestellt | → Seit Ventura, nicht AI-powered |
| 8 | Transcribe | "Spotlight Action" falsch | → Notes-Transkription |

**Commit:** `0e3e0c8 fix: fact-check corrections for macOS Tahoe article (8 fixes)`

---

### Sitzung (7. Februar 2026)

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
- [x] AI-Planned London Weekend → r/travel, r/Celiac ✅ Gepostet (16. Feb)

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
| `claude-planned-dubai-trip.md` + `ray-ban-meta-review.md` | ✅ https://youtube.com/shorts/npcqic4geOA | Live (Short, Dubai Fountain) |

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

### Geplanter Artikel

**Ray-Ban Meta Review:**
- Datum: ~~11. März 2026~~ → **14. Februar 2026** ✅ LIVE
- Status: ✅ Veröffentlicht
- ✅ Bild: `ray-ban-meta-review.webp` (58 KB)
- ✅ Rüya-Restaurant Details im Dubai-Artikel enthalten

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
| Home Office / Desk Setup | 5 → 15 | Aktiv (Expansion läuft, 1/10 neue geschrieben) |
| Finance / Investing | 1 → 13 | **NEU** (1/13 geschrieben, Hub + 12 Supporting) |
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
| 22. Feb | Claude-Planned Dubai Trip | AI Travel | ✅ Geschrieben |

### Geplante Artikel (März 2026) - Tech Reviews
| Datum | Artikel | Kategorie | Status |
|-------|---------|-----------|--------|
| ~~11. März~~ 14. Feb | Ray-Ban Meta Review: 2 Weeks with Smart Glasses | Tech & Gadgets | ✅ Live |

### Home Office Cluster Expansion (März-April 2026)
| Datum | Artikel | Slug | Status |
|-------|---------|------|--------|
| 24. März | Best Monitors for WFH 2026 | `/best-monitors-working-from-home/` | ✅ Geschrieben |
| 26. März | Best USB-C Docking Stations | `/best-usb-c-docking-stations/` | TODO |
| 31. März | Best Ergonomic Mice | `/best-ergonomic-mice-office/` | TODO |
| 2. April | Best Monitor Light Bars | `/best-monitor-light-bars/` | TODO |
| 7. April | Best Webcams for WFH | `/best-webcams-working-from-home/` | TODO |
| 9. April | Best NC Headphones for Office | `/best-noise-canceling-headphones-office/` | TODO |
| 14. April | Best Desk Mats | `/best-desk-mats/` | TODO |
| 16. April | Best Laptop Stands | `/best-laptop-stands/` | TODO |
| 21. April | Dual Monitor Setup Guide | `/dual-monitor-setup-guide/` | TODO |
| 23. April | Best Under-Desk Footrests | `/best-under-desk-footrests/` | TODO |

### Finance/Investing Cluster (April-Juni 2026) — NEU
| Datum | Artikel | Slug | Status |
|-------|---------|------|--------|
| 28. April | Best Paper Trading Apps | `/best-paper-trading-apps/` | ✅ Geschrieben |
| 30. April | Free Investing Courses | `/best-free-investing-courses/` | TODO |
| 5. Mai | Investing Tools Guide (Hub) | `/investing-tools-guide/` | TODO |
| 7. Mai | Polymarket vs Kalshi | `/polymarket-vs-kalshi/` | TODO |
| 12. Mai | Best Stock Screeners | `/best-stock-screeners/` | TODO |
| 14. Mai | Investing Apps for Beginners | `/best-investing-apps-beginners/` | TODO |
| 19. Mai | Crypto Portfolio Trackers | `/best-crypto-portfolio-trackers/` | TODO |
| 21. Mai | Stock News Apps | `/best-stock-news-apps/` | TODO |
| 26. Mai | ChatGPT for Stock Research | `/chatgpt-stock-research/` | TODO |
| 28. Mai | How Prediction Markets Work | `/prediction-markets-guide/` | TODO |
| 2. Juni | Dividend Tracker Apps | `/best-dividend-tracker-apps/` | TODO |
| 4. Juni | Finance Subreddits | `/best-finance-subreddits/` | TODO |
| 9. Juni | Investing Podcasts | `/best-investing-podcasts/` | TODO |

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
