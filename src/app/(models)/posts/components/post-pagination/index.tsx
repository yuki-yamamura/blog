'use client';

import { usePostPagination } from './usePostPagination';
import { Pagination } from '@/components/ui/pagination';

import type { Post } from '@/app/(models)/posts/types/post';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const PostPagination = ({ currentPage, posts }: Props) => {
  const { pageCount, hrefBuilder, onPageChange } = usePostPagination({ currentPage, posts });

  return (
    <Pagination
      pageCount={pageCount}
      initialPage={currentPage - 1}
      hrefBuilder={hrefBuilder}
      onPageChange={onPageChange}
    />
  );
};
