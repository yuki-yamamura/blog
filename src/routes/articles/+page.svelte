<script lang="ts">
	import type { PageProps } from './$types';
	import ArticleCardList from '$lib/components/ArticleList.svelte';

	const props: PageProps = $props();
</script>

<ArticleCardList articles={props.data.articles} />

<a href="/">Back to home</a>
