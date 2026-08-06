---
publishDate: 2026-08-05
title: Value Objects in Go
tags:
  - go
---

A [value object](https://en.wikipedia.org/wiki/Value_object) is a language-agnostic pattern. So when we apply some sort of pattern to our codebase, we have to consider the characteristic of the language, and what problems the pattern should solve.

## The requirements of a value object

These properties are required for a value object regardless of language specifications.

Value objects:

- should be immutable.
- should not be compared by identity, but by their structure.
- should encapsulate their behaviors with data.

## In Go

Look at this example code.

```go
package tea

import (
	"errors"
	"strings"
)

type Tea string
type Cha struct {
	value string
}

func NewCha(v string) (Cha, error) {
	if !strings.HasSuffix(v, "cha") && !strings.HasSuffix(v, "chai") {
		return Cha{}, errors.New("Cha must end with `cha` or `chai`")
	}

	return Cha{value: v}, nil
}

func (c Cha) Value() string {
	return c.value
}

func (c Cha) HasAlcohol() bool {
	return false
}
```

```go
package main

import (
	"fmt"

	"github.com/yuki-yamamura/gqlgen-practice/tea"
)

func main() {
	// `tea.Tea` is just a named type; Go has no immutability for primitives.
	var assamTea tea.Tea = "assam tea"
	assamTea = "rosehip tea"
	fmt.Println(assamTea)

	// We cannot create a `Cha` object from other packages, but can do so via the `tea.NewCha` constructor. And it should be immutable.
	// bad := tea.Cha{value: "masara chai"}
	masaraChai, _ := tea.NewCha("masara chai")
	// masaraChai.value = "ocha"

	// The constructor has some validation logic. This code should return an error.
	_, err := tea.NewCha("rosehip tea")
	if err != nil {
		// ...
	}

	// A `tea.Cha` object has some behaviors; the `HasAlcohol` method is just like a property though.
	fmt.Println("Does masara chai have alcohol?", masaraChai.HasAlcohol())

	// And we can compare two value objects.
	ocha, _ := tea.NewCha("ocha")
	fmt.Println("Are masara chai and ocha the same?", masaraChai == ocha)
}
```
