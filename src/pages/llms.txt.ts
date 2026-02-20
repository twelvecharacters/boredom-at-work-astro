import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';

const CATEGORY_ORDER = [
  'AI & Learning',
  '3D Printing',
  'Photography',
  'Japan Shopping',
  'AI Travel Planning',
  'Home Office / Desk Setup',
  'Finance / Investing',
  'Tech & Gadgets',
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'AI & Learning': 'Guides for learning AI skills and earning certifications during work hours.',
  '3D Printing': 'Beginner guides for getting started with 3D printing.',
  'Photography': 'Camera guides and photography tips for beginners.',
  'Japan Shopping': 'Guides for importing products from Japan.',
  'AI Travel Planning': 'Guides for planning trips with AI tools like ChatGPT, Claude, and Perplexity.',
  'Home Office / Desk Setup': 'Guides for building a productive home office workspace.',
  'Finance / Investing': 'Tools and learning resources for beginner investors. Educational content—not financial advice.',
  'Tech & Gadgets': 'Reviews and comparisons of consumer technology.',
};

function categorize(tags: string[]): string {
  const tagSet = new Set(tags.map(t => t.toLowerCase()));
  const has = (t: string) => tagSet.has(t.toLowerCase());
  const hasAny = (...ts: string[]) => ts.some(t => has(t));

  // "Tech & Gadgets" explicit tag takes priority over generic tags like "Productivity"
  if (has('tech & gadgets')) return 'Tech & Gadgets';
  if (has('travel')) return 'AI Travel Planning';
  if (has('3d printing')) return '3D Printing';
  if (has('photography')) return 'Photography';
  if (hasAny('japan', 'japan shopping', 'import', 'proxy')) return 'Japan Shopping';
  if (hasAny('finance', 'investing', 'prediction markets', 'stocks', 'crypto', 'dividend')) return 'Finance / Investing';
  if (hasAny('office setup', 'home office', 'desk setup', 'work from home', 'ergonomics', 'wfh', 'monitors', 'webcams', 'headphones', 'noise canceling')) return 'Home Office / Desk Setup';
  if (hasAny('ai', 'chatgpt', 'claude', 'ai courses', 'ai certification', 'ai learning', 'prompt engineering', 'productivity')) return 'AI & Learning';
  return 'Tech & Gadgets';
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const grouped: Record<string, { title: string; slug: string; description: string; isHub: boolean }[]> = {};

  for (const post of posts) {
    const category = categorize(post.data.tags);
    if (!grouped[category]) grouped[category] = [];
    const isHub = post.data.tags.some((t: string) => t.toLowerCase().includes('hub page'));
    grouped[category].push({
      title: post.data.title,
      slug: getPostSlug(post),
      description: post.data.description,
      isHub,
    });
  }

  // Sort: hubs first, then alphabetically
  for (const cat of Object.keys(grouped)) {
    grouped[cat].sort((a, b) => {
      if (a.isHub && !b.isHub) return -1;
      if (!a.isHub && b.isHub) return 1;
      return a.title.localeCompare(b.title);
    });
  }

  let output = `# ${SITE.title}\n\n`;
  output += `> A blog for office workers who want to learn productively during work hours. Topics include AI skills, 3D printing, photography, importing from Japan, and tech gadgets. The site helps readers turn downtime into career advancement.\n\n`;
  output += `## About\n\n`;
  output += `${SITE.title} (${SITE.url}) provides practical guides and tutorials for people stuck in boring meetings or with downtime at the office. Instead of mindlessly scrolling, readers can learn AI skills, earn certifications, research tech purchases, or explore new hobbies.\n\n`;
  output += `Target audience: Office workers, remote employees, and anyone looking to make productive use of their work downtime.\n\n`;
  output += `## Categories\n\n`;

  for (const category of CATEGORY_ORDER) {
    const articles = grouped[category];
    if (!articles || articles.length === 0) continue;

    output += `### ${category}\n`;
    output += `${CATEGORY_DESCRIPTIONS[category]}\n\n`;

    for (const article of articles) {
      const prefix = article.isHub ? '**' : '';
      const suffix = article.isHub ? ' (Hub)**' : '';
      output += `- [${prefix}${article.title}${suffix}](${SITE.url}/${article.slug}/): ${article.description}\n`;
    }
    output += '\n';
  }

  output += `## Contact\n\n`;
  output += `- Website: ${SITE.url}\n`;
  output += `- Contact form: ${SITE.url}/contact/\n`;

  return new Response(output, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
