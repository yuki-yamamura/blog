import { PostList } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: PostList,
} satisfies Meta<typeof PostList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    posts: [
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
            id: 'sb2tvzuzwp',
            createdAt: '2024-10-12T03:32:24.135Z',
            updatedAt: '2024-10-12T03:32:24.135Z',
            publishedAt: '2024-10-12T03:32:24.135Z',
            revisedAt: '2024-10-12T03:32:24.135Z',
            slug: 'next',
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
            id: 'c_0j2m3lbhvp',
            createdAt: '2024-11-03T01:12:30.344Z',
            updatedAt: '2024-11-03T01:12:30.344Z',
            publishedAt: '2024-11-03T01:12:30.344Z',
            revisedAt: '2024-11-03T01:12:30.344Z',
            slug: 'react',
            name: 'React',
          },
        ],
        thumbnail: {
          url: 'https://images.microcms-assets.io/assets/e2874dbb8b39415fa7823d981e6ff6f8/d8f114955f5441c3a75abd43f58c946c/snowman.svg',
          height: 520,
          width: 520,
        },
      },
    ],
  },
};
