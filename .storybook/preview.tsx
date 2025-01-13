import { jost } from '../src/lib/next/fonts';
import React from 'react';

import type { Preview } from '@storybook/react';

import '@unocss/reset/tailwind.css';

import '../src/app/globals.css';

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
