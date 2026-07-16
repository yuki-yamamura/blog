<script lang="ts">
	import type { PageProps } from './$types';

	const props: PageProps = $props();
</script>

<ul>
	{#each props.data.articles as article (article.slug)}
		<li>
			<a href={`/articles/${article.slug}`}>{article.title}</a>
		</li>
	{/each}
</ul>

<a href="/">Back to home</a>
