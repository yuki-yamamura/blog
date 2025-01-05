import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/(models)/posts/constants';
import { ListWithPagination } from '@/utils/list-with-pagination';
import { pathMap } from '@/utils/pathMap';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';
import type { ReactPaginateProps } from 'react-paginate';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const usePostPagination = ({ currentPage, posts }: Props) => {
  const router = useRouter();
  const { pageCount } = new ListWithPagination({
    list: posts,
    currentPage,
    maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
  });

  const hrefBuilder: ReactPaginateProps['hrefBuilder'] = useCallback((pageNumber: number) => {
    return pathMap['/posts/page/:page/'].get(pageNumber);
  }, []);
  const onPageChange: ReactPaginateProps['onPageChange'] = useCallback(
    ({ selected }: { selected: number }) => {
      router.push(pathMap['/posts/page/:page/'].get(selected + 1));
    },
    [router],
  );

  return {
    pageCount,
    hrefBuilder,
    onPageChange,
  };
};
