import { MAX_POSTS_COUNT_PER_PAGE } from '@/app/(models)/posts/constants';
import { ListWithPagination } from '@/utils/list-with-pagination';
import { pathMap } from '@/utils/pathMap';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';
import type { ReactPaginateProps } from 'react-paginate';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const usePostPagination = ({ currentPage, posts }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');
  const { pageCount } = useMemo(
    () =>
      new ListWithPagination({
        list: posts,
        currentPage,
        maxItemsPerPage: MAX_POSTS_COUNT_PER_PAGE,
      }),
    [currentPage, posts],
  );

  const hrefBuilder: ReactPaginateProps['hrefBuilder'] = useCallback((pageNumber: number) => {
    return pathMap['/posts/page/:page/'].get(pageNumber);
  }, []);
  const onClick: ReactPaginateProps['onClick'] = useCallback(
    ({ nextSelectedPage }: { nextSelectedPage: number | undefined }) => {
      if (nextSelectedPage === undefined) {
        return;
      }

      router.push(
        `${pathMap['/posts/page/:page/'].get(nextSelectedPage + 1)}${tag ? `?tag=${tag}` : ''}`,
      );
    },
    [router, tag],
  );

  return {
    pageCount,
    hrefBuilder,
    onClick,
  };
};
