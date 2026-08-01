import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import type { Plugin } from 'vite';

const ARTICLES_DIRECTORY_NAME = 'articles';

function copyArticleContentImages(articleDirectory: string, slug: string): void {
  const contentImages = readdirSync(articleDirectory).filter((filename) => {
    const extension = path.extname(filename).slice(1).toLocaleLowerCase();
    const imageExtensions = ['png', 'jpg', 'jpeg', 'svg'];

    return imageExtensions.includes(extension) && filename !== 'thumbnail.svg';
  });
  if (contentImages.length === 0) {
    return;
  }

  const destinationDirectory = path.resolve('static', 'articles', slug);
  mkdirSync(destinationDirectory, { recursive: true });

  for (const imageFilename of contentImages) {
    copyFileSync(
      path.join(articleDirectory, imageFilename),
      path.join(destinationDirectory, imageFilename),
    );
  }
}

export function articleImages(): Plugin {
  return {
    buildStart() {
      const articlesDirectory = path.resolve(ARTICLES_DIRECTORY_NAME);
      if (!existsSync(articlesDirectory)) {
        return;
      }

      for (const slug of readdirSync(articlesDirectory)) {
        const articleDirectory = path.join(articlesDirectory, slug);
        if (!statSync(articleDirectory).isDirectory()) {
          continue;
        }

        copyArticleContentImages(articleDirectory, slug);
      }
    },
    name: 'article-images',
  };
}
