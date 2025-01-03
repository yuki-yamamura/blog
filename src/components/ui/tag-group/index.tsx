'use client';

import { Tag as ReactAriaTag, TagList, TagGroup as ReactAriaTagGroup } from 'react-aria-components';

import styles from './index.module.css';

type Props = {
  tags: string[];
};

export const TagGroup = ({ tags }: Props) => (
  <ReactAriaTagGroup>
    <TagList className={styles.tags}>
      {tags.map((tag) => (
        <ReactAriaTag key={tag} className={styles.tag}>
          <span>#</span>
          <span>{tag}</span>
        </ReactAriaTag>
      ))}
    </TagList>
  </ReactAriaTagGroup>
);
