'use client';

import { Link } from '@/components/ui/link';
import { Tag as ReactAriaTag, TagList, TagGroup as ReactAriaTagGroup } from 'react-aria-components';

import type { ComponentPropsWithoutRef } from 'react';

import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  label?: string;
};

export const TagGroup = ({ children, label = 'Tags' }: Props) => (
  <ReactAriaTagGroup aria-label={label}>
    <TagList className={styles.tags}>{children}</TagList>
  </ReactAriaTagGroup>
);

export const Tag = (props: ComponentPropsWithoutRef<typeof ReactAriaTag>) => (
  <ReactAriaTag {...props} className={styles.tag} />
);

export const TagLink = (props: ComponentPropsWithoutRef<typeof Link>) => (
  <Tag>
    <Link {...props} />
  </Tag>
);
