interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  srcSet?: string;
}

/**
 * OptimizedImage Component - Improves LCP and CLS
 *
 * Features:
 * - Supports WebP with a fallback to PNG/JPG
 * - Automatic lazy loading (except for priority images)
 * - Explicit dimensions to prevent CLS
 * - CSS aspect ratio to improve layout
 *
 * Usage:
 * <OptimizedImage
 *   src="/images/hero-main.jpg"
 *   alt="RevPlanner Revenue Engine illustration"
 *   width={1200}
 *   height={600}
 *   priority={true}
 * />
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  srcSet,
}: OptimizedImageProps) {
  const basePath = src.replace(/\.[^.]+$/, '');

  return (
    <picture>
      {/* WebP for modern browsers (smaller) */}
      <source
        srcSet={srcSet || `${basePath}.webp`}
        type="image/webp"
      />
      {/* PNG/JPG fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        style={{ 
          aspectRatio: `${width}/${height}`,
          objectFit: 'cover',
        }}
      />
    </picture>
  );
}
