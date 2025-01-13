'use client';

import { usePostPagination } from './usePostPagination';
import { useFilter } from '../post-list/useFilter';
import { Pagination } from '@/components/ui/pagination';
import { Suspense } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';

type Props = {
  currentPage: number;
  posts: Post[];
};

export const PostPagination = ({ currentPage, posts }: Props) => (
  <Suspense fallback={null}>
    <Component currentPage={currentPage} posts={posts} />
  </Suspense>
);

const Component = ({ currentPage, posts }: Props) => {
  const { posts: displayPosts } = useFilter(posts);
  const { pageCount, hrefBuilder, onClick } = usePostPagination({
    currentPage,
    posts: displayPosts,
  });

  return (
    <Pagination
      pageCount={pageCount}
      initialPage={currentPage - 1}
      hrefBuilder={hrefBuilder}
      onClick={onClick}
    />
  );
};
