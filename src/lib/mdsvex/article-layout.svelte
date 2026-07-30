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
      font-size: 1.5rem;
    }

    :global(h3) {
      margin-block-start: 32px;
      font-size: 1.25rem;
    }

    :global(h4) {
      margin-block-start: 24px;
      font-size: 1.125rem;
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
      padding: 8px 12px;
      border: 1px solid black;
    }
  }

  :global(.article-content :where(img)) {
    display: block;
    max-inline-size: 100%;
    block-size: auto;
    margin-inline: auto;
  }
</style>
