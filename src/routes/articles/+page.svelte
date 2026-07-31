<script lang="ts">
  import ArticleCardList from '$lib/components/ArticleList.svelte';
  import PageContainer from '$lib/components/layouts/PageContainer.svelte';
  import ArticlePagination from '$lib/components/ui/Pagination.svelte';
  import { createArticlePagination } from '$lib/models/article';

  import type { PageProps } from './$types';

  const props: PageProps = $props();
  const articlePagination = $derived(
    createArticlePagination(props.data.currentPage, props.data.totalArticles),
  );
</script>

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
