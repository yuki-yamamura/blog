import type { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';

export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;
