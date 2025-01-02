'use client';

import { Link as ReactAriaLink } from 'react-aria-components';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof ReactAriaLink>;

export const Link = ({ href, ...props }: Props) => {
  const isExternalLink = href && /^https?:\/\//.test(href);
  console.log({ isExternalLink });

  if (isExternalLink) {
    return <ReactAriaLink target="_blank" href={href} {...props} />;
  }

  return <ReactAriaLink href={href} {...props} />;
};
