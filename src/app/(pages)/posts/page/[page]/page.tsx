import { PostList } from '@/app/(models)/posts/components/post-list';
import { PostPagination } from '@/app/(models)/posts/components/post-pagination';
import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/(models)/posts/constants';
import { getPosts } from '@/app/(models)/posts/logic/api';
import { ListWithPagination } from '@/utils/list-with-pagination';

import styles from './page.module.css';

type Params = {
  page: string;
};

type Props = {
  params: Promise<Params>;
};

const Page = async ({ params }: Props) => {
  const posts = await getPosts();
  const { page } = await params;
  const currentPage = Number(page);
  const { shouldShowPagination, displayItems } = new ListWithPagination({
    list: posts,
    currentPage,
    maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
  });

  return (
    <div className={styles.base}>
      <div className={styles.posts}>
        <PostList posts={displayItems} />
      </div>
      {shouldShowPagination && <PostPagination currentPage={currentPage} posts={posts} />}
    </div>
  );
};

export default Page;
