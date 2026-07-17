import type { Component } from 'svelte';

export type ArticleMetadata = {
	title: string;
	publishDate: string;
	tags: string[];
	thumbnailFilename: string;
};

export type ArticleModule = {
	default: Component;
	metadata: ArticleMetadata;
};

export type Article = {
	slug: string;
	thumbnail: string;
} & Omit<ArticleMetadata, 'thumbnailFilename'>;
