import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const recentPosts = posts.slice(0, 20);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: recentPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/${getPostSlug(post)}/`,
    })),
  });
}
