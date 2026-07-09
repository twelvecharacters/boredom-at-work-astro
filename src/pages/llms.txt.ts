import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';
import { CATEGORY_ORDER, categorize } from '../utils/taxonomy';

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'AI & Learning': 'Guides for learning AI skills and earning certifications during work hours.',
  '3D Printing': 'Beginner guides for getting started with 3D printing.',
  'Photography': 'Camera guides and photography tips for beginners.',
  'Japan Shopping': 'Guides for importing products from Japan.',
  'AI Travel Planning': 'Guides for planning trips with AI tools like ChatGPT, Claude, and Perplexity.',
  'Home Office / Desk Setup': 'Guides for building a productive home office workspace.',
  'Finance / Investing': 'Tools and learning resources for beginner investors. Educational content, not financial advice.',
  'Tech & Gadgets': 'Reviews and comparisons of consumer technology.',
};

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const grouped: Record<string, { title: string; slug: string; description: string }[]> = {};

  for (const post of posts) {
    const category = categorize(post.data.tags);
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({
      title: post.data.title,
      slug: getPostSlug(post),
      description: post.data.description,
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
      output += `- [${article.title}](${SITE.url}/${article.slug}/): ${article.description}\n`;
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
