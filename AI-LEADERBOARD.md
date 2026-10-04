# Frontier AI Leaderboard: Maintenance & Architecture Guide (AI-LEADERBOARD.md)

This document outlines the rules, workflows, sources, data structures, and automation for maintaining the Frontier AI Leaderboard and dynamic leaderboard widgets on **boredom-at-work.com**.

---

## 1. Architecture & File Overview

| File | Purpose |
| :--- | :--- |
| [`src/data/ai-leaderboard.ts`](src/data/ai-leaderboard.ts) | **Single Source of Truth** for model data (`LEADERBOARD_MODELS`), key statistics (`LEADERBOARD_STATS`), and knowledge base (`LEADERBOARD_FAQS`). Tracks 46 models. |
| [`src/pages/ai-leaderboard.astro`](src/pages/ai-leaderboard.astro) | The primary interactive leaderboard page (canonical URL: `/ai-leaderboard/`). Renders the top 15 models by default with live category filters, search, and review badges. |
| [`src/pages/ki-leaderboard.astro`](src/pages/ki-leaderboard.astro) | SEO redirect alias for German queries and external domain forwards (e.g. `kileaderboard.de`, `ai-toplist.com`). |
| [`scripts/aa-leaderboard-check.js`](scripts/aa-leaderboard-check.js) | Automated sync and verification script comparing `src/data/ai-leaderboard.ts` against the live Artificial Analysis table. |
| [`scripts/data/ai-models.json`](scripts/data/ai-models.json) | Whitelist registry of verified AI models. Sources must strictly be official creator documentation. Enforced by `content-lint.js`. |
| [`src/components/LeaderboardWidget.astro`](src/components/LeaderboardWidget.astro) | Context-aware leaderboard widget embedded automatically into AI blog articles. |
| [`src/utils/ai-widget.ts`](src/utils/ai-widget.ts) | Topic clustering helper that maps articles to leaderboard performance profiles (`coding`, `speed`, `value`, `open`, `frontier`, `all`). |
| [`src/components/Top5Slider.astro`](src/components/Top5Slider.astro) | Homepage power ranking slider. Stays aligned with the frontier models in `ai-leaderboard.ts`. |

---

## 2. Benchmark Source of Truth & Fact-Checking

### 2.1 The Single Source for Table Metrics
Every numerical metric in the leaderboard table is sourced strictly from:
- **Artificial Analysis** (`https://artificialanalysis.ai/leaderboards/models`)
  - **Metrics:** Intelligence Index (0-100), Output Speed (tokens/s), Context Window, and standardized Task Cost (USD).
  - **No Latency / TTFT Column:** Latency (TTFT) was completely removed because previous estimates were fictitious. Never invent or re-introduce a TTFT latency column or fabricated numbers.

### 2.2 Model Existence vs. Benchmark Telemetry
- **Model Names & Existence:** Must ALWAYS be verified against the official manufacturer website or release documentation (Anthropic, OpenAI, Google DeepMind, Meta, xAI, Mistral, DeepSeek). Third-party benchmark aggregators prove numbers, never the existence of a model.
- **Allowlist Guard (`checkModelNames`):** `scripts/content-lint.js` strictly checks model names across all Markdown articles and `MODEL_NAME_EXTRA_FILES` (`src/data/ai-leaderboard.ts`, `src/components/Top5Slider.astro`, `src/components/LeaderboardWidget.astro`, `src/pages/ai-leaderboard.astro`, `src/pages/ki-leaderboard.astro`).
- **Registering New Models:** When adding a new model to `ai-leaderboard.ts`, first add its official entry to `scripts/data/ai-models.json` with official creator `sources` and set `verifiedAt: YYYY-MM-DD`.

### 2.3 Secondary Research Platforms (Qualitative Only)
Platforms such as **LMSYS Chatbot Arena** (`https://arena.ai/leaderboard`), **LLM Stats** (`https://llm-stats.com/`), and **BenchLM** (`https://benchlm.ai/`) provide qualitative context and human preference insights for editorial prose and reviews. Their numbers must never be mixed into the Artificial Analysis table figures.

---

## 3. Data Schema in `src/data/ai-leaderboard.ts`

### 3.1 Model Pool & Display Rules
- **Model Pool Size:** Contains 46 models tracked by Artificial Analysis.
- **Display Limit:** The page UI strictly displays the top 15 models by default (`LEADERBOARD_MODELS.slice(0, 15)`) for optimal load speed and mobile readability.

### 3.2 Schema Definition
Every entry in `LEADERBOARD_MODELS` must adhere to the `LeaderboardModel` interface:
```typescript
export interface LeaderboardModel {
  rank: number;                  // 1 to 46, ordered by Intelligence Index
  name: string;                  // Official model name verified in ai-models.json
  creator: string;               // Company name (e.g. "Anthropic", "OpenAI", "Meta")
  creatorBadge: string;          // Tailwind color badge classes
  type: 'Proprietary' | 'Open Weights';
  category: 'frontier' | 'speed' | 'value' | 'open';
  intelligence: number;          // Artificial Analysis Intelligence Index (0-100)
  contextWindow: string;         // e.g. "1M", "2M", "10M", "256k"
  costPerTask: string;           // USD formatted (e.g. "$0.72", "$5.98")
  outputSpeed: string;           // e.g. "132 t/s", "239 t/s"
  highlightBadge?: string;       // Optional badge (e.g. "Top Overall Intelligence")
  bestFor: string;               // Concrete 3-5 word use case
  summary: string;               // 1-2 sentence bespoke description with architecture info
  providerUrl: string;           // Official creator website or repository (never aggregator)
  articleUrl?: string;           // Optional link to in-depth review on boredom-at-work
  articleLabel?: string;         // Optional label for review link (e.g. "Read Review")
}
```

### 3.3 Quality & Editorial Mandates
1. **Bespoke Architecture Summaries:** Never use generic placeholder copy. Each summary must explain actual architectural features, strengths, or latency tradeoffs.
2. **Official Creator URLs Only:** Link directly to `providerUrl` endpoints (`https://claude.ai/`, `https://chatgpt.com/`, `https://deepmind.google/`, `https://ai.meta.com/`, `https://x.ai/`, `https://www.deepseek.com/`, etc.).
3. **Accurate Open Weights Tagging:** Only models with downloadable weights (Meta Llama, DeepSeek, Qwen open weights, NVIDIA Nemotron, Upstage Solar Open) are marked `type: 'Open Weights'`.
4. **Language & Punctuation:**
   - Must be written in **American English**.
   - **Strictly No Em-Dashes (`—`):** Use colons, hyphens, commas, or parentheses instead.

---

## 4. Dynamic Widget & Topic Clustering

### 4.1 Automated Clustering via `src/utils/ai-widget.ts`
The dynamic widget (`LeaderboardWidget.astro`) is automatically injected into AI articles based on article tags and slug patterns:
- `category="coding"`: IDE shootouts, Antigravity, and developer tools.
- `category="speed"`: Real-time throughput, voice models, and low-latency tools.
- `category="value"`: Office automation, productivity tools, job search, and note-taking.
- `category="open"`: Open-weights vs. proprietary analysis, local models.
- `category="frontier"`: High-reasoning tasks, finance, portfolio analysis, and data research.
- `category="all"`: General AI guides, travel, and lifestyle tutorials.

### 4.2 Frontmatter Overrides
Authors can customize or disable the widget per article using frontmatter:
```yaml
leaderboardWidget: 'coding' # Options: 'coding' | 'speed' | 'value' | 'open' | 'frontier' | 'all' | 'none' | false
```

### 4.3 Bidirectional Article Linking
When a model on the leaderboard has a corresponding shootout or review article published on the blog:
1. Populate `articleUrl` (e.g. `"/gemini-3-8-review/"`) and `articleLabel` (e.g. `"Read Review"`) in `src/data/ai-leaderboard.ts`.
2. The table row automatically renders a link badge directing readers to the in-depth review.

---

## 5. Automated Synchronization Workflow

### 5.1 Verification Script (`scripts/aa-leaderboard-check.js`)
We use an automated script to verify alignment with Artificial Analysis:

```bash
# Check for deviations against live Artificial Analysis table (exit 1 if out of sync)
pnpm run leaderboard:check

# Automatically sync values, update summaries, re-rank models, and refresh stats
node scripts/aa-leaderboard-check.js --write
```

What `--write` updates automatically:
- Updates Intelligence Index, Context, Cost, and Speed columns.
- Re-ranks all models by Intelligence Index descending.
- Updates the 4 statistics tiles (`LEADERBOARD_STATS`).
- Updates the verification date on `/ai-leaderboard/`.
- Reports any Spotlight Hero Cards that require manual text alignment.

### 5.2 Manual Alignment Checklist
After running `--write`:
1. **Spotlight Hero Cards in `src/pages/ai-leaderboard.astro`:** Check the 4 hero cards (*#1 Intelligence*, *Coding Champion*, *Speed King*, *Best Value*) and align their numbers with the top performers in `LEADERBOARD_MODELS`.
2. **Top 5 Slider (`src/components/Top5Slider.astro`):** Verify that the homepage slider reflects the current top 5 frontier models.
3. **Model Allowlist:** If a new model was introduced, add it to `scripts/data/ai-models.json` with its official creator source and `verifiedAt`.

---

## 6. Pre-Commit Verification Commands

Always run these commands before committing any leaderboard updates:

```bash
# 1. Run live Artificial Analysis parity check
pnpm run leaderboard:check

# 2. Check content integrity and model name allowlist compliance (0 errors required)
pnpm run lint:content

# 3. Verify complete Astro build, Pagefind indexing, and sitemap generation
ASTRO_TELEMETRY_DISABLED=1 pnpm run build
```
