<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/layouts/Header.svelte';
  import WindChime from '$lib/components/layouts/WindChime.svelte';
  import '@fontsource-variable/nunito/wght.css';
  import '../styles/reset.css';
  import '../styles/globals.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="base">
  <WindChime />
  <Header />
  {@render children()}
</div>

<style>
  :global(body) {
    font-family: 'Nunito Variable', sans-serif;
  }

  .base {
    display: flex;
    flex-direction: column;
    max-inline-size: 1280px;
    min-block-size: 100dvh;
    padding: 4px;
    margin-inline: auto;

    @media (768px <= width) {
      padding: 8px;
    }
  }
</style>
