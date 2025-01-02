'use client';

import { Tag as ReactAriaTag, TagList, TagGroup as ReactAriaTagGroup } from 'react-aria-components';

import type { Tag } from '@/app/posts/types/tag';

import styles from './index.module.css';

type Props = {
  tags: Tag[];
};

export const TagGroup = ({ tags }: Props) => (
  <ReactAriaTagGroup>
    <TagList className={styles.tags}>
      {tags.map((tag) => (
        <ReactAriaTag key={tag.id} className={styles.tag}>
          #{tag.name}
        </ReactAriaTag>
      ))}
    </TagList>
  </ReactAriaTagGroup>
);
