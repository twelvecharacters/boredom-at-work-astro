import rss from '@astrojs/rss';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getPublishedPosts();
  
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/${getPostSlug(post)}/`,
      content: sanitizeHtml(parser.render(post.body)),
      // Enclosure for the featured image if it exists
      enclosure: post.data.image ? {
        url: new URL(post.data.image.src, context.site).toString(),
        length: 0,
        type: 'image/webp',
      } : undefined,
    })),
    customData: `<language>en-us</language>`,
  });
}
