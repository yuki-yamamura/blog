import { parseMarkdownToHtml } from '@/lib/unified';

import type { Post } from '../../types';

import styles from './index.module.css';

type Props = Pick<Post, 'content'>;

export const PostContent = async ({ content }: Props) => {
  const parsedContent = await parseMarkdownToHtml(content);

  return <div dangerouslySetInnerHTML={{ __html: parsedContent }} className={styles.base} />;
};
