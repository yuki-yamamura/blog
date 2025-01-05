import { Link } from '@/components/ui/link';
import * as prod from 'react/jsx-runtime';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import type { Post } from '@/app/(models)/posts/types/post';

import styles from './index.module.css';

type Props = Pick<Post, 'content'>;

export const PostContent = async ({ content }: Props) => {
  const parsedContent = await parseMarkdownToHtml(content);

  return <div dangerouslySetInnerHTML={{ __html: parsedContent }} className={styles.base} />;
};

const parseMarkdownToHtml = async (markdownContent: string) => {
  const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { fragment: true })
    .use(rehypePrettyCode, {
      theme: 'vitesse-light',
    })
    .use(rehypeReact, {
      ...production,
      components: {
        a: Link,
      },
    })
    .use(rehypeStringify)
    .process(markdownContent);

  return file.toString();
};
