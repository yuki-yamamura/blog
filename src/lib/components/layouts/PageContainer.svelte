<script lang="ts">
  const { children } = $props();
</script>

<main class="base">
  {@render children()}
</main>

<style>
  .base {
    padding-block: 64px 128px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
