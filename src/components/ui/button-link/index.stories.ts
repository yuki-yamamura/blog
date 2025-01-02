import { ButtonLink } from './';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ButtonLink,
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'button',
  },
};
