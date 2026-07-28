<script lang="ts">
  import { pathMap } from '$lib/utils/path';

  import TagBadge from './TagBadge.svelte';
  import Image from './ui/Image.svelte';

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
      <h2>{article.title}</h2>
      <ul role="list" class="tags">
        {#each article.tags as tag (tag)}
          <li>
            <TagBadge slug={tag} />
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
    row-gap: 8px;
    align-items: center;
    block-size: 100%;
    padding: 24px;
    border: 1px solid black;
    border-radius: 1px;

    /* border-radius: 36px; */

    :global(.thumbnail) {
      object-fit: cover;
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
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
    font-size: 14px;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    text-align: center;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    column-gap: 8px;
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
  }
</style>
