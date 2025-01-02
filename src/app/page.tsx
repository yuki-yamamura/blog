import { getPosts } from './posts/api';
import { PostList } from './posts/components/post-list';
import { MAX_POSTS_COUNT_PER_PAGE } from './posts/constants';
import { ButtonLink } from '@/components/ui';

import styles from './page.module.css';

const Page = async () => {
  const posts = await getPosts();
  const hasPagination = posts.length > MAX_POSTS_COUNT_PER_PAGE;

  return (
    <div className={styles.page}>
      <PostList limit={10} />
      {hasPagination && (
        <div className={styles.linkWrapper}>
          <ButtonLink href="/posts/page/2" rightIcon>
            See all posts
          </ButtonLink>
        </div>
      )}
    </div>
  );
};

export default Page;
