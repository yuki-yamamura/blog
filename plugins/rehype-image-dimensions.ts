import { readFileSync } from 'node:fs';
import path from 'node:path';

import { imageSize } from 'image-size';
import { visit } from 'unist-util-visit';

import type { Element, Root } from 'hast';
import type { VFile } from 'vfile';

declare module 'vfile' {
  interface VFile {
    filename?: string;
  }
}

/** Matches `--width-article`, the widest an image can be laid out in an article. */
const MAX_DISPLAY_WIDTH = 768;

function isRelativeSrc(src: string): boolean {
  return src.startsWith('./') || src.startsWith('../');
}

/**
 * Scales the intrinsic size down to the size the image is laid out at.
 * The attributes drive the image transformation, so the intrinsic size of a photo would make us
 * ask the CDN for an image far larger than any display needs. Images are never scaled up.
 */
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

      node.properties.src = `/articles/${slug}/${filename}`;
      node.properties.width = width;
      node.properties.height = height;
    });
  };
}
