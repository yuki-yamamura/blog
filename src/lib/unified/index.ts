import { Link } from '@/components/ui/link';
import * as prod from 'react/jsx-runtime';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const parseMarkdownToHtml = async (markdownContent: string) => {
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
