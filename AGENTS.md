# AGENTS.md

> Instructions for AI coding agents (Codex, etc.) working in this repository.

## Primary source of truth

**Read [`CLAUDE.md`](./CLAUDE.md) first and follow it.** It contains the full project
rules, context, and workflows for boredom-at-work.com. Everything below is a short
summary — `CLAUDE.md` is authoritative whenever the two differ.

## Quick facts

- **Project:** boredom-at-work.com — Astro 5 blog (Tailwind CSS 4 + SCSS), hosted on GitHub Pages.
- **Package manager:** **pnpm** (use `pnpm`, not `npm`). Do not commit a `package-lock.json`.
- **Content:** Blog articles live in year/month subfolders, e.g. `src/content/blog/2026/09/04-best-finance-youtube-channels.md`. The hero image is co-located in the same folder.
- **Language:** Repo docs/conversation in German; all published article content in **American English**.

## Must-follow rules (see CLAUDE.md for details)

1. **Fact-check first** — never invent dates, prices, or specs. Flag uncertain facts with `[VERIFY]`.
   Never "correct" AI model names or current prices from training data — verify or ask.
2. **Filename prefix rule** — blog files use a day-number prefix (e.g. `04-foo.md`) for chronological sorting.
   New articles **must** set the `slug:` field, or the URL breaks (would become `/04-foo/`). A lint rule blocks commits otherwise.
3. **After creating/editing an article:** run `pnpm run lint:content:fix` (0 errors before commit).
4. **Before pushing a new article:** ask the user when it should be published (sets `publishDate`).
5. **Internal links:** link primarily to already-published articles.
6. **Title/content match:** if a title promises N items, deliver exactly N.

## Useful commands

- `pnpm run lint:content` / `pnpm run lint:content:fix` — content linting
- `pnpm run traffic` — GSC + Bing traffic report
- `pnpm run indexnow` — submit URLs to IndexNow

## Do NOT

- Commit `package-lock.json`, `*.kdbx`, `KeePassXC`, `.mcp.json`, `*.code-workspace` (see `.gitignore`).
- Bypass the fact-check pre-commit hook.
