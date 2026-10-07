import { CONTENT, OG_IMAGE_URL, PATHS, SITE_URL, pathFor, type Lang, type PageId } from "./i18n";

const INSTAGRAM_URL = "https://www.instagram.com/gravityclub.zurich";

export function getPageMeta(lang: Lang, page: PageId): { title: string; description: string } {
  const t = CONTENT[lang];
  if (page === "home") return t.home;
  if (page === "location") return t.locationMeta;
  const c = t.classPages[page];
  return { title: c.metaTitle, description: c.metaDescription };
}

export function canonicalUrl(lang: Lang, page: PageId): string {
  const p = PATHS[lang][page];
  return p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`;
}

function gymNode(lang: Lang) {
  const t = CONTENT[lang];
  return {
    "@type": "ExerciseGym",
    name: "Gravity Club",
    description: t.schema.gymDescription,
    url: canonicalUrl(lang, "home"),
    image: OG_IMAGE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Zürich",
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    email: "hello@gravityclub-rebound.com",
    priceRange: t.schema.priceRange,
    sameAs: [INSTAGRAM_URL],
  };
}

export function getJsonLd(lang: Lang, page: PageId): object[] {
  const t = CONTENT[lang];
  const ld: object[] = [];

  if (page === "home") {
    ld.push({ "@context": "https://schema.org", ...gymNode(lang) });
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
    return ld;
  }

  const title = page === "location" ? t.locationPage.h1 : t.classPages[page].h1;
  ld.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Gravity Club", item: canonicalUrl(lang, "home") },
      { "@type": "ListItem", position: 2, name: title, item: canonicalUrl(lang, page) },
    ],
  });

  if (page === "location") {
    ld.push({ "@context": "https://schema.org", ...gymNode(lang) });
  } else {
    const c = t.classPages[page];
    ld.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.h1,
      description: c.metaDescription,
      serviceType: "Rebounder fitness class",
      provider: { "@type": "ExerciseGym", name: "Gravity Club", url: canonicalUrl(lang, "home") },
      areaServed: { "@type": "City", name: "Zürich" },
      offers: {
        "@type": "Offer",
        price: "34",
        priceCurrency: "CHF",
        url: canonicalUrl(lang, page),
      },
    });
  }
  return ld;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function getHeadHtml(lang: Lang, page: PageId): string {
  const { title, description } = getPageMeta(lang, page);
  const canonical = canonicalUrl(lang, page);
  const other: Lang = lang === "en" ? "de" : "en";
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="${lang}" href="${canonical}" />`,
    `<link rel="alternate" hreflang="${other}" href="${canonicalUrl(other, page)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl("en", page)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${lang === "de" ? "de_CH" : "en_US"}" />`,
    `<meta property="og:locale:alternate" content="${lang === "de" ? "en_US" : "de_CH"}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
  ];
  for (const node of getJsonLd(lang, page)) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(node).replace(/</g, "\\u003c")}</script>`);
  }
  return lines.join("\n    ");
}

export function sitemapXml(routes: { lang: Lang; page: PageId }[], lastmod: string): string {
  const pages: PageId[] = ["home", "hiit", "powerjump", "location"];
  const body = routes
    .map(({ lang, page }) => {
      const other: Lang = lang === "en" ? "de" : "en";
      return `  <url>
    <loc>${canonicalUrl(lang, page)}</loc>
    <lastmod>${lastmod}</lastmod>
    <xhtml:link rel="alternate" hreflang="${lang}" href="${canonicalUrl(lang, page)}" />
    <xhtml:link rel="alternate" hreflang="${other}" href="${canonicalUrl(other, page)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl("en", page)}" />
  </url>`;
    })
    .join("\n");
  void pages;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

export { pathFor };
