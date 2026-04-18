'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './skeleton';
import { cn } from '@/lib/utils';

/**
 * next/image already gives us placeholder="blur", but that just shows a
 * blurred preview. This wraps it with a shimmer Skeleton layer that
 * fades out on load, giving a clear "loading" signal — especially on
 * mobile and on the detail-page gallery.
 */
export default function LoadingImage({ className, wrapperClassName, ...props }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={cn('relative block', wrapperClassName)}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-[inherit] z-10" />}
      <Image
        {...props}
        onLoadingComplete={(img) => {
          // next/image fires this when the <img> element finishes loading
          setLoaded(true);
          props.onLoadingComplete?.(img);
        }}
        className={cn(
          'transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </span>
  );
}

export function Spinner({ className, size = 16 }) {
  return (
    <span
      className={cn('inline-block align-middle', className)}
      style={{
        width: size,
        height: size,
        border: '2px solid currentColor',
        borderRightColor: 'transparent',
        borderRadius: '50%',
        animation: 'aq-spin 0.8s linear infinite'
      }}
      aria-hidden
    />
  );
}
