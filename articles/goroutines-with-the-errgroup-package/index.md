---
publishDate: 2026-09-10
title: Goroutines with the errgroup package
tags:
  - go
---

[Package errgroup](https://pkg.go.dev/golang.org/x/sync/errgroup) has a `Go` method that takes a function and calls it inside a new goroutine. It's so convenient when you use goroutines and want to handle their errors in one place. Maybe I'll write such code more often than plain goroutines.

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/sync/errgroup"
)

func main() {
	userID := 1
	user, err := fetchUserByID(userID)
	if err != nil {
		log.Fatalf("failed to fetch user: %v", err)
	}

	var posts []Post
	var todos []Todo
	errGroup := new(errgroup.Group)

	errGroup.Go(func() error {
		var err error
		posts, err = fetchPostsByUserID(user.ID)
		return err
	})
	errGroup.Go(func() error {
		var err error
		todos, err = fetchTodosByUserID(user.ID)
		return err
	})
	if err := errGroup.Wait(); err != nil {
		log.Fatalf("error fetching posts or todos: %v", err)
	}

	fmt.Println("time taken:", elapsed)
	fmt.Printf("user: %+v\n", user)
	fmt.Printf("posts: %+v\n", posts)
	fmt.Printf("todos: %+v\n", todos)
}

// Structs for JSONPlaceholder API responses
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Post struct {
	ID     int    `json:"id"`
	UserID int    `json:"userId"`
	Title  string `json:"title"`
	Body   string `json:"body"`
}

type Todo struct {
	ID          int    `json:"id"`
	UserID      int    `json:"userId"`
	Title       string `json:"title"`
	IsCompleted bool   `json:"completed"`
}

// Fetch functions for JSONPlaceholder API
const baseURL = "https://jsonplaceholder.typicode.com"

func fetchUserByID(id int) (User, error) {
	url := fmt.Sprintf("%s/users/%d", baseURL, id)
	return fetchByURL[User](url)
}

func fetchTodosByUserID(userID int) ([]Todo, error) {
	url := fmt.Sprintf("%s/users/%d/todos", baseURL, userID)
	return fetchByURL[[]Todo](url)
}

func fetchPostsByUserID(userID int) ([]Post, error) {
	url := fmt.Sprintf("%s/users/%d/posts", baseURL, userID)
	return fetchByURL[[]Post](url)
}

func fetchByURL[T any](url string) (T, error) {
	res, err := http.Get(url)
	if err != nil {
		var zero T
		return zero, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		var zero T
		return zero, fmt.Errorf("failed to fetch data from %s: status code %d", url, res.StatusCode)
	}

	var value T
	if err := json.NewDecoder(res.Body).Decode(&value); err != nil {
		var zero T
		return zero, err
	}
	return value, nil
}
```
