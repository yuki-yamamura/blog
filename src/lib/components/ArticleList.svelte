<script lang="ts">
  import ArticleCard from './ArticleCard.svelte';

  import type { Article } from '$lib/models/article';

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
    inline-size: 100%;
    padding: 0;
    margin: 0;
  }
</style>
