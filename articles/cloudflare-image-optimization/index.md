---
publishDate: 2026-07-28
title: Cloudflare image optimization and srcset attribute of the <img /> tag
tags:
  - cloudflare
  - html
---

I set up image transformation for my blog using [Cloudflare's image optimization](https://developers.cloudflare.com/images/optimization/features/). This feature transforms images on a CDN server and serves lighter images.
During introduction, I needed to consider when to create optimized images and how to handle them on the client. Let's look at each.

## Enabling optimization only in production

`https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>` is the shape of an optimized image URL. The image is created on the first request to the production zone, so if we access the images before that from a local development server or a [preview URL](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/), we'll see a 404 message.

That's why we should check the environment and turn on the optimization only in production.

```ts
import type { AllNonNullable } from '$lib/types/all-non-nullable';
import type { BasicImageTransformations } from '@cloudflare/workers-types';
import type { HTMLImgAttributes } from 'svelte/elements';

import { PRODUCTION_HOSTNAME } from '$app/env/public';

export function transformImageUrl({
  fit = 'cover',
  height,
  hostname,
  src,
  width,
}: AllNonNullable<Pick<HTMLImgAttributes, 'height' | 'src' | 'width'>> &
  Pick<BasicImageTransformations, 'fit'> & {
    hostname: string;
  }): string {
  const isProduction = hostname === PRODUCTION_HOSTNAME;
  if (!isProduction) {
    return src;
  }

  return `/cdn-cgi/image/height=${height},width=${width},fit=${fit},format=auto${src}`;
}
```

## Serving adaptive images

After deployment, I noticed that the thumbnail on the card degrades slightly. This is because I used a device with a high-resolution screen (WQHD) and there was only one version of the optimized image. Every device will get the same size image regardless of its screen resolution.

To solve this problem, I implemented the image component to handle two sizes of images using the [srcset attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images#resolution_switching_same_size_different_resolutions), so that the bigger one is served when appropriate.

```svelte
<!-- in Image.svelte -->
<script lang="ts">
  import { transformImageUrl } from '$lib/utils/image';

  import type { AllNonNullable } from '$lib/types/all-non-nullable';
  import type { HTMLImgAttributes } from 'svelte/elements';

  import { page } from '$app/state';

  const props: AllNonNullable<Pick<HTMLImgAttributes, 'alt' | 'height' | 'src' | 'width'>> &
    Omit<HTMLImgAttributes, 'alt' | 'height' | 'src' | 'width'> = $props();

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

<img {...props} src={src1x} {srcset} />

<!-- on the caller side -->
<Image
  src={article.thumbnail}
  alt={`${article.title}'s thumbnail`}
  width="200"
  height="200"
  class="thumbnail"
/>
```

## References

https://developers.cloudflare.com/images/optimization/features/

https://developers.cloudflare.com/images/optimization/transformations/overview/
