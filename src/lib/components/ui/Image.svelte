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
			width: Number(props.width)
		})
	);
	const src2x = $derived(
		transformImageUrl({
			height: Number(props.height) * 2,
			hostname,
			src: props.src,
			width: Number(props.width) * 2
		})
	);
	const srcset = $derived(`${src2x} 2x`);
</script>

<img {...props} src={src1x} {srcset} />
