---
publishDate: 2026-07-24
title: How to verify two types are equal in Vitest
tags:
  - vitest
---

I wrote [a blog post](/articles/practicing-implementing-utility-types) about implementing utility types by ourselves. To check if the two types are the same, the [expectTypeOf](https://vitest.dev/api/expect-typeof) API in Vitest is very convenient.

```typescript
// In utility-type.test-d.ts
import { describe, expectTypeOf, it } from 'vitest';

describe('Pick2', () => {
  it('should pick type of properties specified in second argument from type of first argument', () => {
    // The utility type you want to practice
    type Pick2<T, U extends keyof T> = {
      [K in U]: T[K];
    };

    // The target type
    type Animal = {
      name: string;
      age: number;
    };

    // Execution
    type Actual = Pick2<Animal, 'name'>;
    type Expected = Pick<Animal, 'name'>;

    // Assert the custom type utility with built-in type
    expectTypeOf<Actual>().toEqualTypeOf<Expected>();
  });
});
```

It will fail if you make a mistake, but pass if your implementation is correct.

```
$ npx vitest --typecheck

FAIL   server  src/utility-type.test-d.ts > Pick2 > should pick type of properties specified in second argument from type of first argument
TypeCheckError: Type 'Pick<Animal, "name">' does not satisfy the constraint '{ name "Expected string, Actual never"; }'.
Types of property 'name' are incompatible.
Type 'string' is not assignable to type '"Expected string, Actual never"'.
❯ src/utility-type.test-d.ts:19:40
 17|
 18|   // Assert custom type utility with built-in type
 19|   expectTypeOf<Actual>().toEqualTypeOf<Expected>();
 20|  });
```
