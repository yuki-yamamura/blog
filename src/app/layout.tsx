import { Header } from '@/components/layout/header';
import { jost } from '@/lib/next/fonts';
import { cx } from 'class-variance-authority';

import type { Metadata } from 'next';

import styles from './layout.module.css';

import '@unocss/reset/tailwind.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yuki Yamamura',
  description: 'Personal blog',
};

type Props = React.PropsWithChildren;

const Layout = ({ children }: Props) => (
  <html lang="en">
    <body className={cx(styles.base, jost.className)}>
      <div className={styles.header}>
        <Header />
      </div>
      <main className={styles.main}>{children}</main>
    </body>
  </html>
);

export default Layout;
