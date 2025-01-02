import { client } from '@/lib/microcms';

import type { Post } from '../types';
import type { GetAllContentIdsRequest, GetListDetailRequest } from 'microcms-js-sdk';


const endpoint = 'posts';

export const getPost = async (params: Omit<GetListDetailRequest, 'endpoint'>) => {
  return client.getListDetail<Post>({
    ...params,
    endpoint,
  });
};

export const getPosts = async (params?: Omit<GetAllContentIdsRequest, 'endpoint'>) => {
  return client.getAllContents<Post>({
    ...params,
    endpoint,
  });
};
