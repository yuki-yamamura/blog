import type { Article, ArticleModule } from '../../../lib/types/article';
import type { PageServerLoadEvent } from './$types';

export async function load({ params }: PageServerLoadEvent): Promise<{ article: Article }> {
	const { slug } = params;
	const articleModules = import.meta.glob<ArticleModule>(`/articles/*.md`);
	const thumbnailModules = import.meta.glob<string>('/src/lib/assets/images/*.png', {
		query: '?url',
		import: 'default'
	});

	const articleLoader = articleModules[`/articles/${slug}.md`];
	const {
		metadata: { title, publishDate, tags, thumbnailFilename }
	} = await articleLoader();
	const thumbnailLoader = await thumbnailModules[`/src/lib/assets/images/${thumbnailFilename}`];
	const thumbnail = await thumbnailLoader();
	const article: Article = {
		slug,
		thumbnail,
		title,
		publishDate,
		tags
	};

	return {
		article
	};
}
