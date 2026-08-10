<script lang="ts">
  import ArticleCardList from '$lib/components/ArticleList.svelte';
  import PageContainer from '$lib/components/layouts/PageContainer.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import ArticlePagination from '$lib/components/ui/Pagination.svelte';
  import { SITE_NAME } from '$lib/constants';
  import { createArticlePagination } from '$lib/models/article';
  import { pathMap } from '$lib/utils/path';

  import type { PageProps } from './$types';

  import { page } from '$app/state';

  const props: PageProps = $props();
  const articlePagination = $derived(
    createArticlePagination(props.data.currentPage, props.data.totalArticles),
  );

  const firstPage = 1;
  const canonicalUrl = $derived.by(() => {
    const path = pathMap['/articles'].get();
    const search = props.data.currentPage === firstPage ? '' : `?page=${props.data.currentPage}`;

    return new URL(`${path}${search}`, page.url.origin).href;
  });
</script>

<Seo title={`Articles | ${SITE_NAME}`} description={`All articles on ${SITE_NAME}.`} />

<svelte:head>
  <link rel="canonical" href={canonicalUrl} />
</svelte:head>

<PageContainer>
  <div class="inner">
    <ArticleCardList articles={props.data.articles} />
    <ArticlePagination pagination={articlePagination} />
  </div>
</PageContainer>

<style>
  .inner {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-20);
  }
</style>
