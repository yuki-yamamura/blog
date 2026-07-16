import { error } from '@sveltejs/kit';
import { articles } from '../../../lib/data/articles';
import type { PageLoadEvent } from './$types';
import type { Article } from '../../../lib/types/article';

export function load({ params }: PageLoadEvent): Article {
	const { slug } = params;
	const article = articles.find((article) => article.slug === slug);

	if (!article) {
		error(404, {
			message: 'Not Found'
		});
	}

	return article;
}
