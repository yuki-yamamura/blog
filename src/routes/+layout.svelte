<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/layouts/Header.svelte';
  import WindChime from '$lib/components/layouts/WindChime.svelte';

  import '@fontsource-variable/nunito/wght.css';
  import '../styles/reset.css';
  import '../styles/globals.css';

  const { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<div class="base">
  <WindChime />
  <Header />
  {@render children()}
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
    max-inline-size: var(--width-layout);
    min-block-size: 100dvh;
    padding: var(--space-1);
    margin-inline: auto;

    @media (768px <= width) {
      padding: var(--space-2);
    }
  }
</style>
