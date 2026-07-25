<script lang="ts">
	import type { PageProps } from './$types';
	import ArticleCardList from '$lib/components/ArticleList.svelte';
	import PageContainer from '$lib/components/layouts/PageContainer.svelte';

	const props: PageProps = $props();
</script>

<PageContainer>
	<ArticleCardList articles={props.data.articles} />
</PageContainer>
