import { getPosts } from '../api';
import { PostContent } from '../components/post-content';
import { TagGroup } from '@/components/ui';
import { dayjs } from '@/lib/dayjs';
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
  const posts = await getPosts();
  const post = posts.find((post) => post.id === id);

  if (!post) {
    notFound();
  }

  const { publishedAt, thumbnail, title, tags, content } = post;
  const formattedDate = dayjs(publishedAt).format('YYYY-MM-DD');

  return (
    <div className={styles.base}>
      <time className={styles.date}>{formattedDate}</time>
      <div className={styles.inner}>
        <img src={thumbnail.url} alt="" className={styles.image} />
        <h1 className={styles.heading}>{title}</h1>
        <TagGroup tags={tags} />
      </div>
      <div className={styles.content}>
        <PostContent content={content} />
      </div>
    </div>
  );
};

export default Page;
