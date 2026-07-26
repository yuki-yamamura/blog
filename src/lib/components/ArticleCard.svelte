<script lang="ts">
  import { tagSchema, uniqueTagsSchema } from '$lib/models/tag';
  import { formatDate } from '$lib/utils/date';
  import { pathMap } from '$lib/utils/path';

  import TagBadge from './TagBadge.svelte';
  import Image from './ui/Image.svelte';

  import type { Article } from '$lib/models/article';
  import type { Tag } from '$lib/models/tag';

  const { article }: { article: Article } = $props();
  const publishDate = $derived.by(() => formatDate(article.publishDate));
  const tags: Tag[] = $derived.by(() => {
    const tags = article.tags.map((tag) => tagSchema.parse(tag));

    return uniqueTagsSchema.parse(tags);
  });
</script>

<a href={pathMap['/articles/:slug'].get(article.slug)} class="base">
  <article class="card">
    <div class="publish-date">{publishDate}</div>
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
        {#each tags as tag (tag)}
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
    text-decoration: none;
    color: currentcolor;
    background-color: white;
  }

  .card {
    display: flex;
    flex-direction: column;
    padding: 24px;
    row-gap: 8px;
    border-radius: 1px;
    border: 1px solid black;
    align-items: center;
    height: 100%;

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
    font-size: 14px;
    align-self: start;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    text-align: center;
  }

  .tags {
    padding: 0;
  }

  .excerpt {
    text-align: start;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    overflow: hidden;
  }
</style>
