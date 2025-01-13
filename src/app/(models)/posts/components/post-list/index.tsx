'use client';

import { PostItem } from './post-item';
import { useFilter } from './useFilter';
import { Suspense } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';

import styles from './index.module.css';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => (
  <Suspense fallback={null}>
    <Component posts={posts} />
  </Suspense>
);

const Component = ({ posts }: Props) => {
  const { posts: displayPosts } = useFilter(posts);
  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <ol className={styles.base}>
      {displayPosts.map((post) => (
        <li key={post.id}>
          <PostItem {...post} />
        </li>
      ))}
    </ol>
  );
};
