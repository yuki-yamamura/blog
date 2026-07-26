import {
	filterArticleMetadataListByPage,
	type Article,
	type ArticleMetadata,
	type ArticleModule
} from '$lib/models/article';
import { unified } from 'unified';
import { tagSchema, uniqueTagsSchema } from '../models/tag';
import remarkParse from 'remark-parse';
import { toString } from 'mdast-util-to-string';
import { Temporal } from 'temporal-polyfill';

const articleModules = import.meta.glob<ArticleModule>('/articles/*.md');

const rawArticleModules = import.meta.glob('/articles/*.md', { query: '?raw', import: 'default' });

const thumbnailModules = import.meta.glob<string>('/src/lib/assets/images/*.png', {
	query: '?url',
	import: 'default'
});

export async function getArticle(slug: Article['slug']): Promise<Article> {
	const {
		metadata: { title, publishDate, tags: primitiveTags, thumbnailFilename }
	} = await articleModules[`/articles/${slug}.md`]();

	const thumbnail = await thumbnailModules[`/src/lib/assets/images/${thumbnailFilename}`]();
	const tags = uniqueTagsSchema.parse(primitiveTags.map((tag) => tagSchema.parse(tag)));
	const content = await getArticleContent(slug);
	const excerpt = extractExcerpt(content);

	const article: Article = {
		slug,
		thumbnail,
		title,
		publishDate,
		tags,
		excerpt
	};

	return article;
}

export async function getArticleMetadataList(): Promise<ArticleMetadata[]> {
	const articleMetadataList: ArticleMetadata[] = await Promise.all(
		Object.keys(articleModules).map(async (path) => {
			const filename = path.split('/').at(-1);
			const slug = filename?.split('.').at(0) as string;
			const {
				metadata: { publishDate }
			} = await articleModules[path]();

			return {
				slug,
				publishDate
			};
		})
	);
	const sortedArticleMetadataList = sortArticleMetadataListByPublishDate(articleMetadataList);

	return sortedArticleMetadataList;
}

export async function getArticlesByPage(
	articleMetadataList: ArticleMetadata[],
	page: number
): Promise<Article[]> {
	const articleMetadataListInPage = filterArticleMetadataListByPage(articleMetadataList, page);
	const articles = await Promise.all(
		articleMetadataListInPage.map(async ({ slug }) => getArticle(slug))
	);

	return articles;
}

async function getArticleContent(slug: Article['slug']): Promise<string> {
	const rawArticle = await rawArticleModules[`/articles/${slug}.md`]();
	const rawContent = rawArticle.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
	const parsedContent = await unified().use(remarkParse).parse(rawContent);

	return toString(parsedContent);
}

function extractExcerpt(content: string, maxLength: number = 300): string {
	return content.slice(0, maxLength);
}

function sortArticleMetadataListByPublishDate(
	articleMetadataList: ArticleMetadata[]
): ArticleMetadata[] {
	return articleMetadataList.sort((a, b) => {
		const instantA = Temporal.Instant.from(a.publishDate);
		const instantB = Temporal.Instant.from(b.publishDate);

		return Temporal.Instant.compare(instantB, instantA);
	});
}
