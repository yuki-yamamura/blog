<script lang="ts">
  import { SITE_NAME } from '$lib/constants';

  import { page } from '$app/state';

  const {
    description,
    ogType = 'website',
    title,
  }: { description: string; title: string; ogType?: 'article' | 'website' } = $props();

  const ogImageUrl = $derived(new URL('/ogp.png', page.url.origin).href);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:image" content={ogImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
