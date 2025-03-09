import { PostContent } from '@/app/(models)/posts/components/post-content';
import { getPost, getPosts } from '@/app/(models)/posts/logic/api';
import { Tag, TagGroup } from '@/components/ui/tag-group';
import { formatDate } from '@/utils/dayjs';
import { notFound } from 'next/navigation';

import styles from './page.module.css';

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export const generateStaticParams = async (): Promise<Params[]> => {
  const posts = await getPosts();

  return posts.map(({ id }) => ({
    id,
  }));
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const post = await getPost({ id });

  if (!post || !post.publishedAt) {
    notFound();
  }

  const { publishedAt, thumbnail, title, tags, content } = post;
  const formattedDate = formatDate(publishedAt);

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
