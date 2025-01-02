'use client';

import { calculatePageCount } from '../../api/calculator';
import { MAX_POSTS_COUNT_PER_PAGE } from '../../constants';
import { Pagination } from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';

import type { Post } from '../../types';
import type { ReactPaginateProps } from 'react-paginate';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const PostPagination = ({ currentPage, posts }: Props) => {
  const router = useRouter();
  const pageCount = calculatePageCount(posts, MAX_POSTS_COUNT_PER_PAGE);
  const hrefBuilder: ReactPaginateProps['hrefBuilder'] = (pageIndex: number) => {
    return `/posts/page/${pageIndex + 1}`;
  };
  const onPageChange: ReactPaginateProps['onPageChange'] = ({ selected }) => {
    router.push(`/posts/page/${selected + 1}`);
  };

  return (
    <Pagination
      pageCount={pageCount}
      initialPage={currentPage - 1}
      hrefBuilder={hrefBuilder}
      onPageChange={onPageChange}
    />
  );
};
