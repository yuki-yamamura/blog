<script lang="ts">
  import type { Snippet } from 'svelte';

  const props: { children: Snippet; class: string; style: string } = $props();

  let codeBlock: HTMLPreElement | undefined = $state();
  let isCopied = $state(false);

  async function copy() {
    if (!codeBlock) {
      return;
    }

    await navigator.clipboard.writeText(codeBlock.textContent);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 1500);
  }
</script>

<div class="base">
  <button type="button" class="copy-button" onclick={copy} aria-label="Copy code">
    {isCopied ? 'Copied' : 'Copy'}
  </button>
  <pre
    bind:this={codeBlock}
    class={props.class}
    style={props.style}>{@render props.children()}</pre>
</div>

<style>
  .base {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  pre {
    padding: var(--space-4) var(--space-4) var(--space-4) calc(var(--space-4) + 3em);
    overflow-x: auto;
    line-height: var(--leading-normal);
    tab-size: 4;
    white-space: pre;
    counter-reset: line;

    :global(code .line) {
      position: relative;
      display: block;
      min-block-size: 1lh;
      counter-increment: line;
    }

    :global(code .line)::before {
      position: absolute;
      inset-inline-start: -3em;
      inline-size: 2em;
      color: var(--color-neutral-300);
      text-align: end;
      user-select: none;
      content: counter(line);
    }
  }

  .copy-button {
    position: absolute;
    inset-block-start: 24px;
    inset-inline-end: 8px;
    min-inline-size: 56px;
    padding: 2px var(--space-2);
    font-size: var(--font-size-2xs);
    color: rgb(0 0 0 / 30%);
    text-align: center;
    cursor: pointer;
    background-color: rgb(255 255 255 / 30%);
    border: 1px solid rgb(0 0 0 / 30%);
    border-radius: 4px;
    transition:
      color var(--duration-fast),
      background-color var(--duration-fast),
      border-color var(--duration-fast);

    @media (any-hover: hover) {
      &:hover {
        color: rgb(0 0 0 / 90%);
        background-color: rgb(255 255 255 / 90%);
        border-color: rgb(0 0 0 / 90%);
      }
    }

    &:focus-visible {
      color: rgb(0 0 0 / 90%);
      background-color: rgb(255 255 255 / 90%);
      border-color: rgb(0 0 0 / 90%);
    }
  }
</style>
