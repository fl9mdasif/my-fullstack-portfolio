/* eslint-disable @next/next/no-img-element */

/**
 * Thin image wrapper. The original project routed through Cloudinary; here the
 * src is used as-is so remote hosts need no next.config allowlist entry.
 */
export function CldImg({
  src,
  alt,
  w,
  h,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  w?: number;
  h?: number;
  sizes?: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
