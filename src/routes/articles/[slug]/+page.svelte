<script lang="ts">
  import PageContainer from '$lib/components/layouts/PageContainer.svelte';
  import TagBadge from '$lib/components/TagBadge.svelte';
  import Image from '$lib/components/ui/Image.svelte';

  import type { PageProps } from './$types';

  const props: PageProps = $props();
  const { article, Component } = $derived(props.data);
</script>

<PageContainer>
  <div class="meta">
    <div class="publish-date">{article.publishDate}</div>
    <Image
      src={article.thumbnail}
      alt={`${article.title}'s thumbnail`}
      width="200"
      height="200"
      class="thumbnail"
    />
    <h1>{props.data.article.title}</h1>
    <ul role="list" class="tags">
      {#each article.tags as tag (tag)}
        <li>
          <TagBadge {tag} />
        </li>
      {/each}
    </ul>
  </div>

  <div class="content">
    <Component />
  </div>
</PageContainer>

<style>
  .meta {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-2);
    align-items: center;
    padding-block-end: 24px;
  }

  h1 {
    font-size: var(--font-size-3xl);
    text-align: center;
  }

  .publish-date {
    align-self: start;
    font-size: var(--font-size-sm);
    letter-spacing: 1px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-2);
    justify-content: center;
    padding: 0;
  }

  .content {
    flex-grow: 1;
    padding: var(--space-6);
    background-color: white;
    border-radius: 16px;
  }
</style>
