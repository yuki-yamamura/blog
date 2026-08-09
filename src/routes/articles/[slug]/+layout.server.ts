import { error } from '@sveltejs/kit';

import { ArticleNotFoundError, getArticleDetail } from '$lib/server/article';

import type { ArticleDetail } from '$lib/models/article';
import type { LayoutServerLoadEvent } from './$types';

export async function load({
  params,
}: LayoutServerLoadEvent): Promise<{ articleDetail: ArticleDetail }> {
  const { slug } = params;
  const articleResult = await getArticleDetail(slug);

  if (articleResult.isErr) {
    if (articleResult.error instanceof ArticleNotFoundError) {
      error(404, `Article not found: ${slug}`);
    }

    throw articleResult.error;
  }

  return {
    articleDetail: articleResult.value,
  };
}
