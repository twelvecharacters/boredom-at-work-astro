import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';
import { CATEGORY_ORDER, categorize } from '../utils/taxonomy';

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'AI & Learning': 'Guides for learning AI skills and earning certifications during work hours. AI literacy is the most in-demand professional skill of 2026.',
  '3D Printing': 'Complete guides for getting started with 3D printing, choosing printers, slicing, filaments, and troubleshooting.',
  'Photography': 'Camera guides and photography tips for beginners exploring photography as a creative outlet.',
  'Japan Shopping': 'Guides for importing unique products from Japan using proxy services like Buyee and Sendico.',
  'AI Travel Planning': 'Guides for planning trips with AI tools like ChatGPT, Claude, Gemini, and Perplexity. Includes real trip case studies.',
  'Home Office / Desk Setup': 'Guides for building a productive home office workspace, desks, chairs, monitors, peripherals, and ergonomics.',
  'Finance / Investing': 'Tools and learning resources for beginner investors. Educational content, not financial advice.',
  'Tech & Gadgets': 'Reviews and comparisons of consumer technology, e-readers, earbuds, keyboards, smartphones, and software.',
};

function estimateReadingTime(body: string): number {
  const words = body.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const grouped: Record<string, {
    title: string;
    slug: string;
    description: string;
    readingTime: number;
    faq?: { question: string; answer: string }[];
    tldr?: string;
    tags: string[];
  }[]> = {};

  for (const post of posts) {
    const category = categorize(post.data.tags);
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({
      title: post.data.title,
      slug: getPostSlug(post),
      description: post.data.description,
      readingTime: estimateReadingTime(post.body || ''),
      faq: post.data.faq,
      tldr: post.data.tldr,
      tags: post.data.tags,
    });
  }

  // Sort alphabetically
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }

  let output = `# ${SITE.title}\n\n`;
  output += `> A blog for office workers who want to learn productively during work hours. Topics include AI skills, 3D printing, photography, importing from Japan, and tech gadgets. The site helps readers turn downtime into career advancement.\n\n`;
  output += `## About This Site\n\n`;
  output += `**Website:** ${SITE.url}\n`;
  output += `**Author:** ${SITE.author}\n`;
  output += `**Language:** English\n`;
  output += `**Target Audience:** Office workers, remote employees, and anyone looking to make productive use of their work downtime\n\n`;
  output += `### Mission\n\n`;
  output += `${SITE.title} exists because millions of people spend hours each day in meetings that could have been emails, waiting for responses, or simply having slow days. Instead of mindless scrolling, this site provides practical guides to:\n\n`;
  output += `- Learn AI skills that boost careers\n`;
  output += `- Research tech purchases during lunch breaks\n`;
  output += `- Explore new hobbies like 3D printing and photography\n`;
  output += `- Discover unique products from Japan\n\n`;
  output += `### Content Philosophy\n\n`;
  output += `All articles are:\n`;
  output += `- Designed for short reading sessions (10-20 minutes)\n`;
  output += `- Practical and actionable, not theoretical\n`;
  output += `- Written for beginners who are new to each topic\n`;
  output += `- Updated regularly with current information (2026)\n\n`;
  output += `---\n\n`;

  for (const category of CATEGORY_ORDER) {
    const articles = grouped[category];
    if (!articles || articles.length === 0) continue;

    output += `## Category: ${category}\n\n`;
    output += `${CATEGORY_DESCRIPTIONS[category]}\n\n`;

    for (const article of articles) {
      output += `### ${article.title}\n`;
      output += `**URL:** ${SITE.url}/${article.slug}/\n`;
      output += `**Reading Time:** ${article.readingTime} minutes\n\n`;
      output += `${article.description}\n\n`;

      if (article.tldr) {
        output += `**TL;DR:** ${article.tldr}\n\n`;
      }

      if (article.faq && article.faq.length > 0) {
        output += `**FAQ:**\n`;
        for (const faq of article.faq) {
          output += `- **${faq.question}** ${faq.answer}\n`;
        }
        output += '\n';
      }

      output += `---\n\n`;
    }
  }

  output += `## Contact\n\n`;
  output += `- Website: ${SITE.url}\n`;
  output += `- Contact form: ${SITE.url}/contact/\n`;

  return new Response(output, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
