import { PostItem } from '@/app/posts/components/post-item';

import type { Post } from '@/app/posts/types/post';

import styles from './presenter.module.css';

type Props = {
  posts: Post[];
};

export const Component = ({ posts }: Props) => (
  <ol className={styles.base}>
    {posts.map((post) => (
      <li key={post.id}>
        <PostItem {...post} />
      </li>
    ))}
  </ol>
);
