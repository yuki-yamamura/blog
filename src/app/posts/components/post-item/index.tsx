import { TagGroup } from '@/components/ui';
import { dayjs } from '@/lib/dayjs';

import type { Post } from '../../types';

import styles from './index.module.css';

type Props = Pick<Post, 'id' | 'title' | 'publishedAt' | 'tags'>;

export const PostItem = ({ title, publishedAt, tags }: Props) => {
  const formattedDate = dayjs(publishedAt).format('YYYY-MM-DD');

  return (
    <div className={styles.base}>
      <time dateTime={publishedAt} className={styles.time}>
        {formattedDate}
      </time>
      <h2 className={styles.heading}>{title}</h2>
      <TagGroup tags={tags} />
    </div>
  );
};
