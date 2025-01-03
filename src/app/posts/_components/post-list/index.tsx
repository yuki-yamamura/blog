import { PostItem } from '@/app/posts/_components/post-item';

import type { Post } from '@/app/posts/_types/post';

import styles from './index.module.css';

type Props = {
  posts: Post[];
};

export const PostList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <ol className={styles.base}>
      {posts.map((post) => (
        <li key={post.id}>
          <PostItem {...post} />
        </li>
      ))}
    </ol>
  );
};
