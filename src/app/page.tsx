import { getPosts } from '@/app/posts/api/fetcher';
import { PostList } from '@/app/posts/components/post-list';
import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/posts/constants';
import { ButtonLink } from '@/components/ui/button-link';
import { Image } from '@/components/ui/image';
import { ListWithPagination } from '@/utils/list-with-pagination';
import { getPath } from '@/utils/path';

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
        <Image
          src="https://images.microcms-assets.io/assets/e2874dbb8b39415fa7823d981e6ff6f8/d8f114955f5441c3a75abd43f58c946c/sno.svg"
          alt=""
        />
        <PostList posts={displayItems} />
      </div>
      {shouldShowPagination && (
        <ButtonLink href={getPath['/posts/page:number'](2)} rightIcon>
          See all posts
        </ButtonLink>
      )}
    </div>
  );
};

export default Page;
