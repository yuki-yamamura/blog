import { visit } from 'unist-util-visit';

import type { Html, Paragraph, Parent, Root } from 'mdast';

// Generous, because the network of a build environment can be far slower than a local one.
const FETCH_TIMEOUT_MS = 15_000;
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

function extractMetaContents(html: string): Map<string, string> {
  const metaContents = new Map<string, string>();

  for (const [tag] of html.matchAll(/<meta\s[^>]*>/gi)) {
    const key = /(?:property|name)=["']([^"']+)["']/i.exec(tag)?.[1];
    const content = /content=["']([^"']*)["']/i.exec(tag)?.[1];
    if (key === undefined || content === undefined || metaContents.has(key)) {
      continue;
    }

    metaContents.set(key, content);
  }

  return metaContents;
}

function extractOgData(html: string, url: string): OgData {
  const metaContents = extractMetaContents(html);
  const titleFromTag = /<title>([^<]*)<\/title>/i.exec(html)?.[1];

  return {
    description: metaContents.get('og:description') ?? metaContents.get('description') ?? '',
    image: metaContents.get('og:image') ?? '',
    title: metaContents.get('og:title') ?? titleFromTag ?? url,
  };
}

/**
 * Falls back to a card that shows the bare URL.
 * The reason is logged because this runs at build time, where a silent failure would only show up
 * as a link card without a title on the deployed site.
 */
function createFallbackOgData(url: string, reason: string): OgData {
  console.warn(`[remark-link-card] Could not read Open Graph data of ${url}: ${reason}`);

  return { description: '', image: '', title: url };
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
      return createFallbackOgData(url, `responded with ${response.status} ${response.statusText}`);
    }
    const html = await response.text();

    return extractOgData(html, url);
  } catch (error) {
    return createFallbackOgData(
      url,
      error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    );
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
