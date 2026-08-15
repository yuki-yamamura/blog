---
publishDate: 2026-08-15
title: AllOrNone type in TypeScript
tags:
  - typescript
---

Sometimes when creating a type, we want to make sure that all properties are specified, or none of them are. The `AllOrNone` type below is useful for defining more precise types.

```ts
type AllOrNone<T extends object> =
  | {
      [K in keyof T]: T[K];
    }
  | {
      [K in keyof T]?: never;
    };

type Size = {
  height: number;
  width: number;
};

type Props = AllOrNone<Size>;

const all: Props = { height: 200, width: 200 };
const none: Props = {};

// Property 'width' is missing in type '{ height: number; }' but required in type '{ height: number; width: number; }'.
const either1: Props = { height: 200 };
// Property 'height' is missing in type '{ width: number; }' but required in type '{ height: number; width: number; }'.
const either2: Props = { width: 200 };
```
