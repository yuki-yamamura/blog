import { client } from '@/lib/microcms/client';

import type { Post } from '@/app/(models)/posts/types/post';

const endpoint = 'posts';

export const getPosts = async (
  params?: Omit<Parameters<typeof client.getAllContents>, 'endpoint' | 'customRequestInit'>,
) => {
  return client.getAllContents<Post>({
    ...params,
    endpoint,
    customRequestInit: {
      cache: 'force-cache',
    },
  });
};
