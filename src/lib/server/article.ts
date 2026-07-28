import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { Temporal } from 'temporal-polyfill';
import { unified } from 'unified';

import {
  createArticle,
  filterArticleMetadataListByPage,
  MAX_EXCERPT_LENGTH,
} from '$lib/models/article';
import { err, ok } from '$lib/utils/result';

import type { Article, ArticleMetadata, ArticleModule } from '$lib/models/article';
import type { Err, Ok, Result } from '$lib/utils/result';
import type { Brand } from '../types/brand';

const articleModules = import.meta.glob<ArticleModule>('/articles/*.md');

const rawArticleModules = import.meta.glob('/articles/*.md', { import: 'default', query: '?raw' });

const thumbnailModules = import.meta.glob<string>('/src/lib/assets/images/*.png', {
  import: 'default',
  query: '?url',
});

export async function getArticle(slug: Article['slug']): Promise<Result<Article, Error>> {
  const { metadata } = await articleModules[`/articles/${slug}.md`]();

  const thumbnail =
    await thumbnailModules[`/src/lib/assets/images/${metadata.thumbnailFilename}`]();
  const content = await getArticleContent(slug);
  const excerpt = extractExcerpt(content);
  const articleResult = createArticle({
    excerpt,
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

export async function getArticleMetadataList(): Promise<Result<ArticleMetadata[], Error>> {
  const articleMetadataResults: (Err<Error> | Ok<ArticleMetadata>)[] = await Promise.all(
    Object.keys(articleModules).map(async (path) => {
      const filename = path.split('/').at(-1);
      if (!filename) {
        return err(new Error(`Unexpected article path: ${path}`));
      }
      const slug = filename.split('.', 1).at(0);
      if (!slug) {
        return err(new Error(`Unexpected article filename: ${filename}`));
      }

      const {
        metadata: { publishDate },
      } = await articleModules[path]();

      return ok({
        publishDate,
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

async function getArticleContent(slug: Article['slug']): Promise<string> {
  const rawArticle = await rawArticleModules[`/articles/${slug}.md`]();
  const rawContent = rawArticle.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const parsedContent = unified().use(remarkParse).parse(rawContent);

  return toString(parsedContent);
}

function extractExcerpt(content: string): string {
  return content.slice(0, MAX_EXCERPT_LENGTH);
}

declare const _sortedArticleMetadataListSymbol: unique symbol;

type SortedArticleMetadataList = Brand<typeof _sortedArticleMetadataListSymbol> & ArticleMetadata[];

/**
 * Creates a sorted list of article metadata, sorted by publish date in descending order.
 */
export function createSortedMetadataList(
  articleMetadataList: ArticleMetadata[],
): SortedArticleMetadataList {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We allow to use type assertion inside a constructor function when using a branded type.
  return articleMetadataList.toSorted((a, b) => {
    const instantA = Temporal.Instant.from(a.publishDate);
    const instantB = Temporal.Instant.from(b.publishDate);

    return Temporal.Instant.compare(instantB, instantA);
  }) as SortedArticleMetadataList;
}
