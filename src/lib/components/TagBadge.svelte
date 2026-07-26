<script lang="ts">
  import Badge from './ui/Badge.svelte';

  import type { Tag } from '$lib/models/tag';

  const { slug }: { slug: Tag } = $props();

  const tagMap = {
    diary: {
      color: 'gray',
      label: 'Diary',
    },
    typescript: {
      color: 'blue',
      label: 'TypeScript',
    },
    vitest: {
      color: 'green',
      label: 'Vitest',
    },
  } as const satisfies Record<Tag, { color: string; label: string }>;
  const tag = $derived(tagMap[slug]);
</script>

<Badge label={tag.label} color={tag.color} />
