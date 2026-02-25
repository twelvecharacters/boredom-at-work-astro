import type { APIRoute } from 'astro';
import { getPublishedPosts, getPostSlug } from '../utils/blog';
import { SITE } from '../config';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const videoPosts = posts.filter(p => p.data.video?.youtubeId);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  for (const post of videoPosts) {
    const slug = getPostSlug(post);
    const pageUrl = `${SITE.url}/${slug}/`;
    const video = post.data.video;
    const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
    const playerUrl = `https://www.youtube.com/embed/${video.youtubeId}`;

    xml += '  <url>\n';
    xml += `    <loc>${pageUrl}</loc>\n`;
    xml += '    <video:video>\n';
    xml += `      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>\n`;
    xml += `      <video:title>${escapeXml(video.title)}</video:title>\n`;
    xml += `      <video:description>${escapeXml(video.description)}</video:description>\n`;
    xml += `      <video:player_loc>${playerUrl}</video:player_loc>\n`;
    if (video.duration) {
      xml += `      <video:duration>${isoDurationToSeconds(video.duration)}</video:duration>\n`;
    }
    xml += `      <video:publication_date>${post.data.publishDate.toISOString()}</video:publication_date>\n`;
    xml += '    </video:video>\n';
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

function isoDurationToSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (parseInt(match[1] || '0') * 3600) + (parseInt(match[2] || '0') * 60) + parseInt(match[3] || '0');
}
