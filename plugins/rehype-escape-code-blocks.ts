import { visit } from 'unist-util-visit';

import type { Root } from 'hast';

function escapeSvelteUnsafeCharacters(value: string): string {
  return value
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('{', '&#123;')
    .replaceAll('}', '&#125;');
}

function preserveWhitespace(value: string): string {
  return value.replaceAll(' ', ' ');
}

export function rehypeEscapeCodeBlocks() {
  return function (tree: Root) {
    visit(tree, (node, index, parent) => {
      if (index === undefined || !parent || node.type !== 'root') {
        return;
      }

      parent.children.splice(index, 1, ...node.children);

      return index;
    });

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'pre') {
        return;
      }

      visit(node, 'text', (textNode) => {
        textNode.value = preserveWhitespace(escapeSvelteUnsafeCharacters(textNode.value));
      });
    });
  };
}
