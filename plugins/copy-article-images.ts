import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import type { Plugin } from 'vite';

const CONTENT_IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg']);

function isContentImage(filename: string): boolean {
  const extension = path.extname(filename).slice(1).toLowerCase();

  return CONTENT_IMAGE_EXTENSIONS.has(extension) && !filename.startsWith('thumbnail.');
}

function copyArticleContentImages(articleDir: string, slug: string): void {
  const contentImages = readdirSync(articleDir).filter((filename) => isContentImage(filename));
  if (contentImages.length === 0) {
    return;
  }

  const destDir = path.resolve('static', 'articles', slug);
  mkdirSync(destDir, { recursive: true });
  for (const filename of contentImages) {
    copyFileSync(path.join(articleDir, filename), path.join(destDir, filename));
  }
}

export function copyArticleImages(): Plugin {
  return {
    buildStart() {
      const articlesDir = path.resolve('articles');
      if (!existsSync(articlesDir)) {
        return;
      }

      for (const slug of readdirSync(articlesDir)) {
        const articleDir = path.join(articlesDir, slug);
        if (statSync(articleDir).isDirectory()) {
          copyArticleContentImages(articleDir, slug);
        }
      }
    },
    name: 'copy-article-images',
  };
}
