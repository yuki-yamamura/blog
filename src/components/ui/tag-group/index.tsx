'use client';

import { Tag as ReactAriaTag, TagList, TagGroup as ReactAriaTagGroup } from 'react-aria-components';

import styles from './index.module.css';

type Props = {
  tags: string[];
  label?: string;
};

export const TagGroup = ({ tags, label = 'Tags' }: Props) => (
  <ReactAriaTagGroup aria-label={label}>
    <TagList className={styles.tags}>
      {tags.map((tag) => (
        <ReactAriaTag key={tag} textValue={tag} className={styles.tag}>
          <span>#</span>
          <span>{tag}</span>
        </ReactAriaTag>
      ))}
    </TagList>
  </ReactAriaTagGroup>
);
