import { PostList } from './posts/components/post-list';
import { ButtonLink } from '@/components/ui';

import styles from './page.module.css';

const Page = () => (
  <div className={styles.page}>
    <PostList />
    <div className={styles.linkWrapper}>
      <ButtonLink href="/posts" rightIcon>
        See all posts
      </ButtonLink>
    </div>
  </div>
);

export default Page;
