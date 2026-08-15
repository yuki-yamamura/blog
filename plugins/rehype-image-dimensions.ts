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
    });
  };
}

type AllOrNone<T extends Record<string, unknown>> =
  | {
      [K in keyof T]: T[K];
    }
  | {
      [K in keyof T]?: never;
    };

type Size = {
  height: number;
  width: number;
};

type Props = AllOrNone<Size>;

const all: Props = {
  height: 200,
  width: 200,
};

const none: Props = {};

const either1: Props = {
  height: 200,
};

const either2: Props = {
  width: 200,
};
