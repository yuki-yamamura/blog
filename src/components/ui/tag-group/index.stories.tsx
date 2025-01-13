import { TagGroup, Tag, TagLink } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: TagGroup,
} satisfies Meta<typeof TagGroup>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Tag>One</Tag>
        <Tag>Two</Tag>
        <Tag>Three</Tag>
      </>
    ),
  },
};

export const WithTagLinks: Story = {
  args: {
    label: 'Links',
    children: (
      <>
        <TagLink href="#">One</TagLink>
        <TagLink href="#">Two</TagLink>
        <TagLink href="#">Three</TagLink>
      </>
    ),
  },
};

export default meta;
