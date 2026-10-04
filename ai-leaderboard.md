# AI Leaderboard: Maintenance & Update Guide (`ai-leaderboard.md`)

This document outlines the rules, workflows, sources, and data structures for updating and maintaining the Frontier AI Leaderboard on **boredom-at-work.com**.

---

## 1. Architecture & File Overview

| File | Purpose |
| :--- | :--- |
| [`src/data/ai-leaderboard.ts`](file:///Users/mani/Development/boredom-at-work-astro/src/data/ai-leaderboard.ts) | **Single Source of Truth** for model data (`LEADERBOARD_MODELS`), key statistics (`LEADERBOARD_STATS`), and knowledge base (`LEADERBOARD_FAQS`). |
| [`src/pages/ai-leaderboard.astro`](file:///Users/mani/Development/boredom-at-work-astro/src/pages/ai-leaderboard.astro) | The main interactive leaderboard page (canonical URL: `/ai-leaderboard/`). Displays the top 15 models by default with live filters and search. |
| [`src/pages/ki-leaderboard.astro`](file:///Users/mani/Development/boredom-at-work-astro/src/pages/ki-leaderboard.astro) | SEO redirect alias for German queries and external domain forwards (e.g. `kileaderboard.de`, `ai-toplist.com`). |
| [`scripts/data/ai-models.json`](file:///Users/mani/Development/boredom-at-work-astro/scripts/data/ai-models.json) | Whitelist registry of verified AI models. Enforced by `scripts/content-lint.js` locally and in CI/CD. |
| [`src/components/Top5Slider.astro`](file:///Users/mani/Development/boredom-at-work-astro/src/components/Top5Slider.astro) | Homepage power ranking slider. Must stay aligned with the frontier models. |

---

## 2. Official Data Sources (The 4 Benchmark Pillars)

Every metric in the leaderboard must be backed by empirical data from one or more of these four research platforms:

1. **Artificial Analysis** (`https://artificialanalysis.ai/leaderboards/models`)
   - **Metrics:** Intelligence Index (0-100), Output Speed (tokens/s), Time-To-First-Token latency (TTFT), standardized Cost per Task (USD).
2. **LMSYS Chatbot Arena** (`https://arena.ai/leaderboard`)
   - **Metrics:** Double-blind, crowdsourced human preference battles, conversational nuance, and battle Elo scores.
3. **LLM Stats** (`https://llm-stats.com/`)
   - **Metrics:** Continuous model tracking, composite scoring, and real-time inference telemetry.
4. **BenchLM** (`https://benchlm.ai/`)
   - **Metrics:** Multi-task automated reasoning accuracy audits, instruction-following benchmarks, and capability indexing.

---

## 3. Data Rules for `src/data/ai-leaderboard.ts`

### 3.1 Model Pool & Display Limit
- **Dataset Size:** Maintain approximately **50 models** in `LEADERBOARD_MODELS`.
- **Display Limit:** The page UI strictly displays the **top 15 models** (`LEADERBOARD_MODELS.slice(0, 15)`) to maintain fast load times and clean mobile rendering.

### 3.2 Required Schema Fields
Every model entry in `LEADERBOARD_MODELS` must adhere to the `LeaderboardModel` interface:
```typescript
{
  rank: number;                  // 1 to 50
  name: string;                  // Clean, official name (e.g., "Claude Opus 5.5")
  creator: string;               // Company name (e.g., "Anthropic", "OpenAI", "Meta")
  creatorBadge: string;          // Tailwind color badge (e.g., "bg-amber-100 text-amber-800 border-amber-200")
  type: 'Proprietary' | 'Open Weights';
  category: 'frontier' | 'speed' | 'value' | 'open';
  intelligence: number;          // 0 to 100 quality score
  contextWindow: string;         // e.g., "1M", "2M", "10M", "256k"
  costPerTask: string;           // USD formatted (e.g., "$0.72", "$5.98")
  outputSpeed: string;           // e.g., "139 t/s", "249 t/s"
  latencyTTFT: string;           // e.g., "0.45s", "0.19s"
  highlightBadge?: string;       // Optional pill badge (e.g., "Top Overall Intelligence")
  bestFor: string;               // Concrete 3-5 word use case
  summary: string;               // 1-2 sentence bespoke description
  providerUrl: string;           // Official creator website or repository
}
```

### 3.3 Content & Quality Mandates
1. **No Generic Placeholders:** Never use generic copy-paste text (such as "Robust foundation model achieving X index..."). Write a unique, informative summary highlighting the actual architecture and specialization for every entry.
2. **Official Creator URLs Only:** Always link directly to the official vendor page (`https://claude.ai/`, `https://chatgpt.com/`, `https://deepmind.google/`, `https://ai.meta.com/`, `https://x.ai/`, `https://www.deepseek.com/`, etc.). Never use third-party aggregator links as the `providerUrl`.
3. **Accurate Open Weights Tagging:** Models released openly (e.g., Meta Llama, DeepSeek, Qwen open weights, NVIDIA Nemotron, Upstage Solar Open) must have `type: 'Open Weights'`.
4. **Language & Punctuation:**
   - Must be written in **American English**.
   - **Strictly No Em-Dashes (`—`):** Use colons, hyphens, commas, or parentheses instead.

---

## 4. Synchronization Checklist for Every Update

When updating the leaderboard, verify the following linked components:

1. **Header Statistics (`LEADERBOARD_STATS`):**
   - Update `Top Intelligence`, `Peak Output Speed`, `Lowest Task Cost`, and `Record Context Window` in `src/data/ai-leaderboard.ts` to match the current top performers.
2. **Spotlight Quick Picks in `src/pages/ai-leaderboard.astro`:**
   - Check the 4 above-the-fold spotlight boxes:
     - *#1 Intelligence* (e.g. Claude Opus 5.5)
     - *Coding Champion* (e.g. Claude Sonnet 5.5)
     - *Speed King* (e.g. Gemini 3.8 Flash / Celeris-1)
     - *Best Value* (e.g. GPT-6.1 Sol / MiMo)
   - Ensure the intelligence, speed, and cost numbers displayed on these cards match the table rows exactly.
3. **Model Whitelist (`scripts/data/ai-models.json`):**
   - If any new major model series (e.g. Claude, GPT, Gemini) is added, register it in `scripts/data/ai-models.json` under the respective vendor to prevent linting failures.
4. **Badge Styling in Table & Cards:**
   - Keep `whitespace-nowrap` on all `Type` badges (`Open Weights` / `Proprietary`) to prevent awkward line breaks on mobile devices and narrow viewports.

---

## 5. Verification Commands

Always run these commands before committing any leaderboard updates:

```bash
# 1. Check content integrity and model name compliance (0 errors required)
pnpm run lint:content

# 2. Verify complete Astro build, Pagefind indexing, and sitemap generation
ASTRO_TELEMETRY_DISABLED=1 pnpm run build
```
