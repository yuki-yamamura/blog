import { PostItem } from '../post-item';

import type { Post } from '../../types';

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
