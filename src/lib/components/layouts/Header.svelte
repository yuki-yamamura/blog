<script>
  import { pathMap } from '$lib/utils/path';
</script>

<header class="base">
  <div class="inner">
    <a href={pathMap['/'].get()} class="logo link"> ymmr.dev</a>
    <nav class="navigation">
      <a href={pathMap['/articles'].get()} class="navigation-item link">Articles</a>
      <a href={pathMap['/about'].get()} class="navigation-item link">About</a>
    </nav>
  </div>
</header>

<style>
  .base {
    display: flex;
    justify-content: center;
    inline-size: 100vw;
    block-size: 64px;
    margin-inline: calc(50% - 50vw);

    /* the bottom border is a wavy hand-drawn line; a data URI can't reference
     CSS custom properties, so the stroke hardcodes --border-solid-color */
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='5' viewBox='0 0 240 5'%3E%3Cpath d='M0 2.5C30 1.6 60 3.4 90 2.3C120 1.4 150 3.2 180 2.8C210 2.5 225 2 240 2.5' fill='none' stroke='%238a8988' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")
      repeat-x bottom;
  }

  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    inline-size: 100%;
    max-inline-size: 1280px;
    margin-inline: auto;

    @media (768px <= width) {
      padding-inline: 8px;
    }
  }

  .logo {
    font-size: 1.5rem;
    font-style: italic;
    font-weight: 200;
  }

  .navigation {
    display: flex;
    column-gap: 24px;
  }

  .navigation-item {
    font-size: 1.25rem;
    font-weight: 200;
  }

  .link {
    color: currentcolor;
    text-decoration: none;

    @media (any-hover: hover) {
      &:hover {
        color: var(--color-accent);
      }
    }

    &:focus-visible {
      color: var(--color-accent);
    }
  }
</style>
