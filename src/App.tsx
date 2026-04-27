import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  ["concept", "Concept"],
  ["classes", "Classes"],
  ["locations", "Location"],
  ["booking", "Booking"],
  ["pricing", "Pricing"],
  ["partners", "Hydration"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
] as const;

const FAQ_ITEMS = [
  {
    category: "Booking",
    question: "How do I book a class?",
    answer: "You book your class online. Your spot is only secured after payment.",
  },
  {
    category: "Booking",
    question: "Do I need to pay in advance?",
    answer: "Yes. All classes are paid in advance.",
  },
  {
    category: "Class",
    question: "Is it suitable for beginners?",
    answer: "Yes. We provide adjustments for different fitness levels.",
  },
  {
    category: "Before you come",
    question: "What should I bring?",
    answer: "Workout clothes, water and the right energy.",
  },
  {
    category: "Before you come",
    question: "When should I arrive?",
    answer: "Please arrive 10–15 minutes before the class starts.",
  },
  {
    category: "Cancellation",
    question: "Can I cancel my booking?",
    answer: "Yes. You can cancel free of charge up to 12 hours before the class starts.",
  },
] as const;

const HERO_IMAGES = [
  "/hero.jpg",
] as const;

const CLASS_ITEMS = [
  {
    title: "Energy Class",
    time: "50 min",
    copy: "Explosive, high-energy training driven by music, rhythm and club lighting. Non-stop movement, sweat and full-room intensity.",
  },
  {
    title: "Strength Class",
    time: "50 min",
    copy: "Slower, controlled strength training on the rebounder. Structured blocks for lower body, upper body and core using bands, tempo and precise execution - finished with a focused HIIT push.",
  },
] as const;

const PRICING_ITEMS = [
  {
    name: "Drop In",
    price: "CHF 34",
    note: "Valid for 7 days.",
    link: "https://www.eversports.ch/o/gravity-club/00dece7f-68ed-49cf-9d1b-2848f71d4b73",
  },
  {
    name: "Intro Offer",
    price: "CHF 34",
    note: "2 classes · valid for 14 days.",
    link: "https://www.eversports.ch/o/gravity-club/0ffed2c3-231d-422c-a320-08bd68e8f439",
  },
  {
    name: "10 Classes",
    price: "CHF 306",
    note: "30.60 / class · valid for 3 months.",
    link: "https://www.eversports.ch/o/gravity-club/204549cb-193b-4101-8ca9-3f2697562283",
  },
] as const;

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: '"Space Grotesk", Inter, ui-sans-serif, system-ui, sans-serif',
  fontWeight: 700,
  letterSpacing: "-0.03em",
};

const IMPRINT_TEXT = `Morris Krebs
Bächlerstrasse 9
8046 Zürich
Schweiz

E-Mail: hello@gravityclub-rebound.com`;

const PRIVACY_TEXT = `We collect and process personal data only to operate Gravity Club, manage bookings and respond to inquiries.

This includes information you provide via forms, booking platforms and direct communication.

We use selected third-party tools (e.g. analytics and booking systems) to improve the experience and ensure smooth operations.

Your data is handled responsibly and never sold to third parties.

You can request information, correction or deletion of your data at any time by contacting us at hello@gravityclub-rebound.com.`;

const TERMS_TEXT = `Gravity Club is a boutique fitness experience with limited capacity per session.

Bookings are binding. Cancellation is free up to 12 hours before the class starts. Late cancellations and no-shows are charged in full.

Participation is at your own risk. By attending a class, you confirm that you are physically able to take part in the training.

Gravity Club is not liable for injuries, accidents or loss of personal belongings.

By booking a class, you agree to these terms.`;

const META_PIXEL_ID = "4479962442290722";
const GA_MEASUREMENT_ID = "G-62PXNJZY9K";
const TRACKING_CONSENT_KEY = "gravity-club-tracking-consent";
const SITE_URL = "https://www.gravityclub-rebound.com";
const OG_IMAGE_URL = "https://www.gravityclub-rebound.com/og-image.jpg";
const PAGE_TITLE = "Gravity Club Zürich – Rebounder Fitness Classes";
const PAGE_DESCRIPTION =
  "Boutique rebounder fitness classes in Zurich. 50-minute sessions with club energy, limited spots and premium experience. Book Gravity Club now.";
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
  onClose,
}: {
  title: string;
  content: string;
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
            aria-label="Close legal modal"
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

function getLegalTitle(modal: null | "imprint" | "privacy" | "terms") {
  return modal === "imprint" ? "Impressum" : modal === "privacy" ? "Datenschutz" : modal === "terms" ? "Terms" : "";
}

function getLegalContent(modal: null | "imprint" | "privacy" | "terms") {
  return modal === "imprint" ? IMPRINT_TEXT : modal === "privacy" ? PRIVACY_TEXT : modal === "terms" ? TERMS_TEXT : "";
}

export default function GravityClubWebsitePreview() {
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
  const [isLive, setIsLive] = useState(false);

  const trackGaEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (trackingConsent !== "accepted") return;
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;
    if (params) gtag("event", eventName, params);
    else gtag("event", eventName);
  };

  const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;
    if (trackingConsent !== "accepted") return;
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (!fbq) return;
    if (params) fbq("track", eventName, params);
    else fbq("track", eventName);
  };

  useEffect(() => {
    document.title = PAGE_TITLE;

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

    upsertMetaTag('meta[name="description"]', {
      name: "description",
      content: PAGE_DESCRIPTION,
    });
    upsertMetaTag('meta[name="robots"]', {
      name: "robots",
      content: "index, follow",
    });
    upsertMetaTag('meta[name="theme-color"]', {
      name: "theme-color",
      content: "#0A0A0A",
    });
    upsertMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: PAGE_TITLE,
    });
    upsertMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: PAGE_DESCRIPTION,
    });
    upsertMetaTag('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: SITE_URL,
    });
    upsertMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: OG_IMAGE_URL,
    });
    upsertMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMetaTag('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: PAGE_TITLE,
    });
    upsertMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: PAGE_DESCRIPTION,
    });
    upsertMetaTag('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: OG_IMAGE_URL,
    });

    upsertLinkTag('link[rel="canonical"]', {
      rel: "canonical",
      href: SITE_URL,
    });
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
  }, []);

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
      win.dataLayer = win.dataLayer || [];
      if (!win.gtag) {
        win.gtag = (...args: unknown[]) => {
          win.dataLayer?.push(args);
        };
      }
      win.gtag("js", new Date());
      win.gtag("config", GA_MEASUREMENT_ID, { send_page_view: true });

      const gaSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      if (!document.querySelector(`script[src="${gaSrc}"]`)) {
        const script = document.createElement("script");
        script.async = true;
        script.src = gaSrc;
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
    const target = new Date("2026-06-01T18:00:00+02:00").getTime();

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      setMobileMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
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
      setFormFeedback("Please wait a moment before submitting.");
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormSent(false);
      setFormFeedback("Please complete all fields.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      setFormSent(false);
      setFormFeedback("Please enter a valid email address.");
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
      setFormFeedback("Thanks - your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
      trackMetaEvent("Lead", { content_name: "Contact Form Submit" });
      trackGaEvent("contact_form_submit", { event_category: "engagement" });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Unknown error";
      setFormSent(false);
      setFormFeedback(messageText && messageText !== "Unknown error" ? "Sending failed. " + messageText : "Sending failed. Please try again in a moment.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const legalTitle = getLegalTitle(legalModal);
  const legalContent = getLegalContent(legalModal);

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-[#D9D9D9]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      {legalModal ? <LegalModal title={legalTitle} content={legalContent} onClose={() => setLegalModal(null)} /> : null}

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(31,228,214,0.16),_transparent_32%)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center">
  <img src="/logo.png" alt="Gravity Club" className="h-16 sm:h-20 w-auto" />
</div>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV_ITEMS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="rounded-full px-4 py-2 text-sm text-[#D9D9D9]/72 transition hover:bg-[#1FE4D6]/10 hover:text-[#1FE4D6]"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
            <button
  type="button"
  onClick={() => {
    window.location.href = "https://www.eversports.ch/scl/gravity-club";

    trackMetaEvent("InitiateCheckout", {
      content_name: "Header CTA Click",
    });

    trackGaEvent("cta_click", {
      event_category: "conversion",
      event_label: "header",
    });
  }}
  className="gc-cta-pulse rounded-full bg-[#1FE4D6] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.25)]"
>
  {isLive ? "Book now" : "Secure your spot"}
</button>
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
              aria-label="Toggle menu"
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
              {NAV_ITEMS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-[#D9D9D9]/80"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="pt-[72px] sm:pt-[78px]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img src={HERO_IMAGES[0]} alt="Gravity Club hero" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-[#0A0A0A]" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-6 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1FE4D6]/40 bg-[#1FE4D6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#1FE4D6] sm:hidden">
                Zürich Launch · 20 Spots
              </div>

            <h1 className="mt-5 text-[2.4rem] leading-[0.9] text-[#D9D9D9] sm:text-[4.2rem] lg:text-[6.2rem]" style={HEADING_STYLE}>
  Rebound.<br />
  Sweat.<br />
  Connect.
</h1>
              <div className="mt-3 text-[2.2rem] leading-[0.98] text-[#1FE4D6] sm:text-[3rem] lg:text-[5rem]" style={HEADING_STYLE}>
  Zurich&apos;s
  <br />
  <span className="whitespace-nowrap">rebounder fitness</span>
  <br />
  <span className="whitespace-nowrap">in a club atmosphere</span>
</div>

              <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#D9D9D9]/70 sm:mt-5 sm:max-w-2xl sm:text-[18px] sm:leading-8">
                50-minute boutique rebounder fitness classes in Zurich with sound, lighting, energy and limited 20-person capacity.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    if (isLive) {
                      trackMetaEvent("InitiateCheckout", { content_name: "Hero CTA Live" });
                      trackGaEvent("hero_cta_live", { event_category: "conversion" });
                    } else {
                      trackMetaEvent("ViewContent", { content_name: "Booking Section" });
                      trackGaEvent("view_booking_section", { event_category: "engagement" });
                    }
                    scrollToSection("booking");
                  }}
                  className={`gc-cta-pulse w-full rounded-full bg-[#1FE4D6] px-7 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.35)] sm:w-auto`}
                >
                  {isLive ? "Book now" : "Secure your spot"}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("pricing")}
                  className="hidden rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm text-[#D9D9D9] sm:inline-flex"
                  style={HEADING_STYLE}
                >
                  See pricing
                </button>
              </div>

              <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#1FE4D6]/75 sm:hidden">
                50 minutes · 20 spots · Zurich pop-up launch
              </div>

              <div className="mt-8 w-full max-w-xl rounded-[24px] border border-[#1FE4D6]/20 bg-white/[0.04] p-4 backdrop-blur-xl sm:mt-8 sm:rounded-[28px] sm:p-5">
                {isLive ? (
                  <div className="text-center">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#D9D9D9]/55">Launch status</div>
                    <div className="mt-3 text-2xl text-[#1FE4D6] sm:mt-4 sm:text-3xl" style={HEADING_STYLE}>
                      We are live
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#D9D9D9]/55 sm:text-[11px] sm:tracking-[0.24em]">
                      Launch countdown · 1 June 2026 · 18:00 Zurich
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
                            {label}
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
                  alt="Signature class"
                  className="h-[240px] w-full object-cover sm:h-[300px] lg:h-[340px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-transparent p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#1FE4D6]">Signature Experience</div>
                  <div className="mt-2 text-2xl text-[#D9D9D9]" style={HEADING_STYLE}>
                    Club energy. Boutique precision.
                  </div>
                </div>
              </Card>
              <img
  src="/woman.jpg"
  alt="Energy training"
className="aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover"/>

<img
  src="/man.jpg"
  alt="Strength training"
className="aspect-[4/5] w-full rounded-[28px] border border-white/10 object-cover"/>
            </div>
          </div>
        </section>

        <section id="concept" className="border-y border-white/10 bg-white/[0.02]">
  <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-28">
    <SectionTitle eyebrow="The Concept" title={<>More than a class.<br />A city ritual.</>} />
   <div className="max-w-[680px] text-[17px] leading-relaxed text-[#D9D9D9]/80">
  <p>Gravity Club turns fitness into a night out.</p>
  <p>Dark room. Loud sound. 20 people moving in sync.</p>
  <p>It’s not only about working out.</p>
  <p className="text-[#1FE4D6] my-[0.6em]">It’s about showing up.</p>
  <p>
    Built as a boutique pop-up experience in Zurich, each session combines training,
    music and atmosphere into something people don’t just try once - but come back
    to every week.
  </p>
</div>
  </div>
</section>

        <section id="classes" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <SectionTitle
            eyebrow="Classes"
            title={<>Signature formats<br />designed to hook.</>}
            copy="Structured for repeat attendance, community energy and a premium experience from first visit to weekly ritual."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CLASS_ITEMS.map((item) => (
              <div
                key={item.title}
                role="link"
                tabIndex={0}
                onClick={() => {
                  window.location.href = "https://www.eversports.ch/scl/gravity-club";
                  trackMetaEvent("InitiateCheckout", { content_name: `${item.title} Card Click` });
                  trackGaEvent("class_card_click", { event_category: "engagement", event_label: item.title });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.location.href = "https://www.eversports.ch/scl/gravity-club";
                    trackMetaEvent("InitiateCheckout", { content_name: `${item.title} Card Click` });
                    trackGaEvent("class_card_click", { event_category: "engagement", event_label: item.title });
                  }
                }}
                className="block h-full rounded-[28px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FE4D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                aria-label={`Open ${item.title} booking on Eversports`}
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
                      <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#D9D9D9]/35">
                        Tap to book →
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section id="locations" className="border-y border-white/10 bg-gradient-to-b from-[#1FE4D6]/[0.05] to-transparent">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-10 lg:py-28">
            <SectionTitle eyebrow="Location" title={<>Kanzlei Club, Zurich.<br />Where it starts.</>} />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Located in the heart of Zurich, Kanzlei Club is one of the city's most iconic nightlife venues.",
                "For launch, the space transforms into a dark, high-energy environment where workout meets nightlife.",
                "Just steps from Helvetiaplatz, the location is seamlessly connected to public transport from anywhere in the city.",
                "After your session, the outdoor summer bar becomes part of the night - stay, connect and ease into the evening.",              ].map((text) => (
                <Card key={text} className="p-6 text-sm leading-7 text-[#D9D9D9]/68">
                  {text}
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8 lg:p-12">
            <div>
              <SectionTitle eyebrow="Booking" title={<>Book your class fast.<br />Train with us in Zurich.</>} />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="rounded-full border border-[#1FE4D6]/30 bg-[#1FE4D6]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#1FE4D6]">
                  20 Spots Only
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#D9D9D9]/55">
                  12h Cancellation Window
                </div>
              </div>
              <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#D9D9D9]/70">
                Every booking runs through Eversports. Choose your class, complete payment, and secure your place instantly. Once a class is full, you can join the waitlist and get notified if a spot opens up.
              </p>
            </div>

            <Card className="bg-black/30 p-4 sm:p-6">
              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(31,228,214,0.10),rgba(217,217,217,0.03))] p-6">
                <div className="text-xs uppercase tracking-[0.24em] text-[#D9D9D9]/50">Booking Partner</div>
                <div className="mt-3 text-3xl text-[#1FE4D6]" style={HEADING_STYLE}>
                  Eversports
                </div>
                <p className="mt-4 text-sm leading-7 text-[#D9D9D9]/68">
                  Everything from booking to class access runs seamlessly through Eversports - so your focus stays on the session.
                </p>
                <a
                  href="https://www.eversports.ch/scl/gravity-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackMetaEvent("InitiateCheckout", { content_name: "Eversports Booking Click" });
                    trackGaEvent("booking_click", { event_category: "engagement" });
                  }}
className="gc-cta-pulse mt-8 inline-flex w-fit rounded-full bg-[#1FE4D6] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.25)]"
                 >
             Book on Eversports
                </a>
              </div>
            </Card>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="text-left">
            <SectionTitle
              eyebrow="Pricing"
              title={<>Choose your training rhythm.</>}
              copy="Start with the intro offer to experience your first sessions, then move into class packs to build consistency and train regularly."
            />
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PRICING_ITEMS.map((item, index) => (
<div
  key={item.name}
  role="link"
  tabIndex={0}
  className="gc-card-hover cursor-pointer"
  onClick={() => {
    window.location.href = item.link;
    trackMetaEvent("InitiateCheckout", { content_name: `${item.name} Pricing Click` });
    trackGaEvent("pricing_click", { event_category: "conversion", event_label: item.name });
  }}
 onKeyDown={(e) => {
  if (e.key === "Enter") {
    window.location.href = item.link;

    trackMetaEvent("InitiateCheckout", {
      content_name: `${item.name} Pricing Click`,
    });

    trackGaEvent("pricing_click", {
      event_category: "conversion",
      event_label: item.name,
    });
  }
}}
>
             <Card
                  className={`h-full p-8 ${
                    index === 1
                      ? "border-[#1FE4D6]/30 bg-[linear-gradient(180deg,rgba(31,228,214,0.18),rgba(217,217,217,0.04))] lg:scale-[1.03]"
                      : ""
                  }`}
                >
                  <div className="grid h-full grid-rows-[36px_auto_1fr]">
                    <div className="flex items-start">
                      {index === 1 ? (
                        <div className="inline-flex items-center rounded-full border border-[#1FE4D6]/30 bg-[#1FE4D6]/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#1FE4D6]">
                          Intro Offer
                        </div>
                      ) : (
                        <div className="text-xs uppercase tracking-[0.25em] text-[#D9D9D9]/50">{item.name}</div>
                      )}
                    </div>

                    <div>
                      <div
                        className={`text-4xl ${index === 1 ? "text-[#1FE4D6]" : "text-[#D9D9D9]"}`}
                        style={HEADING_STYLE}
                      >
                        {item.price}
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-[#D9D9D9]/60">{item.note}</p>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#D9D9D9]/35">
                      Tap to choose →
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section id="partners" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:gap-8 lg:p-12">
            <div>
              <SectionTitle
                eyebrow="Hydration Partner"
                title={<>Hydrated by PEAQ</>}
                copy={`Built around clean ingredients and functional performance, PEAQ focuses on effective hydration without unnecessary additives.

Designed to support energy, recovery and consistency - it fits seamlessly into the Gravity Club training experience.

Infused Swiss mountain water, rich in natural minerals, vitamins and magnesium.
No sugar. No sweeteners. No colorants. No calories.

Part of every session. Part of the experience.`}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card className="col-span-2 flex items-center justify-center p-7">
                <img
                  src="https://peaqnutrition.com/cdn/shop/files/PEAQ_Logo_Black.png"
                  alt="PEAQ Nutrition logo"
                  className="h-10 object-contain"
                />
              </Card>
              <img
                src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=800&auto=format&fit=crop"
                alt="hydration"
                className="h-28 w-full rounded-[20px] object-cover sm:h-36 lg:h-44"
              />
              <img
                src="https://images.unsplash.com/photo-1546484959-f9a0c3b2e3c1?q=80&w=800&auto=format&fit=crop"
                alt="hydration"
                className="h-28 w-full rounded-[20px] object-cover sm:h-36 lg:h-44"
              />
              <img
                src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=800&auto=format&fit=crop"
                alt="hydration"
                className="h-28 w-full rounded-[20px] object-cover sm:h-36 lg:h-44"
              />
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
                alt="hydration"
                className="h-28 w-full rounded-[20px] object-cover sm:h-36 lg:h-44"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <SectionTitle
              eyebrow="FAQ"
              title={<>First time at <span className="whitespace-nowrap">Gravity Club</span>?<br />Everything you need to know before your first class.</>}
            />
            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
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
                eyebrow="Get in Touch"
                title={<>Get in touch with us.</>}
                copy="Have questions about classes, partnerships, or locations? Send us a message and we'll get back to you."
              />
            </div>
            <form className="relative grid gap-4" onSubmit={handleSubmit}>
              <div
                className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
                aria-hidden="true"
              >
                <label htmlFor="company-website">Leave this field empty</label>
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
                  Name
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
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.18em] text-[#D9D9D9]/55">
                  Email
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
                  placeholder="Email address"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.18em] text-[#D9D9D9]/55">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-[#D9D9D9]/30"
                  rows={5}
                  placeholder="Tell us if you're interested in classes, partnerships, or venue collaborations"
                />
              </div>
              <button
                type="submit"
                disabled={formSubmitting}
                className="gc-cta-pulse rounded-full bg-[#1FE4D6] px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(31,228,214,0.25)]"              
                >
                {formSubmitting ? "Sending..." : "Ask us anything"}
              </button>
              {formFeedback ? (
                <p className={`text-sm ${formSent ? "text-[#1FE4D6]" : "text-[#ff8e8e]"}`}>{formFeedback}</p>
              ) : null}
            </form>
          </div>
        </section>

        {consentInitialized && trackingConsent === "unset" ? (
          <div className="fixed inset-x-4 bottom-4 z-[95] max-w-xl rounded-[24px] border border-white/10 bg-[#0A0A0A]/95 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:left-6 sm:right-auto">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#1FE4D6]" style={HEADING_STYLE}>
              Improve your experience
            </div>
            <p className="mt-2 text-sm leading-6 text-[#D9D9D9]/72">
              We use analytics to understand how you interact with Gravity Club and to continuously improve the experience, classes and booking flow. This helps us build a better product for you.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={acceptTracking}
                className="rounded-full bg-[#1FE4D6] px-5 py-3 text-sm text-black"
                style={HEADING_STYLE}
              >
                Improve experience
              </button>
              <button
                type="button"
                onClick={declineTracking}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-[#D9D9D9]"
                style={HEADING_STYLE}
              >
                Decline
              </button>
            </div>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-white/10 px-4 py-6 text-xs text-[#D9D9D9]/50 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Gravity Club</div>
          <div className="flex gap-4">
            <button type="button" onClick={() => setLegalModal("imprint")} className="hover:text-[#1FE4D6]">
              Impressum
            </button>
            <button type="button" onClick={() => setLegalModal("privacy")} className="hover:text-[#1FE4D6]">
              Datenschutz
            </button>
            <button type="button" onClick={() => setLegalModal("terms")} className="hover:text-[#1FE4D6]">
              Terms
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
