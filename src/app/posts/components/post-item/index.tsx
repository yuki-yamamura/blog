import { Link } from '@/components/ui/link';
import { TagGroup } from '@/components/ui/tag-group';
import { dayjs } from '@/lib/dayjs';

import type { Post } from '@/app/posts/types/post';

import styles from './index.module.css';

type Props = Pick<Post, 'id' | 'title' | 'publishedAt' | 'tags'>;

export const PostItem = ({ id, title, publishedAt, tags }: Props) => {
  const formattedDate = dayjs(publishedAt).format('YYYY-MM-DD');

  return (
    <div className={styles.base}>
      <time dateTime={publishedAt} className={styles.time}>
        {formattedDate}
      </time>
      <Link href={`/posts/${id}`} className={styles.link}>
        <h2 className={styles.heading}>{title}</h2>
      </Link>
      <hr className={styles.hr} />
      <TagGroup tags={tags} />
    </div>
  );
};
