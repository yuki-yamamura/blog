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

function getSourceFilename(file: VFile): string | undefined {
  if (typeof file.path === 'string') {
    return file.path;
  }

  return typeof file.filename === 'string' ? file.filename : undefined;
}

export function rehypeImageDimensions() {
  return function transformer(tree: Root, file: VFile) {
    const sourceFilename = getSourceFilename(file);
    const sourceDir = sourceFilename ? path.dirname(sourceFilename) : undefined;

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') {
        return;
      }
      const src = node.properties.src;
      if (typeof src !== 'string' || !isRelativeSrc(src)) {
        return;
      }

      const absolutePath = path.resolve(sourceDir ?? '', src);
      const buffer = readFileSync(absolutePath);
      const { height, width } = imageSize(new Uint8Array(buffer));

      const slug = path.basename(sourceDir ?? '');
      const filename = path.basename(src);

      node.properties.src = `/articles/${slug}/${filename}`;
      node.properties.width = width;
      node.properties.height = height;
    });
  };
}
