export interface LeaderboardWidgetConfig {
  category: 'frontier' | 'speed' | 'value' | 'open' | 'coding' | 'all';
  title?: string;
}

/**
 * Determines whether an article should display the dynamic AI Leaderboard widget
 * and which performance category best matches its topical focus.
 */
// 4.10.2026, Mehdis Entscheidung: kein automatisches Widget in Artikeln. Die
// Erkennung unten bleibt erhalten, greift aber nur, wenn AUTO_INJECT wieder auf
// true steht. Ein Artikel kann das Widget weiterhin explizit per Frontmatter
// `leaderboardWidget: frontier|speed|value|open|coding|all` anfordern.
const AUTO_INJECT = false;

export function getLeaderboardWidgetConfig(
  slug: string,
  tags: string[] = [],
  title: string = '',
  override?: string | boolean
): LeaderboardWidgetConfig | null {
  // Respect explicit frontmatter disable
  if (override === false || override === 'none') {
    return null;
  }

  // Respect explicit frontmatter category selection
  if (
    typeof override === 'string' &&
    ['frontier', 'speed', 'value', 'open', 'coding', 'all'].includes(override)
  ) {
    return {
      category: override as LeaderboardWidgetConfig['category']
    };
  }

  if (!AUTO_INJECT) {
    return null;
  }

  const lowerSlug = slug.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const tagList = tags.map(t => t.toLowerCase());

  // Determine if article covers artificial intelligence
  const hasAiTag = tagList.some(t => 
    t === 'ai' || t === 'artificial intelligence' || t === 'chatgpt' || 
    t === 'google gemini' || t === 'ai tools' || t === 'ai travel' || 
    t === 'machine learning' || t === 'llm'
  );
  
  const hasAiSlug = /(^|-)ai(-|$)|chatgpt|claude|gemini|antigravity|llm/.test(lowerSlug);
  
  if (!hasAiTag && !hasAiSlug) {
    return null;
  }

  // 1. Coding & Developer Agents
  if (
    lowerSlug.includes('coding') || lowerSlug.includes('cursor') || 
    lowerSlug.includes('opencode') || lowerSlug.includes('antigravity') || 
    lowerSlug.includes('programming') || tagList.includes('coding')
  ) {
    return { category: 'coding', title: 'Top AI Models for Coding & Developer Agents' };
  }

  // 2. Open Weights & Geopolitics
  if (
    lowerSlug.includes('losing-ai-lead') || lowerSlug.includes('open-weights') || 
    lowerSlug.includes('open-source') || lowerTitle.includes('open weights')
  ) {
    return { category: 'open', title: 'Leading Open Weights AI Models' };
  }

  // 3. Ultra Speed & Real-time Throughput
  if (
    lowerSlug.includes('gemini-3-8') || lowerSlug.includes('speed') || 
    lowerSlug.includes('latency') || lowerSlug.includes('voice')
  ) {
    return { category: 'speed', title: 'Fastest Real-Time AI Models by Throughput' };
  }

  // 4. Productivity, Office Automation, Business & Career Tools
  if (
    lowerSlug.includes('automation') || lowerSlug.includes('office') || 
    lowerSlug.includes('job-seekers') || lowerSlug.includes('small-business') || 
    lowerSlug.includes('note-taking') || lowerSlug.includes('shopping') || 
    lowerSlug.includes('interview') || lowerSlug.includes('assistant') ||
    tagList.includes('career') || lowerSlug.includes('productivity')
  ) {
    return { category: 'value', title: 'Cost-Effective AI Models for Workflows & Automation' };
  }

  // 5. Finance & Investment Reasoning
  if (
    lowerSlug.includes('portfolio') || lowerSlug.includes('earnings') || 
    lowerSlug.includes('stock') || lowerSlug.includes('finance')
  ) {
    return { category: 'frontier', title: 'Top Frontier Models for Financial & Data Reasoning' };
  }

  // 6. Frontier Comparisons, Benchmarks & Safety
  if (
    lowerSlug.includes('chatgpt-vs-claude') || lowerSlug.includes('dangerous') || 
    lowerSlug.includes('security') || lowerSlug.includes('slop') ||
    lowerSlug.includes('search') || lowerSlug.includes('ethics')
  ) {
    return { category: 'frontier', title: 'Current Frontier AI Standings & Benchmarks' };
  }

  // Default for general AI articles (Prompting, Lifestyle, Creative, Travel)
  return { category: 'all', title: 'Top Ranked Frontier AI Models' };
}
