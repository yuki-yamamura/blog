<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/reset.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="base">
	{@render children()}
</div>

<style>
	.base {
		margin-inline: auto;
		max-width: 1280px;
		padding: 4px;

		@media (768px <= width) {
			padding: 8px;
		}
	}
</style>
