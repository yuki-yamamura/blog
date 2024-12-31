import type { Meta, StoryObj } from '@storybook/react';

import { PostItem } from '.';

const meta = {
  component: PostItem,
} satisfies Meta<typeof PostItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'f07xdymrrl',
    publishedAt: '2024-12-11T05:00:27.371Z',
    title: 'custom filed testing',
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
  },
};
