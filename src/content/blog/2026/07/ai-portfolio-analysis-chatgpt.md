---
title: "How to Analyze Your Investment Portfolio With ChatGPT and Claude"
slug: "ai-portfolio-analysis-chatgpt"
description: "Upload your brokerage CSV to ChatGPT or Claude and get instant portfolio analysis. Step-by-step guide with prompts for allocation, risk, and rebalancing."
publishDate: 2026-07-10
author: "bored chap"
image: "../../../../assets/images/ai-portfolio-analysis-chatgpt.webp"
tags: ["AI Tools", "Investing", "ChatGPT", "Portfolio Analysis", "Finance"]
draft: false
faq:
  - question: "Is it safe to upload my portfolio data to ChatGPT or Claude?"
    answer: "Both OpenAI and Anthropic state they don't use your data to train models on paid plans. Still, avoid uploading sensitive info like account numbers or SSNs. Export only positions, values, and cost basis — strip personal identifiers first. If you're concerned, use the API instead of the web app for more control over data handling."
  - question: "Can AI replace a financial advisor for portfolio analysis?"
    answer: "No. AI is excellent for number-crunching, visualization, and spotting obvious issues like over-concentration or high expense ratios. But it can't account for your full tax situation, estate planning, insurance needs, or risk tolerance the way a human advisor can. Think of it as a powerful first pass, not a replacement."
  - question: "Which is better for portfolio analysis — ChatGPT or Claude?"
    answer: "ChatGPT Plus has better CSV handling with its built-in Python sandbox — it parses files automatically and generates charts. Claude Pro has a larger context window (200K tokens) which is better for analyzing multiple documents at once, like combining your portfolio with 10-K filings. For pure spreadsheet analysis, ChatGPT has the edge. For deep document analysis, Claude wins."
  - question: "Can ChatGPT access my brokerage account directly?"
    answer: "No. Neither ChatGPT nor Claude can connect to your brokerage account. You need to export a CSV or spreadsheet from your broker (Fidelity, Schwab, Vanguard, etc.) and upload it manually. Dedicated tools like PortfolioPilot or Mezzi can connect to accounts directly, but they have limited AI analysis compared to ChatGPT/Claude."
---

You don't need a Bloomberg Terminal or a finance degree to analyze your investment portfolio properly. You just need a CSV export from your broker and an AI chatbot.

I've been using [ChatGPT](/chatgpt-guide/) and Claude to analyze portfolios, and it's genuinely impressive what a $20/month subscription can do — sector breakdowns, risk analysis, expense ratio audits, and rebalancing suggestions in minutes.

Here's exactly how to do it, step by step.

*This article is for educational purposes only and does not constitute financial advice. Always verify AI-generated analysis against primary sources before making investment decisions.*

---

## What You Need

- A **brokerage account** with export capability (Fidelity, Schwab, Vanguard, E\*TRADE, etc.)
- **ChatGPT Plus** ($20/month) or **Claude Pro** ($20/month)
- 10 minutes

That's it. No coding, no plugins, no third-party tools.

---

## Step 1: Export Your Portfolio Data

Log into your brokerage and export your holdings as a CSV or Excel file. Most brokers have this under "Positions" or "Portfolio" → "Export" or "Download."

**What to include:**

| Column | Why |
|--------|-----|
| Ticker/Symbol | Identifies each holding |
| Shares/Quantity | Position size |
| Current Value | Portfolio weight calculation |
| Cost Basis | Gain/loss analysis |
| Expense Ratio | Fee optimization |
| Asset Class/Type | Allocation breakdown |

**What to remove before uploading:**
- Account numbers
- Social Security numbers
- Personal address or banking info

Keep it to positions and numbers only. Both ChatGPT and Claude on paid plans state they don't train on your data, but there's no reason to upload sensitive identifiers.

---

## Step 2: Upload and Get Your First Analysis

### Using ChatGPT Plus

ChatGPT's Advanced Data Analysis runs Python in a sandbox, so it can parse your CSV automatically.

**Upload your file and use this prompt:**

> Analyze my investment portfolio from the attached CSV. Provide:
> 1. Total portfolio value and number of positions
> 2. Sector allocation breakdown (pie chart)
> 3. Asset class split (stocks vs bonds vs ETFs vs cash)
> 4. Top 5 largest positions by weight
> 5. Any position that's more than 15% of the portfolio (over-concentration risk)
> 6. Average expense ratio across all holdings

ChatGPT will generate charts, tables, and a written summary. It usually takes 30-60 seconds.

### Using Claude Pro

Claude handles file uploads differently — it reads the content but doesn't run code in a sandbox like ChatGPT.

**Upload your file and use this prompt:**

> I've uploaded my investment portfolio. Please analyze it and provide:
> 1. A summary of total value and position count
> 2. Sector allocation and any over-concentration
> 3. Asset class breakdown
> 4. The top 5 holdings by portfolio weight
> 5. Suggestions for improving diversification

Claude's output will be more text-heavy with tables rather than interactive charts. Its strength is connecting the analysis to broader financial context because of its larger context window.

---

## Step 3: Deep Dive Prompts

Once you have the overview, go deeper with these follow-up prompts:

### Risk Analysis

> Calculate the overlap between my ETFs. Are any of my holdings essentially duplicating each other? Show the top 10 overlapping stocks across all my ETFs.

### Fee Optimization

> List every holding with an expense ratio above 0.20%. For each one, suggest a lower-cost alternative that tracks a similar index. Show the annual fee savings if I switched.

### Tax-Loss Harvesting

> Based on my cost basis data, which positions are currently at a loss? For each loss position, calculate the potential tax savings at a 24% federal tax rate, and suggest a similar (but not substantially identical) replacement fund.

### Dividend Analysis

> Analyze the dividend yield of my portfolio. What's my estimated annual dividend income? Which holdings contribute the most? Is my portfolio tilted toward growth or income?

### Rebalancing

> My target allocation is 80% stocks / 15% bonds / 5% cash. How far off am I? Tell me exactly what to buy and sell to rebalance, with dollar amounts.

---

## Step 4: Compare Against Benchmarks

This is where AI really shines — contextual analysis that a static screener can't do.

> Compare my portfolio's sector allocation against the S&P 500. Where am I overweight? Where am I underweight? Is this intentional tilting or accidental concentration?

> My portfolio returned 12% last year. How does that compare to a simple VTI (total market) or a 60/40 portfolio over the same period? Am I being rewarded for the extra complexity?

---

## ChatGPT vs. Claude: Which Is Better for This?

| Feature | ChatGPT Plus | Claude Pro |
|---------|-------------|-----------|
| **CSV parsing** | Excellent — auto-detects columns | Good — reads content, no code sandbox |
| **Charts** | Interactive, downloadable | Text-based tables |
| **Context window** | 128K tokens | 200K tokens |
| **Multi-document** | Limited | Excels — analyze portfolio + 10-K together |
| **Expense** | $20/month | $20/month |
| **Best for** | Spreadsheet analysis, visualizations | Deep document analysis, narrative insights |

**My recommendation:** Start with ChatGPT for the initial CSV analysis and charts. Use Claude when you want to combine your portfolio data with earnings reports, annual filings, or other documents for deeper context.

---

## Dedicated AI Portfolio Tools

If you want something more hands-off, these tools connect directly to brokerage accounts:

| Tool | What It Does | Price |
|------|-------------|-------|
| **PortfolioPilot** | Auto-recommendations based on risk/tax/goals | Free + premium |
| **Mezzi** | Cross-account analysis, hidden risk detection | Free + premium |
| **Fiscal.ai** | Institutional-grade data, earnings analysis | Free tier, Plus ~$29/month |

These are more polished but less flexible than ChatGPT/Claude. You can't ask custom questions the same way.

---

## What AI Gets Wrong (Important)

**Hallucinated numbers.** AI sometimes generates plausible but wrong financial figures, especially for smaller companies. Always cross-check specific numbers against your broker's data.

**No real-time data.** Neither ChatGPT nor Claude has live market prices. Your analysis is only as current as your CSV export.

**Over-confident recommendations.** AI will suggest rebalancing moves without knowing your tax situation, time horizon, or whether you're in a taxable vs. retirement account. Take suggestions as starting points, not instructions.

**Expense ratio databases can be outdated.** AI training data may have older expense ratios. Verify current fees on your fund provider's website.

---

## The Bottom Line

Uploading a portfolio CSV to ChatGPT or Claude gives you analysis that used to require expensive software or a financial advisor meeting. It's not perfect — you need to verify the numbers and apply your own judgment — but as a first pass, it's remarkably powerful.

**The workflow:**
1. Export CSV from your broker (2 minutes)
2. Upload to ChatGPT for visual analysis (5 minutes)
3. Use follow-up prompts for risk, fees, and rebalancing (10 minutes)
4. Verify critical numbers against primary sources (5 minutes)

Twenty minutes for a comprehensive portfolio checkup. Not bad for free (well, $20/month).

---

## Try It: Free Portfolio Analyzer

Before uploading to ChatGPT or Claude, get an instant preview with our free browser-based tool below. It analyzes your CSV locally — your data never leaves your device — and generates pre-filled AI prompts you can copy straight into your chatbot of choice.

**Related:** If you're using AI for [stock research](/chatgpt-stock-research/), check out our guide on [AI vs. traditional stock screeners](/ai-vs-traditional-stock-screeners/) and how to use [AI for earnings call analysis](/ai-earnings-call-analysis/).

---

*Disclaimer: This article is for informational and educational purposes only. Nothing here constitutes financial advice. Past performance doesn't predict future results. Always do your own research and consider consulting a qualified financial advisor before making investment decisions.*
