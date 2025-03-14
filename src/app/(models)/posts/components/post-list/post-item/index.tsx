import { Link } from '@/components/ui/link';
import { TagGroup, TagLink } from '@/components/ui/tag-group';
import { formatDate } from '@/utils/dayjs';
import { pathMap } from '@/utils/pathMap';

import type { Post } from '@/app/(models)/posts/types/post';

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
      <Link href={pathMap['/posts/:id/'].get(id)} className={styles.link}>
        <h2 className={styles.heading}>{title}</h2>
      </Link>
      <div className={styles.line} />
      <TagGroup label="Links">
        {tags.map(({ id, name }) => (
          <TagLink key={name} href={`${pathMap['/posts/page/:page/'].get(1)}?tag=${id}`}>
            {name}
          </TagLink>
        ))}
      </TagGroup>
    </div>
  );
};
