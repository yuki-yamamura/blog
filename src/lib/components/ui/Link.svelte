<script lang="ts">
	import type { Snippet } from 'svelte';

	const { href, children }: { href: string; children: Snippet } = $props();
</script>

<a {href} class="base">
	{@render children()}
</a>

<style>
	.base {
		color: var(--accent-color);
		text-decoration: underline;

		@media (any-hover: hover) {
			&:hover {
				text-decoration: none;
			}
		}

		&:focus-visible {
			text-decoration: none;
		}
	}
</style>
