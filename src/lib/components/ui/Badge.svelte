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
    font-size: 14px;
    background-color: #eee;
    border-radius: 100vmax;
  }

  .gray {
    background-color: #f0f0f0;
  }

  .blue {
    background-color: #bcdcff;
  }

  .green {
    background-color: #c3ecd7;
  }
</style>
