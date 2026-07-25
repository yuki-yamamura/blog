<script lang="ts">
	import type { Article } from '../types/article';

	const { article }: { article: Article } = $props();
</script>

<div class="base">
	<a href={`/articles/${article.slug}`}>
		<img src={article.thumbnail} alt={`${article.title}'s thumbnail`} width="200" height="200" />
		<h2>{article.title}</h2>
		<div>{article.publishDate}</div>
	</a>
</div>

<style>
	.base {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		padding: 1rem;
		border-radius: 1px;
		border: 1px solid black;
	}
</style>
