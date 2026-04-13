import { useEffect } from "react";
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

const getOrCreateMeta = (selector: string, createAttrs: Record<string, string>, trackedElements: HTMLElement[]) => {
  let el = document.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(createAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
    trackedElements.push(el);
  }
  return el;
};

const getOrCreateLink = (selector: string, createAttrs: Record<string, string>, trackedElements: HTMLElement[]) => {
  let el = document.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement("link");
    Object.entries(createAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
    trackedElements.push(el);
  }
  return el;
};

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
  useEffect(() => {
    const created: HTMLElement[] = [];
    const fullTitle = `${title} | ${siteName}`;
    document.title = fullTitle;

    // Meta tags
    const desc = getOrCreateMeta('meta[name="description"]', { name: "description" }, created);
    desc.setAttribute("content", description);

    const kw = getOrCreateMeta('meta[name="keywords"]', { name: "keywords" }, created);
    kw.setAttribute("content", keywords);

    const robots = getOrCreateMeta('meta[name="robots"]', { name: "robots" }, created);
    robots.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow");

    // Canonical
    const can = getOrCreateLink('link[rel="canonical"]', { rel: "canonical" }, created);
    can.setAttribute("href", canonical);

    // OG tags
    const ogT = getOrCreateMeta('meta[property="og:title"]', { property: "og:title" }, created);
    ogT.setAttribute("content", fullTitle);

    const ogD = getOrCreateMeta('meta[property="og:description"]', { property: "og:description" }, created);
    ogD.setAttribute("content", description);

    const ogU = getOrCreateMeta('meta[property="og:url"]', { property: "og:url" }, created);
    ogU.setAttribute("content", canonical);

    const ogI = getOrCreateMeta('meta[property="og:image"]', { property: "og:image" }, created);
    ogI.setAttribute("content", ogImage);

    // Schema.org
    let schemaEl = document.querySelector('script[type="application/ld+json"][data-seo]');
    if (schemaEl) {
      if (schema) schemaEl.textContent = JSON.stringify(schema);
    } else if (schema) {
      schemaEl = document.createElement("script");
      schemaEl.setAttribute("type", "application/ld+json");
      schemaEl.setAttribute("data-seo", "true");
      schemaEl.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaEl);
      created.push(schemaEl as HTMLElement);
    }

    // hreflang tags
    languages.forEach((lang) => {
      const langUrl = lang.code === 'en' ? SITE_URL : `${SITE_URL}/${lang.code}/`;
      const hl = getOrCreateLink(`link[rel="alternate"][hreflang="${lang.code}"]`, { rel: "alternate", hreflang: lang.code }, created);
      hl.setAttribute("href", langUrl);
    });

    const def = getOrCreateLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default" }, created);
    def.setAttribute("href", SITE_URL + "/");

    // Cleanup: only remove elements this effect created
    return () => {
      created.forEach((el) => {
        try { el.parentNode?.removeChild(el); } catch {}
      });
    };
  }, [title, description, keywords, canonical, ogImage, schema, noindex, currentLang]);

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
    "Australia", "New Zealand", "Turkey", "Canada", "Ukraine",
    "Russia", "Brazil", "Japan", "Jordan", "Iraq", "Saudi Arabia",
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
