import z from 'zod';

import { createSortedTags, tagSchema } from '$lib/models/tag';

import { formatDate } from '../utils/date';
import { err, ok } from '../utils/result';

import type { Brand } from '../types/brand';
import type { Result } from '../utils/result';

const MAX_DISPLAY_PAGES = 5;
const ARTICLES_PER_PAGE = 9;

export type ArticleMetadataInFrontMatter = {
  publishDate: string;
  tags: string[];
  title: string;
};

const articleSchema = z.object({
  excerpt: z.string().min(1),
  publishDate: z.iso.datetime(),
  slug: z.string().min(1),
  tags: z.array(tagSchema).min(1),
  thumbnail: z.string().min(1),
  title: z.string().min(1),
});

declare const _articleSymbol: unique symbol;
export type Article = Brand<typeof _articleSymbol> & z.infer<typeof articleSchema>;

/**
 * A constructor function to create an article.
 */
export function createArticle(params: {
  excerpt: string;
  publishDate: string;
  slug: string;
  tags: string[];
  thumbnail: string;
  title: string;
}): Result<Article, Error> {
  const articleResult = articleSchema.safeParse(params);
  if (!articleResult.success) {
    return err(new Error(`Invalid article: ${articleResult.error.message}`));
  }

  const publishDate = formatDate(articleResult.data.publishDate);

  const sortedTagsResult = createSortedTags(articleResult.data.tags);
  if (sortedTagsResult.isErr) {
    return sortedTagsResult;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- We allow to use type assertion inside a constructor function when using a branded type.
  return ok({
    ...articleResult.data,
    publishDate,
    tags: sortedTagsResult.value,
  } as unknown as Article);
}

export type ArticleMetadata = Pick<Article, 'publishDate' | 'slug'>;

export type ArticleDetail = {
  article: Article;
  relatedArticles: readonly Article[];
};

function shouldShowPagination(totalArticles: number): boolean {
  return totalArticles > ARTICLES_PER_PAGE;
}

function getDisplayPages(currentPage: number, totalPages: number): number[] {
  const maxStartPage = Math.max(1, totalPages - MAX_DISPLAY_PAGES + 1);
  const startPage = Math.min(
    Math.max(1, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2)),
    maxStartPage,
  );
  const displayPageCount = Math.min(MAX_DISPLAY_PAGES, totalPages);

  return Array.from({ length: displayPageCount }, (_, index) => index + startPage);
}

export function getTotalPages(totalArticles: number): number {
  return Math.ceil(totalArticles / ARTICLES_PER_PAGE);
}

export type ArticlePagination = {
  currentPage: number;
  displayPages: number[];
  shouldShowPagination: boolean;
  totalPages: number;
};

export function createArticlePagination(
  currentPage: number,
  totalArticles: number,
): ArticlePagination {
  const totalPages = getTotalPages(totalArticles);

  return {
    currentPage,
    displayPages: getDisplayPages(currentPage, totalPages),
    shouldShowPagination: shouldShowPagination(totalArticles),
    totalPages,
  };
}

export function filterArticleMetadataListByPage(
  articleMetadataList: ArticleMetadata[],
  page: number,
): ArticleMetadata[] {
  return articleMetadataList.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
}
