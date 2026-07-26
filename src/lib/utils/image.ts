import type { BasicImageTransformations } from '@cloudflare/workers-types';
import type { HTMLImgAttributes } from 'svelte/elements';
import type { AllNonNullable } from '../types/all-non-nullable';
import { PRODUCTION_HOSTNAME } from '$app/env/public';

export function transformImageUrl({
	src,
	width,
	height,
	fit = 'cover',
	hostname
}: AllNonNullable<Pick<HTMLImgAttributes, 'src' | 'width' | 'height'>> &
	Pick<BasicImageTransformations, 'fit'> & {
		hostname: string;
	}): string {
	const isProduction = hostname === PRODUCTION_HOSTNAME;
	if (!isProduction) {
		return src;
	}

	return `/cdn-cgi/image/height=${height},width=${width},fit=${fit},format=auto${src}`;
}
