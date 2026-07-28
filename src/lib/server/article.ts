import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { Temporal } from 'temporal-polyfill';
import { unified } from 'unified';

import { filterArticleMetadataListByPage } from '$lib/models/article';
import { createSortedTags } from '$lib/models/tag';

import type { Article, ArticleMetadata, ArticleModule } from '$lib/models/article';

const articleModules = import.meta.glob<ArticleModule>('/articles/*.md');

const rawArticleModules = import.meta.glob('/articles/*.md', { import: 'default', query: '?raw' });

const thumbnailModules = import.meta.glob<string>('/src/lib/assets/images/*.png', {
  import: 'default',
  query: '?url',
});

export async function getArticle(slug: Article['slug']): Promise<Article> {
  const {
    metadata: { publishDate, tags, thumbnailFilename, title },
  } = await articleModules[`/articles/${slug}.md`]();

  const thumbnail = await thumbnailModules[`/src/lib/assets/images/${thumbnailFilename}`]();
  const sortedTags = createSortedTags(tags);
  const content = await getArticleContent(slug);
  const excerpt = extractExcerpt(content);

  const article: Article = {
    excerpt,
    publishDate,
    slug,
    tags: sortedTags,
    thumbnail,
    title,
  };

  return article;
}

export async function getArticleMetadataList(): Promise<ArticleMetadata[]> {
  const articleMetadataList: ArticleMetadata[] = await Promise.all(
    Object.keys(articleModules).map(async (path) => {
      const filename = path.split('/').at(-1);
      if (!filename) {
        throw new Error(`Unexpected article path: ${path}`);
      }

      const slug = filename.split('.', 1).at(0);
      if (!slug) {
        throw new Error(`Unexpected article filename: ${filename}`);
      }

      const {
        metadata: { publishDate },
      } = await articleModules[path]();

      return {
        publishDate,
        slug,
      };
    }),
  );
  const sortedArticleMetadataList = sortArticleMetadataListByPublishDate(articleMetadataList);

  return sortedArticleMetadataList;
}

export async function getArticlesByPage(
  articleMetadataList: ArticleMetadata[],
  page: number,
): Promise<Article[]> {
  const articleMetadataListInPage = filterArticleMetadataListByPage(articleMetadataList, page);
  const articles = await Promise.all(articleMetadataListInPage.map(({ slug }) => getArticle(slug)));

  return articles;
}

async function getArticleContent(slug: Article['slug']): Promise<string> {
  const rawArticle = await rawArticleModules[`/articles/${slug}.md`]();
  const rawContent = rawArticle.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const parsedContent = unified().use(remarkParse).parse(rawContent);

  return toString(parsedContent);
}

function extractExcerpt(content: string, maxLength: number = 300): string {
  return content.slice(0, maxLength);
}

function sortArticleMetadataListByPublishDate(
  articleMetadataList: ArticleMetadata[],
): ArticleMetadata[] {
  return articleMetadataList.toSorted((a, b) => {
    const instantA = Temporal.Instant.from(a.publishDate);
    const instantB = Temporal.Instant.from(b.publishDate);

    return Temporal.Instant.compare(instantB, instantA);
  });
}
