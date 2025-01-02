import { TagGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  component: TagGroup,
} satisfies Meta<typeof TagGroup>;

export default meta;
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
        slug: 'cooking',
        name: 'Cooking',
      },
      {
        id: 'c_0j2m3lbhvv',
        createdAt: '2024-11-03T01:12:30.344Z',
        updatedAt: '2024-11-03T01:12:30.344Z',
        publishedAt: '2024-11-03T01:12:30.344Z',
        revisedAt: '2024-11-03T01:12:30.344Z',
        slug: 'game',
        name: 'Game',
      },
    ],
  },
};
