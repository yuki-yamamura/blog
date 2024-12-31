import { getPosts } from '../../api';
import { Component } from './presenter';

export const PostList = async () => {
  const posts = await getPosts();

  if (posts.length === 0) {
    return null;
  }

  return <Component posts={posts} />;
};
