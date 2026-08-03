<script lang="ts">
  import ArticleCard from './ArticleCard.svelte';

  import type { RelatedArticles } from '$lib/models/article';

  const { articles }: { articles: RelatedArticles } = $props();

  const TOTAL = 5;
  const INITIAL_INDEX = 2;

  let currentIndex = $state(INITIAL_INDEX);

  const canGoPrev = $derived(currentIndex > 0);
  const canGoNext = $derived(currentIndex < TOTAL - 1);

  function goPrev() {
    if (canGoPrev) currentIndex -= 1;
  }
  function goNext() {
    if (canGoNext) currentIndex += 1;
  }
  function goTo(index: number) {
    currentIndex = index;
  }
</script>

<section class="related" aria-labelledby="related-articles-heading">
  <h2 id="related-articles-heading">関連記事</h2>

  <div class="viewport">
    <ul
      class="track"
      role="region"
      aria-roledescription="carousel"
      aria-label="関連記事カルーセル"
      style:--current-index={currentIndex}
    >
      {#each articles as article, i (article.slug)}
        <li
          class="slide"
          class:is-current={i === currentIndex}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} / ${TOTAL}`}
        >
          <ArticleCard {article} />
        </li>
      {/each}
    </ul>

    <button
      type="button"
      class="nav nav-prev nav-overlay"
      onclick={goPrev}
      disabled={!canGoPrev}
      aria-label="前の記事へ"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      type="button"
      class="nav nav-next nav-overlay"
      onclick={goNext}
      disabled={!canGoNext}
      aria-label="次の記事へ"
    >
      <span aria-hidden="true">›</span>
    </button>
  </div>

  <div class="nav-row">
    <button
      type="button"
      class="nav nav-prev nav-row-button"
      onclick={goPrev}
      disabled={!canGoPrev}
      aria-label="前の記事へ"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      type="button"
      class="nav nav-next nav-row-button"
      onclick={goNext}
      disabled={!canGoNext}
      aria-label="次の記事へ"
    >
      <span aria-hidden="true">›</span>
    </button>
  </div>

  <ul class="dots" role="list">
    {#each articles as article, i (article.slug)}
      <li>
        <button
          type="button"
          class="dot"
          class:is-current={i === currentIndex}
          onclick={() => {
            goTo(i);
          }}
          aria-label={`スライド ${i + 1} / ${TOTAL}`}
          aria-current={i === currentIndex ? 'true' : undefined}
        ></button>
      </li>
    {/each}
  </ul>
</section>

<style>
  .related {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-4);
    margin-block-start: var(--space-12);
  }

  h2 {
    margin-block-end: var(--space-2);
    font-size: var(--font-size-2xl);
    text-align: center;
  }

  .viewport {
    position: relative;
    padding-inline: calc((100% - var(--slide-basis)) / 2);
    overflow: hidden;

    --slide-basis: 78%;
    --slide-gap: var(--space-4);
  }

  .track {
    display: flex;
    gap: var(--slide-gap);
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translateX(
      calc(-1 * var(--current-index) * (var(--slide-basis) + var(--slide-gap)))
    );
    transition: transform var(--duration-base) var(--ease-out);
  }

  .slide {
    flex: 0 0 var(--slide-basis);
    opacity: 0.5;
    transition: opacity var(--duration-base) var(--ease-out);

    &.is-current {
      opacity: 1;
    }
  }

  .nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 44px;
    block-size: 44px;
    padding: 0;
    font-size: var(--font-size-2xl);
    line-height: 1;
    color: var(--color-fg);
    cursor: pointer;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 50%;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &:focus-visible {
      outline: var(--focus-ring);
      outline-offset: var(--focus-ring-offset);
    }
  }

  .nav-overlay {
    position: absolute;
    inset-block-start: 50%;
    z-index: 1;
    transform: translateY(-50%);

    &.nav-prev {
      inset-inline-start: var(--space-2);
    }

    &.nav-next {
      inset-inline-end: var(--space-2);
    }
  }

  .nav-row {
    display: flex;
    column-gap: var(--space-4);
    justify-content: center;
  }

  .dots {
    display: flex;
    column-gap: var(--space-2);
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .dot {
    inline-size: 12px;
    block-size: 12px;
    padding: 0;
    cursor: pointer;
    background-color: var(--color-bg);
    border: 1px solid var(--color-fg);
    border-radius: 50%;

    &.is-current {
      background-color: var(--color-fg);
    }

    &:focus-visible {
      outline: var(--focus-ring);
      outline-offset: var(--focus-ring-offset);
    }
  }

  /* Desktop: overlay nav, hide row */
  @media (768px <= width) {
    .viewport {
      --slide-basis: 60%;
    }

    .nav-row {
      display: none;
    }
  }

  /* Mobile: hide overlay nav, show row */
  @media (width < 768px) {
    .nav-overlay {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .track,
    .slide {
      transition: none;
    }
  }
</style>
