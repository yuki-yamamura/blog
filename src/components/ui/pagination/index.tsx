'use client';

import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import ReactPaginate from 'react-paginate';

import type { ReactPaginateProps } from 'react-paginate';

import styles from './index.module.css';

type Props = Required<
  Pick<ReactPaginateProps, 'initialPage' | 'pageCount' | 'onPageChange' | 'hrefBuilder'>
> &
  ReactPaginateProps;

export const Pagination = ({ ...props }: Props) => (
  <ReactPaginate
    {...props}
    containerClassName={styles.base}
    pageLinkClassName={styles.link}
    activeClassName={styles.active}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    previousClassName={styles.previous}
    nextClassName={styles.next}
    previousLinkClassName={styles.previousLink}
    nextLinkClassName={styles.nextLink}
    previousLabel={<CaretLeftIcon className={styles.icon} />}
    nextLabel={<CaretRightIcon className={styles.icon} />}
  />
);
