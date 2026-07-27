<script lang="ts">
  const { children } = $props();
</script>

<main class="base">
  {@render children()}
</main>

<style>
  .base {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-block: 64px 128px;
  }
</style>
