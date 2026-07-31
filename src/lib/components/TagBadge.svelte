<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte';

  import type { Tag } from '$lib/models/tag';
  import type { ComponentProps } from 'svelte';

  const { tag }: { tag: Tag } = $props();

  const tagMap = {
    cloudflare: {
      color: 'orange',
      label: 'Cloudflare',
    },
    diary: {
      color: 'gray',
      label: 'Diary',
    },
    html: {
      color: 'sky',
      label: 'HTML',
    },
    typescript: {
      color: 'blue',
      label: 'TypeScript',
    },
    vitest: {
      color: 'green',
      label: 'Vitest',
    },
  } as const satisfies Record<Tag, { color: ComponentProps<typeof Badge>['color']; label: string }>;
  const { color, label } = $derived(tagMap[tag]);
</script>

<Badge {label} {color} />
