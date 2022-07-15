import { ImageLoaderProps } from 'next/image';

export const storyblokImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [
    'm',
    width + 'x0',
    'filters:quality(' + (quality || '90') + ')',
  ];
  return `${src}/${params.join('/')}`;
};
