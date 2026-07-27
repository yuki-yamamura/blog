---
publishDate: 2026-07-23
title: Practicing implementing utility types
tags:
  - typescript
thumbnailFilename: Podcast.png
---

TypeScript provides a lot of utility types. These are not only convenient but also teach us TypeScript syntax. For example, `Pick` is used to create a type that selects specific properties from an object. We can learn four important syntax features from this:

- [generic parameter and extends keyword](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [keyof type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [indexed access types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

So that's a good way to get familiar with and remember type operations, I think.

```typescript
type Profile = {
  name: string;
  age: number;
  blog: string;
  description: string;
};

type Pick2<T, U extends keyof T> = {
  [K in U]: T[K];
};

// type Bio = Pick<Profile, "blog" | "description"> -> { blog: string; description: string; }
type Bio = Pick2<Profile, 'blog' | 'description'>;
const bio: Bio = {
  blog: 'https://ymmr.dev',
  description: 'xxxx',
};
```
