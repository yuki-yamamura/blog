import { Component } from './presenter';
import { getPosts } from '../../api/fetcher';

export const PostList = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return null;
  }

  return <Component posts={posts} />;
};
