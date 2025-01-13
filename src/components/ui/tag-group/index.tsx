'use client';

import { Link } from '@/components/ui/link';
import { cx } from 'class-variance-authority';
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

export const Tag = ({ className, ...props }: ComponentPropsWithoutRef<typeof ReactAriaTag>) => (
  <ReactAriaTag {...props} className={cx(styles.tag, className)} />
);

export const TagLink = (props: ComponentPropsWithoutRef<typeof Link>) => (
  <Tag className={styles.tagLink}>
    <Link {...props} />
  </Tag>
);
