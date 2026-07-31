<script lang="ts">
  const props: {
    description: string;
    href: string;
    image: string;
    title: string;
  } = $props();

  const hostname = $derived(new URL(props.href).hostname);
</script>

<a href={props.href} target="_blank" rel="noopener noreferrer" class="base">
  <div class="card">
    <div class="image-wrapper">
      {#if props.image}
        <img src={props.image} alt="" class="image" />
      {:else}
        <div class="placeholder"></div>
      {/if}
    </div>
    <div class="info">
      <p class="title">{props.title}</p>
      <p class="description">{props.description}</p>
      <p class="hostname">{hostname}</p>
    </div>
  </div>
</a>

<style>
  .base {
    display: block;
    color: currentcolor;
    text-decoration: none;
  }

  .card {
    display: flex;
    min-block-size: 126px;
    overflow: hidden;
    background-color: var(--color-bg);
    border: 1px solid black;
    border-radius: 1px;
    transition: background-color var(--duration-base) var(--ease-out);

    &:focus-visible,
    :global(a:focus-visible) & {
      background-color: rgb(from var(--color-bg) r g b / 80%);
    }

    @media (any-hover: hover) {
      &:hover {
        background-color: rgb(from var(--color-bg) r g b / 80%);
      }
    }
  }

  .image-wrapper {
    flex-shrink: 0;
    align-self: stretch;
    inline-size: 30%;
    overflow: hidden;
  }

  .image {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    transition: transform var(--duration-base) var(--ease-out);

    .card:hover &,
    .card:focus-visible & {
      transform: scale(1.05);
    }
  }

  .placeholder {
    inline-size: 100%;
    block-size: 100%;
    background-image: linear-gradient(135deg, var(--color-accent), var(--color-bg));
    transition: transform var(--duration-base) var(--ease-out);

    .card:hover &,
    .card:focus-visible & {
      transform: scale(1.05);
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    row-gap: var(--space-1);
    justify-content: center;
    min-inline-size: 0;
    padding: var(--space-3) var(--space-4);
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: var(--font-weight-bold);
    white-space: nowrap;
  }

  .description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    font-size: var(--font-size-sm);
    -webkit-box-orient: vertical;
  }

  .hostname {
    font-size: var(--font-size-xs);
    color: var(--color-accent);
  }
</style>
