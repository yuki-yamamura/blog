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

function isRelativeSrc(src: string): boolean {
  return src.startsWith('./') || src.startsWith('../');
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
      const { height, width } = imageSize(new Uint8Array(buffer));

      const slug = path.basename(srcDirectory);
      const filename = path.basename(src);

      node.properties.src = `/articles/${slug}/${filename}`;
      node.properties.width = width;
      node.properties.height = height;
    });
  };
}
