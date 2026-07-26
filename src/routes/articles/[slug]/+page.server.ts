import { getArticle } from '$lib/server/article';

import type { Article } from '$lib/models/article';
import type { PageServerLoadEvent } from './$types';

export async function load({ params }: PageServerLoadEvent): Promise<{ article: Article }> {
  const { slug } = params;
  const article = await getArticle(slug);

  return {
    article,
  };
}
