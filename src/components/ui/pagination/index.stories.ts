import { Pagination } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageCount: 5,
    initialPage: 0,
    onClick: () => {},
    hrefBuilder: () => {},
  },
};

export default meta;
