<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';

  import type { LayoutProps } from './$types';

  const { children, data }: LayoutProps = $props();
  const {
    articleDetail: { article },
  } = $derived(data);
</script>

<Seo title={article.title} description={article.excerpt} ogType="article" />

<div class="base">
  {@render children()}
</div>

<style>
  .base {
    inline-size: 100%;
    max-inline-size: var(--width-article);
    margin-inline: auto;
  }
</style>
