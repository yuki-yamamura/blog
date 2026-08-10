<script lang="ts">
  import TagBadge from '$lib/components/TagBadge.svelte';
  import Image from '$lib/components/ui/Image.svelte';
  import { pathMap } from '$lib/utils/path';

  import type { Article } from '$lib/models/article';

  const { article }: { article: Article } = $props();
</script>

<a href={pathMap['/articles/:slug'].get(article.slug)} class="base">
  <article class="card">
    <div class="publish-date">{article.publishDate}</div>
    <Image
      src={article.thumbnail}
      alt={`${article.title}'s thumbnail`}
      width="200"
      height="200"
      class="thumbnail"
    />
    <div class="card-info">
      <div class="title">{article.title}</div>
      <ul role="list" class="tags">
        {#each article.tags as tag (tag)}
          <li>
            <TagBadge {tag} />
          </li>
        {/each}
      </ul>
      <p class="excerpt">{article.excerpt}</p>
    </div>
  </article>
</a>

<style>
  .base {
    color: currentcolor;
    text-decoration: none;
    background-color: white;
  }

  .card {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-2);
    align-items: center;
    block-size: 100%;
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: 1px;

    :global(.thumbnail) {
      object-fit: cover;
      transition:
        transform var(--duration-base) var(--ease-out),
        opacity var(--duration-base) var(--ease-out);
    }

    &:focus-visible {
      :global(.thumbnail) {
        opacity: 0.8;
        transform: scale(1.02);
      }
    }

    @media (any-hover: hover) {
      &:hover {
        :global(.thumbnail) {
          opacity: 0.8;
          transform: scale(1.02);
        }
      }
    }
  }

  .publish-date {
    align-self: start;
    font-size: var(--font-size-sm);
    letter-spacing: 1px;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-3);
    text-align: center;
  }

  .title {
    font-size: var(--font-size-xl);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-2);
    justify-content: center;
    padding: 0;
  }

  .excerpt {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    text-align: start;
    -webkit-box-orient: vertical;
    overflow-wrap: anywhere;
  }
</style>
