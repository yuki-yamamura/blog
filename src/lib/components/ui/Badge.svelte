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
  /* Chromatic colors share oklch(90% 0.06 <hue>) so that only the hue varies. */
  .base {
    display: inline-block;
    padding: 2px 10px;
    font-size: 14px;
    background-color: oklch(95% 0 0deg);
    border-radius: 100vmax;
  }

  .gray {
    background-color: oklch(95.5% 0 0deg);
  }

  .blue {
    background-color: oklch(90% 0.06 251deg);
  }

  .green {
    background-color: oklch(90% 0.06 163deg);
  }

  .orange {
    background-color: oklch(90% 0.06 54deg);
  }

  .sky {
    background-color: oklch(90% 0.06 215deg);
  }
</style>
