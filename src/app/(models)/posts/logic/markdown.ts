import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { microCMSImageRegex } from '@/lib/microcms/image';

export const parseMarkdownToHtml = async (markdownContent: string) => {
  const processedContent = convertImageUrlsToMarkdown(markdownContent);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: 'vitesse-light',
    })
    .use(rehypeStringify)
    .process(processedContent);

  return file.toString();
};

const convertImageUrlsToMarkdown = (content: string): string => {
  return content.replace(microCMSImageRegex, (url) => {
    return `![](${url})`;
  });
};
