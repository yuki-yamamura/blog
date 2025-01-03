import { getPosts } from '@/app/posts/_api/fetcher';
import { PostList } from '@/app/posts/_components/post-list';
import { PostPagination } from '@/app/posts/_components/post-pagination';
import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/posts/_constants';
import { ListWithPagination } from '@/utils/list-with-pagination';

import styles from './page.module.css';

type Params = {
  page: string;
};

type Props = {
  params: Promise<Params>;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const posts = await getPosts();
  const { pageNumbers } = new ListWithPagination({
    list: posts,
    maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
  });

  return pageNumbers.map((pageNumber) => ({
    page: pageNumber.toString(),
  }));
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
