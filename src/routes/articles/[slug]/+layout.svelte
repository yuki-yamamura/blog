<script lang="ts">
  import type { LayoutProps } from './$types';

  const { children, data }: LayoutProps = $props();
  const { article } = $derived(data);
</script>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

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
