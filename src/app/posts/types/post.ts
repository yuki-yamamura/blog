import { MicroCMSContentId, MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';
import { Tag } from './tag';

export type Post = {
  title: string;
  content: string;
  thumbnail: MicroCMSImage;
  tags: Tag[];
} & MicroCMSContentId &
  MicroCMSDate;
