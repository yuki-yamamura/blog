import type { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';

export type Tag = {
  slug: string;
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;
