<script lang="ts">
  import { pathMap } from '$lib/utils/path';

  type Pagination = {
    currentPage: number;
    displayPages: number[];
    shouldShowPagination: boolean;
  };

  const { pagination }: { pagination: Pagination } = $props();
</script>

{#if pagination.shouldShowPagination}
  <nav class="base">
    <ul role="list" class="items">
      {#each pagination.displayPages as page (page)}
        <li class="item" aria-current={page === pagination.currentPage ? 'page' : undefined}>
          <a href={`${pathMap['/articles'].get()}?page=${String(page)}`} class="link">
            {page}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style>
  .base {
    display: flex;
    justify-content: center;
  }

  .items {
    display: flex;
    justify-content: center;
    column-gap: 12px;
    list-style: none;
    width: 100%;
    padding: 0;
  }

  .item {
    padding: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid;

    &[aria-current='page'] {
      border-color: #000;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' seed='4' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='1.2'/%3E%3C/filter%3E%3Cline x1='-2' y1='8' x2='8' y2='-2' stroke='%23000000' stroke-width='1' stroke-linecap='round' opacity='0.4' filter='url(%23w)'/%3E%3C/svg%3E");
      background-size: 6px 6px;
      pointer-events: none;
    }

    @media (any-hover: hover) {
      &:hover {
        color: #1e7bdf;
      }
    }

    &:focus-visible {
      color: #1e7bdf;
    }
  }

  .link {
    color: currentcolor;
    text-decoration: none;
  }
</style>
