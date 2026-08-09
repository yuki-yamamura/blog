import { error, redirect } from '@sveltejs/kit';

import { getTotalPages } from '$lib/models/article';
import { createArticlesPageQueryParamsSchema } from '$lib/schemas/articles-page-query-param';
import {
  createSortedArticleMetadataList,
  getArticleMetadataList,
  getArticlesByPage,
} from '$lib/server/article';
import { pathMap } from '$lib/utils/path';

import type { Article } from '$lib/models/article';
import type { PageServerLoadEvent } from './$types';

export async function load({ url }: PageServerLoadEvent): Promise<{
  articles: Article[];
  currentPage: number;
  totalArticles: number;
}> {
  const articleMetadataListResult = await getArticleMetadataList();
  if (articleMetadataListResult.isErr) {
    throw articleMetadataListResult.error;
  }

  const totalArticles = articleMetadataListResult.value.length;
  const totalPages = getTotalPages(totalArticles);

  const pageParam = url.searchParams.get('page');
  const firstPage = 1;
  if (pageParam === firstPage.toString()) {
    redirect(301, pathMap['/articles'].get());
  }

  let page: number;
  if (pageParam === null) {
    page = firstPage;
  } else {
    const queryParamsSchema = createArticlesPageQueryParamsSchema(totalPages);
    const queryParamsResult = queryParamsSchema.safeParse({
      page: pageParam,
    });

    if (!queryParamsResult.success) {
      error(404, 'Invalid page query parameter');
    }

    page = queryParamsResult.data.page;
  }
  const sortedArticleMetadataList = createSortedArticleMetadataList(
    articleMetadataListResult.value,
  );
  const articlesResult = await getArticlesByPage(sortedArticleMetadataList, page);

  if (articlesResult.isErr) {
    throw articlesResult.error;
  }

  return {
    articles: articlesResult.value,
    currentPage: page,
    totalArticles,
  };
}
