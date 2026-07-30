import { error } from '@sveltejs/kit';

import type { Article, ArticleModule } from '$lib/models/article';
import type { LayoutLoadEvent } from './$types';
import type { Component } from 'svelte';

const articleModules = import.meta.glob<ArticleModule>('/articles/*/index.md');

export async function load({
  data,
  params,
}: LayoutLoadEvent): Promise<{ article: Article; Component: Component }> {
  const { article } = data;
  const { slug } = params;

  const articleModule = await articleModules[`/articles/${slug}/index.md`]?.();
  if (!articleModule) {
    error(404, `Article not found: ${slug}`);
  }

  return {
    article,
    Component: articleModule.default,
  };
}
