import { Link } from '@/components/ui/link';
import { yomogi } from '@/lib/next/fonts';
import { getPath } from '@/utils/path';
import { cx } from 'class-variance-authority';

import styles from './index.module.css';

export const Header = () => {
  const navigationItems = [
    { name: 'About', href: getPath['/about']() },
    { name: 'Posts', href: getPath['/posts']() },
  ];

  return (
    <header className={styles.base}>
      <div className={styles.inner}>
        <Link href="/" className={cx(styles.logo, yomogi.className)}>
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
