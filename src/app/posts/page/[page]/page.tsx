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
  const posts = await getPosts();
  const { page } = await params;
  const currentPage = Number(page);

  return (
    <div className={styles.base}>
      <PostList />
      <PostPagination currentPage={currentPage} posts={posts} />
    </div>
  );
};

export default Page;
