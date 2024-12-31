import React from "react";
import { jost } from "../src/lib/next";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={jost.className}>
        <Story />
      </div>
    ),
  ],
};

export default preview;