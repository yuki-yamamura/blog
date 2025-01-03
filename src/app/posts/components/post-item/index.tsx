import { Link } from '@/components/ui/link';
import { TagGroup } from '@/components/ui/tag-group';
import { formatDate } from '@/lib/dayjs';
import { getPath } from '@/utils/path';

import type { Post } from '@/app/posts/types/post';

import styles from './index.module.css';

type Props = Pick<Post, 'id' | 'title' | 'publishedAt' | 'tags'>;

export const PostItem = ({ id, title, publishedAt, tags }: Props) => {
  if (!publishedAt) {
    return null;
  }

  const formattedDate = formatDate(publishedAt);

  return (
    <div className={styles.base}>
      <time dateTime={publishedAt} className={styles.date}>
        {formattedDate}
      </time>
      <Link href={getPath['/posts:id'](id)} className={styles.link}>
        <h2 className={styles.heading}>{title}</h2>
      </Link>
      <div className={styles.line} />
      <TagGroup tags={tags} />
    </div>
  );
};
