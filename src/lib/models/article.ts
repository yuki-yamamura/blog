import type { Component } from 'svelte';
import type { Tag } from './tag';

export type ArticleMetadataInFrontMatter = {
	title: string;
	publishDate: string;
	tags: string[];
	thumbnailFilename: string;
};

export type ArticleModule = {
	default: Component;
	metadata: ArticleMetadataInFrontMatter;
};

export type Article = {
	slug: string;
	thumbnail: string;
	tags: Tag[];
	excerpt: string;
} & Omit<ArticleMetadataInFrontMatter, 'thumbnailFilename' | 'tags'>;

export type ArticleMetadata = Pick<Article, 'slug' | 'publishDate'>;

const MAX_DISPLAY_PAGES = 5;
const ARTICLES_PER_PAGE = 12;

function shouldShowPagination(totalArticles: number): boolean {
	return totalArticles > ARTICLES_PER_PAGE;
}

function getDisplayPages(currentPage: number, totalPages: number): number[] {
	const maxStartPage = Math.max(1, totalPages - MAX_DISPLAY_PAGES + 1);
	const startPage = Math.min(
		Math.max(1, currentPage - Math.floor(MAX_DISPLAY_PAGES / 2)),
		maxStartPage
	);
	const displayPageCount = Math.min(MAX_DISPLAY_PAGES, totalPages);

	return Array.from(new Array(displayPageCount)).map((_, index) => index + startPage);
}

export function getTotalPages(totalArticles: number): number {
	return Math.ceil(totalArticles / ARTICLES_PER_PAGE);
}

export type ArticlePagination = {
	currentPage: number;
	totalPages: number;
	displayPages: number[];
	shouldShowPagination: boolean;
};

export function createArticlePagination(
	currentPage: number,
	totalArticles: number
): ArticlePagination {
	const totalPages = getTotalPages(totalArticles);

	return {
		currentPage,
		totalPages,
		displayPages: getDisplayPages(currentPage, totalPages),
		shouldShowPagination: shouldShowPagination(totalArticles)
	};
}

export function filterArticleMetadataListByPage(
	articleMetadataList: ArticleMetadata[],
	page: number
): ArticleMetadata[] {
	return articleMetadataList.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);
}
