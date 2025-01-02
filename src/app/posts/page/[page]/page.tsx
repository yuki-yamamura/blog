import { PostPagination } from '../../components/post-pagination';
import { MAX_POSTS_COUNT_PER_PAGE } from '../../constants';
import { getPosts } from '@/app/posts/api/fetcher';
import { PostList } from '@/app/posts/components/post-list';
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
    currentPage: 0,
    maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
  });

  return pageNumbers.map((pageNumber) => ({
    page: pageNumber.toString(),
  }));
};

const Page = async ({ params }: Props) => {
  const { page } = await params;
  const currentPage = Number(page);
  const posts = await getPosts();

  return (
    <div>
      <PostList />
      <div className={styles.paginationWrapper}>
        <PostPagination currentPage={currentPage} posts={posts} />
      </div>
    </div>
  );
};

export default Page;
