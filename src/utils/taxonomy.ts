// Single source of truth for the llms.txt category taxonomy (tag -> category).
// Category descriptions differ between llms.txt and llms-full.txt, so those
// stay local to each file; the ordering and classification live here.

export const CATEGORY_ORDER = [
  'AI & Learning',
  '3D Printing',
  'Photography',
  'Japan Shopping',
  'AI Travel Planning',
  'Home Office / Desk Setup',
  'Finance / Investing',
  'Tech & Gadgets',
];

export function categorize(tags: string[]): string {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));
  const has = (t: string) => tagSet.has(t.toLowerCase());
  const hasAny = (...ts: string[]) => ts.some((t) => has(t));

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
