import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, any>;
  breadcrumbs?: { name: string; url: string }[];
}

export default function SEO({ 
  title, 
  description, 
  keywords = "industria farmacéutica, biotecnología, management en salud, insights, tendencias farma, liderazgo", 
  url = "https://bhinsights.es", 
  image = "", 
  type = "website",
  jsonLd,
  breadcrumbs
}: SEOProps) {
  const fullTitle = `${title} | BH Insights`;
  
  // Base Breadcrumb structure
  const breadcrumbList = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content="#22d3ee" />
      
      {/* Bot & Generative Engine Optimization (GEO) tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Authorship and E-E-A-T signals */}
      <meta name="author" content="BH Insights" />
      <meta name="publisher" content="Farma Leaders Talento" />
      
      {/* Geo-targeting */}
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="Madrid" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="BH Insights" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content="@FarmaLeaders" />
      <meta property="twitter:site" content="@FarmaLeaders" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="es-ES" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Structured Data for Search / AI Engines (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbList && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>
      )}
    </Helmet>
  );
}
