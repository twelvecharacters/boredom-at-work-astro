---
title: "Antigravity CLI Guide: The Ultimate AI Agent for Your Terminal"
slug: "antigravity-cli-guide"
description: "Google's Gemini CLI has been deprecated and replaced by Antigravity CLI. Here is everything you need to know about setting up and mastering the new terminal AI."
publishDate: 2026-08-03
author: "Mehdi"
image: "./03-antigravity-cli-guide.png"
imageAlt: "A programmer using the Antigravity CLI in a futuristic terminal interface."
tags: ["AI", "Gemini", "Coding", "Productivity", "Software"]
draft: false
faq:
 - question: "What happened to Gemini CLI?"
 answer: "In August 2026, Google officially deprecated the standalone Gemini CLI and merged its capabilities into Antigravity CLI. Antigravity CLI is now the flagship terminal agent for interacting with Gemini models, offering deeper file system integration and more robust agentic capabilities."
 - question: "Is Antigravity CLI backward compatible?"
 answer: "Yes, mostly. Your old `.geminiignore` files are automatically respected, though it is recommended to rename them to `.antigravityignore`. Most of the basic commands operate similarly, but Antigravity CLI requires a newer Node.js runtime and an updated API key format."
 - question: "How does Antigravity CLI differ from VS Code integration?"
 answer: "Antigravity CLI is environment-agnostic. While VS Code has the Antigravity extension, the CLI allows you to run agentic workflows in any terminal, integrate AI into your CI/CD bash scripts, and interact with your server logs natively."
---

For the last year, the [Gemini CLI](/gemini-cli-guide/) has been a staple in my daily workflow. Pumping server logs into the command line and having an AI instantly diagnose the failure felt like magic. However, as AI models transitioned from simple conversational chatbots into autonomous agents, the original architecture of the Gemini CLI began to show its age. It was great at answering questions, but it struggled to execute complex, multi-step actions across a massive codebase.

Enter **Antigravity CLI**. 

As of August 2026, Google has deprecated the Gemini CLI in favor of the much more robust Antigravity CLI. This isn't just a rebrand; it is a fundamental shift in how the AI interacts with your local environment. Rather than just reading your files, Antigravity acts as a true agent, it can read, plan, execute, run tests, and iterate without constant hand-holding.

If you are transitioning from the old tool, or if you are completely new to terminal-based AI, this comprehensive guide will walk you through everything you need to know to master the Antigravity CLI.

## The Paradigm Shift: From Chatbot to Agent

The biggest difference you will notice with Antigravity CLI is its autonomy. 

With the old Gemini CLI, the workflow was strictly request-and-response. You asked a question, it gave you a snippet of code, and you manually pasted that code into your editor. 

Antigravity CLI introduces **Agentic Mode**. When you give it a complex prompt, for example, *"Refactor the authentication middleware to use JWT instead of sessions, and update all the tests to match"*, it doesn't just print a wall of code. 

Instead, it:
1. **Scans** your project to map out dependencies.
2. **Formulates an Implementation Plan** and presents it to you in the terminal.
3. **Waits for your approval** (or feedback).
4. **Executes the changes** across multiple files simultaneously.
5. **Runs your test suite** to verify the changes didn't break anything.

This shifts your role from a "typist" to a "reviewer." You spend less time writing boilerplate and more time evaluating the architectural decisions the AI is making.

## Installation and Initial Setup

Getting started with Antigravity CLI requires a slightly different setup than its predecessor.

### Prerequisites
- Node.js version 22 or higher (Antigravity leverages new filesystem APIs introduced in Node 22).
- An active Google AI Studio or Google Cloud API key with access to the Gemini 3.5 model family.

### Installing the CLI
You can install the package globally using your preferred package manager. We recommend `pnpm` for speed and efficiency:

```bash
pnpm add -g @google/antigravity-cli
```

Alternatively, if you are on a Mac and prefer using Homebrew:

```bash
brew install antigravity-cli
```

### Authentication
Once installed, you need to authenticate. Run the following command in your terminal:

```bash
antigravity auth
```

This will open a browser window for OAuth authentication. If you are working on a headless server (like an SSH session), you can paste your API key directly:

```bash
antigravity auth --key YOUR_API_KEY_HERE
```

## Configuring Your Workspace

Antigravity CLI works best when it understands the boundaries of your project. If you give it too much context, you waste tokens and slow down responses. If you give it too little, it hallucinates.

### The `.antigravityignore` File
Just like Git, Antigravity needs to know what files to ignore. By default, it will respect your `.gitignore` file. However, you should create an `.antigravityignore` file in the root of your project to exclude files that don't add value to the AI's context.

Common things to ignore:
- Large media assets (images, videos, fonts)
- Compiled binaries and build outputs (`dist/`, `build/`)
- Minified vendor files or massive JSON datasets

### Workspace Rules
You can also define custom rules for how the agent should behave in a specific repository. Create a file named `AGENTS.md` or `ANTIGRAVITY.md` in your project root. 

In this file, you can write plain English instructions that the CLI will always read before executing a command. For example:

```markdown
# Antigravity Rules for This Project

1. Always use TypeScript, do not write vanilla JavaScript.
2. We use Tailwind CSS for styling. Never write custom CSS classes.
3. All new functions must have JSDoc comments.
4. Before modifying the database schema, explicitly ask for permission.
```

The CLI parses these rules automatically. This is incredibly powerful for maintaining team coding standards without having to repeat yourself in every single prompt.

## Core Workflows and Commands

Let's dive into the daily commands that will genuinely save you hours of work.

### 1. The Interactive REPL
If you just want to ask a quick question, type `antigravity` to enter the interactive chat. 

```bash
$ antigravity
🚀 Antigravity CLI initialized.
Workspace: /Users/mehdi/dev/boredom-at-work-astro
Model: gemini-3.5-pro

> How does the routing work in this Astro project?
```

The CLI will instantly index the `src/pages` directory and explain the routing structure. This replaces the need to alt-tab to a browser-based AI and manually explain your project.

### 2. Task Execution (The Agentic Magic)
The real power of Antigravity is running single-shot tasks. You use the `do` command followed by your instructions.

```bash
antigravity do "Create a new React component for a Newsletter Signup form. Use Tailwind for styling and place it in src/components. Make sure it has basic email validation."
```

The agent will spring into action. You will see a live log in your terminal as it thinks:
- *Analyzing src/components directory...*
- *Drafting NewsletterSignup.tsx...*
- *Writing file...*
- *Task completed.*

### 3. Debugging and Log Analysis
When a build fails, you don't need to manually read the stack trace. You can pipe the error directly into Antigravity.

```bash
npm run build 2>&1 | antigravity debug
```

The `debug` command tells the CLI to look at the piped error, cross-reference it with the local files mentioned in the stack trace, and propose a fix. If it finds a simple typo, it will ask: *"Would you like me to fix this typo in utils.js? (y/N)"*

### 4. Mass Refactoring
Refactoring across multiple files used to be a nightmare of Regex search-and-replace. Now, it is a single command.

```bash
antigravity do "Rename all instances of 'userId' to 'customerID' across the entire src/ folder, and update the associated database queries."
```

Antigravity will create a comprehensive plan, list the files it intends to modify, and wait for your approval before making the changes.

## Advanced Techniques: Skills and Sub-Agents

Antigravity CLI introduces the concept of "Customizations" and "Skills." If you have complex, repeatable workflows, you don't need to type out massive prompts every time.

You can create a `.agents/skills/` directory in your project. Inside, you define specific tasks. 

For example, you could create a `deploy-prep.md` skill that instructs the agent to:
1. Run the test suite.
2. Update the CHANGELOG.md based on recent git commits.
3. Bump the version number in `package.json`.
4. Run the linter and fix any basic formatting errors.

You can then trigger this entire sequence by running:
```bash
antigravity run-skill deploy-prep
```

This transforms Antigravity from a generic coding assistant into a custom DevOps tool tailored precisely to your team's workflow.

## The Cost of Autonomy

It is important to discuss the elephant in the room: token usage. 

Because Antigravity CLI is constantly analyzing your local files to maintain context, it burns through tokens much faster than a standard chat interface. A single `"Refactor this component"` command might result in the CLI sending 50,000 tokens of context to the Gemini model to ensure it understands the surrounding architecture.

If you are on a paid API plan, this can add up quickly. 

To mitigate costs:
1. **Be aggressive with `.antigravityignore`.** Do not let the agent read files it doesn't need.
2. **Scope your commands.** Instead of saying `"Fix the bug in the project"`, say `"Fix the layout bug in src/components/Header.tsx"`. If you specify the file, the agent won't waste tokens searching the entire repository.
3. **Use the right model.** Antigravity defaults to `gemini-3.5-pro` for complex tasks. For simple tasks (like writing documentation or basic regex), you can force it to use the cheaper, faster model: `antigravity do --model gemini-3.5-flash "add comments to this file"`.

## Conclusion: The New Baseline

The deprecation of the Gemini CLI is not a loss; it is an evolution. Antigravity CLI represents the new baseline for what we should expect from developer tools. It bridges the gap between thought and execution, allowing you to operate at an architectural level while the AI handles the syntax.

It is not perfect. It will still occasionally hallucinate, and you absolutely must review the code it generates before committing it to production. But the speed at which you can build, refactor, and debug is unprecedented.

If you haven't installed it yet, open your terminal and run `pnpm add -g @google/antigravity-cli`. You will wonder how you ever coded without it.

---

## Related Reading

- [VS Code vs. Antigravity: The Agentic Workspace in 2026](/vs-code-vs-antigravity/)
- [Antigravity 2 with Gemini 3.5: The AI Coding Assistant](/antigravity-2-gemini-35/)
- [Best AI Tools for Office Work (2026 Edition)](/best-ai-tools-office-work/)
- [How to Use AI at Work Safely](/how-to-use-ai-at-work-safely/)
- [The Threat of AI for Jobs: Separating Myth from Reality](/ai-threat-to-jobs/)
