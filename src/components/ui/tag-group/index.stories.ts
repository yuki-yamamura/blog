import { TagGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: TagGroup,
} satisfies Meta<typeof TagGroup>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tags: ['React', 'Next.js'],
  },
};

export default meta;
