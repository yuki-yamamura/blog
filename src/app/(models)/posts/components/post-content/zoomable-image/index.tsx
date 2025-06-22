import Zoom from 'react-medium-image-zoom';

import type { ComponentProps } from 'react';

import 'react-medium-image-zoom/dist/styles.css';

type Props = ComponentProps<'img'>;

export const ZoomableImage = ({ alt, src, ...props }: Props) => {
  return (
    <Zoom>
      <img alt={alt} src={src} {...props} />
    </Zoom>
  );
};