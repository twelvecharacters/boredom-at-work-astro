---
title: "Gemini 3.8 Flash Review: Benchmarks, Pricing & Verdict"
slug: "google-gemini-3-8-review"
description: "Google Gemini 3.8 Flash reviewed against Google's own model card: real benchmarks vs. Claude Opus 5 and GPT-5.6, API pricing, and who should switch."
publishDate: 2026-09-04
updatedDate: 2026-09-09
author: "Mehdi"
image: "./04-google-gemini-3-8-review.webp"
imageAlt: "Futuristic glowing AI processor interface representing Google Gemini 3.8 Flash speed and agentic coding workflows"
tags: ["Artificial Intelligence", "Google Gemini", "Productivity", "Tech & Gadgets"]
draft: false
faq:
  - question: "Is there a Pro version of Gemini 3.8?"
    answer: "No. As of September 2026, Google's model list has Gemini 3.8 Flash as the newest model and Gemini 3.1 Pro (still in preview) as the top Pro model. Google has not announced a Pro model for this generation. If you see one quoted somewhere, check Google's model page before trusting the numbers."
  - question: "How much does Gemini 3.8 Flash cost in the API?"
    answer: "Google lists Gemini 3.8 Flash at $0.75 per million input tokens and $3.75 per million output tokens, with context caching at $0.075 per million. That introductory price runs through December 31, 2026, after which it doubles to $1.50 and $7.50."
  - question: "Is Gemini 3.8 Flash better than Claude Opus 5 for coding?"
    answer: "On Google's own model card the two are close on DeepSWE v1.1 (73.7% for 3.8 Flash vs. 74.0% for Opus 5) and Terminal-bench 2.1 (89.4% vs. 89.1%). Opus 5 pulls far ahead on the harder Terminal-bench 4.0 (51.8% vs. 19.1%) and on computer use. Flash wins on price: Opus 5 costs $5 per million input tokens, roughly seven times more."
  - question: "Which Gemini model do free users get?"
    answer: "Google's subscription page lists Gemini 3.6 Flash plus limited access to Gemini 3.1 Pro on the free tier. Gemini 3.8 Flash in the Gemini app requires a Google AI Pro or AI Ultra subscription. Developers can use 3.8 Flash in Google AI Studio and the Gemini API regardless of subscription."
---

Google shipped Gemini 3.8 Flash on September 2, 2026, three weeks after 3.7 Flash and the third Flash release in about six weeks. That pace is the story here: Google is now iterating its workhorse model every few weeks, and each step is small enough that most people can safely ignore the version number. Below is what actually changed, measured against Google's own model card and pricing page rather than launch-day hype.

One correction up front, because a lot of coverage gets it wrong: **there is no Pro model in the 3.8 generation.** The 3.8 generation is Flash only. Google's Pro line still tops out at Gemini 3.1 Pro, which remains in preview. Everything below is about 3.8 Flash.

> **New to Gemini?** Start with my [Google Gemini review](/google-gemini-review/) for the app and the subscription tiers, then come back here for the model itself.

## Quick Verdict

| | Gemini 3.8 Flash |
|---|---|
| **Released** | September 2, 2026 |
| **Context window** | 1M tokens input, 64K output |
| **Knowledge cutoff** | March 2026 |
| **API price** | $0.75 in / $3.75 out per 1M tokens (through Dec 31, 2026) |
| **Best at** | Agentic coding, long tool loops, finance and legal agent tasks |
| **Weak at** | Computer use (OSWorld), the hardest terminal tasks |
| **Bottom line** | The best price-to-capability ratio in Google's lineup. Not a frontier leap. |

## What Actually Changed From 3.7 Flash

Google positions 3.8 Flash as its "most intelligent workhorse model yet for coding and agents." The design change it highlights is that the model works harder on hard problems: at higher effort levels it runs more reasoning steps and calls tools more often, and it may spend more tokens to get there. That is a trade you should know about, because your output bill scales with it.

The measurable gains over 3.7 Flash, from Google's model card:

| Benchmark | 3.7 Flash | 3.8 Flash | Change |
|---|---|---|---|
| DeepSWE v1.1 (software engineering) | 65.3% | 73.7% | +8.4 |
| Terminal-bench 4.0 | 11.2% | 19.1% | +7.9 |
| OSWorld-2.0 (computer use) | 50.6% | 59.0% | +8.4 |
| Terminal-bench 2.1 | 85.8% | 89.4% | +3.6 |
| BioMysteryBench (difficult) | 43.5% | 56.5% | +13.0 |
| HLE-Verified (reasoning) | 53.6% | 54.9% | +1.3 |

The coding and agent numbers moved. General reasoning barely did. If you use Gemini for writing, summarizing, or research, you will not feel this update. If you run it inside an agent loop, you will.

## How It Compares to Claude Opus 5 and GPT-5.6

Google's model card puts 3.8 Flash next to Anthropic's and OpenAI's current models. These are Google's numbers, so read them as a best case for Gemini, but they are the only like-for-like set available.

| Benchmark | Gemini 3.8 Flash | Claude Opus 5 | Claude Sonnet 5 | GPT-5.6 Sol |
|---|---|---|---|---|
| DeepSWE v1.1 | 73.7% | **74.0%** | 53.8% | 72.7% |
| Terminal-bench 2.1 | **89.4%** | 89.1% | 80.4% | 88.8% |
| Terminal-bench 4.0 | 19.1% | **51.8%** | 12.4% | 37.3% |
| OSWorld-2.0 | 59.0% | **75.4%** | 42.6% | 62.6% |
| HLE-Verified | **54.9%** | 54.4% | 31.0% | 54.5% |
| LVBench (long video) | **87.8%** | 75.4% | 68.5% | 82.1% |
| Vals Finance Agent v2 | **61.4%** | 58.6% | 53.9% | 53.8% |
| GDPVal-AA v2 (Elo) | 1545 | **1824** | 1584 | 1710 |

Three takeaways:

1. **On everyday coding, Flash sits with the frontier.** DeepSWE and Terminal-bench 2.1 are effectively a tie with Opus 5 and GPT-5.6 Sol. That is remarkable for a model priced like a budget tier.
2. **On the hardest agent work, it is not close.** Terminal-bench 4.0 and OSWorld show a real gap to Opus 5. Long, messy, multi-hour tasks are still where you pay for a Pro-class model.
3. **Video and domain agents are Google's edge.** Long-video understanding and the finance and legal agent benchmarks are where 3.8 Flash leads outright.

For the broader picture of the three assistants as products, see [ChatGPT vs Claude vs Gemini](/chatgpt-vs-claude-vs-gemini/).

## Pricing: Where Flash Wins

| Model | Input / 1M tokens | Output / 1M tokens | Source |
|---|---|---|---|
| Gemini 3.8 Flash | $0.75 | $3.75 | Google, introductory through Dec 31, 2026 |
| Gemini 3.8 Flash (from 2027) | $1.50 | $7.50 | Google |
| Gemini 3.5 Flash | $1.50 | $9.00 | Google |
| Gemini 3.1 Pro (preview) | $2.00 | $12.00 | Google, prompts up to 200K |
| Claude Sonnet 5 | $2.00 | $10.00 | Anthropic |
| Claude Opus 5 | $5.00 | $25.00 | Anthropic |

Context caching on 3.8 Flash is $0.075 per million tokens, a tenth of the input price, which matters if you keep a large codebase or document set in context across many calls. Note that 3.8 Flash costs the same as 3.7 and 3.6 Flash, so there is no reason to stay on an older Flash model.

The catch is the "works harder" design. On complex tasks the model emits more reasoning and tool-call tokens than 3.7 did, so a cheaper sticker price can still produce a similar bill. Watch your token counts for the first week.

## Where You Can Use It

- **Gemini app:** included for Google AI Pro and AI Ultra subscribers. Free users get Gemini 3.6 Flash plus limited access to 3.1 Pro.
- **Google Search AI Mode and Gemini in Google Sheets:** live for Pro and Ultra subscribers.
- **Google AI Studio and the Gemini API:** available to any developer, with a free tier for testing.
- **Google Antigravity and Vertex AI:** available for agentic coding and enterprise deployments. My [Antigravity CLI guide](/antigravity-cli-guide/) covers the setup.

Google also announced a Gemini 3.8 Flash Cyber variant for security work, but it is limited to governments and vetted partners through Google's Fairwind program. It is not something you can sign up for.

## Who Should Switch

**Switch now if you:**

- Run coding agents or terminal tools and currently pay Pro-class prices for tasks that are routine. The frontier-level DeepSWE score at $0.75 per million input tokens is the whole argument.
- Process long video or build finance and legal agents. This is where 3.8 Flash beats every model in Google's comparison.
- Are already on 3.6 or 3.7 Flash. Same price, better model, no migration cost.

**Do not switch if you:**

- Need the best model for long, unsupervised agent runs. Claude Opus 5 leads Terminal-bench 4.0 by more than 30 points.
- Use Gemini mainly for writing and research. The reasoning gains are within a point or two of 3.7 Flash.
- Want a Pro-class Gemini. Wait for whatever follows 3.1 Pro. A Pro model in the 3.8 generation does not exist yet.

## Frequently Asked Questions

### Is there a Pro version of Gemini 3.8?

No. As of September 2026, Google's model list has Gemini 3.8 Flash as the newest model and Gemini 3.1 Pro (still in preview) as the top Pro model. Google has not announced a Pro model for this generation. If you see one quoted somewhere, check Google's model page before trusting the numbers.

### How much does Gemini 3.8 Flash cost in the API?

Google lists Gemini 3.8 Flash at $0.75 per million input tokens and $3.75 per million output tokens, with context caching at $0.075 per million. That introductory price runs through December 31, 2026, after which it doubles to $1.50 and $7.50.

### Is Gemini 3.8 Flash better than Claude Opus 5 for coding?

On Google's own model card the two are close on DeepSWE v1.1 (73.7% for 3.8 Flash vs. 74.0% for Opus 5) and Terminal-bench 2.1 (89.4% vs. 89.1%). Opus 5 pulls far ahead on the harder Terminal-bench 4.0 (51.8% vs. 19.1%) and on computer use. Flash wins on price: Opus 5 costs $5 per million input tokens, roughly seven times more.

### Which Gemini model do free users get?

Google's subscription page lists Gemini 3.6 Flash plus limited access to Gemini 3.1 Pro on the free tier. Gemini 3.8 Flash in the Gemini app requires a Google AI Pro or AI Ultra subscription. Developers can use 3.8 Flash in Google AI Studio and the Gemini API regardless of subscription.

## Sources

All figures in this review were read from the vendors' own pages on September 9, 2026:

- [Gemini 3.8 Flash model card](https://deepmind.google/models/model-cards/gemini-3-8-flash/) (Google DeepMind): benchmarks, context window, knowledge cutoff
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) (Google): token prices and the December 31 introductory deadline
- [Gemini API model list](https://ai.google.dev/gemini-api/docs/models) (Google): current and retired models
- [Gemini subscriptions](https://gemini.google/subscriptions/) (Google): which tier gets which model
- [Claude models overview](https://platform.claude.com/docs/en/models/overview) (Anthropic): Opus 5 and Sonnet 5 pricing

## Related Guides

- [Google Gemini Review](/google-gemini-review/): the app, the tiers, and whether it beats ChatGPT
- [New Gemini Features in 2026](/new-gemini-features-2026/): Gems, Workspace sidebar, and the 1M context window in practice
- [Gemini CLI Guide](/gemini-cli-guide/): running Gemini from the terminal
