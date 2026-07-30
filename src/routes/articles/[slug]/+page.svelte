<script lang="ts">
  import Image from '$lib/components/ui/Image.svelte';

  import PageContainer from '../../../lib/components/layouts/PageContainer.svelte';
  import TagBadge from '../../../lib/components/TagBadge.svelte';

  import type { PageProps } from './$types';

  const props: PageProps = $props();
  const { article } = $derived(props.data);
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
          <TagBadge slug={tag} />
        </li>
      {/each}
    </ul>
  </div>

  <div class="content">
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
    <div>
      foo
      <br />
    </div>
  </div>
</PageContainer>

<style>
  .meta {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;
    padding-block-end: 24px;
  }

  .publish-date {
    align-self: start;
    font-size: 14px;
    letter-spacing: 1px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    column-gap: 8px;
    justify-content: center;
    padding: 0;
  }

  .content {
    block-size: 100%;
    padding: 24px;
    background-color: white;
    border-radius: 16px;
  }
</style>
