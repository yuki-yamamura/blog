import Link from 'next/link';

import styles from './page.module.css';

const Page = () => (
  <div className={styles.base}>
    <div className={styles.inner}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/avatar.jpg" alt="Yuki Yamamura" className={styles.image} />
      <div className={styles.name}>Yuki Yamamura</div>
      <div>A software engineer @Japan</div>
      <div className={styles.hr} />
      <div className={styles.sns}>
        <Link href="https://github.com/yuki-yamamura" className={styles.link}>
          GitHub
        </Link>
        <Link href="https://discord.gg/Tn56fqUm" className={styles.link}>
          Discord
        </Link>
      </div>
    </div>
  </div>
);

export default Page;
