import { visit } from 'unist-util-visit';

import type { Html, Paragraph, Parent, Root } from 'mdast';

const FETCH_TIMEOUT_MS = 5000;
const USER_AGENT = 'blog3-link-card-bot/1.0';

type OgData = {
  description: string;
  image: string;
  title: string;
};

function escapeAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function extractMetaContent(html: string, pattern: RegExp): string | undefined {
  const match = pattern.exec(html);

  return match?.[1];
}

function extractOgData(html: string, url: string): OgData {
  const titleFromTag = extractMetaContent(html, /<title>([^<]*)<\/title>/i);
  const ogTitle = extractMetaContent(
    html,
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i,
  );
  const ogDescription = extractMetaContent(
    html,
    /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i,
  );
  const description = extractMetaContent(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
  );
  const ogImage = extractMetaContent(
    html,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i,
  );

  return {
    description: ogDescription ?? description ?? '',
    image: ogImage ?? '',
    title: ogTitle ?? titleFromTag ?? url,
  };
}

async function fetchOgData(url: string): Promise<OgData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
    if (!response.ok) {
      return { description: '', image: '', title: url };
    }
    const html = await response.text();

    return extractOgData(html, url);
  } catch {
    return { description: '', image: '', title: url };
  } finally {
    clearTimeout(timeoutId);
  }
}

function extractAutolinkUrl(node: Paragraph): string | undefined {
  if (node.children.length !== 1) {
    return undefined;
  }
  const [child] = node.children;
  if (!child || child.type !== 'link' || child.children.length !== 1) {
    return undefined;
  }
  const [text] = child.children;
  if (!text || text.type !== 'text' || text.value !== child.url) {
    return undefined;
  }
  if (!child.url.startsWith('https://')) {
    return undefined;
  }

  return child.url;
}

function createLinkCardNode(url: string, ogData: OgData): Html {
  return {
    type: 'html',
    value: `<LinkCard href="${escapeAttribute(url)}" title="${escapeAttribute(ogData.title)}" description="${escapeAttribute(ogData.description)}" image="${escapeAttribute(ogData.image)}" />`,
  };
}

function createLinkCardImportNode(): Html {
  return {
    type: 'html',
    value: "<script>\n  import LinkCard from '$lib/components/ui/LinkCard.svelte';\n</script>",
  };
}

export function remarkLinkCard() {
  return async function transformer(tree: Root) {
    const targets: { index: number; parent: Parent; url: string }[] = [];

    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      const url = extractAutolinkUrl(node);
      if (url && index !== undefined && parent) {
        targets.push({ index, parent, url });
      }
    });

    await Promise.all(
      targets.map(async ({ index, parent, url }) => {
        const ogData = await fetchOgData(url);

        parent.children[index] = createLinkCardNode(url, ogData);
      }),
    );

    if (targets.length > 0) {
      tree.children.unshift(createLinkCardImportNode());
    }
  };
}
