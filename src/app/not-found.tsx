import { yomogi } from '@/lib/next/fonts';

import styles from './not-found.module.css';

const Page = () => (
  <div className={styles.base}>
    <h1 className={`${yomogi.className} ${styles.heading}`}>404 Not Found</h1>
  </div>
);

export default Page;
