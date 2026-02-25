import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  for (const post of posts) {
    if (!post.data.image) continue;
    const slug = getPostSlug(post);
    const pageUrl = `${SITE.url}/${slug}/`;
    const imageUrl = `${SITE.url}${post.data.image}`;

    xml += '  <url>\n';
    xml += `    <loc>${pageUrl}</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${imageUrl}</image:loc>\n`;
    xml += `      <image:title>${escapeXml(post.data.title)}</image:title>\n`;
    if (post.data.imageAlt) {
      xml += `      <image:caption>${escapeXml(post.data.imageAlt)}</image:caption>\n`;
    }
    xml += '    </image:image>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
