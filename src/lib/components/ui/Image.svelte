<script lang="ts">
  import { transformImageUrl } from '$lib/utils/image';

  import type { AllNonNullable } from '$lib/types/all-non-nullable';
  import type { BasicImageTransformations } from '@cloudflare/workers-types';
  import type { HTMLImgAttributes } from 'svelte/elements';

  import { page } from '$app/state';

  const {
    fit = 'cover',
    ...imgProps
  }: AllNonNullable<Pick<HTMLImgAttributes, 'alt' | 'height' | 'src' | 'width'>> &
    Omit<HTMLImgAttributes, 'alt' | 'height' | 'src' | 'width'> &
    Pick<BasicImageTransformations, 'fit'> = $props();

  const hostname = $derived(page.url.hostname);
  const src1x = $derived(
    transformImageUrl({
      fit,
      height: Number(imgProps.height),
      hostname,
      src: imgProps.src,
      width: Number(imgProps.width),
    }),
  );
  const src2x = $derived(
    transformImageUrl({
      fit,
      height: Number(imgProps.height) * 2,
      hostname,
      src: imgProps.src,
      width: Number(imgProps.width) * 2,
    }),
  );
  const srcset = $derived(`${src2x} 2x`);
</script>

<img {...imgProps} src={src1x} {srcset} />
