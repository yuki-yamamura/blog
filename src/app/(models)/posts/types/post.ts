import type { Tag } from '@/app/(models)/tags/types/tag';
import type { MicroCMSContentId, MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

export type Post = {
  title: string;
  content: string;
  thumbnail: MicroCMSImage;
  tags: Tag[];
} & MicroCMSContentId &
  MicroCMSDate;
