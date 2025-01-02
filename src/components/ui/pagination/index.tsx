'use client';

import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';
import ReactPaginate from 'react-paginate';

import type { ReactPaginateProps } from 'react-paginate';

import styles from './index.module.css';

type Props = ReactPaginateProps;

export const Pagination = ({ pageRangeDisplayed = 5, ...props }: Props) => (
  <ReactPaginate
    {...props}
    containerClassName={styles.base}
    pageRangeDisplayed={pageRangeDisplayed}
    previousLabel={<CaretLeftIcon />}
    nextLabel={<CaretRightIcon />}
    activeClassName={styles.active}
  />
);
