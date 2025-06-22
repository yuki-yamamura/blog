import { ZoomableImage } from './zoomable-image';
import { parseMarkdownToHtml } from '@/app/(models)/posts/logic/markdown';
import { Fragment, type ReactNode } from 'react';

import type { Post } from '@/app/(models)/posts/types/post';

import styles from './index.module.css';

type Props = Pick<Post, 'content'>;

const processHtmlToReact = (html: string): ReactNode => {
  const imgRegex = /<img([^>]+)>/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = html.substring(lastIndex, match.index);
      parts.push(
        <div key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: beforeText }} />,
      );
    }

    const imgTag = match[0];
    const srcMatch = imgTag.match(/src="([^"]+)"/);
    const altMatch = imgTag.match(/alt="([^"]*)"/);

    if (srcMatch) {
      parts.push(
        <ZoomableImage
          key={`img-${match.index}`}
          src={srcMatch[1]}
          alt={altMatch ? altMatch[1] : ''}
        />,
      );
    }

    lastIndex = imgRegex.lastIndex;
  }

  if (lastIndex < html.length) {
    const remainingText = html.substring(lastIndex);
    parts.push(
      <div key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: remainingText }} />,
    );
  }

  return <Fragment>{parts}</Fragment>;
};

export const PostContent = async ({ content }: Props) => {
  const parsedContent = await parseMarkdownToHtml(content);

  if (parsedContent.includes('<img')) {
    return <div className={styles.base}>{processHtmlToReact(parsedContent)}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: parsedContent }} className={styles.base} />;
};
