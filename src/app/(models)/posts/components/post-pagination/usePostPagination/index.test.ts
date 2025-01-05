import { usePostPagination } from '.';
import { renderHook } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { vi } from 'vitest';

import type { Post } from '@/app/(models)/posts/types/post';

const mockedPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockedPush,
  }),
}));

describe('usePostPagination', () => {
  describe('pageCount', () => {
    test('should return correct pageCount', () => {
      // arrange
      const currentPage = 1;
      const posts = Array.from({ length: 11 }, (_, i) => ({ id: i + 1 })) as unknown as Post[];

      // act
      const {
        result: {
          current: { pageCount },
        },
      } = renderHook(() => usePostPagination({ currentPage, posts }));

      // assert
      expect(pageCount).toBe(2);
    });
  });

  describe('hrefBuilder', () => {
    test('should return href correctly', () => {
      // arrange
      const currentPage = 1;
      const posts = Array.from({ length: 11 }, (_, i) => ({ id: i + 1 })) as unknown as Post[];
      const {
        result: {
          current: { pageCount, hrefBuilder },
        },
      } = renderHook(() => usePostPagination({ currentPage, posts }));

      // act, assert
      expect(hrefBuilder(2, pageCount, 1)).toBe('/posts/page/2/');
    });
  });

  describe('onPageChange', () => {
    test('should call router.push with necessary arguments', () => {
      // arrange
      const currentPage = 1;
      const posts = Array.from({ length: 11 }, (_, i) => ({ id: i + 1 })) as unknown as Post[];
      const {
        result: {
          current: { onPageChange },
        },
      } = renderHook(() => usePostPagination({ currentPage, posts }));

      // act
      onPageChange({ selected: 2 });

      // assert
      expect(mockedPush).toHaveBeenCalledWith('/posts/page/3/');
    });
  });
});
