import { getCollection, type CollectionEntry } from 'astro:content';

/** Articles per page for all paginated listings (blog, tags, archive). */
export const POSTS_PER_PAGE = 12;

/**
 * Human-readable post date for listing cards: shows the updated date
 * (prefixed "Updated:") when present, otherwise the publish date.
 */
export function formatPostDate(post: CollectionEntry<'blog'>): string {
  const date = post.data.updatedDate ?? post.data.publishDate;
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return post.data.updatedDate ? `Updated: ${formatted}` : formatted;
}

/**
 * Fetches all blog posts that are not drafts and have a publishDate in the past or present.
 * Posts are sorted by publishDate descending (newest first) by default.
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
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
export function getPostSlug(post: CollectionEntry<'blog'>): string {
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
