import { visit } from 'unist-util-visit';

import type { Element, Root, Text } from 'hast';

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
  return function transformer(tree: Root) {
    visit(tree, (node, index, parent) => {
      if (typeof index !== 'number' || !parent || node.type !== 'root') {
        return;
      }

      parent.children.splice(index, 1, ...node.children);

      return index;
    });

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') {
        return;
      }

      visit(node, 'text', (textNode: Text) => {
        textNode.value = preserveWhitespace(escapeSvelteUnsafeCharacters(textNode.value));
      });
    });
  };
}
