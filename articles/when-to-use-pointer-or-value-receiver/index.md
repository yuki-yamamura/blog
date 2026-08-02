---
publishDate: 2026-08-02
title: I don't know when to use a pointer or value receiver
tags:
  - go
---

Although [A Tour of Go](https://go.dev/tour/methods/8) mentions when to use a pointer receiver over a value receiver and many people share their opinions, I've been confused about it since I started learning Go. It may includes some mistakes, but I'd like to write my current opinion.

- Design with referential transparency to reduce side-effects from our code; especially for modules called by others.
- Use a value receiver as default, and use a pointer receiver instead only when it's necessary (to be honest, I cannot judge it yet).

## References

https://x.com/MattJamesBoyle/status/1742822532372136433?lang=en
