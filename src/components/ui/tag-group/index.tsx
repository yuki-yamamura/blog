'use client';

import { Tag as ReactAriaTag, TagList, TagGroup as ReactAriaTagGroup } from 'react-aria-components';

import styles from './index.module.css';
import { Tag } from '@/app/posts/types';

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
