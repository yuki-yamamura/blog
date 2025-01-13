import { Link } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
};
