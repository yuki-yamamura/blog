import type { Meta, StoryObj } from "@storybook/react";

import { ButtonLink } from "./";

const meta = {
  component: ButtonLink,
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
