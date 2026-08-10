<script lang="ts">
  import { ArrowLeftIcon, ArrowRightIcon } from 'phosphor-svelte';
  import { onMount } from 'svelte';

  import ArticleCard from '$lib/components/ArticleCard.svelte';

  import type { ArticleDetail } from '$lib/models/article';

  const { articles }: { articles: ArticleDetail['relatedArticles'] } = $props();

  const INITIAL_INDEX = 2;
  let currentIndex = $state(INITIAL_INDEX);
  let scroller = $state<HTMLElement>();
  let slides = $state<HTMLLIElement[]>([]);

  const hasPrevious = $derived(currentIndex > 0);
  const hasNext = $derived(currentIndex < articles.length - 1);

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'auto') => {
    const slide = slides[index];
    if (!scroller || !slide) {
      return;
    }

    scroller.scrollTo({
      behavior,
      left: slide.offsetLeft - (scroller.clientWidth - slide.offsetWidth) / 2,
    });
  };

  const goPrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  const goNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  onMount(() => {
    scrollToIndex(INITIAL_INDEX, 'instant');

    const ratios: number[] = articles.map(() => 0);
    const observedSlides: Element[] = slides;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios[observedSlides.indexOf(entry.target)] = entry.intersectionRatio;
        }

        let mostVisibleIndex = currentIndex;
        let mostVisibleRatio = -1;
        for (const [index, ratio] of ratios.entries()) {
          if (ratio <= mostVisibleRatio) {
            continue;
          }

          mostVisibleIndex = index;
          mostVisibleRatio = ratio;
        }
        currentIndex = mostVisibleIndex;
      },
      {
        root: scroller,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    for (const slide of slides) {
      observer.observe(slide);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<section class="base" aria-labelledby="related-articles-heading">
  <h2 id="related-articles-heading">Read Next</h2>

  <div class="viewport">
    <div
      class="scroller"
      bind:this={scroller}
      role="region"
      aria-roledescription="carousel"
      aria-label="Related articles carousel"
    >
      <ul class="track">
        {#each articles as article, index (article.slug)}
          <li
            class="slide"
            class:is-current={index === currentIndex}
            bind:this={slides[index]}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${articles.length}`}
          >
            <ArticleCard {article} />
          </li>
        {/each}
      </ul>
    </div>

    <button
      type="button"
      class="nav nav-prev nav-overlay"
      onclick={goPrevious}
      disabled={!hasPrevious}
      aria-label="Go to previous article"
    >
      <span class="nav-icon"><ArrowLeftIcon size={20} aria-hidden="true" /></span>
    </button>
    <button
      type="button"
      class="nav nav-next nav-overlay"
      onclick={goNext}
      disabled={!hasNext}
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
          class:is-current={index === currentIndex}
          onclick={() => {
            scrollToIndex(index);
          }}
          aria-label={`${index + 1} / ${articles.length}`}
          aria-current={index === currentIndex ? 'true' : undefined}
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

    --slide-basis: 78%;
    --slide-gap: var(--space-4);
  }

  .scroller {
    /* Horizontal padding is added by the .track spacers so the edge slides can centre. */
    padding-block: var(--space-1);
    overflow-x: auto;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .track {
    display: flex;
    gap: var(--slide-gap);
    padding: 0;
    margin: 0;
    list-style: none;

    /* Spacers that let the first and last slide reach the centre of the scroller. */
    &::before,
    &::after {
      flex: 0 0 max(0px, (100% - var(--slide-basis)) / 2 - var(--slide-gap));
      content: '';
    }
  }

  .slide {
    flex: 0 0 var(--slide-basis);
    scroll-snap-align: center;
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
  }

  @media (width < 768px) {
    .nav-overlay {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scroller {
      scroll-behavior: auto;
    }

    .slide {
      transition: none;
    }

    .nav:hover:not(:disabled) .nav-icon,
    .nav:focus-visible:not(:disabled) .nav-icon {
      animation: none;
    }
  }
</style>
