---
publishDate: 2026-08-22
title: Use soft assertions to check pre-conditions
tags:
  - playwright
---

After some thought, I think [soft assertions](https://playwright.dev/docs/test-assertions) are a good fit for checking pre-conditions. For example, the code below has two assertions to make sure that the necessary data exists in the database. Thanks to `expect.soft`, the second one still runs even if the first one fails, which makes debugging easier.

```ts
import { test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  expect.soft(await fetchTasks()).toHaveLength(2);
  expect
    .soft((await fetchMembers()).filter((member) => member.status === "free"))
    .toHaveLength(2);
});

test("The user can assign all the tasks if enough members are free.", () => {});
```
