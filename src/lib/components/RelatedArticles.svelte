<script lang="ts">
  import { ArrowLeftIcon, ArrowRightIcon } from 'phosphor-svelte';

  import ArticleCard from './ArticleCard.svelte';

  import type { ArticleDetail } from '$lib/models/article';

  const { articles }: { articles: ArticleDetail['relatedArticles'] } = $props();

  const TOTAL = 5;
  const INITIAL_INDEX = 2;

  class Pagination {
    currentIndex = $state(INITIAL_INDEX);
    hasPrevious = $derived(this.currentIndex > 0);
    hasNext = $derived(this.currentIndex < TOTAL - 1);

    goPrevious = () => {
      if (this.hasPrevious) {
        this.currentIndex -= 1;
      }
    };

    goNext = () => {
      if (this.hasNext) {
        this.currentIndex += 1;
      }
    };

    goTo = (index: number) => {
      if (0 <= index && index < TOTAL) {
        this.currentIndex = index;
      }
    };
  }

  const pagination = new Pagination();
</script>

<section class="base" aria-labelledby="related-articles-heading">
  <h2 id="related-articles-heading">Read Next</h2>

  <div class="viewport">
    <ul
      class="track"
      role="region"
      aria-roledescription="carousel"
      aria-label="Related articles carousel"
      style:--current-index={pagination.currentIndex}
    >
      {#each articles as article, index (article.slug)}
        <li
          class="slide"
          class:is-current={index === pagination.currentIndex}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} / ${TOTAL}`}
        >
          <ArticleCard {article} />
        </li>
      {/each}
    </ul>

    <button
      type="button"
      class="nav nav-prev nav-overlay"
      onclick={pagination.goPrevious}
      disabled={!pagination.hasPrevious}
      aria-label="Go to previous article"
    >
      <span class="nav-icon"><ArrowLeftIcon size={20} aria-hidden="true" /></span>
    </button>
    <button
      type="button"
      class="nav nav-next nav-overlay"
      onclick={pagination.goNext}
      disabled={!pagination.hasNext}
      aria-label="Go to next article"
    >
      <span class="nav-icon"><ArrowRightIcon size={20} aria-hidden="true" /></span>
    </button>
  </div>

  <div class="nav-row">
    <button
      type="button"
      class="nav nav-prev nav-row-button"
      onclick={pagination.goPrevious}
      disabled={!pagination.hasPrevious}
      aria-label="Go to previous article"
    >
      <span class="nav-icon"><ArrowLeftIcon size={20} aria-hidden="true" /></span>
    </button>
    <button
      type="button"
      class="nav nav-next nav-row-button"
      onclick={pagination.goNext}
      disabled={!pagination.hasNext}
      aria-label="Go to next article"
    >
      <span class="nav-icon"><ArrowRightIcon size={20} aria-hidden="true" /></span>
    </button>
  </div>

  <ul class="dots" role="list">
    {#each articles as article, index (article.slug)}
      <li>
        <button
          type="button"
          class="dot"
          class:is-current={index === pagination.currentIndex}
          onclick={() => {
            pagination.goTo(index);
          }}
          aria-label={`${index + 1} / ${TOTAL}`}
          aria-current={index === pagination.currentIndex ? 'true' : undefined}
        ></button>
      </li>
    {/each}
  </ul>
</section>

<style>
  .base {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-4);
  }

  h2 {
    margin-block-end: var(--space-2);
    font-size: var(--font-size-2xl);
    text-align: start;
  }

  .viewport {
    position: relative;
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
      calc(
        (100% - var(--slide-basis)) / 2 - var(--current-index) *
          (var(--slide-basis) + var(--slide-gap))
      )
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

  .nav-icon {
    display: inline-flex;
  }

  .nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 44px;
    block-size: 44px;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 100vmax;
    box-shadow: 0 2px 6px rgb(0 0 0 / 20%);

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    &:focus-visible {
      outline: var(--focus-ring);
      outline-offset: var(--focus-ring-offset);
    }

    &.nav-prev {
      --nav-direction: -1;
    }

    &.nav-next {
      --nav-direction: 1;
    }

    &:hover:not(:disabled) .nav-icon,
    &:focus-visible:not(:disabled) .nav-icon {
      animation: nav-icon-loop var(--duration-slow) var(--linear-ease-out);
    }
  }

  /* Slides the icon out toward the travel direction, then back in from the opposite edge. */
  @keyframes nav-icon-loop {
    0% {
      opacity: 1;
      transform: translateX(0);
    }

    45% {
      opacity: 0;
      transform: translateX(calc(var(--nav-direction) * 160%));
    }

    55% {
      opacity: 0;
      transform: translateX(calc(var(--nav-direction) * -160%));
    }

    100% {
      opacity: 1;
      transform: translateX(0);
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

  @media (768px <= width) {
    .viewport {
      --slide-basis: 60%;
    }

    .nav-row {
      display: none;
    }
  }

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

    .nav:hover:not(:disabled) .nav-icon,
    .nav:focus-visible:not(:disabled) .nav-icon {
      animation: none;
    }
  }
</style>
