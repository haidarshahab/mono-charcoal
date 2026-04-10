import { useEffect, useState } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

const siteName = "Mono Charcoal";

const SEO = ({
  title,
  description,
  keywords = "coconut charcoal, shisha charcoal, hookah charcoal, BBQ charcoal, charcoal factory, Indonesia charcoal manufacturer, charcoal exporter",
  canonical = "https://mono-charcoal-one.vercel.app",
  ogImage = "https://mono-charcoal-one.vercel.app/og-image.jpg",
  schema,
}: SEOProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fullTitle = `${title} | ${siteName}`;
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonical);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = canonical;
      document.head.appendChild(link);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", fullTitle);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:title";
      meta.content = fullTitle;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", ogImage);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:image";
      meta.content = ogImage;
      document.head.appendChild(meta);
    }

    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.textContent = JSON.stringify(schema);
    } else if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonical, ogImage, schema, mounted]);

  return null;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mono Charcoal",
  url: "https://mono-charcoal-one.vercel.app",
  logo: "https://mono-charcoal-one.vercel.app/logo.png",
  description: "Premium coconut shell charcoal manufacturer and exporter from Indonesia. Specializing in shisha and BBQ charcoal for global wholesale buyers.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
    addressRegion: "Bekasi, Java",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62",
    contactType: "sales",
  },
  areaServed: [
    "Australia",
    "New Zealand",
    "Turkey",
    "Canada",
    "Ukraine",
    "Russia",
    "Brazil",
    "Japan",
    "Jordan",
    "Iraq",
    "Saudi Arabia",
  ],
};

export const productSchema = (productName: string, description: string, brand = "Mono Charcoal") => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: productName,
  description,
  brand: { "@type": "Brand", name: brand },
  manufacturer: { "@type": "Organization", name: "Mono Charcoal" },
  countryOfOrigin: { "@type": "Country", name: "Indonesia" },
  offers: { "@type": "Offer", availability: "https://schema.org/InStock", minOrderQuantity: "18" },
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export default SEO;