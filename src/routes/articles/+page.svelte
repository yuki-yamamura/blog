<script lang="ts">
	import type { PageProps } from './$types';
	import ArticleCard from '$lib/components/ArticleCard.svelte';

	const props: PageProps = $props();
</script>

<ul class="base">
	{#each props.data.articles as article (article.slug)}
		<li>
			<a href={`/articles/${article.slug}`}>
				<ArticleCard {article} />
			</a>
		</li>
	{/each}
</ul>

<a href="/">Back to home</a>

<style>
	.base {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		padding: 1rem;
	}
</style>
