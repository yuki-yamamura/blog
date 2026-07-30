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
    background-color: var(--color-background);
    border: 1px solid black;
    border-radius: 1px;
    transition: background-color 0.3s ease;

    &:focus-visible,
    :global(a:focus-visible) & {
      background-color: rgb(from var(--color-background) r g b / 80%);
    }

    @media (any-hover: hover) {
      &:hover {
        background-color: rgb(from var(--color-background) r g b / 80%);
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
    transition: transform 0.3s ease;

    .card:hover &,
    .card:focus-visible & {
      transform: scale(1.05);
    }
  }

  .placeholder {
    inline-size: 100%;
    block-size: 100%;
    background-image: linear-gradient(135deg, var(--color-accent), var(--color-background));
    transition: transform 0.3s ease;

    .card:hover &,
    .card:focus-visible & {
      transform: scale(1.05);
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    justify-content: center;
    min-inline-size: 0;
    padding: 12px 16px;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    white-space: nowrap;
  }

  .description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    font-size: 14px;
    -webkit-box-orient: vertical;
  }

  .hostname {
    font-size: 12px;
    color: var(--color-accent);
  }
</style>
