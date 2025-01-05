import { Link } from '@/components/ui/link';
import { yomogi } from '@/lib/next/fonts';
import { pathMap } from '@/utils/pathMap';
import { cx } from 'class-variance-authority';

import styles from './index.module.css';

export const Header = () => {
  const navigationItems = [
    { name: 'About', href: pathMap['/about/'].get() },
    { name: 'Posts', href: pathMap['/posts/page/:page/'].get(1) },
  ];

  return (
    <header className={styles.base}>
      <div className={styles.inner}>
        <Link href={pathMap['/'].get()} className={cx(styles.logo, yomogi.className)}>
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
