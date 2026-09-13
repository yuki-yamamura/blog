---
publishDate: 2026-09-14
title: Trying the ViewTransition component
tags:
  - react
---

React 19.3 introduced [the `<ViewTransition>` component](https://react.dev/blog/2026/09/09/react-19-3#view-transition) as a stable API. ViewTransition is part of the [Async React](https://www.youtube.com/watch?v=B_2E96URooA) concept, and the `<ViewTransition>` component makes it easy to animate elements between the render and commit phases in React.

```tsx
import { Suspense, ViewTransition } from "react";

import { listComments } from "@features/comments/api/list-comments";

import styles from "comment-list.module.css";

type CommentListProps = {
  postId: string;
};

export function CommentList({ postId }: CommentListProps) {
  return (
    <Suspense fallback={<CommentsSkeleton />}>
      <ViewTransition enter="fade-in">
        <_CommentList postId={postId} />
      </ViewTransition>
    </Suspense>
  );
}

async function _CommentList({ postId }: CommentListProps) {
  const comments = await listComments(postId);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className={styles.comment}>
          <div>{comment.name}</div>
          <div className={styles.commentBody}>{comment.body}</div>
        </li>
      ))}
    </ul>
  );
}

function CommentsSkeleton() {
  return (
    <ul>
      {[0, 1, 2].map((index) => (
        <li key={index} className={styles.comment}>
          <div className={styles.skeleton} />
        </li>
      ))}
    </ul>
  );
}
```

```css
/* In globals.css */
::view-transition-old(.fade-in) {
  animation: 150ms ease-out both fade reverse;
}
```

## References

https://react.dev/reference/react/ViewTransition#styling-view-transitions
https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#pseudo-elements
