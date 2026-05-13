'use client';

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  canonical?: string;
  keywords?: string[];
}

export const useSEO = (props: SEOProps) => {
  const defaultTitle = "خامة | منصة الصناعات النسيجية والجلود";
  const fullTitle = `${props.title} | ${defaultTitle}`;
  const baseUrl = "https://khama.dz";

  return {
    title: fullTitle,
    description: props.description,
    openGraph: {
      title: fullTitle,
      description: props.description,
      images: props.image ? [{ url: props.image }] : undefined,
      type: props.type || 'website',
      url: props.canonical ? `${baseUrl}${props.canonical}` : baseUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: props.description,
      images: props.image ? [props.image] : undefined,
    },
    alternates: {
      canonical: props.canonical ? `${baseUrl}${props.canonical}` : baseUrl,
    },
    keywords: props.keywords?.join(', ') || "تنسوجات, أقمشة, خامة, B2B, sourcing textile",
  };
};
