<script lang="ts">
  const props: {
    alt: string;
    height: number;
    src: string;
    width: number;
    onClose: () => void;
  } = $props();

  const ZOOM_LEVELS = [1, 1.5] as const;

  let zoomLevel: (typeof ZOOM_LEVELS)[number] = $state(1);

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      props.onClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="backdrop" role="presentation" onclick={props.onClose}>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onclick={(event) => {
      event.stopPropagation();
    }}
    onkeydown={(event) => {
      event.stopPropagation();
    }}
  >
    <button type="button" class="close-button" onclick={props.onClose} aria-label="Close">
      &times;
    </button>
    <div class="image-wrapper">
      <img
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        style={`--zoom-level: ${zoomLevel}`}
      />
    </div>
    <div class="zoom-controls">
      {#each ZOOM_LEVELS as level (level)}
        <button
          type="button"
          class="zoom-button"
          aria-current={level === zoomLevel ? 'true' : undefined}
          onclick={() => (zoomLevel = level)}
        >
          {level}x
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
    background-color: rgb(0 0 0 / 70%);
  }

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: var(--space-4);
    align-items: center;
    max-inline-size: 90vw;
    max-block-size: 90vh;
  }

  .close-button {
    position: absolute;
    inset-block-start: -16px;
    inset-inline-end: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 32px;
    block-size: 32px;
    font-size: var(--font-size-xl);
    color: black;
    cursor: pointer;
    background-color: white;
    border: none;
    border-radius: 50%;
  }

  .image-wrapper {
    max-inline-size: 90vw;
    max-block-size: 80vh;
    overflow: auto;

    img {
      display: block;
      inline-size: calc(var(--zoom-level) * 100%);
      max-inline-size: none;
      block-size: auto;
    }
  }

  .zoom-controls {
    display: flex;
    column-gap: var(--space-3);
  }

  .zoom-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    padding: var(--space-1) var(--space-3);
    color: white;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid white;
    border-radius: 50%;

    &[aria-current='true'] {
      color: black;
      background-color: white;
    }
  }
</style>
