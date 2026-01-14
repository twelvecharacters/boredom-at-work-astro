import { getCollection } from 'astro:content';

/**
 * Fetches all blog posts that are not drafts and have a publishDate in the past or present.
 * Posts are sorted by publishDate descending (newest first) by default.
 */
export async function getPublishedPosts() {
  const allPosts = await getCollection('blog', ({ data }) => {
    const isNotDraft = !data.draft;
    const isPublished = data.publishDate <= new Date();
    return isNotDraft && isPublished;
  });

  return allPosts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
