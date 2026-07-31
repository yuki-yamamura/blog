<script lang="ts">
  import { cva } from 'class-variance-authority';

  import type { VariantProps } from 'class-variance-authority';

  const badge = cva('base', {
    defaultVariants: {
      color: 'gray',
    },
    variants: {
      color: {
        blue: 'blue',
        gray: 'gray',
        green: 'green',
        orange: 'orange',
        sky: 'sky',
      },
    },
  });

  const { color, label }: VariantProps<typeof badge> & { label: string } = $props();
</script>

<span class={badge({ color })}>{label}</span>

<style>
  .base {
    display: inline-block;
    padding: 2px 10px;
    font-size: var(--font-size-sm);
    border-radius: 100vmax;
  }

  .gray {
    background-color: var(--color-badge-gray);
  }

  .blue {
    background-color: var(--color-badge-blue);
  }

  .green {
    background-color: var(--color-badge-green);
  }

  .orange {
    background-color: var(--color-badge-orange);
  }

  .sky {
    background-color: var(--color-badge-sky);
  }
</style>
