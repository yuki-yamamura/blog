import { error } from '@sveltejs/kit';

import type { ArticleDetail } from '$lib/models/article';
import type { ArticleModule } from '$lib/server/article';
import type { LayoutLoadEvent } from './$types';
import type { Component } from 'svelte';

const articleModules = import.meta.glob<ArticleModule>('/articles/*/index.md');

export async function load({
  data,
  params,
}: LayoutLoadEvent): Promise<{ articleDetail: ArticleDetail; Component: Component }> {
  const { articleDetail } = data;
  const { slug } = params;

  const articleModule = await articleModules[`/articles/${slug}/index.md`]?.();
  if (!articleModule) {
    error(404, `Article not found: ${slug}`);
  }

  return {
    articleDetail,
    Component: articleModule.default,
  };
}
