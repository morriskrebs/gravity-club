import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CONTENT, IMPRINT_TEXT, SITE_URL, pathFor, type Content, type Lang, type PageId } from "./i18n";
import { canonicalUrl, getPageMeta } from "./seo";

const HERO_IMAGES = [
  "/hero.jpg",
] as const;

const META_CURRENCY = "CHF";
const META_DEFAULT_VALUE = 34;

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: '"Space Grotesk", Inter, ui-sans-serif, system-ui, sans-serif',
  fontWeight: 700,
  letterSpacing: "-0.03em",
};

const META_PIXEL_ID = "4479962442290722";
const GA_MEASUREMENT_ID = "G-62PXNJZY9K";
const TRACKING_CONSENT_KEY = "gravity-club-tracking-consent";
const GA_CLIENT_ID_KEY = "gravity-club-ga-client-id";
const GA_SESSION_ID_KEY = "gravity-club-ga-session-id";

function getGaClientId(): string {
  try {
    const existing = window.localStorage.getItem(GA_CLIENT_ID_KEY);
    if (existing) return existing;
    const id = `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
    window.localStorage.setItem(GA_CLIENT_ID_KEY, id);
    return id;
  } catch {
    return `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;
  }
}

// GA4 Measurement Protocol groups server-side events into a session via
// session_id + engagement_time_msec on every event. Without it, GA4 shows
// these events with 0 sessions and "Unassigned" channel instead of the real
// traffic source. sessionStorage keeps this scoped to one browser tab/visit,
// matching how a GA4 session normally resets.
function getGaSessionId(): { sessionId: string; isNew: boolean } {
  try {
    const existing = window.sessionStorage.getItem(GA_SESSION_ID_KEY);
    if (existing) return { sessionId: existing, isNew: false };
    const id = `${Math.floor(Date.now() / 1000)}`;
    window.sessionStorage.setItem(GA_SESSION_ID_KEY, id);
    return { sessionId: id, isNew: true };
  } catch {
    return { sessionId: `${Math.floor(Date.now() / 1000)}`, isNew: true };
  }
}
const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;
const INSTAGRAM_URL = "https://www.instagram.com/gravityclub.zurich";
const EMAILJS_SERVICE_ID = "service_i97vsjn";
const EMAILJS_TEMPLATE_ID = "template_jqw77qu";
const EMAILJS_PUBLIC_KEY = "a7pGbsGGBrnjFd9Se";
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

function SectionTitle({
  eyebrow,
  title,
  copy,
  centered = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  copy?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <div className="text-sm uppercase tracking-[0.28em] text-[#1FE4D6]">{eyebrow}</div>
      <h2
        className="mt-4 text-[2rem] leading-[1] text-[#D9D9D9] sm:text-[2.8rem]"
        style={HEADING_STYLE}
      >
        {title}
      </h2>
      {copy ? (
        <p className={`mt-4 max-w-2xl text-base leading-7 text-[#D9D9D9]/68 whitespace-pre-line ${centered ? "mx-auto text-center" : ""}`}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[28px] border border-[#D9D9D9]/10 bg-[#D9D9D9]/[0.04] shadow-[0_10px_50px_rgba(0,0,0,0.22)] ${className}`}
    >
      {children}
    </div>
  );
}

function LegalModal({
  title,
  content,
  closeLabel,
  onClose,
}: {
  title: string;
  content: string;
  closeLabel: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = `legal-modal-title-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current) return;

      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const focusable = Array.from(focusableElements).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || active === dialogRef.current) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActive?.focus?.();
    };
  }, [onClose, title]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 py-6" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0A0A] shadow-[0_24px_100px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div id={titleId} className="text-sm uppercase tracking-[0.24em] text-[#1FE4D6]" style={HEADING_STYLE}>
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-[#D9D9D9]"
            aria-label={closeLabel}
          >
            <X size={16} />
          </button>
        </div>
        <div className="max-h-[calc(85vh-72px)] overflow-y-auto px-5 py-5">
          <pre
            className="whitespace-pre-wrap text-sm leading-7 text-[#D9D9D9]/75"
            style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
          >
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}

function FaqItem({
  category,
  question,
  answer,
}: {
  category: string;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#1FE4D6]">{category}</div>
      <div className="rounded-[22px] border border-[#D9D9D9]/10 bg-[#D9D9D9]/[0.03]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
        >
          <div className="text-base text-[#D9D9D9]" style={HEADING_STYLE}>
            {question}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9D9D9]/10 bg-black/30 text-[#D9D9D9]">
            {open ? "−" : "+"}
          </div>
        </button>
        {open ? <p id={panelId} className="px-5 pb-5 text-sm leading-7 text-[#D9D9D9]/72">{answer}</p> : null}
      </div>
    </div>
  );
}

function getLegalTitle(t: Content, modal: null | "imprint" | "privacy" | "terms") {
  return modal === "imprint" ? t.footer.imprint : modal === "privacy" ? t.footer.privacy : modal === "terms" ? t.footer.terms : "";
}

function getLegalContent(t: Content, modal: null | "imprint" | "privacy" | "terms") {
  return modal === "imprint" ? IMPRINT_TEXT : modal === "privacy" ? t.legal.privacy : modal === "terms" ? t.legal.terms : "";
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={line}>
          {i > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </>
  );
}

function SubPageBreadcrumb({ lang, t, title }: { lang: Lang; t: Content; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-[#D9D9D9]/50">
      <a href={pathFor(lang, "home")} className="hover:text-[#1FE4D6]">
        Gravity Club
      </a>
      <span className="mx-2">/</span>
      <a href={pathFor(lang, "home", "#classes")} className="hover:text-[#1FE4D6]">
        {t.ui.allClasses}
      </a>
      <span className="mx-2">/</span>
      <span className="text-[#1FE4D6]/80">{title}</span>
    </nav>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3 text-[15px] leading-7 text-[#D9D9D9]/75">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1FE4D6]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ClassPageView({
  lang,
  t,
  id,
  onBook,
}: {
  lang: Lang;
  t: Content;
  id: "hiit" | "powerjump";
  onBook: (label: string) => void;
}) {
  const c = t.classPages[id];
  const other = id === "hiit" ? "powerjump" : "hiit";
  const image = id === "hiit" ? "/man.jpg" : "/woman.jpg";
  const bookHref = pathFor(lang, "home", "#booking");
  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    onBook(c.h1);
    setTimeout(() => {
      window.location.href = bookHref;
    }, 200);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <SubPageBreadcrumb lang={lang} t={t} title={c.h1} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col justify-center">
          <div className="text-sm uppercase tracking-[0.28em] text-[#1FE4D6]">{c.eyebrow} · {c.trainer}</div>
          <h1 className="mt-4 text-[2.4rem] leading-[1] text-[#D9D9D9] sm:text-[3.4rem]" style={HEADING_STYLE}>
            {c.h1}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#D9D9D9]/75">{c.intro}</p>
          <div className="mt-7">
            <a
              href={bookHref}
              onClick={handleBook}
              className="gc-cta-pulse inline-flex rounded-full bg-[#1FE4D6] px-7 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.35)]"
            >
              {c.bookCta}
            </a>
          </div>
        </div>
        <img
          src={image}
          alt={c.imageAlt}
          width={1122}
          height={1402}
          fetchPriority="high"
          className="aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover"
        />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Card className="p-8">
          <h2 className="text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
            {c.expectTitle}
          </h2>
          <BulletList items={c.expect} />
        </Card>
        <Card className="p-8">
          <h2 className="text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
            {c.goodTitle}
          </h2>
          <BulletList items={c.good} />
        </Card>
      </div>

      <Card className="mt-6 border-[#1FE4D6]/30 bg-[linear-gradient(180deg,rgba(31,228,214,0.14),rgba(217,217,217,0.04))] p-8">
        <h2 className="text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
          {c.bookTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#D9D9D9]/75">{c.bookCopy}</p>
        <div className="mt-6">
          <a
            href={bookHref}
            onClick={handleBook}
            className="inline-flex rounded-full bg-[#1FE4D6] px-7 py-3 text-sm font-semibold text-black"
          >
            {c.bookCta}
          </a>
        </div>
      </Card>

      <div className="mt-10 text-sm">
        <a href={pathFor(lang, other)} className="text-[#1FE4D6] underline-offset-4 hover:underline">
          {c.seeAlso} →
        </a>
      </div>
    </section>
  );
}

function LocationPageView({ lang, t, onBook }: { lang: Lang; t: Content; onBook: (label: string) => void }) {
  const c = t.locationPage;
  const bookHref = pathFor(lang, "home", "#booking");
  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    onBook("Location page");
    setTimeout(() => {
      window.location.href = bookHref;
    }, 200);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.2em] text-[#D9D9D9]/50">
        <a href={pathFor(lang, "home")} className="hover:text-[#1FE4D6]">
          Gravity Club
        </a>
        <span className="mx-2">/</span>
        <span className="text-[#1FE4D6]/80">{c.eyebrow}</span>
      </nav>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col justify-center">
          <div className="text-sm uppercase tracking-[0.28em] text-[#1FE4D6]">{c.eyebrow}</div>
          <h1 className="mt-4 text-[2.4rem] leading-[1] text-[#D9D9D9] sm:text-[3.4rem]" style={HEADING_STYLE}>
            {c.h1}
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#D9D9D9]/75">{c.intro}</p>
        </div>
        <img
          src="/hero.jpg"
          alt={c.imageAlt}
          width={1672}
          height={941}
          fetchPriority="high"
          className="w-full rounded-[28px] border border-white/10 object-cover"
        />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Card className="p-8">
          <h2 className="text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
            {c.findTitle}
          </h2>
          <BulletList items={c.find} />
        </Card>
        <Card className="p-8">
          <h2 className="text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
            {c.insideTitle}
          </h2>
          <BulletList items={c.inside} />
        </Card>
      </div>

      <Card className="mt-6 border-[#1FE4D6]/30 bg-[linear-gradient(180deg,rgba(31,228,214,0.14),rgba(217,217,217,0.04))] p-8">
        <h2 className="text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
          {c.ctaTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#D9D9D9]/75">{c.ctaCopy}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={bookHref}
            onClick={handleBook}
            className="inline-flex rounded-full bg-[#1FE4D6] px-7 py-3 text-sm font-semibold text-black"
          >
            {c.ctaButton}
          </a>
          <a
            href={pathFor(lang, "hiit")}
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm text-[#D9D9D9]"
          >
            {t.classes.items[0].title}
          </a>
          <a
            href={pathFor(lang, "powerjump")}
            className="inline-flex rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm text-[#D9D9D9]"
          >
            {t.classes.items[1].title}
          </a>
        </div>
      </Card>
    </section>
  );
}

export default function GravityClubWebsitePreview({ lang, page }: { lang: Lang; page: PageId }) {
  const t = CONTENT[lang];
  const otherLang: Lang = lang === "en" ? "de" : "en";
  const [trackingConsent, setTrackingConsent] = useState<"accepted" | "declined" | "unset">("unset");
  const [consentInitialized, setConsentInitialized] = useState(false);
  const [legalModal, setLegalModal] = useState<null | "imprint" | "privacy" | "terms">(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formFeedback, setFormFeedback] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [formStartedAt] = useState(() => Date.now());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });
  const [isLive, setIsLive] = useState(() => Date.now() >= new Date("2026-10-05T18:00:00+02:00").getTime());

  const sendServerGaEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (trackingConsent !== "accepted") return;
    try {
      const { sessionId } = getGaSessionId();
      fetch("/api/ga-collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: getGaClientId(),
          events: [
            {
              name: eventName,
              params: { ...params, session_id: sessionId, engagement_time_msec: 1 },
            },
          ],
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  const trackGaEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (trackingConsent !== "accepted") return;
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) {
      if (params) gtag("event", eventName, params);
      else gtag("event", eventName);
    }
    sendServerGaEvent(eventName, params);
  };

  const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (trackingConsent !== "accepted") return;
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (!fbq) return;
    if (eventName === "InitiateCheckout") {
      fbq("track", eventName, { value: META_DEFAULT_VALUE, ...params, currency: META_CURRENCY });
    } else if (params) fbq("track", eventName, params);
    else fbq("track", eventName);
  };

  useEffect(() => {
    const { title: PAGE_TITLE, description: PAGE_DESCRIPTION } = getPageMeta(lang, page);
    const canonical = canonicalUrl(lang, page);
    document.title = PAGE_TITLE;
    document.documentElement.lang = lang;

    const upsertMetaTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        document.head.appendChild(tag);
      }
      Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
    };

    const upsertLinkTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector<HTMLLinkElement>(selector);
      if (!tag) {
        tag = document.createElement("link");
        document.head.appendChild(tag);
      }
      Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
    };

    upsertMetaTag('meta[name="description"]', { name: "description", content: PAGE_DESCRIPTION });
    upsertMetaTag('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMetaTag('meta[name="theme-color"]', { name: "theme-color", content: "#0A0A0A" });
    upsertMetaTag('meta[property="og:title"]', { property: "og:title", content: PAGE_TITLE });
    upsertMetaTag('meta[property="og:description"]', { property: "og:description", content: PAGE_DESCRIPTION });
    upsertMetaTag('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMetaTag('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMetaTag('meta[property="og:image"]', { property: "og:image", content: OG_IMAGE_URL });
    upsertMetaTag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: PAGE_TITLE });
    upsertMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: PAGE_DESCRIPTION });
    upsertMetaTag('meta[name="twitter:image"]', { name: "twitter:image", content: OG_IMAGE_URL });
    upsertLinkTag('link[rel="canonical"]', { rel: "canonical", href: canonical });
    upsertLinkTag('link[rel="icon"]', {
      rel: "icon",
      href: `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#0A0A0A"/><circle cx="32" cy="32" r="18" fill="#1FE4D6"/></svg>`
      )}`,
    });

    const link1 = document.createElement("link");
    link1.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);

    return () => {
      if (document.head.contains(link1)) document.head.removeChild(link1);
      if (document.head.contains(link2)) document.head.removeChild(link2);
    };
  }, [lang, page]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(TRACKING_CONSENT_KEY);
      if (saved === "accepted" || saved === "declined") {
        setTrackingConsent(saved);
      }
    } catch {
      // ignore localStorage access issues
    }
    setConsentInitialized(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (trackingConsent !== "accepted") return;

    const win = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
      fbq?: ((...args: unknown[]) => void) & {
        callMethod?: (...args: unknown[]) => void;
        queue?: unknown[][];
        push?: (...args: unknown[]) => void;
        loaded?: boolean;
        version?: string;
      };
      _fbq?: unknown;
    };

    if (GA_MEASUREMENT_ID) {
  try {
    const { sessionId, isNew } = getGaSessionId();
    const sessionParams = { session_id: sessionId, engagement_time_msec: 1 };
    const events = [
      ...(isNew ? [{ name: "session_start", params: sessionParams }] : []),
      {
        name: "page_view",
        params: {
          page_location: window.location.href,
          page_title: document.title,
          ...sessionParams,
        },
      },
    ];
    fetch("/api/ga-collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: getGaClientId(),
        events,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }

  win.dataLayer = win.dataLayer || [];

  if (!win.gtag) {
    win.gtag = (...args: unknown[]) => {
      win.dataLayer?.push(args);
    };
  }

  win[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  const gaSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  const initializeGA = () => {
    win.gtag?.("js", new Date());
    win.gtag?.("config", GA_MEASUREMENT_ID);
  };

  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${gaSrc}"]`);

  if (existingScript) {
    initializeGA();
  } else {
    const script = document.createElement("script");
    script.async = true;
    script.src = gaSrc;
    script.onload = initializeGA;
    document.head.appendChild(script);
  }
}

    if (META_PIXEL_ID) {
      if (!win.fbq) {
        const fbq = function (...args: unknown[]) {
          if ((fbq as typeof fbq & { callMethod?: (...args: unknown[]) => void }).callMethod) {
            (fbq as typeof fbq & { callMethod?: (...args: unknown[]) => void }).callMethod?.(...args);
          } else {
            (fbq as typeof fbq & { queue?: unknown[][] }).queue?.push(args);
          }
        } as typeof win.fbq;

        win._fbq = fbq;
        win.fbq = fbq;
        win.fbq.push = fbq;
        win.fbq.loaded = true;
        win.fbq.version = "2.0";
        win.fbq.queue = [];

        const src = "https://connect.facebook.net/en_US/fbevents.js";
        if (!document.querySelector(`script[src="${src}"]`)) {
          const script = document.createElement("script");
          script.async = true;
          script.src = src;
          document.head.appendChild(script);
        }
      }

      win.fbq?.("init", META_PIXEL_ID);
      win.fbq?.("track", "PageView");
    }
  }, [trackingConsent]);

  useEffect(() => {
    const target = new Date("2026-10-05T18:00:00+02:00").getTime();

    const update = () => {
      const diffRaw = target - Date.now();
      const diff = Math.max(0, diffRaw);

      if (diffRaw <= 0) {
        setIsLive(true);
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (page !== "home") return;
    const EVERSPORTS_LOADER_SRC = "https://widget-static.eversports.io/loader.js";

    if (document.querySelector(`script[src="${EVERSPORTS_LOADER_SRC}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = EVERSPORTS_LOADER_SRC;
    document.body.appendChild(script);
  }, [page]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubPageBook = (label: string) => {
    trackMetaEvent("InitiateCheckout", { content_name: `${label} CTA Click` });
    trackGaEvent("cta_click", { event_category: "conversion", event_label: label });
  };

  const goToBooking = () => {
    if (page === "home") {
      scrollToSection("booking");
    } else {
      window.location.href = pathFor(lang, "home", "#booking");
    }
  };

 const acceptTracking = () => {
  setTrackingConsent("accepted");

  try {
    window.localStorage.setItem(TRACKING_CONSENT_KEY, "accepted");
  } catch {
    // ignore localStorage access issues
  }

  const win = window as Window & {
    [key: string]: unknown;
  };

  win[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
};

  const declineTracking = () => {
    const hadAccepted = trackingConsent === "accepted";
    setTrackingConsent("declined");

    try {
      window.localStorage.setItem(TRACKING_CONSENT_KEY, "declined");
      document.cookie = "_ga=; Max-Age=0; path=/";
      document.cookie = "_ga_62PXNJZY9K=; Max-Age=0; path=/";
      document.cookie = "_fbp=; Max-Age=0; path=/";
    } catch {
      // ignore storage/cookie access issues
    }

    const win = window as Window & {
      fbq?: (...args: unknown[]) => void;
      _fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
      [key: string]: unknown;
    };

    win[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    win.gtag = () => undefined;
    win.dataLayer = [];
    win.fbq = () => undefined;
    win._fbq = () => undefined;

    document
      .querySelectorAll(`script[src*="googletagmanager.com/gtag/js"], script[src*="connect.facebook.net/en_US/fbevents.js"]`)
      .forEach((script) => script.parentNode?.removeChild(script));

    if (hadAccepted) {
      window.location.reload();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim()) {
      console.warn("Spam detected via honeypot");
      return;
    }

    if (Date.now() - formStartedAt < 2500) {
      setFormSent(false);
      setFormFeedback(t.contact.errWait);
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormSent(false);
      setFormFeedback(t.contact.errFields);
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setFormSent(false);
      setFormFeedback(t.contact.errEmail);
      return;
    }

    setFormSubmitting(true);
    setFormSent(false);
    setFormFeedback("");

    try {
      const response = await fetch(EMAILJS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: name.trim(),
            email: trimmedEmail,
            message: message.trim(),
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(errorText || "Email request failed.");
      }

      setFormSent(true);
      setFormFeedback(t.contact.ok);
      setName("");
      setEmail("");
      setMessage("");
      trackMetaEvent("Lead", { content_name: "Contact Form Submit" });
      trackGaEvent("contact_form_submit", { event_category: "engagement" });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Unknown error";
      setFormSent(false);
      setFormFeedback(messageText && messageText !== "Unknown error" ? t.contact.errPrefix + messageText : t.contact.errGeneric);
    } finally {
      setFormSubmitting(false);
    }
  };

  const legalTitle = getLegalTitle(t, legalModal);
  const legalContent = getLegalContent(t, legalModal);

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-[#D9D9D9]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      {legalModal ? <LegalModal title={legalTitle} content={legalContent} closeLabel={t.legal.closeLabel} onClose={() => setLegalModal(null)} /> : null}

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(31,228,214,0.16),_transparent_32%)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <a href={pathFor(lang, "home")} className="flex items-center" aria-label="Gravity Club">
  <img src="/logo.png" alt="Gravity Club logo" width={2504} height={1138} className="h-16 sm:h-20 w-auto" />
</a>

          <nav className="hidden items-center gap-2 md:flex">
            {t.nav.map(([id, label]) =>
              page === "home" ? (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="rounded-full px-4 py-2 text-sm text-[#D9D9D9]/72 transition hover:bg-[#1FE4D6]/10 hover:text-[#1FE4D6]"
                >
                  {label}
                </button>
              ) : (
                <a
                  key={id}
                  href={pathFor(lang, "home", `#${id}`)}
                  className="rounded-full px-4 py-2 text-sm text-[#D9D9D9]/72 transition hover:bg-[#1FE4D6]/10 hover:text-[#1FE4D6]"
                >
                  {label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-[11px] uppercase tracking-[0.14em]" role="group" aria-label={t.ui.languageLabel}>
              {(["en", "de"] as Lang[]).map((l) =>
                l === lang ? (
                  <span key={l} className="rounded-full bg-[#1FE4D6] px-2.5 py-1 font-semibold text-black" aria-current="true">
                    {l}
                  </span>
                ) : (
                  <a
                    key={l}
                    href={pathFor(l, page)}
                    hrefLang={l}
                    lang={l}
                    className="rounded-full px-2.5 py-1 text-[#D9D9D9]/70 hover:text-[#1FE4D6]"
                  >
                    {l}
                  </a>
                )
              )}
            </div>
            <button
  type="button"
  onClick={() => {
    trackMetaEvent("InitiateCheckout", {
      content_name: "Header CTA Click",
    });

    trackGaEvent("begin_checkout", {
      event_category: "conversion",
      event_label: "header",
      currency: "CHF",
    });

    setTimeout(() => {
  goToBooking();
}, 200);
  }}
  className="gc-cta-pulse rounded-full bg-[#1FE4D6] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.25)]"
>
  {isLive ? t.ui.bookNow : t.ui.secureSpot}
</button>

<button
  type="button"
  onClick={() => setMobileMenuOpen((v) => !v)}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
  aria-label={t.ui.toggleMenu}
  aria-expanded={mobileMenuOpen}
  aria-controls="mobile-navigation"
>
  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
</button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div id="mobile-navigation" className="border-t border-white/10 bg-[#0A0A0A]/96 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {t.nav.map(([id, label]) =>
                page === "home" ? (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-[#D9D9D9]/80"
                  >
                    {label}
                  </button>
                ) : (
                  <a
                    key={id}
                    href={pathFor(lang, "home", `#${id}`)}
                    className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-[#D9D9D9]/80"
                  >
                    {label}
                  </a>
                )
              )}
            </div>
          </div>
        ) : null}
      </header>

      <main className="pt-[72px] sm:pt-[78px]">
        {page === "home" ? (
        <>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img src="/hero-bg.jpg" alt={t.hero.heroAlt} width={1500} height={2000} fetchPriority="high" className="h-full w-full object-cover object-[50%_58%] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-[#0A0A0A]" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-6 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1FE4D6]/40 bg-[#1FE4D6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#1FE4D6] sm:hidden">
                {t.ui.mobileBadge}
              </div>

            <h1 className="mt-5 text-[2.4rem] leading-[0.9] text-[#D9D9D9] sm:text-[4.2rem] lg:text-[6.2rem]" style={HEADING_STYLE}>
  <Lines lines={t.hero.h1} />
</h1>
              <div className="mt-3 text-[2.2rem] leading-[0.98] text-[#1FE4D6] sm:text-[3rem] lg:text-[5rem]" style={HEADING_STYLE}>
  {t.hero.sub[0]}
  <br />
  <span className="whitespace-nowrap">{t.hero.sub[1]}</span>
  <br />
  <span className="whitespace-nowrap">{t.hero.sub[2]}</span>
</div>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#D9D9D9]/70 sm:mt-5 sm:max-w-2xl sm:text-[18px] sm:leading-8">
                {t.hero.copy}
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
  trackMetaEvent("InitiateCheckout", {
    content_name: "Hero CTA Click",
  });

  trackGaEvent("cta_click", {
    event_category: "conversion",
    event_label: "hero",
  });

  setTimeout(() => {
  scrollToSection("booking");
}, 200);
}}
                  className={`gc-cta-pulse w-full rounded-full bg-[#1FE4D6] px-7 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.35)] sm:w-auto`}
                >
                  {isLive ? t.ui.bookNow : t.ui.secureSpot}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("pricing")}
                  className="hidden rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm text-[#D9D9D9] sm:inline-flex"
                  style={HEADING_STYLE}
                >
                  {t.ui.seePricing}
                </button>
              </div>

              <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#1FE4D6]/75 sm:hidden">
                {lang === "de" ? "50 Minuten · 20 Plätze · Runde zwei" : "50 minutes · 20 spots · Round Two"}
              </div>

              <div className="mt-8 w-full max-w-xl rounded-[24px] border border-[#1FE4D6]/20 bg-white/[0.04] p-4 backdrop-blur-xl sm:mt-8 sm:rounded-[28px] sm:p-5">
                {isLive ? (
                  <div className="text-center">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#D9D9D9]/55">{t.ui.liveStatusLabel}</div>
                    <div className="mt-3 text-2xl text-[#1FE4D6] sm:mt-4 sm:text-3xl" style={HEADING_STYLE}>
                      {t.ui.live}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#D9D9D9]/55 sm:text-[11px] sm:tracking-[0.24em]">
                      {t.ui.countdownLabel}
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
                      {Object.entries(timeLeft).map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/10 bg-black/30 px-2 py-3 text-center sm:px-3 sm:py-4"
                        >
                          <div className="text-xl text-[#1FE4D6] sm:text-3xl" style={HEADING_STYLE}>
                            {value}
                          </div>
                          <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-[#D9D9D9]/50 sm:text-[10px] sm:tracking-[0.22em]">
                            {t.ui.countdownUnits[label as keyof typeof t.ui.countdownUnits]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

              <div className="mt-2 hidden grid-cols-2 gap-5 self-end sm:grid">
              <Card className="relative col-span-2 overflow-hidden p-0">
                <img
                  src={HERO_IMAGES[0]}
                  alt={t.hero.signatureAlt}
                  width={1672}
                  height={941}
                  className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[340px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-transparent p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#1FE4D6]">{t.hero.signature}</div>
                  <div className="mt-2 text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
                    {t.hero.signatureLine}
                  </div>
                </div>
              </Card>
              <img
  src="/woman.jpg"
  alt={t.hero.womanAlt}
  width={1122}
  height={1402}
  loading="lazy"
className="aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover"/>

<img
  src="/man.jpg"
  alt={t.hero.manAlt}
  width={1122}
  height={1402}
  loading="lazy"
className="aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover"/>
            </div>
          </div>
        </section>

        <section id="concept" className="border-y border-white/10 bg-white/[0.02]">
  <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-28">
    <SectionTitle eyebrow={t.concept.eyebrow} title={<Lines lines={t.concept.title} />} />
   <div className="max-w-[680px] text-[17px] leading-relaxed text-[#D9D9D9]/80">
  {t.concept.lines.map((line) => (
    <p key={line}>{line}</p>
  ))}
  <p className="text-[#1FE4D6] my-[0.6em]">{t.concept.accent}</p>
  <p>{t.concept.closing}</p>
</div>
  </div>
</section>

        <section id="classes" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <SectionTitle
            eyebrow={t.classes.eyebrow}
            title={<Lines lines={t.classes.title} />}
            copy={t.classes.copy}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {t.classes.items.map((item) => (
              <div
                key={item.title}
                role="link"
          tabIndex={0}
onClick={() => {
  trackMetaEvent("InitiateCheckout", {
    content_name: `${item.title} Card Click`,
  });

  trackGaEvent("class_card_click", {
    event_category: "engagement",
    event_label: item.title,
  });

  setTimeout(() => {
  scrollToSection("booking");
}, 200);
}}
                className="block h-full rounded-[28px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FE4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                aria-label={`${item.title}: ${t.ui.book}`}
              >
                <Card className="h-full p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#1FE4D6]/30 hover:bg-[#D9D9D9]/[0.06] hover:shadow-[0_18px_60px_rgba(31,228,214,0.10)] active:scale-[0.98] active:bg-[#D9D9D9]/[0.08] cursor-pointer">
                  <div className="grid h-full grid-rows-[56px_1fr]">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="min-h-[48px] text-xl leading-tight text-[#D9D9D9]" style={HEADING_STYLE}>
                        {item.title}
                      </h3>
                      <span className="self-start whitespace-nowrap rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#D9D9D9]/55">
                        {item.time}
                      </span>
                    </div>

                    <div className="mt-6">
                      <p className="text-[15px] leading-7 text-[#D9D9D9]/68">
                        {item.copy}
                      </p>
                      <div className="mt-4 flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] text-[#D9D9D9]/35">
                        <span>{t.ui.book}</span>
                        <a
                          href={pathFor(lang, item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#1FE4D6]/80 underline-offset-4 hover:text-[#1FE4D6] hover:underline"
                        >
                          {t.ui.details}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section id="booking" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8 lg:p-12">
            <div>
              <SectionTitle eyebrow={t.booking.eyebrow} title={<Lines lines={t.booking.title} />} />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[#1FE4D6]/30 bg-[#1FE4D6]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#1FE4D6]">
                  {t.booking.spots}
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#D9D9D9]/55">
                  {t.booking.cancelWindow}
                </div>
              </div>
              <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#D9D9D9]/70">
                {t.booking.copy}
              </p>
            </div>

            <Card className="bg-black/30 p-4 sm:p-6">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(31,228,214,0.10),rgba(217,217,217,0.03))] p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-[#D9D9D9]/50">{t.booking.partner}</div>
                <div className="mt-3 text-3xl text-[#1FE4D6]" style={HEADING_STYLE}>
                  Eversports
                </div>
                <p className="mt-4 text-sm leading-7 text-[#D9D9D9]/68">
                  {t.booking.partnerCopy}
                </p>
       <div
  data-eversports-widget-id="7ece6f8d-f8d1-4310-8f2e-e432c2cfbb0a"
  className="mt-8"
></div>
              </div>
            </Card>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="text-left">
            <SectionTitle
              eyebrow={t.pricing.eyebrow}
              title={<Lines lines={t.pricing.title} />}
              copy={t.pricing.copy}
            />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {t.pricing.items.map((item) => (
<div
  key={item.name}
  role="link"
  tabIndex={0}
  className="gc-card-hover cursor-pointer"
  onClick={() => {
  trackMetaEvent("InitiateCheckout", {
    content_name: `${item.name} Pricing Click`,
      value: Number(item.price.replace(/[^0-9.]/g, "")),
  });

  trackGaEvent("begin_checkout", {
    event_category: "conversion",
    event_label: item.name,
  });

  setTimeout(() => {
    window.location.href = item.link;
  }, 200);
}}
onKeyDown={(e) => {
  if (e.key === "Enter") {
    trackMetaEvent("InitiateCheckout", {
      content_name: `${item.name} Pricing Click`,
      value: Number(item.price.replace(/[^0-9.]/g, "")),
    });

    trackGaEvent("begin_checkout", {
      event_category: "conversion",
      event_label: item.name,
    });

    setTimeout(() => {
      window.location.href = item.link;
    }, 200);
  }
}}
>
          <Card
  className={`h-full p-8 ${
    item.highlight
      ? "border-[#1FE4D6]/30 bg-[linear-gradient(180deg,rgba(31,228,214,0.18),rgba(217,217,217,0.04))] sm:scale-[1.03]"
      : ""
  }`}
>
                  <div className="grid h-full grid-rows-[36px_auto_1fr]">
                    <div className="flex items-start justify-between gap-3">
                     <div className="inline-flex items-center rounded-full border border-[#1FE4D6]/30 bg-[#1FE4D6]/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#1FE4D6]">
  {item.name}
</div>
                    {item.badge ? (
                      <div className="inline-flex items-center rounded-full bg-[#1FE4D6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                        {item.badge}
                      </div>
                    ) : null}
                    </div>

                    <div>
                      <div
                        className="text-4xl text-[#1FE4D6]"
                        style={HEADING_STYLE}
                      >
                        {item.price}
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-[#D9D9D9]/60">{item.note}</p>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#D9D9D9]/35">
                      {t.ui.choose}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section id="locations" className="border-y border-white/10 bg-gradient-to-b from-[#1FE4D6]/[0.05] to-transparent">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-10 lg:py-28">
            <SectionTitle eyebrow={t.location.eyebrow} title={<Lines lines={t.location.title} />} />
            <div className="grid gap-4 sm:grid-cols-2">
              {t.location.cards.map((text, i) => (
                <Card key={text} className={`p-6 text-sm leading-7 text-[#D9D9D9]/68${i === 2 ? " sm:col-span-2" : ""}`}>
                  {text}
                </Card>
              ))}
              <a
                href={pathFor(lang, "location")}
                className="text-sm text-[#1FE4D6] underline-offset-4 hover:underline sm:col-span-2"
              >
                {t.location.moreInfo}
              </a>
            </div>
          </div>
        </section>

        <section id="partners" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8 lg:p-12">
            <div>
              <SectionTitle
                eyebrow={t.partners.eyebrow}
                title={<>{t.partners.title}</>}
                copy={t.partners.copy}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card className="col-span-2 flex items-center justify-center p-7">
                <img
src="/PEAQ_Logo_white_Claim.png"
                  alt={t.partners.logoAlt}
                  width={1418}
                  height={506}
                  loading="lazy"
                  className="h-20 object-contain"
                />
              </Card>
              <img
                src="/peaq_sip.jpg"
                alt={t.partners.sipAlt}
                width={1600}
                height={1600}
                loading="lazy"
                className="h-28 w-full rounded-[20px] object-cover sm:h-36 lg:h-44"
              />
              <img
                src="/peaq_bottle.jpg"
                alt={t.partners.bottleAlt}
                width={1600}
                height={1600}
                loading="lazy"
                className="h-28 w-full rounded-[20px] object-cover sm:h-36 lg:h-44"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <SectionTitle
              eyebrow={t.faq.eyebrow}
              title={<>{t.faq.titleLead}<span className="whitespace-nowrap">{t.faq.titleBrand}</span>{t.faq.titleTail}<br />{t.faq.titleSub}</>}
            />
            <div className="space-y-3">
              {t.faq.items.map((item) => (
                <FaqItem
                  key={`${item.category}-${item.question}`}
                  category={item.category}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:px-10">
          <div className="grid gap-8 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(31,228,214,0.12),rgba(217,217,217,0.04))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.26)] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-12">
            <div>
              <SectionTitle
                eyebrow={t.contact.eyebrow}
                title={<>{t.contact.title}</>}
                copy={t.contact.copy}
              />
            </div>
            <form className="relative grid gap-4" onSubmit={handleSubmit}>
              <div
                className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
                aria-hidden="true"
              >
                <label htmlFor="company-website">{t.contact.honeypot}</label>
                <input
                  id="company-website"
                  name="company-website"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.18em] text-[#D9D9D9]/55">
                  {t.contact.nameLabel}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-[#D9D9D9]/30"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.18em] text-[#D9D9D9]/55">
                  {t.contact.emailLabel}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-[#D9D9D9]/30"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.18em] text-[#D9D9D9]/55">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-[#D9D9D9]/30"
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={formSubmitting}
                className="gc-cta-pulse rounded-full bg-[#1FE4D6] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.25)]"              
                >
                {formSubmitting ? t.contact.sending : t.contact.submit}
              </button>
              {formFeedback ? (
                <p className={`text-sm ${formSent ? "text-[#1FE4D6]" : "text-[#ff8e8e]"}`}>{formFeedback}</p>
              ) : null}
            </form>
          </div>
        </section>

        </>
        ) : page === "location" ? (
          <LocationPageView lang={lang} t={t} onBook={handleSubPageBook} />
        ) : (
          <ClassPageView lang={lang} t={t} id={page} onBook={handleSubPageBook} />
        )}

        {consentInitialized && trackingConsent === "unset" ? (
          <div className="fixed inset-x-4 bottom-4 z-[95] max-w-xl rounded-[24px] border border-white/10 bg-[#0A0A0A]/95 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:left-6 sm:right-auto">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#1FE4D6]" style={HEADING_STYLE}>
              {t.consent.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-[#D9D9D9]/72">
              {t.consent.text}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={acceptTracking}
                className="rounded-full bg-[#1FE4D6] px-5 py-3 text-sm text-black"
                style={HEADING_STYLE}
              >
                {t.consent.accept}
              </button>
              <button
                type="button"
                onClick={declineTracking}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-[#D9D9D9]"
                style={HEADING_STYLE}
              >
                {t.consent.decline}
              </button>
            </div>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-white/10 px-4 py-6 text-xs text-[#D9D9D9]/50 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-white/5 pb-5">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href={pathFor(lang, "hiit")} className="hover:text-[#1FE4D6]">
              {t.classes.items[0].title}
            </a>
            <a href={pathFor(lang, "powerjump")} className="hover:text-[#1FE4D6]">
              {t.classes.items[1].title}
            </a>
            <a href={pathFor(lang, "location")} className="hover:text-[#1FE4D6]">
              {t.ui.footerLocation}
            </a>
            <a href={INSTAGRAM_URL} rel="noopener" target="_blank" className="hover:text-[#1FE4D6]">
              {t.ui.instagram}
            </a>
          </nav>
          <a href={pathFor(otherLang, page)} hrefLang={otherLang} lang={otherLang} className="uppercase tracking-[0.14em] hover:text-[#1FE4D6]">
            {otherLang === "de" ? "Deutsch" : "English"}
          </a>
        </div>
        <div className="mx-auto mt-5 flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Gravity Club</div>
          <div className="flex gap-4">
            <button type="button" onClick={() => setLegalModal("imprint")} className="hover:text-[#1FE4D6]">
              {t.footer.imprint}
            </button>
            <button type="button" onClick={() => setLegalModal("privacy")} className="hover:text-[#1FE4D6]">
              {t.footer.privacy}
            </button>
            <button type="button" onClick={() => setLegalModal("terms")} className="hover:text-[#1FE4D6]">
              {t.footer.terms}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
