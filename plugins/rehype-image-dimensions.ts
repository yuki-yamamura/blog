import { readFileSync } from 'node:fs';
import path from 'node:path';

import { imageSize } from 'image-size';
import { visit } from 'unist-util-visit';

import { ARTICLES_DIRECTORY_NAME } from './constants';

import type { Element, Root } from 'hast';
import type { VFile } from 'vfile';

declare module 'vfile' {
  interface VFile {
    filename?: string;
  }
}

const MAX_DISPLAY_WIDTH = 768;

function isRelativeSrc(src: string): boolean {
  return src.startsWith('./') || src.startsWith('../');
}

function scaleToDisplaySize(width: number, height: number): { height: number; width: number } {
  if (width <= MAX_DISPLAY_WIDTH) {
    return { height, width };
  }

  return {
    height: Math.round((height * MAX_DISPLAY_WIDTH) / width),
    width: MAX_DISPLAY_WIDTH,
  };
}

export function rehypeImageDimensions() {
  return function (tree: Root, file: VFile) {
    if (typeof file.filename !== 'string') {
      return;
    }
    const srcDirectory = path.dirname(file.filename);
    let imageIndex = 0;

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') {
        return;
      }
      const { src } = node.properties;
      if (!src || !isRelativeSrc(src)) {
        return;
      }

      const absolutePath = path.resolve(srcDirectory, src);
      const buffer = readFileSync(absolutePath);
      const intrinsicSize = imageSize(new Uint8Array(buffer));
      const { height, width } = scaleToDisplaySize(intrinsicSize.width, intrinsicSize.height);

      const slug = path.basename(srcDirectory);
      const filename = path.basename(src);

      node.properties.src = `/${path.join(ARTICLES_DIRECTORY_NAME, slug, filename)}`;
      node.properties.width = width;
      node.properties.height = height;
      // Article photos keep their own aspect ratio, so there is nothing to crop. `scale-down` also
      // caps the requested size at the intrinsic size, which stops the 2x candidate from asking
      // Cloudflare to upscale sources that are already smaller than the display box.
      node.properties.fit = 'scale-down';
      // Only the first image can be above the fold regardless of how the article is written.
      node.properties.loading = imageIndex === 0 ? 'eager' : 'lazy';
      node.properties.decoding = 'async';

      imageIndex += 1;
    });
  };
}
