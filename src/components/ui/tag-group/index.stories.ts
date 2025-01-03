import { TagGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: TagGroup,
} satisfies Meta<typeof TagGroup>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
      {
        id: 'c_0j2m3lbhvv',
        createdAt: '2024-11-03T01:12:30.344Z',
        updatedAt: '2024-11-03T01:12:30.344Z',
        publishedAt: '2024-11-03T01:12:30.344Z',
        revisedAt: '2024-11-03T01:12:30.344Z',
        slug: 'next',
        name: 'Next.js',
      },
    ],
  },
};

export default meta;
