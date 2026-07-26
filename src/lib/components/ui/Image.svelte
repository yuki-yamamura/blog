<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import type { AllNonNullable } from '$lib/types/all-non-nullable';
	import { page } from '$app/state';
	import { transformImageUrl } from '../../utils/image';

	const props: AllNonNullable<Pick<HTMLImgAttributes, 'src' | 'alt' | 'width' | 'height'>> &
		Omit<HTMLImgAttributes, 'src' | 'alt' | 'width' | 'height'> = $props();
	const optimizedImageUrl = $derived(
		transformImageUrl({
			src: props.src,
			width: props.width,
			height: props.height,
			hostname: page.url.hostname
		})
	);
</script>

<img {...props} src={optimizedImageUrl} />
