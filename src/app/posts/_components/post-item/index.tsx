import { Link } from '@/components/ui/link';
import { TagGroup } from '@/components/ui/tag-group';
import { formatDate } from '@/lib/dayjs';
import { pathMap } from '@/utils/path';

import type { Post } from '@/app/posts/_types/post';

import styles from './index.module.css';

type Props = Pick<Post, 'id' | 'title' | 'publishedAt' | 'tags'>;

export const PostItem = ({ id, title, publishedAt, tags }: Props) => {
  if (!publishedAt) {
    return null;
  }

  const formattedDate = formatDate(publishedAt);
  const tagNames = tags.map(({ name }) => name);

  return (
    <div className={styles.base}>
      <time dateTime={publishedAt} className={styles.date}>
        {formattedDate}
      </time>
      <Link href={pathMap['/posts:id'].get(id)} className={styles.link}>
        <h2 className={styles.heading}>{title}</h2>
      </Link>
      <div className={styles.line} />
      <TagGroup tags={tagNames} />
    </div>
  );
};
