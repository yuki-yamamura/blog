import { yomogi } from '@/lib/next/fonts';
import { cx } from 'class-variance-authority';

import styles from './not-found.module.css';

const Page = () => (
  <div className={styles.base}>
    <h1 className={cx(styles.heading, yomogi.className)}>404 Not Found</h1>
  </div>
);

export default Page;
