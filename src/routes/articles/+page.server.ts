import { type ArticleModule, type Article } from '../../lib/types/article';

export async function load(): Promise<{ articles: Article[] }> {
	const articleModules = import.meta.glob<ArticleModule>('/articles/*.md');
	const thumbnailModules = import.meta.glob<string>('/src/lib/assets/images/*.png', {
		query: '?url',
		import: 'default'
	});

	const articles: Article[] = await Promise.all(
		Object.entries(articleModules).map(async ([path, articleLoader]) => {
			const filename = path.split('/').at(-1);
			const slug = filename?.split('.').at(0) as string;
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

			return article;
		})
	);

	return {
		articles
	};
}
