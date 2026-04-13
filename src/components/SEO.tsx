import { useEffect, useState } from "react";
import { Language, SITE_URL, languages } from "@/hooks/useLanguage";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
  noindex?: boolean;
  currentLang?: Language;
}

const siteName = "Mono Charcoal";

const SEO = ({
  title,
  description,
  keywords = "shisha charcoal, hookah charcoal, BBQ charcoal, coconut shell charcoal, charcoal factory Indonesia, charcoal manufacturer, charcoal exporter, OEM charcoal",
  canonical = SITE_URL,
  ogImage = "/og-image.jpg",
  schema,
  noindex = false,
  currentLang = "en",
}: SEOProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fullTitle = `${title} | ${siteName}`;
    document.title = fullTitle;

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Robots meta
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow");
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "index, follow";
      document.head.appendChild(meta);
    }

    // Canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonical);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = canonical;
      document.head.appendChild(link);
    }

    // OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", fullTitle);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:title";
      meta.content = fullTitle;
      document.head.appendChild(meta);
    }

    // OG Description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // OG URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute("content", canonical);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:url";
      meta.content = canonical;
      document.head.appendChild(meta);
    }

    // OG Image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute("content", ogImage);
    } else {
      const meta = document.createElement("meta");
      meta.property = "og:image";
      meta.content = ogImage;
      document.head.appendChild(meta);
    }

    // Schema.org
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.textContent = JSON.stringify(schema);
    } else if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Robots meta
    if (noindex) {
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute("content", "noindex, nofollow");
      } else {
        const meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = "noindex, nofollow";
        document.head.appendChild(meta);
      }
    }

    // hreflang tags for multi-language SEO
    languages.forEach((lang) => {
      const langUrl = lang.code === 'en' ? SITE_URL : `${SITE_URL}/${lang.code}/`;
      const hreflang = document.querySelector(`link[rel="alternate"][hreflang="${lang.code}"]`);
      if (hreflang) {
        hreflang.setAttribute("href", langUrl);
      } else {
        const link = document.createElement("link");
        link.rel = "alternate";
        link.hreflang = lang.code;
        link.href = langUrl;
        document.head.appendChild(link);
      }
    });

    // x-default hreflang
    const hreflangDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (hreflangDefault) {
      hreflangDefault.setAttribute("href", SITE_URL + "/");
    } else {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = "x-default";
      link.href = SITE_URL + "/";
      document.head.appendChild(link);
    }
  }, [title, description, keywords, canonical, ogImage, schema, mounted, noindex, currentLang]);

  return null;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mono Charcoal",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
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