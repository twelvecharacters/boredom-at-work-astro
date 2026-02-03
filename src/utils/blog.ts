import { getCollection } from 'astro:content';

/**
 * Fetches all blog posts that are not drafts and have a publishDate in the past or present.
 * Posts are sorted by publishDate descending (newest first) by default.
 */
export async function getPublishedPosts() {
  const isDev = import.meta.env.DEV;
  // Get today's date at midnight UTC for consistent comparison
  const today = new Date();
  today.setUTCHours(23, 59, 59, 999); // End of today UTC = include all of today
  
  const allPosts = await getCollection('blog', ({ data }) => {
    const isNotDraft = !data.draft;
    const isPublished = isDev || data.publishDate <= today;
    return isNotDraft && isPublished;
  });

  return allPosts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/**
 * Gets the URL slug for a post.
 * Uses the custom slug field if available, otherwise extracts filename from post.id
 */
export function getPostSlug(post: any): string {
  if (post.data.slug) {
    return post.data.slug;
  }
  // Extract filename from path (e.g., "2025/01/article.md" -> "article")
  const filename = post.id.split('/').pop() || post.id;
  return filename.replace(/\.md$/, '');
}


/**
 * Converts a tag name into a URL-friendly slug.
 */
export function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/&/g, '') // Remove ampersands
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .replace(/^-+|-+$/g, ''); // Trim hyphens from ends
}
