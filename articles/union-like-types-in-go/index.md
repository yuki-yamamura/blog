---
publishDate: 2026-08-09
title: Union-like types in Go
tags:
  - go
---

Go does not provide union types at the language level, so we need some other way to represent a union of types. This is the best approach I've found so far.

```go
package main

import (
	"fmt"
)

// Use distinct struct types so that the compiler can tell them apart.
type Aomori struct {
	Value string
}

type Chiba struct {
	Value string
}

type Ibaraki struct {
	Value string
}

// Use an interface to represent a union of types.
type KantoPrefecture interface {
	Chiba | Ibaraki
}

type TohokuPrefecture interface {
	Aomori
}

// Use generics and a type switch to handle each type.
func WelcomeToKantoPrefecture[T KantoPrefecture](p T) {
	var prefectureName string
	switch v := any(p).(type) {
	case Chiba:
		prefectureName = v.Value
	case Ibaraki:
		prefectureName = v.Value
	}
	fmt.Printf("Welcome to %s", prefectureName)
}

func main() {
	chiba := Chiba{
		Value: "Chiba",
	}
	ibaraki := Ibaraki{
		Value: "Ibaraki",
	}

	WelcomeToKantoPrefecture(chiba)
	WelcomeToKantoPrefecture(ibaraki)

	// aomori := Aomori{
	// 	Value: "Aomori",
	// }
	// WelcomeToKantoPrefecture(aomori) // This would cause an `InvalidTypeArge` error.
}
```
