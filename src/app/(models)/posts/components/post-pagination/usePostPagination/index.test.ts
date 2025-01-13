import { usePostPagination } from '.';
import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { describe, expect, test, vi } from 'vitest';

import type { Post } from '@/app/(models)/posts/types/post';
import type { Mock } from 'vitest';

const mockedPush = vi.fn();
vi.mock('next/navigation');

describe('usePostPagination', () => {
  describe('pageCount', () => {
    test('should return correct pageCount', () => {
      // arrange
      (useRouter as Mock).mockReturnValueOnce({
        push: mockedPush,
      });
      (useSearchParams as Mock).mockReturnValueOnce(new URLSearchParams());

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
      (useRouter as Mock).mockReturnValueOnce({
        push: mockedPush,
      });
      (useSearchParams as Mock).mockReturnValueOnce(new URLSearchParams());

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

  describe('onClick', () => {
    test('should call router.push with correct path', () => {
      // arrange
      (useRouter as Mock).mockReturnValueOnce({
        push: mockedPush,
      });
      (useSearchParams as Mock).mockReturnValueOnce(new URLSearchParams());

      const currentPage = 1;
      const posts = Array.from({ length: 11 }, (_, i) => ({ id: i + 1 })) as unknown as Post[];
      const {
        result: {
          current: { onClick },
        },
      } = renderHook(() => usePostPagination({ currentPage, posts }));

      // act
      onClick({
        index: null,
        selected: 1,
        nextSelectedPage: 2,
        event: {},
        isPrevious: false,
        isNext: false,
        isBreak: false,
        isActive: false,
      });

      // assert
      expect(mockedPush).toHaveBeenCalledWith('/posts/page/3/');
    });

    test('should call router.push with correct path even if there is a search parameter', () => {
      // arrange
      (useRouter as Mock).mockReturnValueOnce({
        push: mockedPush,
      });
      (useSearchParams as Mock).mockReturnValueOnce(new URLSearchParams({ tag: 'react' }));

      const currentPage = 1;
      const posts = Array.from({ length: 11 }, (_, i) => ({ id: i + 1 })) as unknown as Post[];
      const {
        result: {
          current: { onClick },
        },
      } = renderHook(() => usePostPagination({ currentPage, posts }));

      // act
      onClick({
        index: null,
        selected: 1,
        nextSelectedPage: 2,
        event: {},
        isPrevious: false,
        isNext: false,
        isBreak: false,
        isActive: false,
      });

      // assert
      expect(mockedPush).toHaveBeenCalledWith('/posts/page/3/?tag=react');
    });
  });
});
