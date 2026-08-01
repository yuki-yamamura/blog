<script lang="ts">
  import { pathMap } from '$lib/utils/path';

  import TagBadge from './TagBadge.svelte';
  import Image from './ui/Image.svelte';

  import type { Article } from '$lib/models/article';

  const { article }: { article: Article } = $props();

  const excerpt = $derived(article.content.slice(0, 300));
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
      <h2>{article.title}</h2>
      <ul role="list" class="tags">
        {#each article.tags as tag (tag)}
          <li>
            <TagBadge {tag} />
          </li>
        {/each}
      </ul>
      <p class="excerpt">{excerpt}</p>
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
