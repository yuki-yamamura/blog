import { Component } from './presenter';
import { getPosts } from '@/app/posts/api/fetcher';

type Props = {
  limit?: number;
};

export const PostList = async ({ limit }: Props) => {
  const posts = await getPosts();
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  if (displayPosts.length === 0) {
    return null;
  }

  return <Component posts={displayPosts} />;
};
