import { Helmet, HelmetProvider } from "react-helmet-async";


type SEOProps = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  twitterHandle?: string;
  children?: React.ReactNode;
};

export function SEO({ title, description, image, url, type, twitterHandle, children }: SEOProps) {
  const ogImage = image || "https://lovable.dev/opengraph-image-p98pqg.png";
  const ogType = type || "website";
  const ogUrl = url || (typeof window !== 'undefined' ? window.location.href : undefined);
  const twitter = twitterHandle || "@lovable_dev";
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#1e293b" />
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        <meta property="og:image" content={ogImage} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content={twitter} />
        {children}
      </Helmet>
    </HelmetProvider>
  );
}
