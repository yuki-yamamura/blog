import { PostContent } from '@/app/(models)/posts/components/post-content';
import { getPost } from '@/app/(models)/posts/logic/api';
import { Tag, TagGroup } from '@/components/ui/tag-group';
import { formatDate } from '@/utils/dayjs';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { draftKey } = await searchParams;
  console.log({ draftKey });
  if (typeof draftKey !== 'string' && typeof draftKey !== 'undefined') {
    notFound();
  }
  const post = await getPost({ id, draftKey });

  if (!post) {
    notFound();
  }

  const { createdAt, thumbnail, title, tags, content } = post;
  const formattedDate = formatDate(createdAt);

  return (
    <div className={styles.base}>
      <time className={styles.date}>{formattedDate}</time>
      <div className={styles.inner}>
        <img src={thumbnail.url} alt="" className={styles.image} />
        <h1 className={styles.heading}>{title}</h1>
        <TagGroup>
          {tags.map(({ id, name }) => (
            <Tag key={id}>{name}</Tag>
          ))}
        </TagGroup>
      </div>
      <div className={styles.content}>
        <PostContent content={content} />
      </div>
    </div>
  );
};

export default Page;
