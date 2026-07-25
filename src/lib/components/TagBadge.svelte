<script lang="ts">
	import type { Tag } from '$lib/models/tag';
	import Badge from './ui/Badge.svelte';
	const { slug }: { slug: Tag } = $props();

	const tagMap = {
		diary: {
			label: 'Diary',
			color: 'gray'
		},
		typescript: {
			label: 'TypeScript',
			color: 'blue'
		},
		vitest: {
			label: 'Vitest',
			color: 'green'
		}
	} as const satisfies Record<Tag, { label: string; color: string }>;
	const tag = $derived(tagMap[slug]);
</script>

<Badge label={tag.label} color={tag.color} />
