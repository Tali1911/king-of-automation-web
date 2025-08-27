import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schemaData?: object;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "NafArro Solutions | King of Automation",
  description = "Leading automation specialists providing website development, web applications, and data analysis services. Transform your business with intelligent automation solutions.",
  keywords = "automation, web development, web applications, data analysis, React, Node.js, Express, MongoDB, Supabase, business automation, process automation",
  canonical,
  ogImage = "/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png",
  ogType = "website",
  schemaData,
  noindex = false,
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const defaultSchemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NafArro Solutions",
    "description": "Leading automation specialists providing innovative technology solutions",
    "url": siteUrl,
    "logo": `${siteUrl}/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+1-555-NAFARRO",
      "email": "info@nafarrosolutions.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/nafarrosolutions",
      "https://linkedin.com/company/nafarrosolutions"
    ],
    "founder": {
      "@type": "Person",
      "name": "NafArro Team"
    },
    "foundingDate": "2023",
    "numberOfEmployees": "10-50",
    "industry": "Technology Services",
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="NafArro Solutions" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:alt" content="NafArro Solutions - Automation Specialists" />
      <meta property="og:site_name" content="NafArro Solutions" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nafarrosolutions" />
      <meta name="twitter:creator" content="@nafarrosolutions" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content="NafArro Solutions - Automation Specialists" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0A2463" />
      <meta name="msapplication-TileColor" content="#0A2463" />
      <meta name="application-name" content="NafArro Solutions" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;