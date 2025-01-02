import { Link } from '../link';
import { yomogi } from '@/lib/next';

import styles from './index.module.css';

export const Header = () => {
  const navigationItems = [
    { name: 'About', href: '/about' },
    { name: 'Posts', href: '/posts' },
  ];

  return (
    <header className={styles.base}>
      <div className={styles.wrapper}>
        <Link href="/" className={`${styles.logo} ${yomogi.className}`}>
          ymmr
        </Link>
        <nav>
          <ul className={styles.navigationList}>
            {navigationItems.map(({ name, href }) => (
              <li key={name} className={styles.navigationItem}>
                <Link href={href} className={styles.link}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
