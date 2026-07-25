<script lang="ts">
	import type { Article } from '../models/article';
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
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 48px;
		width: 100%;
		padding: 0;
		margin: 0;
	}
</style>
