// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://boredom-at-work.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      filter: (page) => 
        // Exclude tag pages
        !page.includes('/tags/') && 
        // Exclude paginated blog pages (keep /blog/ but not /blog/2/, /blog/3/, etc.)
        !/\/blog\/\d+\/?$/.test(page)
    })
  ],
  redirects: {
    '/learning-paths': '/',
    '/learning-paths/ai-mastery': '/',
    '/learning-paths/3d-printing-startup': '/'
  }
});