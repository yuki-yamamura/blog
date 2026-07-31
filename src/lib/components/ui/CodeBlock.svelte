<script lang="ts">
  import type { Snippet } from 'svelte';

  const COPIED_RESET_DELAY_MS = 1500;

  const props: { children: Snippet; class?: string; style?: string } = $props();

  let codeEl: HTMLPreElement | undefined = $state();
  let isCopied = $state(false);

  async function copy() {
    if (!codeEl) {
      return;
    }
    await navigator.clipboard.writeText(codeEl.textContent.replaceAll(' ', ' '));
    isCopied = true;
    setTimeout(() => (isCopied = false), COPIED_RESET_DELAY_MS);
  }
</script>

<div class="code-block-wrapper">
  <button type="button" class="copy-button" onclick={copy} aria-label="Copy code">
    {isCopied ? 'Copied' : 'Copy'}
  </button>
  <pre bind:this={codeEl} class={props.class} style={props.style}>{@render props.children()}</pre>
</div>

<style>
  .code-block-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }

  pre {
    padding: var(--space-4);
    overflow-x: auto;
    line-height: var(--leading-none);
    white-space: pre;
    counter-reset: line;

    :global(code .line) {
      display: block;
      counter-increment: line;
    }

    :global(code .line)::before {
      display: inline-block;
      inline-size: 2em;
      padding-inline-end: 1em;
      color: rgb(0 0 0 / 30%);
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

    &:hover,
    &:focus-visible {
      color: rgb(0 0 0 / 90%);
      background-color: rgb(255 255 255 / 90%);
      border-color: rgb(0 0 0 / 90%);
    }
  }
</style>
