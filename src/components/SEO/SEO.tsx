import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterHandle?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://revplanner.io/og-image.png',
  ogType = 'website',
  twitterHandle = '@RevPlannerAI',
  noindex = false,
  children,
}: SEOProps) {
  const fullTitle = title.includes('RevPlanner') ? title : `${title} | RevPlanner`;
  const formattedDescription = description.slice(0, 160);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={formattedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Search Engine Crawlers */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="RevPlanner" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={formattedDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Additional SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data */}
      {children}
    </Helmet>
  );
}
