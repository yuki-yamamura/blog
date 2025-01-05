import { PostList } from '@/app/(models)/posts/components/post-list';
import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/(models)/posts/constants';
import { getPosts } from '@/app/(models)/posts/logic/api';
import { ButtonLink } from '@/components/ui/button-link';
import { ListWithPagination } from '@/utils/list-with-pagination';
import { pathMap } from '@/utils/pathMap';

import styles from './page.module.css';

const Page = async () => {
  const posts = await getPosts();
  const { shouldShowPagination, displayItems } = new ListWithPagination({
    list: posts,
    currentPage: 1,
    maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
  });

  return (
    <div className={styles.base}>
      <div className={styles.posts}>
        <PostList posts={displayItems} />
      </div>
      {shouldShowPagination && (
        <ButtonLink href={pathMap['/posts/page/:page/'].get(2)} rightIcon>
          See all posts
        </ButtonLink>
      )}
    </div>
  );
};

export default Page;
