import type { Tag } from './tag';
import type { Component } from 'svelte';

type ArticleMetadataInFrontMatter = {
  publishDate: string;
  tags: string[];
  thumbnailFilename: string;
  title: string;
};

export type ArticleModule = {
  default: Component;
  metadata: ArticleMetadataInFrontMatter;
};

export type Article = {
  excerpt: string;
  slug: string;
  tags: Tag[];
  thumbnail: string;
} & Omit<ArticleMetadataInFrontMatter, 'tags' | 'thumbnailFilename'>;

export type ArticleMetadata = Pick<Article, 'publishDate' | 'slug'>;

const MAX_DISPLAY_PAGES = 5;
const ARTICLES_PER_PAGE = 12;

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
