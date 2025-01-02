import { calculatePageCount, getPosts } from './api';
import { PostList } from './components';
import { MAX_POSTS_COUNT_PER_PAGE } from './constants';
import { redirect } from 'next/navigation';

const Page = async () => {
  const posts = await getPosts();
  const totalPages = calculatePageCount(posts, MAX_POSTS_COUNT_PER_PAGE);

  if (totalPages > 1) {
    redirect('/posts/page/1');
  }

  return (
    <div>
      <PostList />
    </div>
  );
};

export default Page;
