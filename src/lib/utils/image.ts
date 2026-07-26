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

  return `/cdn-cgi/image/height=${String(height)},width=${String(width)},fit=${fit},format=auto${src}`;
}
