'use client';

import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/posts/constants';
import { Pagination } from '@/components/ui/pagination';
import { ListWithPagination } from '@/utils/list-with-pagination';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { Post } from '@/app/posts/types/post';
import type { ReactPaginateProps } from 'react-paginate';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const PostPagination = ({ currentPage, posts }: Props) => {
  const router = useRouter();
  const { pageCount } = new ListWithPagination({
    list: posts,
    currentPage,
    maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
  });

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
