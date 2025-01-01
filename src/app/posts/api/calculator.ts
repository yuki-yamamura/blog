import type { Post } from '../types';

export const calculatePageCount = (posts: Post[], maxPostsCountPerPage: number) => {
  return Math.ceil(posts.length / maxPostsCountPerPage);
};
