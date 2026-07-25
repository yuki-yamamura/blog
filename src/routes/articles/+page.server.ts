import type { Article } from '../../lib/models/article';
import { getArticles } from '../../lib/server/article';

export async function load(): Promise<{ articles: Article[] }> {
	const articles = await getArticles();

	return {
		articles
	};
}
