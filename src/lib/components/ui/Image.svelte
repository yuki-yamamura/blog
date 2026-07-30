<script lang="ts">
  import { transformImageUrl } from '$lib/utils/image';

  import ImageZoomModal from './ImageZoomModal.svelte';

  import type { AllNonNullable } from '$lib/types/all-non-nullable';
  import type { HTMLImgAttributes } from 'svelte/elements';

  import { page } from '$app/state';

  type ImgProps = AllNonNullable<Pick<HTMLImgAttributes, 'alt' | 'height' | 'src' | 'width'>> &
    Omit<HTMLImgAttributes, 'alt' | 'height' | 'src' | 'width'>;

  const { zoomable = true, ...props }: ImgProps & { zoomable?: boolean } = $props();

  let isModalOpen = $state(false);

  const hostname = $derived(page.url.hostname);
  const src1x = $derived(
    transformImageUrl({
      height: Number(props.height),
      hostname,
      src: props.src,
      width: Number(props.width),
    }),
  );
  const src2x = $derived(
    transformImageUrl({
      height: Number(props.height) * 2,
      hostname,
      src: props.src,
      width: Number(props.width) * 2,
    }),
  );
  const srcset = $derived(`${src2x} 2x`);
</script>

{#if zoomable}
  <button
    type="button"
    class="image-trigger"
    aria-label={`Zoom in on ${props.alt}`}
    onclick={() => (isModalOpen = true)}
  >
    <img {...props} src={src1x} {srcset} />
  </button>
  {#if isModalOpen}
    <ImageZoomModal
      src={props.src}
      alt={props.alt}
      width={Number(props.width)}
      height={Number(props.height)}
      onClose={() => (isModalOpen = false)}
    />
  {/if}
{:else}
  <img {...props} src={src1x} {srcset} />
{/if}

<style>
  .image-trigger {
    display: block;
    inline-size: 100%;
    padding: 0;
    text-align: center;
    cursor: zoom-in;
    background: none;
    border: none;
  }
</style>
