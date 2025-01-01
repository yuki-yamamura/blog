import { calculatePageCount } from '../api';
import { getPosts } from '../api/fetcher';
import { PostList } from '../components';
import { PostPagination } from '../components/post-pagination';
import { MAX_POSTS_COUNT_PER_PAGE } from '../constants';

type Params = {
  page: string;
};

type Props = {
  params: Promise<Params>;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const posts = await getPosts();
  const totalPages = calculatePageCount(posts, MAX_POSTS_COUNT_PER_PAGE);

  return Array.from(new Array(totalPages), (_, index) => ({
    page: (index + 1).toString(),
  }));
};

const Page = async ({ params }: Props) => {
  const { page } = await params;
  const currentPage = Number(page);
  const posts = await getPosts();

  return (
    <div>
      <PostList />
      <PostPagination currentPage={currentPage} posts={posts} />
    </div>
  );
};

export default Page;
