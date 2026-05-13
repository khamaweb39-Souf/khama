import React from 'react';

interface SEOHeadProps {
  type: 'Product' | 'Organization' | 'WebSite' | 'LocalBusiness';
  data: any;
}

export default function SEOHead({ type, data }: SEOHeadProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Helper for Product Schema
export const getProductSchema = (fabric: any) => ({
  name: fabric.name,
  description: fabric.description || `قماش ${fabric.name} عالي الجودة متوفر على منصة خامة.`,
  image: fabric.image,
  brand: {
    "@type": "Brand",
    "name": fabric.supplier || "Khama Supplier"
  },
  offers: {
    "@type": "Offer",
    "url": `https://khama.dz/catalogue/${fabric.id}`,
    "priceCurrency": "DZD",
    "price": fabric.price?.replace(/[^0-9.]/g, '') || "0",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Khama Marketplace"
    }
  },
  material: fabric.composition,
  fabric: fabric.gsm ? `${fabric.gsm}g/m²` : undefined
});

// Helper for Home Schema
export const getHomeSchema = () => ({
  name: "خامة - Khama",
  url: "https://khama.dz",
  potentialAction: {
    "@type": "SearchAction",
    "target": "https://khama.dz/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});
