<script lang="ts">
  import { cva } from 'class-variance-authority';

  import type { VariantProps } from 'class-variance-authority';

  const badge = cva('base', {
    defaultVariants: {
      color: 'gray',
    },
    variants: {
      color: {
        azure: 'azure',
        blue: 'blue',
        gray: 'gray',
        green: 'green',
        orange: 'orange',
        pink: 'pink',
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

  .azure {
    background-color: var(--color-badge-azure);
  }

  .blue {
    background-color: var(--color-badge-blue);
  }

  .gray {
    background-color: var(--color-badge-gray);
  }

  .green {
    background-color: var(--color-badge-green);
  }

  .orange {
    background-color: var(--color-badge-orange);
  }

  .pink {
    background-color: var(--color-badge-pink);
  }

  .sky {
    background-color: var(--color-badge-sky);
  }
</style>
