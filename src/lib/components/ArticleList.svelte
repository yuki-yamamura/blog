<script lang="ts">
	import type { Article } from '../types/article';
	import ArticleCard from './ArticleCard.svelte';

	const { articles }: { articles: Article[] } = $props();
</script>

<ul role="list" class="base">
	{#each articles as article (article.slug)}
		<li>
			<ArticleCard {article} />
		</li>
	{/each}
</ul>

<style>
	.base {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
		padding: 1rem;
	}
</style>
