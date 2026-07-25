import type { Component } from 'svelte';
import type { Tag } from './tag';

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
	tags: Tag[];
} & Omit<ArticleMetadata, 'thumbnailFilename' | 'tags'>;
