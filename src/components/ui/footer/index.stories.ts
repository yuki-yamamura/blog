import { Footer } from '.';

import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
