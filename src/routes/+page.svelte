<script lang="ts">
  import { ArrowRightIcon } from 'phosphor-svelte';
  import { onMount } from 'svelte';

  import Seo from '$lib/components/Seo.svelte';
  import { pathMap } from '$lib/utils/path';
  import { wind } from '$lib/utils/wind.svelte';

  const title = 'ymmr.dev';
  const letterAnimationDelayMs = 70;
  const letterDurationMs = 700;

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setTimeout(
      () => {
        wind.blow();
      },
      (title.length - 1) * letterAnimationDelayMs + letterDurationMs,
    );

    return () => {
      clearTimeout(timer);
    };
  });
</script>

<Seo title="ymmr.dev" description="Notes about programming and things on my mind." />

<main class="base">
  <div class="hero">
    <h1 class="title">
      <span class="visually-hidden">{title}</span>
      <span aria-hidden="true">
        {#each title as letter, index (index)}
          <span class="letter" style:--index={index}>{letter}</span>
        {/each}
      </span>
    </h1>

    <p class="description">Notes about programming and things on my mind.</p>

    <a class="cta" href={pathMap['/articles'].get()}>
      Read articles
      <span class="cta-icon"><ArrowRightIcon size={20} aria-hidden="true" /></span>
    </a>
  </div>
</main>

<style>
  .base {
    display: grid;
    flex: 1;
    place-items: center;
  }

  .hero {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-6);
    align-items: center;
    padding-block-end: var(--space-12);
    text-align: center;
  }

  .title {
    font-size: clamp(3rem, 10vw, 4.5rem);
    font-style: italic;
    font-weight: var(--font-weight-light);
    line-height: var(--leading-tight);
  }

  .letter {
    display: inline-block;
    animation: letter-in var(--letter-duration) var(--ease-out) both;
    animation-delay: calc(var(--index) * var(--letter-stagger));

    --letter-duration: 700ms;
    --letter-stagger: 70ms;
  }

  @keyframes letter-in {
    0% {
      opacity: 0;
      filter: blur(6px);
      transform: translate(-1.2em, 0.2em) rotate(-6deg);
    }

    60% {
      filter: blur(0);
    }

    100% {
      opacity: 1;
      filter: blur(0);
      transform: translate(0, 0) rotate(0deg);
    }
  }

  .description {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-light);
    animation: fade-up var(--duration-slow) var(--ease-out) both;
    animation-delay: 700ms;
  }

  .cta-icon {
    display: inline-flex;
    overflow: hidden;
  }

  .cta {
    display: inline-flex;
    column-gap: var(--space-2);
    align-items: center;
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-size-lg);
    color: currentcolor;
    text-decoration: none;
    border: 1px solid var(--color-border);
    border-radius: 100vmax;
    animation: fade-up var(--duration-slow) var(--ease-out) both;
    animation-delay: 900ms;

    @media (any-hover: hover) {
      &:hover {
        color: var(--color-accent);
        border-color: var(--color-accent);
      }

      &:hover .cta-icon {
        animation: cta-icon-loop var(--duration-slow) var(--linear-ease-out);
      }
    }

    &:focus-visible {
      outline: var(--focus-ring);
      outline-offset: var(--focus-ring-offset);
    }

    &:focus-visible .cta-icon {
      animation: cta-icon-loop var(--duration-slow) var(--linear-ease-out);
    }
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes cta-icon-loop {
    0% {
      opacity: 1;
      transform: translateX(0);
    }

    45% {
      opacity: 0;
      transform: translateX(160%);
    }

    55% {
      opacity: 0;
      transform: translateX(-160%);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .visually-hidden {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }

  @media (prefers-reduced-motion: reduce) {
    .letter,
    .description,
    .cta {
      animation: none;
    }

    .cta:hover .cta-icon,
    .cta:focus-visible .cta-icon {
      animation: none;
    }
  }
</style>
