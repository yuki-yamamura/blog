<script lang="ts">
	const { children } = $props();
</script>

<main class="base">
	{@render children()}
</main>

<style>
	.base {
		padding-block-start: 64px;
		padding-block-end: 128px;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
