// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import { staticLandingPages } from './scripts/static-landing-pages.mjs';

const site = 'https://youssef.tn';
const groupedStaticPages = staticLandingPages({
  sourceDir: new URL('./public/redicrects/', import.meta.url),
  siteUrl: site,
});

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({ customPages: groupedStaticPages.sitemapPages }),
    groupedStaticPages.integration,
  ],
  redirects: {
    '/services': '/projects',
  },
  image: {
    domains: ['youssef.tn', 'dhibi.tn'],
  },
});
