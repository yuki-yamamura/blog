'use client';

import { calculatePageCount } from '../../api/calculator';
import { MAX_POSTS_COUNT_PER_PAGE } from '../../constants';
import { Pagination } from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { Post } from '../../types';
import type { ReactPaginateProps } from 'react-paginate';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const PostPagination = ({ currentPage, posts }: Props) => {
  const router = useRouter();
  const pageCount = calculatePageCount(posts, MAX_POSTS_COUNT_PER_PAGE);

  const hrefBuilder: ReactPaginateProps['hrefBuilder'] = useCallback((pageIndex: number) => {
    return `/posts/page/${pageIndex + 1}`;
  }, []);
  const onPageChange: ReactPaginateProps['onPageChange'] = useCallback(
    ({ selected }: { selected: number }) => {
      router.push(`/posts/page/${selected + 1}`);
    },
    [router],
  );

  return (
    <Pagination
      pageCount={pageCount}
      initialPage={currentPage - 1}
      hrefBuilder={hrefBuilder}
      onPageChange={onPageChange}
    />
  );
};
