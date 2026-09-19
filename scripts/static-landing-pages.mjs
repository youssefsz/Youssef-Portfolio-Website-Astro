// @ts-check

import { cp, rm } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { basename, extname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOCKED_EXTENSIONS = new Set(['.php', '.sql']);
const IGNORED_OUTPUT_FILES = new Set(['.DS_Store', '.htaccess']);
const IGNORED_SITEMAP_FILES = new Set([
  '403.html',
  '404.html',
  '500.html',
]);

/**
 * Return true when a grouped site contains server-side code or database dumps.
 * Those directories must not be published by the static Astro/Nginx image.
 *
 * @param {string} directory
 */
function containsServerFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (containsServerFiles(entryPath)) return true;
      continue;
    }

    const lowerName = entry.name.toLowerCase();
    if (
      BLOCKED_EXTENSIONS.has(extname(lowerName)) ||
      lowerName === '.env' ||
      lowerName.startsWith('.env.')
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Collect public HTML URLs from one static site.
 *
 * @param {string} directory
 * @param {string} relativeDirectory
 * @param {string} siteUrl
 * @param {Set<string>} urls
 */
function collectHtmlUrls(directory, relativeDirectory, siteUrl, urls) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    const relativePath = relativeDirectory
      ? join(relativeDirectory, entry.name)
      : entry.name;

    if (entry.isDirectory()) {
      collectHtmlUrls(entryPath, relativePath, siteUrl, urls);
      continue;
    }

    const lowerName = entry.name.toLowerCase();
    if (
      !['.html', '.htm'].includes(extname(lowerName)) ||
      IGNORED_SITEMAP_FILES.has(lowerName)
    ) {
      continue;
    }

    const normalizedPath = relativePath.split(sep).join('/');
    const publicPath = /^index\.html?$/i.test(entry.name)
      ? normalizedPath.replace(/index\.html?$/i, '')
      : normalizedPath;

    urls.add(new URL(publicPath, `${siteUrl}/`).href);
  }
}

/**
 * Publish the children of a grouped public directory at the build root.
 *
 * Source: public/redicrects/DocScanner/index.html
 * Output: dist/DocScanner/index.html
 * URL:    https://youssef.tn/DocScanner/
 *
 * @param {{ sourceDir: URL, siteUrl: string }} options
 */
export function staticLandingPages(options) {
  const sourceRoot = fileURLToPath(options.sourceDir);
  const siteUrl = options.siteUrl.replace(/\/$/, '');
  /** @type {string[]} */
  const publishedDirectories = [];
  /** @type {string[]} */
  const skippedDirectories = [];
  const urls = new Set();

  if (existsSync(sourceRoot)) {
    for (const entry of readdirSync(sourceRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;

      const entryPath = join(sourceRoot, entry.name);
      if (containsServerFiles(entryPath)) {
        skippedDirectories.push(entry.name);
        continue;
      }

      publishedDirectories.push(entry.name);
      collectHtmlUrls(entryPath, entry.name, siteUrl, urls);
    }
  }

  publishedDirectories.sort();
  skippedDirectories.sort();

  /** @type {import('astro').AstroIntegration} */
  const integration = {
    name: 'static-landing-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outputRoot = fileURLToPath(dir);

        for (const directory of publishedDirectories) {
          const destination = join(outputRoot, directory);
          if (existsSync(destination)) {
            throw new Error(
              `Static landing page "${directory}" conflicts with an existing Astro output path.`,
            );
          }

          await cp(join(sourceRoot, directory), destination, {
            recursive: true,
            filter: (source) => !IGNORED_OUTPUT_FILES.has(basename(source)),
          });
        }

        await rm(join(outputRoot, 'redicrects'), {
          recursive: true,
          force: true,
        });

        logger.info(
          `Published ${publishedDirectories.length} grouped static directories at the site root.`,
        );

        if (skippedDirectories.length > 0) {
          logger.info(
            `Skipped server-side directories: ${skippedDirectories.join(', ')}.`,
          );
        }
      },
    },
  };

  return {
    integration,
    sitemapPages: [...urls].sort(),
    publishedDirectories,
    skippedDirectories,
  };
}
