import { client } from '@/lib/microcms/client';

import type { Post } from '@/app/posts/_types/post';

const endpoint = 'posts';

export const getPosts = async (
  params?: Omit<Parameters<typeof client.getAllContents>, 'endpoint'>,
) => {
  return client.getAllContents<Post>({
    ...params,
    endpoint,
  });
};
