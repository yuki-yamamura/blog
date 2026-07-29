<script lang="ts">
  import type { Snippet } from 'svelte';

  const { children, href }: { children: Snippet; href: string } = $props();

  const isExternalLink = $derived(href.startsWith('http://') || href.startsWith('https://'));
</script>

<a {href} target={isExternalLink ? '_blank' : undefined} class="base">
  {@render children()}
</a>

<style>
  .base {
    color: var(--accent-color);
    text-decoration: underline;

    @media (any-hover: hover) {
      &:hover {
        text-decoration: none;
      }
    }

    &:focus-visible {
      text-decoration: none;
    }
  }
</style>
