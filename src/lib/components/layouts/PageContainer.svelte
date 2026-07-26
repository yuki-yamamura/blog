<script lang="ts">
	const { children } = $props();
</script>

<main class="base">
	{@render children()}
</main>

<style>
	.base {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-block-start: 64px;
		padding-block-end: 128px;
	}
</style>
