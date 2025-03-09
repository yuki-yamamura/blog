import { client } from '@/lib/microcms/client';

import type { Post } from '@/app/(models)/posts/types/post';
import type { MicroCMSQueries } from 'microcms-js-sdk';

const endpoint = 'posts';

console.log('something');

export const getPost = async ({
  id,
  draftKey,
}: {
  id: Post['id'];
  draftKey?: MicroCMSQueries['draftKey'];
}) => {
  const post = await client.getListDetail<Post>({
    endpoint,
    contentId: id,
    queries: {
      draftKey,
    },
  });

  return post;
};

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
