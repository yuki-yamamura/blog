import { Link } from '@/components/ui/link';

import styles from './page.module.css';

const Page = () => (
  <div className={styles.base}>
    <div className={styles.inner}>
      <div className={styles.bio}>
        <img src="/avatar.jpg" alt="" className={styles.image} />
        <div className={styles.name}>Yuki Yamamura</div>
        <div>A software engineer @Japan</div>
      </div>
      <div className={styles.line} aria-hidden />
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
