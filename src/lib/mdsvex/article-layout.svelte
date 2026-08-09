<script module lang="ts">
  export { default as LinkCard } from '$lib/components/ui/LinkCard.svelte';
  export { default as a } from '$lib/components/ui/Link.svelte';
  export { default as img } from '$lib/components/ui/Image.svelte';
  export { default as pre } from '$lib/components/ui/CodeBlock.svelte';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  const { children }: { children?: Snippet } = $props();
</script>

<div class="article-content">
  {@render children?.()}
</div>

<style>
  .article-content {
    > :global(* + *) {
      margin-block-start: 16px;
    }

    :global(h2) {
      margin-block-start: 40px;
      font-size: var(--font-size-2xl);
    }

    :global(h3) {
      margin-block-start: 32px;
      font-size: var(--font-size-xl);
    }

    :global(h4) {
      margin-block-start: 24px;
      font-size: var(--font-size-lg);
    }

    :global(code) {
      font-family: inherit;
      color: var(--color-accent);
    }

    :global(pre code) {
      padding: 0;
      color: inherit;
      background-color: transparent;
    }

    :global(blockquote) {
      padding-inline-start: 16px;
      margin-inline: 0;
      color: var(--color-muted);
      border-inline-start: 4px solid var(--color-muted);
    }

    :global(ul),
    :global(ol) {
      padding-inline-start: 24px;
    }

    :global(ul ul),
    :global(ul ol),
    :global(ol ul),
    :global(ol ol) {
      margin-block-start: 8px;
    }

    :global(table) {
      display: block;
      overflow-x: auto;
      border-collapse: collapse;
    }

    :global(th),
    :global(td) {
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--color-border);
    }
  }

  :global(.article-content :where(img):not(a img)) {
    display: block;
    max-inline-size: 100%;
    block-size: auto;
    padding-block-end: 16px;
    margin-inline: auto;
  }
</style>
