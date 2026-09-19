<script lang="ts">
  import coffee from '$lib/assets/images/coffee.svg';
  import emptyBox from '$lib/assets/images/empty-box.svg';
  import Image from '$lib/components/ui/Image.svelte';

  import { page } from '$app/state';
</script>

<main class="base">
  <div class="content">
    {#if page.error?.status === 404}
      <Image src={emptyBox} alt="Empty box" width="200" height="200" />
      <div>404 Not Found</div>
    {:else}
      <Image src={coffee} alt="Coffee" width="200" height="200" />
      <div>Something went wrong</div>
    {/if}
  </div>
</main>

<style>
  .base {
    display: grid;
    flex: 1;
    place-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    align-items: center;
  }
</style>
