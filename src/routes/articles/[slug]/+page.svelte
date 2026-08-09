<script lang="ts">
  import PageContainer from '$lib/components/layouts/PageContainer.svelte';
  import RelatedArticles from '$lib/components/RelatedArticles.svelte';
  import TagBadge from '$lib/components/TagBadge.svelte';
  import Image from '$lib/components/ui/Image.svelte';

  import type { PageProps } from './$types';

  const props: PageProps = $props();
  const {
    articleDetail: { article, relatedArticles },
    Component,
  } = $derived(props.data);
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
    <h1>{article.title}</h1>
    <ul role="list" class="tags">
      {#each article.tags as tag (tag)}
        <li>
          <TagBadge {tag} />
        </li>
      {/each}
    </ul>
  </div>

  <div class="inner">
    <div class="content">
      <Component />
    </div>

    <RelatedArticles articles={relatedArticles} />
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
    padding: var(--space-4);
    background-color: white;
    border-radius: 16px;

    @media (768px <= width) {
      padding: var(--space-6);
    }
  }

  .inner {
    display: flex;
    flex-direction: column;
    row-gap: 128px;
  }
</style>
