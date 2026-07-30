---
publishDate: 2026-07-30
title: Rendering Showcase
tags:
  - diary
---

## Heading level 2

Some intro paragraph with **bold**, _italic_, and `inline code` mixed in.

### Heading level 3

#### Heading level 4

> This is a blockquote.
> Second line of the same quote.

## Code blocks

TypeScript with diff and highlight:

```ts
function greet(name: string) {
  console.log('old'); // [!code --]
  console.log(`Hello, ${name}!`); // [!code ++]
  return name.length; // [!code highlight]
}
```

Svelte:

```svelte
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

TSX:

```tsx
export function Foo({ name }: { name: string }) {
  return <div>{name}</div>;
}
```

SQL:

```sql
SELECT id, title FROM articles WHERE published = true;
```

Mermaid:

```mermaid
graph TD
  A --> B
```

Shell:

```shell
pnpm build && pnpm preview
```

Plain text:

```text
just plain text
```

## Lists

Unordered nested:

- First
- Second
  - Nested A
  - Nested B
    - Deep
- Third

Ordered nested:

1. One
2. Two
   1. Two-A
   2. Two-B
3. Three

## Table

| Name | Value |
| ---- | ----- |
| foo  | 1     |
| bar  | 2     |

## Links

Inline: [Svelte](https://svelte.dev) is a UI framework.

Link inside a list (should NOT become a card):

- Check https://example.com for details

## Content image

![Content image alt text](./content-image.png)

## Small image (should center, not stretch)

![Small image](./small-image.png)

## LinkCard (bare URL alone in paragraph)

https://svelte.dev

## LinkCard placeholder (unreachable URL)

https://this-domain-definitely-does-not-exist-12345.invalid

https://vite.dev/guide/env-and-mode

https://vite.dev/guide/env-and-mode
