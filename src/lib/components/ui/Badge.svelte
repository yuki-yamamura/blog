<script lang="ts">
	import { cva } from 'class-variance-authority';
	import type { VariantProps } from 'class-variance-authority';

	const badge = cva('base', {
		variants: {
			color: {
				gray: 'gray',
				blue: 'blue',
				green: 'green'
			} as const
		},
		defaultVariants: {
			color: 'gray'
		}
	});

	const { label, color }: VariantProps<typeof badge> & { label: string } = $props();
</script>

<span class={badge({ color })}>{label}</span>

<style>
	.base {
		display: inline-block;
		padding: 2px 10px;
		border-radius: 100vmax;
		background-color: #eee;
		font-size: 14px;
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
