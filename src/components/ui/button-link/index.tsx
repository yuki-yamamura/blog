"use client";

import { cva } from "class-variance-authority";
import { Link } from "react-aria-components";

import type { VariantProps } from "class-variance-authority";

import styles from "./index.module.css";

const linkButton = cva(styles.base, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type Props = React.ComponentPropsWithoutRef<typeof Link> & {
  rightIcon?: React.ReactNode;
} & VariantProps<typeof linkButton>;

export const ButtonLink = ({ size, ...props }: Props) => (
  <Link {...props} className={linkButton({ size })}>
    Link to example.com
  </Link>
);
