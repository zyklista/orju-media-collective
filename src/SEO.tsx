import { Helmet, HelmetProvider } from "react-helmet-async";

export function SEO({ title, description, children }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#1e293b" />
        {children}
      </Helmet>
    </HelmetProvider>
  );
}
