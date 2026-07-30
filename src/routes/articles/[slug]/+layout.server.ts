import { error } from '@sveltejs/kit';

import { ArticleNotFoundError, getArticle } from '$lib/server/article';

import type { Article } from '$lib/models/article';
import type { LayoutServerLoadEvent } from './$types';

export async function load({ params }: LayoutServerLoadEvent): Promise<{ article: Article }> {
  const { slug } = params;
  const articleResult = await getArticle(slug);

  if (articleResult.isErr) {
    if (articleResult.error instanceof ArticleNotFoundError) {
      error(404, `Article not found: ${slug}`);
    }

    throw articleResult.error;
  }

  return {
    article: articleResult.value,
  };
}
