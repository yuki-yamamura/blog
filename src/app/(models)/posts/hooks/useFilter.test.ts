import { useFilter } from './useFilter';
import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { afterEach, describe, expect, test, vi } from 'vitest';

import type { Post } from '@/app/(models)/posts/types/post';
import type { Mock } from 'vitest';

vi.mock('next/navigation');

const initialPosts: Post[] = [
  {
    id: 'f07xdymrrl',
    createdAt: '2024-12-11T05:00:27.371Z',
    updatedAt: '2024-12-11T05:05:47.842Z',
    publishedAt: '2024-12-11T05:00:27.371Z',
    revisedAt: '2024-12-11T05:05:47.842Z',
    title: 'title_1',
    content: 'content',
    tags: [
      {
        id: 'nextjs',
        createdAt: '2024-10-12T03:32:24.135Z',
        updatedAt: '2024-10-12T03:32:24.135Z',
        publishedAt: '2024-10-12T03:32:24.135Z',
        revisedAt: '2024-10-12T03:32:24.135Z',
        name: 'Next.js',
      },
    ],
    thumbnail: {
      url: 'https://images.microcms-assets.io/assets/e2874dbb8b39415fa7823d981e6ff6f8/00704485555f48b7a54fc95a2b7e053f/idea.png',
      height: 520,
      width: 520,
    },
  },
  {
    id: 'h8dco6i-x',
    createdAt: '2024-11-03T01:13:28.778Z',
    updatedAt: '2024-11-03T01:13:28.778Z',
    publishedAt: '2024-11-03T01:13:28.778Z',
    revisedAt: '2024-11-03T01:13:28.778Z',
    title: 'title_2',
    content: 'content',
    tags: [
      {
        id: 'react',
        createdAt: '2024-11-03T01:12:30.344Z',
        updatedAt: '2024-11-03T01:12:30.344Z',
        publishedAt: '2024-11-03T01:12:30.344Z',
        revisedAt: '2024-11-03T01:12:30.344Z',
        name: 'React',
      },
    ],
    thumbnail: {
      url: 'https://images.microcms-assets.io/assets/e2874dbb8b39415fa7823d981e6ff6f8/d8f114955f5441c3a75abd43f58c946c/snowman.svg',
      height: 520,
      width: 520,
    },
  },
];

describe('useFilter', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('filters posts by tag getting from search params', () => {
    // arrange
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams({ tag: 'react' }));

    // act
    const {
      result: {
        current: { posts },
      },
    } = renderHook(() => useFilter(initialPosts));

    // assert
    expect(posts).toEqual([
      {
        id: 'h8dco6i-x',
        createdAt: '2024-11-03T01:13:28.778Z',
        updatedAt: '2024-11-03T01:13:28.778Z',
        publishedAt: '2024-11-03T01:13:28.778Z',
        revisedAt: '2024-11-03T01:13:28.778Z',
        title: 'title_2',
        content: 'content',
        tags: [
          {
            id: 'react',
            createdAt: '2024-11-03T01:12:30.344Z',
            updatedAt: '2024-11-03T01:12:30.344Z',
            publishedAt: '2024-11-03T01:12:30.344Z',
            revisedAt: '2024-11-03T01:12:30.344Z',
            name: 'React',
          },
        ],
        thumbnail: {
          url: 'https://images.microcms-assets.io/assets/e2874dbb8b39415fa7823d981e6ff6f8/d8f114955f5441c3a75abd43f58c946c/snowman.svg',
          height: 520,
          width: 520,
        },
      },
    ]);
  });

  test('returns initial posts when there is no tag in search params', () => {
    // arrange
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());

    // act
    const {
      result: {
        current: { posts },
      },
    } = renderHook(() => useFilter(initialPosts));

    // assert
    expect(posts).toEqual(initialPosts);
  });
});
