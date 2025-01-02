import { client } from '@/lib/microcms';

import type { Post } from '../types';
import type { GetAllContentIdsRequest } from 'microcms-js-sdk';

const endpoint = 'posts';

export const getPosts = async (params?: Omit<GetAllContentIdsRequest, 'endpoint'>) => {
  return client.getAllContents<Post>({
    ...params,
    endpoint,
  });
};
