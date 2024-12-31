'use client';

import { Link } from 'react-aria-components';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import styles from './index.module.css';

type Props = Omit<React.ComponentPropsWithoutRef<typeof Link>, 'children'> & {
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const ButtonLink = ({ rightIcon, children, ...props }: Props) => (
  <Link {...props} className={styles.base}>
    {children}
    {rightIcon && (
      <span className={styles.rightIcon}>
        <ArrowRightIcon className={styles.icon} />
      </span>
    )}
  </Link>
);
