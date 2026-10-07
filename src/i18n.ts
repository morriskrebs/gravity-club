export type Lang = "en" | "de";
export type PageId = "home" | "hiit" | "powerjump" | "location";

export const SITE_URL = "https://www.gravityclub-rebound.com";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

export const PATHS: Record<Lang, Record<PageId, string>> = {
  en: {
    home: "/",
    hiit: "/classes/rebounder-hiit",
    powerjump: "/classes/power-jump",
    location: "/location",
  },
  de: {
    home: "/de",
    hiit: "/de/kurse/rebounder-hiit",
    powerjump: "/de/kurse/power-jump",
    location: "/de/standort",
  },
};

export const ALL_ROUTES: { lang: Lang; page: PageId; path: string }[] = (["en", "de"] as Lang[]).flatMap((lang) =>
  (["home", "hiit", "powerjump", "location"] as PageId[]).map((page) => ({ lang, page, path: PATHS[lang][page] }))
);

export function resolveRoute(pathname: string): { lang: Lang; page: PageId } {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const hit = ALL_ROUTES.find((r) => r.path === clean);
  return hit ? { lang: hit.lang, page: hit.page } : { lang: "en", page: "home" };
}

export function pathFor(lang: Lang, page: PageId, hash = ""): string {
  return `${PATHS[lang][page]}${hash}`;
}

export const IMPRINT_TEXT = `Morris Krebs
Bächlerstrasse 9
8046 Zürich
Schweiz

E-Mail: hello@gravityclub-rebound.com`;

type FaqItem = { category: string; question: string; answer: string };
type ClassPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  expectTitle: string;
  expect: string[];
  goodTitle: string;
  good: string[];
  bookTitle: string;
  bookCopy: string;
  bookCta: string;
  imageAlt: string;
  trainer: string;
  seeAlso: string;
};

export type Content = {
  htmlLang: string;
  home: { title: string; description: string };
  locationMeta: { title: string; description: string };
  nav: [string, string][];
  ui: {
    secureSpot: string;
    bookNow: string;
    toggleMenu: string;
    seePricing: string;
    languageLabel: string;
    close: string;
    mobileBadge: string;
    liveStatusLabel: string;
    live: string;
    countdownLabel: string;
    countdownUnits: Record<"days" | "hours" | "minutes" | "seconds", string>;
    details: string;
    book: string;
    choose: string;
    backHome: string;
    allClasses: string;
    footerClasses: string;
    footerLocation: string;
    instagram: string;
  };
  hero: {
    h1: string[];
    sub: string[];
    copy: string;
    signature: string;
    signatureLine: string;
    heroAlt: string;
    signatureAlt: string;
    womanAlt: string;
    manAlt: string;
  };
  concept: { eyebrow: string; title: string[]; lines: string[]; accent: string; closing: string };
  classes: {
    eyebrow: string;
    title: string[];
    copy: string;
    items: { id: "hiit" | "powerjump"; title: string; time: string; copy: string }[];
  };
  booking: {
    eyebrow: string;
    title: string[];
    spots: string;
    cancelWindow: string;
    copy: string;
    partner: string;
    partnerCopy: string;
  };
  pricing: {
    eyebrow: string;
    title: string[];
    copy: string;
    items: { name: string; price: string; note: string; badge: string | null; highlight: boolean; link: string }[];
  };
  location: { eyebrow: string; title: string[]; cards: string[]; moreInfo: string };
  partners: { eyebrow: string; title: string; copy: string; logoAlt: string; sipAlt: string; bottleAlt: string };
  faq: { eyebrow: string; titleLead: string; titleBrand: string; titleTail: string; titleSub: string; items: FaqItem[] };
  contact: {
    eyebrow: string;
    title: string;
    copy: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    honeypot: string;
    errWait: string;
    errFields: string;
    errEmail: string;
    ok: string;
    errPrefix: string;
    errGeneric: string;
  };
  consent: { title: string; text: string; accept: string; decline: string };
  footer: { imprint: string; privacy: string; terms: string };
  legal: { privacy: string; terms: string; closeLabel: string };
  classPages: Record<"hiit" | "powerjump", ClassPage>;
  locationPage: {
    eyebrow: string;
    h1: string;
    intro: string;
    findTitle: string;
    find: string[];
    insideTitle: string;
    inside: string[];
    ctaTitle: string;
    ctaCopy: string;
    ctaButton: string;
    imageAlt: string;
  };
  schema: { gymDescription: string; priceRange: string };
};

const EVERSPORTS_SINGLE = "https://www.eversports.ch/sp/gravity-club/product/00dece7f-68ed-49cf-9d1b-2848f71d4b73";
const EVERSPORTS_CARD = "https://www.eversports.ch/sp/gravity-club/product/9db7c6fa-a65c-4e29-85d4-c54ea23ecb73";

const PRIVACY_EN = `We collect and process personal data only to operate Gravity Club, manage bookings and respond to inquiries.

This includes information you provide via forms, booking platforms and direct communication.

We use selected third-party tools (e.g. analytics and booking systems) to improve the experience and ensure smooth operations.

Your data is handled responsibly and never sold to third parties.

You can request information, correction or deletion of your data at any time by contacting us at hello@gravityclub-rebound.com.`;

const TERMS_EN = `Gravity Club is a boutique fitness experience with limited capacity per session.

Bookings are binding. Cancellation is free up to 12 hours before the class starts; the class credit is returned to your account for a future booking and stays valid for the remaining validity period of your pass. Cash refunds are not available. Late cancellations are charged in full. No-shows (not attending a booked class without cancelling) are charged in full plus a no-show fee of CHF 15, which is invoiced by email after the class and payable via the payment link in that email.

Customers who join the waitlist confirm that they agree to be booked into the class if a spot becomes available, and that this booking is valid and binding.

Participation is at your own risk. By attending a class, you confirm that you are physically fit, in good health, and able to take part in high-intensity exercise. You agree to follow all instructions given by the coach at all times.

For safety reasons, all rebounders (fitness trampolines) used during classes are designed for a maximum user weight of 140 kg. By participating, you confirm that you do not exceed this limit. Gravity Club reserves the right to refuse or terminate participation at any time if there are reasonable concerns regarding safety, health, or compliance with instructions.
Participation despite exceeding the stated weight limit, providing false information, or disregarding instructions is strictly at your own risk and releases Gravity Club from any and all liability.

Gravity Club is not liable for injuries, accidents, health issues or loss of personal belongings, except in cases of gross negligence or intent.

By booking a class or joining the waitlist, you acknowledge and accept these terms in full.`;

const PRIVACY_DE = `Wir erheben und verarbeiten personenbezogene Daten nur, um Gravity Club zu betreiben, Buchungen zu verwalten und Anfragen zu beantworten.

Dazu gehören Angaben, die Sie über Formulare, Buchungsplattformen und direkte Kommunikation machen.

Wir setzen ausgewählte Tools von Drittanbietern ein (z. B. Analyse- und Buchungssysteme), um das Erlebnis zu verbessern und einen reibungslosen Ablauf sicherzustellen.

Ihre Daten werden verantwortungsvoll behandelt und nie an Dritte verkauft.

Sie können jederzeit Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen, indem Sie uns unter hello@gravityclub-rebound.com kontaktieren.`;

const TERMS_DE = `Gravity Club ist ein Boutique-Fitnesserlebnis mit begrenzter Teilnehmerzahl pro Klasse.

Buchungen sind verbindlich. Die Stornierung ist bis 12 Stunden vor Klassenbeginn kostenlos; das Klassen-Guthaben wird Ihrem Konto für eine spätere Buchung gutgeschrieben und bleibt für die restliche Gültigkeitsdauer Ihrer Karte gültig. Eine Barauszahlung ist nicht möglich. Späte Stornierungen werden vollständig verrechnet. Bei Nichterscheinen (No-Show, d. h. Nichtteilnahme an einer gebuchten Klasse ohne Stornierung) wird die Klasse vollständig verrechnet, zusätzlich fällt eine No-Show-Gebühr von CHF 15 an, die nach der Klasse per E-Mail in Rechnung gestellt und über den Zahlungslink in dieser E-Mail beglichen wird.

Kundinnen und Kunden, die sich auf die Warteliste setzen, bestätigen, dass sie damit einverstanden sind, in die Klasse eingebucht zu werden, sobald ein Platz frei wird, und dass diese Buchung gültig und verbindlich ist.

Die Teilnahme erfolgt auf eigene Gefahr. Mit der Teilnahme an einer Klasse bestätigen Sie, dass Sie körperlich fit und gesund sind und an hochintensivem Training teilnehmen können. Sie verpflichten sich, den Anweisungen der Trainerin bzw. des Trainers jederzeit zu folgen.

Aus Sicherheitsgründen sind alle in den Klassen verwendeten Rebounder (Fitness-Trampoline) für ein maximales Benutzergewicht von 140 kg ausgelegt. Mit der Teilnahme bestätigen Sie, dass Sie diese Grenze nicht überschreiten. Gravity Club behält sich das Recht vor, die Teilnahme jederzeit zu verweigern oder zu beenden, wenn begründete Bedenken hinsichtlich Sicherheit, Gesundheit oder der Befolgung von Anweisungen bestehen.
Die Teilnahme trotz Überschreitung des angegebenen Gewichtslimits, falscher Angaben oder Missachtung von Anweisungen erfolgt ausschliesslich auf eigene Gefahr und entbindet Gravity Club von jeglicher Haftung.

Gravity Club haftet nicht für Verletzungen, Unfälle, gesundheitliche Probleme oder den Verlust persönlicher Gegenstände, ausser bei grober Fahrlässigkeit oder Vorsatz.

Mit der Buchung einer Klasse oder dem Beitritt zur Warteliste erkennen Sie diese Bedingungen vollständig an.`;

export const CONTENT: Record<Lang, Content> = {
  en: {
    htmlLang: "en",
    home: {
      title: "Gravity Club Zurich – Rebounder Fitness Classes",
      description:
        "Boutique rebounder fitness classes in Zurich. 50-minute sessions with club energy, limited spots and premium experience. Book Gravity Club now.",
    },
    locationMeta: {
      title: "Gravity Club Location Zurich – Kanzlei Club next to Kino Xenix",
      description:
        "Find Gravity Club at Kanzlei Club in Zurich: the building directly to the left of Kino Xenix, just steps from Helvetiaplatz and well connected by public transport.",
    },
    nav: [
      ["concept", "Concept"],
      ["classes", "Classes"],
      ["booking", "Booking"],
      ["pricing", "Pricing"],
      ["locations", "Location"],
      ["partners", "Hydration"],
      ["faq", "FAQ"],
      ["contact", "Contact"],
    ],
    ui: {
      secureSpot: "Secure your spot",
      bookNow: "Book now",
      toggleMenu: "Toggle menu",
      seePricing: "See pricing",
      languageLabel: "Language",
      close: "Close",
      mobileBadge: "Zurich · Round Two · 20 Spots",
      liveStatusLabel: "Round Two status",
      live: "WE ARE LIVE",
      countdownLabel: "Round Two countdown · 5 October 2026 · 18:00 Zurich",
      countdownUnits: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" },
      details: "Details →",
      book: "Book →",
      choose: "Choose →",
      backHome: "Back to home",
      allClasses: "All classes",
      footerClasses: "Classes",
      footerLocation: "Location",
      instagram: "Instagram",
    },
    hero: {
      h1: ["Rebound.", "Sweat.", "Connect."],
      sub: ["Zurich's", "rebounder fitness", "in a club atmosphere"],
      copy: "50-minute rebounder classes in Zurich. Loud sound, dark room, 20 spots.",
      signature: "Signature Experience",
      signatureLine: "Club energy. Boutique. Precision.",
      heroAlt: "Group rebounder fitness class in a dark club at Gravity Club Zurich",
      signatureAlt: "Rebounder fitness class with club lighting at Gravity Club Zurich",
      womanAlt: "Woman training on a rebounder at Gravity Club Zurich",
      manAlt: "Man doing resistance band exercises on a rebounder at Gravity Club Zurich",
    },
    concept: {
      eyebrow: "The Concept",
      title: ["Sweat, but", "make it a party."],
      lines: [
        "Gravity Club turns fitness into a night out.",
        "Dark room. Loud sound. 20 people. No holding back.",
        "50 minutes on a rebounder, built on beats, not on counting reps.",
        "It’s not only about working out.",
      ],
      accent: "It’s about showing up.",
      closing: "Round Two is here: same room, same energy, more reasons to come back every week.",
    },
    classes: {
      eyebrow: "Classes",
      title: ["Two formats.", "One weekly ritual."],
      copy: "Structured for repeat attendance, community energy and a premium experience from your first visit on.",
      items: [
        {
          id: "hiit",
          title: "REBOUNDER HIIT",
          time: "50 min",
          copy: "Your weekly starter with Livia: high-intensity intervals built on simple, playful moves. Full of energy, sweat and fun, on whatever level you are.",
        },
        {
          id: "powerjump",
          title: "POWER JUMP",
          time: "50 min",
          copy: "With Anifa: a full-body workout on the mini trampoline with easy step combinations and great music. Low-impact, cardio-focused and perfect for stress relief.",
        },
      ],
    },
    booking: {
      eyebrow: "Booking",
      title: ["Book your class fast.", "Train with us in Zurich."],
      spots: "20 Spots Only",
      cancelWindow: "12h Cancellation Window",
      copy: "Every booking runs through Eversports. Choose your class, pay online and your spot is yours. Once a class is full, you can join the waitlist and be booked in if a spot opens up.",
      partner: "Booking Partner",
      partnerCopy:
        "Everything from booking to class access runs seamlessly through Eversports - so your focus stays on the session.",
    },
    pricing: {
      eyebrow: "Pricing",
      title: ["Round Two.", "Pick your pass."],
      copy: "Start with one class or save CHF 10 with the 3-Class Card.",
      items: [
        {
          name: "SINGLE CREDIT",
          price: "CHF 34",
          note: "One class to feel it. Most people come back for more.",
          badge: null,
          highlight: false,
          link: EVERSPORTS_SINGLE,
        },
        {
          name: "3-CLASS CARD",
          price: "CHF 92",
          note: "3 classes. CHF 92. Save CHF 10 - the easiest way to make Gravity Club your weekly ritual.",
          badge: "SAVE CHF 10",
          highlight: true,
          link: EVERSPORTS_CARD,
        },
      ],
    },
    location: {
      eyebrow: "Location",
      title: ["Kanzlei Club, Zurich.", "Where it starts."],
      cards: [
        "Located in the heart of Zurich, Kanzlei Club is one of the city's most iconic nightlife venues.",
        "Just steps from Helvetiaplatz, the location is seamlessly connected to public transport from anywhere in the city.",
        "Every session, the space transforms into a dark, high-energy environment where workout meets nightlife.",
      ],
      moreInfo: "How to find us →",
    },
    partners: {
      eyebrow: "Hydration Partner",
      title: "Hydrated by PEAQ",
      copy: `Built around clean ingredients and functional performance, PEAQ focuses on effective hydration without unnecessary additives.

Designed to support energy, recovery and consistency - it fits seamlessly into the Gravity Club training experience.

Infused Swiss mountain water, rich in natural minerals, vitamins and magnesium.
No sugar. No sweeteners. No colorants. No calories.

Part of every session. Part of the experience.`,
      logoAlt: "PEAQ Nutrition logo",
      sipAlt: "Drinking PEAQ hydration during a Gravity Club session",
      bottleAlt: "PEAQ hydration bottle at Gravity Club Zurich",
    },
    faq: {
      eyebrow: "FAQ",
      titleLead: "First time at ",
      titleBrand: "Gravity Club",
      titleTail: "?",
      titleSub: "Everything you need to know before your first class.",
      items: [
        { category: "Booking", question: "How do I book a class?", answer: "You book your class online. Your spot is only secured after payment." },
        { category: "Booking", question: "Do I need to pay in advance?", answer: "Yes. All classes are paid in advance." },
        { category: "Booking", question: "What if a class is full?", answer: "Join the waitlist on Eversports. If a spot opens up, you are booked into the class and notified right away. By joining, you agree that this booking is valid." },
        { category: "Booking", question: "Can I bring a friend?", answer: "Absolutely. Each person needs their own booking, so book your spots together while there's still room." },
        { category: "Class", question: "Is it suitable for beginners?", answer: "Yes. We provide adjustments for different fitness levels." },
        { category: "Class", question: "Do you have changing rooms or showers on-site?", answer: "As Gravity Club is a pop-up experience, our space is intentionally minimal and focused purely on the workout." },
        { category: "Before you come", question: "Where exactly is it?", answer: "At Kanzlei Club in Zurich: the building directly to the left of Kino Xenix, just steps from Helvetiaplatz." },
        { category: "Before you come", question: "What should I bring?", answer: "Workout clothes, water, a towel and the right energy." },
        { category: "Before you come", question: "When should I arrive?", answer: "Please arrive 10–15 minutes before the class starts." },
        { category: "Cancellation", question: "Can I cancel my booking?", answer: "Yes. You can cancel free of charge up to 12 hours before the class starts. You'll get your credit back for a future class. It stays valid for the remaining validity period of your pass - cash refunds are not available." },
        { category: "Cancellation", question: "What happens if I don't show up?", answer: "If you miss a class without cancelling, your credit is used and a no-show fee of CHF 15 is invoiced to you by email after the class." },
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Get in touch with us.",
      copy: "Have questions about classes, partnerships, or locations? Send us a message and we'll get back to you.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "Email address",
      messageLabel: "Message",
      messagePlaceholder: "How can we help?",
      submit: "Ask us anything",
      sending: "Sending...",
      honeypot: "Leave this field empty",
      errWait: "Please wait a moment before submitting.",
      errFields: "Please complete all fields.",
      errEmail: "Please enter a valid email address.",
      ok: "Thanks - your message has been sent.",
      errPrefix: "Sending failed. ",
      errGeneric: "Sending failed. Please try again in a moment.",
    },
    consent: {
      title: "Improve your experience",
      text: "We use analytics to understand how you interact with Gravity Club and to continuously improve the experience, classes and booking flow. This helps us build a better product for you.",
      accept: "Improve experience",
      decline: "Decline",
    },
    footer: { imprint: "Impressum", privacy: "Privacy", terms: "Terms" },
    legal: { privacy: PRIVACY_EN, terms: TERMS_EN, closeLabel: "Close legal modal" },
    classPages: {
      hiit: {
        slug: "rebounder-hiit",
        metaTitle: "Rebounder HIIT Zurich with Livia | Gravity Club",
        metaDescription:
          "Rebounder HIIT in Zurich: 50 minutes of high-intensity intervals on a fitness trampoline with Livia at Gravity Club. All levels, 20 spots, from CHF 34.",
        eyebrow: "Class",
        h1: "Rebounder HIIT in Zurich",
        intro:
          "Your weekly starter with Livia: high-intensity intervals built on simple, playful moves. Full of energy, sweat and fun, on whatever level you are.",
        expectTitle: "What to expect",
        expect: [
          "50 minutes of high-intensity interval training on a rebounder (fitness trampoline).",
          "Simple, playful moves that keep you engaged, with options for different fitness levels.",
          "A dark room, loud sound and 20 people moving together.",
          "Coached by Livia from start to finish.",
        ],
        goodTitle: "Good to know",
        good: [
          "Beginners are welcome: we provide adjustments for different fitness levels.",
          "Bring workout clothes, water and the right energy. Please arrive 10–15 minutes before the class starts.",
          "All rebounders are designed for a maximum user weight of 140 kg.",
          "PEAQ hydration is part of every session.",
        ],
        bookTitle: "Book Rebounder HIIT",
        bookCopy:
          "A single credit is CHF 34, the 3-Class Card is CHF 92 (save CHF 10). Cancel for free up to 12 hours before the class starts.",
        bookCta: "See schedule and book",
        imageAlt: "Man doing resistance band exercises on a rebounder during Rebounder HIIT at Gravity Club Zurich",
        trainer: "Livia",
        seeAlso: "Also try POWER JUMP with Anifa",
      },
      powerjump: {
        slug: "power-jump",
        metaTitle: "Power Jump Zurich – Mini Trampoline Workout | Gravity Club",
        metaDescription:
          "Power Jump in Zurich: a 50-minute low-impact full-body workout on the mini trampoline with Anifa, easy step combinations and great music. 20 spots, from CHF 34.",
        eyebrow: "Class",
        h1: "Power Jump in Zurich",
        intro:
          "With Anifa: a full-body workout on the mini trampoline with easy step combinations and great music. Low-impact, cardio-focused and perfect for stress relief.",
        expectTitle: "What to expect",
        expect: [
          "50 minutes of full-body training on a rebounder (mini trampoline).",
          "Easy step combinations set to great music: jump, sweat and have fun.",
          "Low-impact and cardio-focused, a perfect way to let go of stress.",
          "Coached by Anifa in a dark room with 20 people.",
        ],
        goodTitle: "Good to know",
        good: [
          "Beginners are welcome: we provide adjustments for different fitness levels.",
          "Bring workout clothes, water and the right energy. Please arrive 10–15 minutes before the class starts.",
          "All rebounders are designed for a maximum user weight of 140 kg.",
          "PEAQ hydration is part of every session.",
        ],
        bookTitle: "Book Power Jump",
        bookCopy:
          "A single credit is CHF 34, the 3-Class Card is CHF 92 (save CHF 10). Cancel for free up to 12 hours before the class starts.",
        bookCta: "See schedule and book",
        imageAlt: "Woman training on a rebounder during Power Jump at Gravity Club Zurich",
        trainer: "Anifa",
        seeAlso: "Also try Rebounder HIIT with Livia",
      },
    },
    locationPage: {
      eyebrow: "Location",
      h1: "Gravity Club at Kanzlei Club, Zurich",
      intro:
        "Gravity Club takes place at Kanzlei Club in the heart of Zurich, one of the city's most iconic nightlife venues.",
      findTitle: "How to find us",
      find: [
        "Kanzlei Club is the building directly to the left of Kino Xenix.",
        "It is just steps from Helvetiaplatz and seamlessly connected to public transport from anywhere in the city.",
        "Please arrive 10–15 minutes before your class starts.",
      ],
      insideTitle: "What to expect inside",
      inside: [
        "Every session, the space transforms into a dark, high-energy environment where workout meets nightlife.",
        "The space is intentionally minimal and focused purely on the workout, so there are no changing rooms or showers on-site.",
        "Bring workout clothes, water and the right energy. PEAQ hydration is part of every session.",
      ],
      ctaTitle: "Ready to join?",
      ctaCopy: "Choose your class, pay online and your spot is yours. 20 spots per class.",
      ctaButton: "See schedule and book",
      imageAlt: "Gravity Club rebounder class in a dark club at Kanzlei Club in Zurich",
    },
    schema: {
      gymDescription:
        "Boutique rebounder fitness classes in Zurich. 50-minute sessions with club energy, limited spots and premium experience.",
      priceRange: "CHF 34 - CHF 92",
    },
  },
  de: {
    htmlLang: "de",
    home: {
      title: "Gravity Club Zürich – Rebounder Fitness & Trampolin-Workout",
      description:
        "Boutique-Rebounder-Fitness in Zürich: 50-Minuten-Klassen mit Club-Energie, 20 Plätzen und Trampolin-Workout im Kanzlei Club. Jetzt Platz bei Gravity Club sichern.",
    },
    locationMeta: {
      title: "Gravity Club Standort Zürich – Kanzlei Club neben Kino Xenix",
      description:
        "So findest du Gravity Club im Kanzlei Club in Zürich: das Gebäude direkt links neben dem Kino Xenix, wenige Schritte vom Helvetiaplatz und gut mit dem ÖV erreichbar.",
    },
    nav: [
      ["concept", "Konzept"],
      ["classes", "Kurse"],
      ["booking", "Buchung"],
      ["pricing", "Preise"],
      ["locations", "Standort"],
      ["partners", "Hydration"],
      ["faq", "FAQ"],
      ["contact", "Kontakt"],
    ],
    ui: {
      secureSpot: "Platz sichern",
      bookNow: "Jetzt buchen",
      toggleMenu: "Menü umschalten",
      seePricing: "Preise ansehen",
      languageLabel: "Sprache",
      close: "Schliessen",
      mobileBadge: "Zürich · Runde zwei · 20 Plätze",
      liveStatusLabel: "Status Runde zwei",
      live: "WIR SIND LIVE",
      countdownLabel: "Countdown Runde zwei · 5. Oktober 2026 · 18:00 Zürich",
      countdownUnits: { days: "Tage", hours: "Stunden", minutes: "Minuten", seconds: "Sekunden" },
      details: "Details →",
      book: "Buchen →",
      choose: "Auswählen →",
      backHome: "Zurück zur Startseite",
      allClasses: "Alle Kurse",
      footerClasses: "Kurse",
      footerLocation: "Standort",
      instagram: "Instagram",
    },
    hero: {
      h1: ["Springen.", "Schwitzen.", "Verbinden."],
      sub: ["Zürichs", "Rebounder-Fitness", "in Club-Atmosphäre"],
      copy: "50-Minuten-Rebounder-Klassen in Zürich. Laute Musik, dunkler Raum, 20 Plätze.",
      signature: "Signature Experience",
      signatureLine: "Club-Energie. Boutique. Präzision.",
      heroAlt: "Rebounder-Fitnessklasse in einem dunklen Club bei Gravity Club Zürich",
      signatureAlt: "Rebounder-Fitnessklasse mit Clublicht bei Gravity Club Zürich",
      womanAlt: "Frau beim Training auf dem Rebounder bei Gravity Club Zürich",
      manAlt: "Mann macht Übungen mit Widerstandsbändern auf dem Rebounder bei Gravity Club Zürich",
    },
    concept: {
      eyebrow: "Das Konzept",
      title: ["Schwitzen, aber", "als Party."],
      lines: [
        "Gravity Club macht aus Fitness einen Ausgang.",
        "Dunkler Raum. Laute Musik. 20 Leute. Ohne Zurückhaltung.",
        "50 Minuten auf dem Rebounder, getragen vom Beat statt vom Wiederholungszählen.",
        "Es geht nicht nur ums Training.",
      ],
      accent: "Es geht darum, dabei zu sein.",
      closing: "Runde zwei ist da: gleicher Raum, gleiche Energie, noch mehr Gründe, jede Woche wiederzukommen.",
    },
    classes: {
      eyebrow: "Kurse",
      title: ["Zwei Formate.", "Ein wöchentliches Ritual."],
      copy: "Gemacht, um wiederzukommen: mit Community-Energie und einem Premium-Erlebnis ab dem ersten Besuch.",
      items: [
        {
          id: "hiit",
          title: "REBOUNDER HIIT",
          time: "50 Min.",
          copy: "Dein wöchentlicher Start mit Livia: hochintensive Intervalle mit einfachen, spielerischen Bewegungen. Voller Energie, Schweiss und Spass, auf jedem Level.",
        },
        {
          id: "powerjump",
          title: "POWER JUMP",
          time: "50 Min.",
          copy: "Mit Anifa: ein Ganzkörper-Workout auf dem Mini-Trampolin mit einfachen Schrittkombinationen und starker Musik. Gelenkschonend, Cardio-fokussiert und perfekt zum Stressabbau.",
        },
      ],
    },
    booking: {
      eyebrow: "Buchung",
      title: ["Buche deine Klasse schnell.", "Trainiere mit uns in Zürich."],
      spots: "Nur 20 Plätze",
      cancelWindow: "12 Std. Stornofrist",
      copy: "Jede Buchung läuft über Eversports. Wähle deine Klasse, bezahle online und dein Platz gehört dir. Ist eine Klasse voll, kannst du dich auf die Warteliste setzen und wirst eingebucht, sobald ein Platz frei wird.",
      partner: "Buchungspartner",
      partnerCopy:
        "Von der Buchung bis zum Zugang zur Klasse läuft alles reibungslos über Eversports - damit du dich ganz auf die Session konzentrieren kannst.",
    },
    pricing: {
      eyebrow: "Preise",
      title: ["Runde zwei.", "Wähle deine Karte."],
      copy: "Starte mit einer Klasse oder spare CHF 10 mit der 3-Class Card.",
      items: [
        {
          name: "SINGLE CREDIT",
          price: "CHF 34",
          note: "Eine Klasse zum Ausprobieren. Die meisten kommen für mehr zurück.",
          badge: null,
          highlight: false,
          link: EVERSPORTS_SINGLE,
        },
        {
          name: "3-CLASS CARD",
          price: "CHF 92",
          note: "3 Klassen. CHF 92. Spare CHF 10 - der einfachste Weg, Gravity Club zu deinem wöchentlichen Ritual zu machen.",
          badge: "SPARE CHF 10",
          highlight: true,
          link: EVERSPORTS_CARD,
        },
      ],
    },
    location: {
      eyebrow: "Standort",
      title: ["Kanzlei Club, Zürich.", "Hier geht's los."],
      cards: [
        "Mitten in Zürich gelegen, ist der Kanzlei Club einer der bekanntesten Nightlife-Orte der Stadt.",
        "Nur wenige Schritte vom Helvetiaplatz entfernt, ist der Ort aus der ganzen Stadt bestens mit dem öffentlichen Verkehr erreichbar.",
        "In jeder Session verwandelt sich der Raum in eine dunkle, energiegeladene Umgebung, in der Workout auf Nachtleben trifft.",
      ],
      moreInfo: "So findest du uns →",
    },
    partners: {
      eyebrow: "Hydration-Partner",
      title: "Hydriert mit PEAQ",
      copy: `PEAQ setzt auf saubere Zutaten und funktionale Leistung und sorgt für effektive Hydration ohne unnötige Zusatzstoffe.

Entwickelt, um Energie, Erholung und Konstanz zu unterstützen - und damit ein fester Teil des Gravity-Club-Erlebnisses.

Angereichertes Schweizer Bergwasser, reich an natürlichen Mineralstoffen, Vitaminen und Magnesium.
Kein Zucker. Keine Süssstoffe. Keine Farbstoffe. Keine Kalorien.

Teil jeder Session. Teil des Erlebnisses.`,
      logoAlt: "PEAQ Nutrition Logo",
      sipAlt: "PEAQ-Hydration während einer Gravity-Club-Session",
      bottleAlt: "PEAQ-Trinkflasche bei Gravity Club Zürich",
    },
    faq: {
      eyebrow: "FAQ",
      titleLead: "Zum ersten Mal bei ",
      titleBrand: "Gravity Club",
      titleTail: "?",
      titleSub: "Alles, was du vor deiner ersten Klasse wissen musst.",
      items: [
        { category: "Buchung", question: "Wie buche ich eine Klasse?", answer: "Du buchst deine Klasse online. Dein Platz ist erst nach der Zahlung gesichert." },
        { category: "Buchung", question: "Muss ich im Voraus bezahlen?", answer: "Ja. Alle Klassen werden im Voraus bezahlt." },
        { category: "Buchung", question: "Was, wenn eine Klasse voll ist?", answer: "Setz dich auf die Warteliste bei Eversports. Wird ein Platz frei, wirst du in die Klasse eingebucht und sofort benachrichtigt. Mit dem Beitritt erklärst du dich einverstanden, dass diese Buchung gültig ist." },
        { category: "Buchung", question: "Kann ich eine Freundin oder einen Freund mitbringen?", answer: "Unbedingt. Jede Person braucht eine eigene Buchung, bucht eure Plätze also gemeinsam, solange noch Platz ist." },
        { category: "Klasse", question: "Ist es für Anfänger:innen geeignet?", answer: "Ja. Wir bieten Anpassungen für verschiedene Fitnesslevel." },
        { category: "Klasse", question: "Gibt es Umkleiden oder Duschen vor Ort?", answer: "Da Gravity Club ein Pop-up-Erlebnis ist, ist unser Raum bewusst minimal gehalten und ganz auf das Workout ausgerichtet." },
        { category: "Vor dem Besuch", question: "Wo genau ist es?", answer: "Im Kanzlei Club in Zürich: das Gebäude direkt links neben dem Kino Xenix, nur wenige Schritte vom Helvetiaplatz." },
        { category: "Vor dem Besuch", question: "Was soll ich mitbringen?", answer: "Sportkleidung, Wasser, ein Handtuch und die richtige Energie." },
        { category: "Vor dem Besuch", question: "Wann soll ich ankommen?", answer: "Bitte komm 10–15 Minuten vor Klassenbeginn." },
        { category: "Stornierung", question: "Kann ich meine Buchung stornieren?", answer: "Ja. Bis 12 Stunden vor Klassenbeginn ist die Stornierung kostenlos. Du erhältst dein Guthaben für eine spätere Klasse zurück. Es bleibt für die restliche Gültigkeitsdauer deiner Karte gültig - eine Barauszahlung ist nicht möglich." },
        { category: "Stornierung", question: "Was passiert, wenn ich nicht erscheine?", answer: "Wenn du eine Klasse ohne Stornierung verpasst, wird dein Guthaben verbraucht und nach der Klasse stellen wir dir per E-Mail eine No-Show-Gebühr von CHF 15 in Rechnung." },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Schreib uns.",
      copy: "Fragen zu Klassen, Partnerschaften oder Standorten? Schick uns eine Nachricht, wir melden uns bei dir.",
      nameLabel: "Name",
      namePlaceholder: "Dein Name",
      emailLabel: "E-Mail",
      emailPlaceholder: "E-Mail-Adresse",
      messageLabel: "Nachricht",
      messagePlaceholder: "Wie können wir helfen?",
      submit: "Frag uns alles",
      sending: "Wird gesendet...",
      honeypot: "Dieses Feld leer lassen",
      errWait: "Bitte warte einen Moment, bevor du das Formular abschickst.",
      errFields: "Bitte fülle alle Felder aus.",
      errEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
      ok: "Danke - deine Nachricht wurde gesendet.",
      errPrefix: "Senden fehlgeschlagen. ",
      errGeneric: "Senden fehlgeschlagen. Bitte versuche es gleich noch einmal.",
    },
    consent: {
      title: "Dein Erlebnis verbessern",
      text: "Wir nutzen Analysen, um zu verstehen, wie du Gravity Club nutzt, und um Erlebnis, Klassen und Buchungsablauf laufend zu verbessern. So können wir ein besseres Produkt für dich bauen.",
      accept: "Erlebnis verbessern",
      decline: "Ablehnen",
    },
    footer: { imprint: "Impressum", privacy: "Datenschutz", terms: "AGB" },
    legal: { privacy: PRIVACY_DE, terms: TERMS_DE, closeLabel: "Rechtliche Hinweise schliessen" },
    classPages: {
      hiit: {
        slug: "rebounder-hiit",
        metaTitle: "Rebounder HIIT Zürich mit Livia | Gravity Club",
        metaDescription:
          "Rebounder HIIT in Zürich: 50 Minuten hochintensive Intervalle auf dem Fitness-Trampolin mit Livia bei Gravity Club. Alle Level, 20 Plätze, ab CHF 34.",
        eyebrow: "Kurs",
        h1: "Rebounder HIIT in Zürich",
        intro:
          "Dein wöchentlicher Start mit Livia: hochintensive Intervalle mit einfachen, spielerischen Bewegungen. Voller Energie, Schweiss und Spass, auf jedem Level.",
        expectTitle: "Das erwartet dich",
        expect: [
          "50 Minuten hochintensives Intervalltraining auf dem Rebounder (Fitness-Trampolin).",
          "Einfache, spielerische Bewegungen, die dich bei der Stange halten, mit Optionen für verschiedene Fitnesslevel.",
          "Ein dunkler Raum, laute Musik und 20 Leute, die sich gemeinsam bewegen.",
          "Von Anfang bis Ende angeleitet von Livia.",
        ],
        goodTitle: "Gut zu wissen",
        good: [
          "Anfänger:innen sind willkommen: Wir bieten Anpassungen für verschiedene Fitnesslevel.",
          "Bring Sportkleidung, Wasser und die richtige Energie mit. Bitte komm 10–15 Minuten vor Klassenbeginn.",
          "Alle Rebounder sind für ein maximales Benutzergewicht von 140 kg ausgelegt.",
          "PEAQ-Hydration ist Teil jeder Session.",
        ],
        bookTitle: "Rebounder HIIT buchen",
        bookCopy:
          "Ein Single Credit kostet CHF 34, die 3-Class Card CHF 92 (spare CHF 10). Bis 12 Stunden vor Klassenbeginn kostenlos stornierbar.",
        bookCta: "Stundenplan ansehen und buchen",
        imageAlt: "Mann macht Übungen mit Widerstandsbändern auf dem Rebounder beim Rebounder HIIT von Gravity Club Zürich",
        trainer: "Livia",
        seeAlso: "Probier auch POWER JUMP mit Anifa",
      },
      powerjump: {
        slug: "power-jump",
        metaTitle: "Power Jump Zürich – Mini-Trampolin-Workout | Gravity Club",
        metaDescription:
          "Power Jump in Zürich: 50 Minuten gelenkschonendes Ganzkörper-Workout auf dem Mini-Trampolin mit Anifa, einfachen Schrittkombinationen und starker Musik. 20 Plätze, ab CHF 34.",
        eyebrow: "Kurs",
        h1: "Power Jump in Zürich",
        intro:
          "Mit Anifa: ein Ganzkörper-Workout auf dem Mini-Trampolin mit einfachen Schrittkombinationen und starker Musik. Gelenkschonend, Cardio-fokussiert und perfekt zum Stressabbau.",
        expectTitle: "Das erwartet dich",
        expect: [
          "50 Minuten Ganzkörpertraining auf dem Rebounder (Mini-Trampolin).",
          "Einfache Schrittkombinationen zu starker Musik: springen, schwitzen und Spass haben.",
          "Gelenkschonend und Cardio-fokussiert, ein perfekter Weg, Stress loszuwerden.",
          "Angeleitet von Anifa in einem dunklen Raum mit 20 Leuten.",
        ],
        goodTitle: "Gut zu wissen",
        good: [
          "Anfänger:innen sind willkommen: Wir bieten Anpassungen für verschiedene Fitnesslevel.",
          "Bring Sportkleidung, Wasser und die richtige Energie mit. Bitte komm 10–15 Minuten vor Klassenbeginn.",
          "Alle Rebounder sind für ein maximales Benutzergewicht von 140 kg ausgelegt.",
          "PEAQ-Hydration ist Teil jeder Session.",
        ],
        bookTitle: "Power Jump buchen",
        bookCopy:
          "Ein Single Credit kostet CHF 34, die 3-Class Card CHF 92 (spare CHF 10). Bis 12 Stunden vor Klassenbeginn kostenlos stornierbar.",
        bookCta: "Stundenplan ansehen und buchen",
        imageAlt: "Frau beim Training auf dem Rebounder beim Power Jump von Gravity Club Zürich",
        trainer: "Anifa",
        seeAlso: "Probier auch Rebounder HIIT mit Livia",
      },
    },
    locationPage: {
      eyebrow: "Standort",
      h1: "Gravity Club im Kanzlei Club, Zürich",
      intro:
        "Gravity Club findet im Kanzlei Club mitten in Zürich statt, einem der bekanntesten Nightlife-Orte der Stadt.",
      findTitle: "So findest du uns",
      find: [
        "Der Kanzlei Club ist das Gebäude direkt links neben dem Kino Xenix.",
        "Er liegt nur wenige Schritte vom Helvetiaplatz entfernt und ist aus der ganzen Stadt bestens mit dem öffentlichen Verkehr erreichbar.",
        "Bitte komm 10–15 Minuten vor Klassenbeginn.",
      ],
      insideTitle: "Das erwartet dich drinnen",
      inside: [
        "In jeder Session verwandelt sich der Raum in eine dunkle, energiegeladene Umgebung, in der Workout auf Nachtleben trifft.",
        "Der Raum ist bewusst minimal gehalten und ganz auf das Workout ausgerichtet, deshalb gibt es vor Ort keine Umkleiden oder Duschen.",
        "Bring Sportkleidung, Wasser und die richtige Energie mit. PEAQ-Hydration ist Teil jeder Session.",
      ],
      ctaTitle: "Bereit mitzumachen?",
      ctaCopy: "Wähle deine Klasse, bezahle online und dein Platz gehört dir. 20 Plätze pro Klasse.",
      ctaButton: "Stundenplan ansehen und buchen",
      imageAlt: "Gravity-Club-Rebounderklasse in einem dunklen Club im Kanzlei Club in Zürich",
    },
    schema: {
      gymDescription:
        "Boutique-Rebounder-Fitness in Zürich. 50-Minuten-Klassen mit Club-Energie, begrenzten Plätzen und Premium-Erlebnis.",
      priceRange: "CHF 34 - CHF 92",
    },
  },
};
