---
publishDate: 2026-08-19
title: Serial mode in Playwright
tags:
  - playwright
---

In Playwright, serial mode is useful to treat a group of tests as a single lifecycle. If the previous test fails, the remaining tests are skipped, and the entire group are retried from the first test.

```ts
import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.beforeAll(() => {
  // This code is called on every retry.
});

test("The first step", () => {});
test("The second step depending on the first step", () => {});
test("The third step depending on the second step", () => {});
```

We can specify a timeout for each test function using [test.setTimeout](https://playwright.dev/docs/api/class-test#test-set-timeout) to prevent extra waiting time even if any interaction fails (fail fast).
