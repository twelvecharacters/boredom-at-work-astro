---
title: "Antigravity 2 Meets Gemini 3.5: The AI Coding Assistant That Actually Gets Your Codebase"
slug: "antigravity-2-gemini-35"
description: "Antigravity 2 with Gemini 3.5 is changing how developers work. Explore the new Planning Mode, Knowledge Items, and multi-file context in this 2026 guide."
publishDate: 2026-05-30
author: "bored chap"
image: "./30-antigravity-2-gemini-35.png"
imageAlt: "A holographic brain surrounded by floating code panels and AI data streams in purple and blue tones"
tags: ["AI", "Gemini", "Google", "Productivity", "Tech", "Software", "Coding"]
draft: false
tldr: "Antigravity 2 is the major update to Google DeepMind's agentic AI coding assistant, now powered by Gemini 3.5. Key upgrades include multi-file context awareness, a new Planning Mode, persistent Knowledge Items, and dramatically improved code execution. If you're a developer looking to reclaim hours of your workday, this is the release to pay attention to."
isListicle: true
softwareApp:
  name: "Antigravity (Google DeepMind)"
  operatingSystem: "Web, macOS, Windows, Linux"
  category: "DeveloperApplication"
  rating: 4.9
  ratingCount: 870
  priceRange: "Free (with Google account)"
  url: "https://antigravity.google"
faq:
  - question: "What is Antigravity 2?"
    answer: "Antigravity 2 is the second major version of Google DeepMind's agentic AI coding assistant, deeply integrated into developer environments. It uses the Gemini 3.5 model family to understand entire codebases, plan multi-step changes, and execute them autonomously with developer approval."
  - question: "What model does Antigravity 2 use?"
    answer: "Antigravity 2 primarily runs on Gemini 3.5 Flash for speed and Gemini 3.1 Pro for complex reasoning tasks. Users can switch between models depending on the task's complexity."
  - question: "Is Antigravity 2 free to use?"
    answer: "Antigravity 2 is available at no additional cost to users with a Google account. However, high-volume usage and access to Gemini 3.1 Pro may require a Google AI Pro or Workspace subscription."
---

Let's be honest. Most AI coding tools launched in the last two years share the same basic pitch: paste your code, get a suggestion, copy it back. It's useful, but it's not transformative.

**Antigravity 2**, powered by the newly released **Gemini 3.5** model family, is a different proposition. Google DeepMind has spent the last year quietly rebuilding its agentic coding assistant from the ground up—and the result is something that feels less like a smart autocomplete and more like a genuinely capable pair programmer.

Here's what's new, what actually works, and how to get the most out of it during your workday.

---

## What Is Antigravity 2?

Antigravity 2 is the second major release of Google DeepMind's agentic AI coding assistant. Unlike a chatbot you paste snippets into, Antigravity 2 works *within* your editor, reading your entire workspace, understanding your project's architecture, and making changes across multiple files simultaneously.

Version 2 arrives on the back of **Gemini 3.5**, which brings two key improvements over its predecessor:

1.  **Speed:** Gemini 3.5 Flash delivers near-instant responses for everyday edits and refactors.
2.  **Depth:** Gemini 3.1 Pro tackles complex multi-file reasoning tasks with a level of coherence that version 1 simply couldn't match.

Think of it as the difference between a junior developer who can fix individual bugs and a senior engineer who can rearchitect a module without breaking anything downstream.

---

## 1. Planning Mode: Finally, an AI That Thinks Before It Acts

The single biggest complaint about first-generation AI coding assistants was that they were impulsive. You'd ask for a "small refactor" and come back to find half your project restructured.

Antigravity 2 addresses this with **Planning Mode**. When you give it a complex or ambiguous task, instead of immediately writing code, it:

1.  **Researches** the relevant parts of your codebase.
2.  **Creates an implementation plan** as a structured document you can review.
3.  **Asks open questions** if something is underspecified.
4.  **Waits for your explicit approval** before touching a single file.

This is a workflow shift, not just a feature. Your interaction moves from "AI does a thing, I review the wreckage" to "AI proposes a plan, I approve or amend it, AI executes precisely." The quality of the output improves dramatically because the model has forced itself to think through the full scope of the change before writing a line.

### The Workflow in Practice

```
You: Refactor the authentication system to support OAuth 2.0 in addition to the current username/password flow. Don't break any existing functionality.

Antigravity 2 (Planning Mode):
→ Research: Reading auth.ts, user.model.ts, middleware/auth.js... (12 files)
→ Plan:
   1. Add @google-auth-library as a dependency
   2. Create src/auth/oauth.ts with Google OAuth handler
   3. Modify middleware/auth.js to support both auth strategies
   4. Update user.model.ts to add optional googleId field
   5. Add /auth/google and /auth/google/callback routes
   6. Update .env.example with required OAuth env vars
→ Open questions:
   - Should existing users be able to link a Google account to their existing password login?
   - Which OAuth scopes should we request?

[Approve Plan] [Request Changes]
```

That one prompt used to result in either a half-finished implementation or a panic-inducing diff. With Planning Mode, you are the decision-maker again.

---

## 2. Knowledge Items: A Memory That Actually Persists

A classic frustration with AI coding tools: you spend ten minutes explaining your project's conventions, the right way to handle errors, or why a certain architectural decision was made—and the next session, it's all gone.

Antigravity 2 introduces **Knowledge Items (KIs)**: a persistent, structured memory system attached to your project. KIs are small documents stored in your workspace that Antigravity 2 reads automatically at the start of every session.

You can create KIs for:
*   **Coding conventions:** "Always use named exports. Never use `any` in TypeScript."
*   **Architecture decisions:** "We use Astro for the frontend. Avoid adding client-side JavaScript unless absolutely necessary."
*   **Known gotchas:** "The `processPayment()` function has a race condition in high-load scenarios. See issue #412."
*   **Recurring workflows:** "To add a new API endpoint, follow the pattern in `routes/users.ts`."

The result is an assistant that doesn't need to be re-briefed every session. You describe a task, and Antigravity 2 already knows the house rules.

---

## 3. Gemini 3.5 Flash: The Speed Upgrade That Changes Daily Habits

The original Antigravity could be slow enough on complex tasks that you'd find yourself switching tabs. Gemini 3.5 Flash changes this.

For everyday tasks—renaming a variable across a project, adding a JSDoc comment to a function, fixing a TypeScript error, generating a unit test—responses now arrive in under two seconds. The latency is low enough that it genuinely starts to feel like a keyboard shortcut, not a waiting game.

The practical effect? You stop second-guessing whether a task is "worth asking the AI." Small refactors, quick type fixes, adding error handling to a route—tasks you'd previously do by hand because the friction wasn't worth it are now instant.

### Speed Benchmark Comparison

| Task | Gemini 3.1 (v1) | Gemini 3.5 Flash (v2) |
| :--- | :--- | :--- |
| Fix a TypeScript error | ~8 seconds | ~1.5 seconds |
| Generate a unit test | ~12 seconds | ~3 seconds |
| Refactor a 50-line function | ~18 seconds | ~5 seconds |
| Full multi-file plan + execution | ~45 seconds | ~15 seconds |

---

## 4. Multi-File Context: It Knows Your Whole Codebase

This is the feature that separates Antigravity 2 from most competitors. Rather than working on a single file in isolation, Antigravity 2 uses Gemini 3.1 Pro's extended context window to ingest your **entire project**—not just the file you have open.

In practice, this means:

*   **Accurate refactors:** When you rename a function, it finds and updates every call site across all files, not just the ones you mentioned.
*   **Context-aware suggestions:** It won't suggest importing a library you already have. It knows what's in your `package.json`.
*   **Consistent style:** It reads your existing code to match your naming conventions, commenting style, and file structure before writing anything new.

For a project with 200+ files, this is the difference between a useful tool and one that constantly makes mistakes because it doesn't know what it doesn't know.

---

## 5. Autonomous Task Execution with Approval Gates

Once a plan is approved, Antigravity 2 can execute a full multi-step task autonomously: creating new files, modifying existing ones, running terminal commands, and checking whether the build still passes. Crucially, it does this with **approval gates** — pausing at key decision points so you stay in control.

The execution model works like this:

1.  **Approved plan items** are executed sequentially.
2.  **File changes** are shown as diffs before being applied.
3.  **Terminal commands** (like running tests or installing packages) are proposed, not auto-run.
4.  **Build errors** are caught and fed back into the model, which attempts to fix them before reporting back to you.

This creates a tight feedback loop that most developers describe as "pair programming, but the other person is very fast and never tired."

---

## How Antigravity 2 + Gemini 3.5 Compares to the Competition

| Feature | **Antigravity 2 / Gemini 3.5** | **Cursor / GPT-4o** | **Copilot / Claude 4.5** |
| :--- | :--- | :--- | :--- |
| **Planning Mode** | ✅ Native, document-based | ❌ No | ❌ No |
| **Persistent Memory (KIs)** | ✅ Project-scoped KI system | ⚠️ Limited (Memories) | ❌ No |
| **Full Codebase Context** | ✅ Full workspace ingestion | ⚠️ Active files + limited search | ⚠️ File-by-file |
| **Approval Gates** | ✅ Built into execution model | ❌ Auto-applies by default | ⚠️ Optional |
| **Speed (everyday tasks)** | ✅ ~1-3s (Flash) | ⚠️ ~4-8s | ⚠️ ~3-6s |
| **Best For** | Complex, multi-file, agentic | Fast inline completions | Long-form reasoning |

---

## Getting Started: Your First Antigravity 2 Session

The learning curve is minimal, but here are the habits that will make the biggest difference from day one:

**1. Set up your GEMINI.md file.**
In your project root, create a `GEMINI.md` file with your project conventions, tech stack, and any gotchas. Antigravity 2 reads this automatically. Think of it as onboarding your new pair programmer.

```markdown
# Project Conventions

## Tech Stack
- Frontend: Astro 5 + Tailwind 4
- Backend: Node.js + Express
- DB: PostgreSQL via Drizzle ORM

## Rules
- All components must use named exports.
- Never commit API keys. Use .env.local.
- Run `npm run lint` before every commit.
```

**2. Trust Planning Mode for anything beyond trivial edits.**
If you're about to describe a change that would take you more than 20 minutes, always ask for a plan first. Review it carefully—the plan stage is where you catch misunderstandings before they become multi-file diffs.

**3. Use Knowledge Items for recurring context.**
If you find yourself re-explaining the same thing (a database schema, a tricky API quirk, a business rule), add it to a KI. You'll explain it once and it'll be remembered forever.

---

## Quotas, Limits, and the Google AI Pro Plan

Antigravity 2 is free to use, but "free" comes with a ceiling—and depending on how you work, you'll hit it faster than you expect.

### The Free Tier: What You Actually Get

On the free tier, Antigravity 2 runs on **Gemini 3.5 Flash** for most interactions. You get:

*   **Unlimited** basic completions, inline suggestions, and short edits (Flash model).
*   **50 requests/day** on Gemini 3.1 Pro — the heavy-reasoning model used for Planning Mode and full-codebase analysis.
*   **Context window:** Up to 1 million tokens per session on the free tier.

For casual use—occasional refactors, a few plans per week—the free tier is genuinely workable. You'll feel the limit on days when you're deep in a feature and burning through Pro requests before lunch.

### What Hits Your Pro Quota

Not every Antigravity action is equal. Here's what counts against your daily Gemini 3.1 Pro allowance:

| Action | Model Used | Counts Against Pro Quota? |
| :--- | :--- | :--- |
| Inline autocomplete | Flash | ❌ No |
| Short edits (single file) | Flash | ❌ No |
| Planning Mode (full plan) | **Pro** | ✅ Yes |
| Multi-file refactors | **Pro** | ✅ Yes |
| Full codebase analysis | **Pro** | ✅ Yes |
| Knowledge Item generation | Flash | ❌ No |
| Build error debugging (complex) | **Pro** | ✅ Yes |

The practical pattern most developers land on: use Flash for the quick stuff all day, save Pro requests for the high-value planning sessions.

### Google AI Pro: Is It Worth It?

**Google AI Pro** costs **$20/month** and significantly raises your quota limits. You also get:

*   **Higher daily request allowance** for Gemini 3.1 Pro in Antigravity — enough to run Planning Mode and multi-file analysis throughout a full workday without hitting a wall.
*   **2 million token** context window (up from 1M on the free tier).
*   Priority access during peak hours — reduced throttling compared to the free tier.
*   The same subscription covers **Gemini Advanced** in your browser, the **Workspace sidebar** in Gmail/Docs/Sheets, and **Google AI Studio** API credits.

At $20/month, Google AI Pro is the same price as ChatGPT Plus and Claude Pro. The differentiator is the breadth: one subscription unlocks the assistant across your IDE, your browser, your email, and your spreadsheets. If you were already paying for any one of those individually, the math changes quickly.

### Who Should Upgrade?

*   **Yes, upgrade if:** You use Planning Mode daily, work on large codebases, or find yourself hitting the Pro cap before 2 PM.
*   **Wait if:** You only use Antigravity occasionally or mostly for single-file edits—the free tier will comfortably cover you.
*   **Definitely upgrade if:** You're already paying for Gemini Advanced separately. AI Pro folds it all in.

### A Practical Tip: Stretch Your Free Quota

If you're on the free tier, you can significantly extend your daily Pro budget by **front-loading your Planning Mode sessions**. Run all your plans first thing in the morning, approve them, then let Antigravity execute throughout the day using Flash. The execution phase of an approved plan is largely Flash-powered, so you'll get the full benefit of a Pro-generated plan without burning additional Pro tokens during implementation.

---

## The Verdict: A Meaningful Step Forward

Antigravity 2 powered by Gemini 3.5 isn't a minor iteration. The combination of Planning Mode, persistent Knowledge Items, full codebase context, and Gemini 3.5 Flash's speed represents a genuinely different approach to AI-assisted development.

For the first time, the tool feels like it's oriented around *your* workflow rather than asking you to adapt to its limitations. You set the conventions once. You approve the plan. You stay in control.

If you've been burned by AI coding tools that were more trouble than they were worth, Antigravity 2 is worth a fresh look. The boredom-at-work use case is simple: give it your most tedious, repetitive coding task on a Friday afternoon, approve the plan, and watch it work while you drink your coffee.

**What feature are you most excited to try? Drop it in the comments.**

---

## Related Articles
*   [Google Gemini 2026: The New Features You Need to Try](/new-gemini-features-2026/)
*   [Google Gemini for Travel Planning: The Real-Time Advantage](/gemini-travel-planning/)
*   [Essential Mac Apps for Developers in 2026](/essential-mac-apps-2026/)
*   [How to Build an AI Flight Search Agent](/build-ai-flight-search-agent/)
