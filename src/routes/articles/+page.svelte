<script lang="ts">
	import type { PageProps } from './$types';
	import ArticleCardList from '$lib/components/ArticleList.svelte';
	import PageContainer from '$lib/components/layouts/PageContainer.svelte';
	import { createArticlePagination } from '../../lib/models/article';
	import ArticlePagination from '../../lib/components/ui/Pagination.svelte';

	const props: PageProps = $props();
	const articlePagination = $derived(
		createArticlePagination(props.data.currentPage, props.data.totalArticles)
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
		row-gap: 80px;
	}
</style>
