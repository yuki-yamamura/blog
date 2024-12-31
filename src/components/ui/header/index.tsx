import styles from './index.module.css';

export const Header = () => (
  <header className={styles.base}>
    <div className={styles.wrapper}>
      <div className={styles.logo}>ymmr.life</div>
      <nav>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>about</li>
          <li className={styles.navigationItem}>posts</li>
        </ul>
      </nav>
    </div>
  </header>
);
