import { toString } from 'mdast-util-to-string';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { Temporal } from 'temporal-polyfill';
import { unified } from 'unified';

import { createArticle, filterArticleMetadataListByPage } from '$lib/models/article';
import { err, ok } from '$lib/utils/result';

import { mustFindIndex } from '../utils/array';

import type {
  Article,
  ArticleDetail,
  ArticleMetadata,
  ArticleMetadataInFrontMatter,
} from '$lib/models/article';
import type { Err, Ok, Result } from '$lib/utils/result';
import type { Brand } from '../types/brand';
import type { Component } from 'svelte';

export type ArticleModule = {
  default: Component;
  metadata: ArticleMetadataInFrontMatter;
};

export const articleModules = import.meta.glob<ArticleModule>('/articles/*/index.md');

const rawArticleModules = import.meta.glob('/articles/*/index.md', {
  import: 'default',
  query: '?raw',
});

const thumbnailModules = import.meta.glob<string>('/articles/*/thumbnail.svg', {
  import: 'default',
  query: '?url',
});

export class ArticleNotFoundError extends Error {
  constructor(slug: Article['slug']) {
    super(`Article not found: ${slug}`);
    this.name = 'ArticleNotFoundError';
  }
}

async function getArticle(
  slug: Article['slug'],
): Promise<Result<Article, ArticleNotFoundError | Error>> {
  const articleModule = await articleModules[`/articles/${slug}/index.md`]?.();
  if (!articleModule) {
    return err(new ArticleNotFoundError(slug));
  }
  const { metadata } = articleModule;

  const thumbnailLoader = thumbnailModules[`/articles/${slug}/thumbnail.svg`];
  if (!thumbnailLoader) {
    return err(new Error(`Thumbnail not found for article: ${slug}`));
  }
  const thumbnail = await thumbnailLoader();

  const content = await getArticleContent(slug);
  const articleResult = createArticle({
    excerpt: getExcerpt(content),
    publishDate: metadata.publishDate,
    slug,
    tags: metadata.tags,
    thumbnail,
    title: metadata.title,
  });

  if (!articleResult.isOk) {
    return err(new Error(`Failed to create article: ${articleResult.error.message}`));
  }

  return ok(articleResult.value);
}

export async function getArticleDetail(
  slug: Article['slug'],
): Promise<Result<ArticleDetail, ArticleNotFoundError | Error>> {
  const [articleResult, metadataListResult] = await Promise.all([
    getArticle(slug),
    getArticleMetadataList(),
  ]);

  if (articleResult.isErr) {
    return articleResult;
  }
  if (metadataListResult.isErr) {
    return metadataListResult;
  }

  const sortedMetadataList = createSortedArticleMetadataList(metadataListResult.value);
  const currentArticleIndex = mustFindIndex(
    sortedMetadataList,
    (metadata) => metadata.slug === slug,
  );
  const newerArticles = sortedMetadataList.slice(0, currentArticleIndex);
  const olderArticles = sortedMetadataList.slice(currentArticleIndex + 1);
  const relatedArticleMetadataList = [...newerArticles, ...olderArticles].slice(0, 5);

  const relatedArticleResults = await Promise.all(
    relatedArticleMetadataList.map((metadata) => getArticle(metadata.slug)),
  );
  const relatedArticles: Article[] = [];
  for (const result of relatedArticleResults) {
    if (result.isErr) {
      return result;
    }
    relatedArticles.push(result.value);
  }

  return ok({
    article: articleResult.value,
    relatedArticles,
  });
}

export async function getArticleMetadataList(): Promise<Result<ArticleMetadata[], Error>> {
  const articleMetadataResults: (Err<Error> | Ok<ArticleMetadata>)[] = await Promise.all(
    Object.keys(articleModules).map(async (path) => {
      const slug = extractSlug(path);
      if (!slug) {
        return err(new Error(`Unexpected article path: ${path}`));
      }

      const articleModule = await articleModules[path]?.();
      if (!articleModule) {
        return err(new Error(`Article module not found: ${path}`));
      }

      return ok({
        publishDate: articleModule.metadata.publishDate,
        slug,
      });
    }),
  );

  if (articleMetadataResults.some((result) => result.isErr)) {
    const errorMessages = articleMetadataResults
      .filter((result): result is Err<Error> => result.isErr)
      .map((result) => result.error.message)
      .join(', ');

    return err(new Error(`Failed to get article metadata list: ${errorMessages}`));
  }

  return ok(
    articleMetadataResults
      .filter((result): result is Ok<ArticleMetadata> => result.isOk)
      .map((result) => result.value),
  );
}

export async function getArticlesByPage(
  articleMetadataList: SortedArticleMetadataList,
  page: number,
): Promise<Result<Article[], Error>> {
  const articleMetadataListInPage = filterArticleMetadataListByPage(articleMetadataList, page);
  const articleResultList = await Promise.all(
    articleMetadataListInPage.map(({ slug }) => getArticle(slug)),
  );

  if (articleResultList.some((result) => result.isErr)) {
    const errorMessages = articleResultList
      .filter((result): result is Err<Error> => result.isErr)
      .map((result) => result.error.message)
      .join(', ');

    return err(new Error(`Failed to get articles by page: ${errorMessages}`));
  }

  return ok(
    articleResultList
      .filter((result): result is Ok<Article> => result.isOk)
      .map((result) => result.value),
  );
}

function extractSlug(path: string): string | undefined {
  const match = /^\/articles\/([^/]+)\/index\.md$/.exec(path);

  return match?.[1];
}

async function getArticleContent(slug: Article['slug']): Promise<string> {
  const rawArticle = await rawArticleModules[`/articles/${slug}/index.md`]?.();

  return rawArticle?.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '') ?? '';
}

/**
 * Extracts a plain text excerpt from markdown content.
 */
function getExcerpt(content: string): string {
  const paragraphs = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .parse(content)
    .children.map((paragraph) => toString(paragraph))
    .filter((text) => text !== '');

  return paragraphs.join('\n').slice(0, 200);
}

declare const _sortedArticleMetadataListSymbol: unique symbol;

type SortedArticleMetadataList = Brand<typeof _sortedArticleMetadataListSymbol> & ArticleMetadata[];

/**
 * Creates a sorted list of article metadata, sorted by publish date in descending order.
 */
export function createSortedArticleMetadataList(
  articleMetadataList: ArticleMetadata[],
): SortedArticleMetadataList {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We allow to use type assertion inside a constructor function when using a branded type.
  return articleMetadataList.toSorted((a, b) => {
    const instantA = Temporal.Instant.from(a.publishDate);
    const instantB = Temporal.Instant.from(b.publishDate);

    return Temporal.Instant.compare(instantB, instantA);
  }) as SortedArticleMetadataList;
}
