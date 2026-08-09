import path from 'node:path';

import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import { createHighlighterCoreSync, createOnigurumaEngine } from 'shiki';

import { articleImages } from './plugins/copy-article-images';
import { remarkLinkCard } from './plugins/remark-link-card';
import { rehypeEscapeCodeBlocks } from './plugins/rehype-escape-code-blocks';
import { rehypeImageDimensions } from './plugins/rehype-image-dimensions';

import type { MdsvexOptions } from 'mdsvex';
import type { RehypeShikiCoreOptions } from '@shikijs/rehype/core';

const SHIKI_THEME = 'one-light';
const SHIKI_LANGUAGES = [
  'html',
  'css',
  'javascript',
  'typescript',
  'jsx',
  'tsx',
  'svelte',
  'go',
  'scala',
  'mermaid',
  'shell',
  'bash',
  'json',
  'yaml',
  'markdown',
  'sql',
  'text',
  'graphql',
] as const;

const shikiEngine = await createOnigurumaEngine(import('shiki/wasm'));
const shikiLangs = await Promise.all(
  SHIKI_LANGUAGES.filter((language) => language !== 'text').map(
    async (language) => (await import(`shiki/langs/${language}.mjs`)).default,
  ),
);
const shikiTheme = (await import(`shiki/themes/${SHIKI_THEME}.mjs`)).default;

const highlighter = createHighlighterCoreSync({
  engine: shikiEngine,
  langs: shikiLangs,
  themes: [shikiTheme],
});

function rehypeShiki(options: RehypeShikiCoreOptions) {
  return rehypeShikiFromHighlighter(highlighter, options);
}

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: {
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.md')
            ? undefined
            : true,
      },
      adapter: adapter(),
      dynamicCompileOptions: ({ filename }) =>
        filename.endsWith('.md') ? { preserveWhitespace: true } : undefined,
      extensions: ['.svelte', '.md'],
      preprocess: [
        mdsvex({
          extension: '.md',
          layout: {
            _: path.resolve(import.meta.dirname, 'src/lib/mdsvex/article-layout.svelte'),
          },
          highlight: { highlighter: false },
          remarkPlugins: [remarkGfm, remarkLinkCard],
          rehypePlugins: [
            rehypeImageDimensions,
            [
              rehypeShiki,
              {
                theme: SHIKI_THEME,
                transformers: [
                  transformerNotationDiff(),
                  transformerNotationHighlight(),
                  transformerNotationFocus(),
                  transformerNotationErrorLevel(),
                ],
              },
            ],
            rehypeEscapeCodeBlocks,
          ],
        } as unknown as MdsvexOptions),
      ],
    }),
    articleImages(),
  ],
  server: {
    fs: {
      allow: ['articles'],
    },
  },
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'client',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium', headless: true }],
          },
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**'],
        },
      },

      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
        },
      },
    ],
  },
});
