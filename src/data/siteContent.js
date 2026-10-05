// Canonical site content - the single source used as (a) the SPA default/fallback and
// (b) the seed that populates the SQLite DB. Admin edits are fetched from
// GET /api/content.php at runtime and override these values.
import { heroSlides, benefits, featuredCards, partnerStrip, industriesStrip, successStory, blogRow, blogIndex, homeContact, testimonials, statsBand, certStrip, searchSuggestions, faqTeaser, awardsBand, noticeBar, deptSplit, valuesStrip } from "./content.js"
import { stackGroups } from "./stack.js"
import { partners } from "./partners.js"
import { promo, footerColumns, footerLegal } from "./footerContent.js"
import { navItems } from "./navItems.js"
import { pages } from "./pages.js"
import { pageHref } from "./slug.js"

export const defaultContent = {
  settings: {
    brandName: "Nexsate",
    tagline: "EnableIT. Transform. Empower.",
    footerNote: "Simplifying IT for a complex world.",
    copyright: "© 2026 Nexsate Technologies Inc. All rights reserved.",
    domain: "nexsate.com",
    // Contact details as published on nexsate.com (footer + contact page).
    // service@ is the public address; the 526-5555 line is the client-support
    // channel from nexsate.com/client-support.
    email: "service@nexsate.com",
    phone: "1-825-570-4550",
    supportPhone: "1-825-526-5555",
    address: "1253 91 St. SW Edmonton, AB T6X 1E9",
    logo: "/brand/nexsate-wordmark.png",
    logoAlt: "Nexsate — EnableIT. Transform. Empower.",
    // Header/search chrome that used to be hardcoded in the components.
    homeTitle: "Nexsate — technology that works as one",
    searchPlaceholder: "Search nexsate.com",
    menuCta: { label: "Talk to an expert", href: "#/contact-us" },
  },
  // Section anchors rendered by the homepage components. The nav/footer/CTA
  // hrefs point at these, so they are content too rather than literals.
  sectionIds: {
    top: "top",
    about: "about",
    company: "company",
    itSolutions: "it-solutions",
    partners: "partners",
    industries: "industries",
    capabilities: "capabilities",
    insights: "insights",
    support: "support",
  },
  // Eyebrow -> homepage anchor for the breadcrumb trail on deep pages.
  categoryAnchors: {
    Company: "#company",
    "IT solutions": "#it-solutions",
    Industries: "#industries",
    Insights: "#insights",
    Support: "#support",
    Legal: "#top",
  },
  // Screen-reader / structural labels, so even the aria strings are editable.
  uiLabels: {
    primaryNav: "Primary",
    mobileNav: "Mobile",
    search: "Search",
    openMenu: "Menu",
    heroRegion: "Featured content",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: "Go to slide",
    explore: "Explore",
    breadcrumb: "Breadcrumb",
    onThisPage: "On this page",
    cookieConsent: "Cookie consent",
    backToTop: "Back to top",
  },
  // Social channels: add, remove or reorder from the admin. Leave `icon` blank
  // for the built-in network glyph, or point it at an uploaded image/brand asset.
  // Hrefs are the live nexsate.com profiles.
  socialLinks: [
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591263043798", icon: "" },
    { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/135134635", icon: "" },
    { network: "x", label: "X", href: "https://x.com/nexsate", icon: "" },
    { network: "github", label: "GitHub", href: "https://github.com/nexsate", icon: "" },
    { network: "youtube", label: "YouTube", href: "http://www.youtube.com/@nexsate", icon: "" },
  ],
  introBand: {
    eyebrow: "Our company",
    title: "Nexsate is your trusted source in IT services and support",
    text: "We take care of your IT, so you can take care of your customers. Empowering businesses with transformative technology solutions - reliable, responsive, and secure IT that keeps daily operations moving.",
  },
  introCards: [
    { id: "our-services", eyebrow: "Our services", title: "How we can help", href: pageHref("Services & Solutions"), src: "/uploads/boardroom-meeting.jpg", alt: "Team meeting in a boardroom", fallback: "linear-gradient(135deg, #070e40 0%, #010ed0 140%)" },
    { id: "our-expertise", eyebrow: "Our expertise", title: "Why partner with us", href: pageHref("About Us"), src: "/uploads/team-collaboration.jpg", alt: "Diverse team giving thumbs up", fallback: "linear-gradient(135deg, #070e40 0%, #0693e3 130%)" },
    { id: "our-customers", eyebrow: "Our customers", title: "Client success stories", href: "#/success-story", src: "/uploads/client-smiling.jpg", alt: "Smiling client", fallback: "linear-gradient(135deg, #b98a1c 0%, #e8b93c 100%)" },
  ],
  pageConnect: {
    tag: "Connect with us",
    title: "Let's talk about your IT",
    text: "Connect with a nexsate expert to discuss how to design, build, manage and modernize the mission-critical technology your business runs on.",
    cta: { label: "Talk to an expert", href: "#/contact-us" },
  },
  // Section headings that were previously literal JSX on the homepage.
  servicesSection: {
    tag: "Services",
    title: "Simply enabling IT for a complex world",
    linkLabel: "Find your solution",
  },
  stackSection: {
    tag: "Our technology stack",
    title: "Using trusted technology to solve your IT challenges",
  },
  // Shared chrome copy for every deep page rendered by PageView.
  pageLabels: {
    home: "Home",
    exploreMore: "Explore more",
    readMore: "Read more",
    learnMore: "Learn more",
    backToTop: "Back to top",
  },
  notFound: {
    tag: "404",
    title: "Page not found",
    text: "The page you are looking for does not exist or may have been moved. Try the header menu, or head back to the homepage.",
    cta: { label: "Back to the homepage", href: "#top" },
  },
  cookieBanner: {
    text: "We use cookies (similar technologies) to collect and analyse information on our website's performance and functionality, to enhance and personalise your experience, and for marketing. By continuing to browse, you agree to our use of cookies.",
    policyLabel: "Cookie policy",
    policyHref: "#/cookie-policy",
    manageLabel: "Manage settings",
    acceptLabel: "Accept all cookies",
  },
  // The consultation form fields, labels and options mirror the form published
  // on nexsate.com. `detail*Label` are the contact-page detail rows, which are
  // worded differently from the form fields ("Call us at:" vs "Phone").
  contactForm: {
    title: "Schedule a Free Consultation",
    text: "",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    companyLabel: "Company / Organization",
    emailLabel: "Company email",
    phoneLabel: "Phone",
    subjectLabel: "How Can We Help You?",
    priorityLabel: "Priority",
    priorityPlaceholder: "Select priority",
    priorityOptions: ["Normal", "High", "Urgent"],
    options: [
      "Select Option",
      "Managed Services",
      "IT Consulting & Advisory",
      "Cyber Security",
      "Web Development",
      "Mobile Development",
      "Cloud Services",
      "Other",
    ],
    messageLabel: "Message",
    consentText:
      "I agree to the Privacy Policy and give my permission to process my personal data for the purposes specified in the Privacy Policy.",
    addressLabel: "Address",
    detailsHeading: "Contact details",
    detailEmailLabel: "Email us:",
    detailPhoneLabel: "Call us at:",
    detailSupportLabel: "Support line:",
    detailAddressLabel: "Address",
    submitLabel: "Submit",
    sendingLabel: "Sending...",
    requiredText: "Please enter your name and email address.",
    consentRequired: "Please agree to the Privacy Policy before sending your message.",
    successText: "Thanks - your message has been sent. A nexsate expert will be in touch soon.",
    errorText: "Could not send your message right now.",
  },
  categoryImages: {
    Company: { src: '/uploads/team-handshake.jpg', alt: 'Two professionals shaking hands in partnership' },
    "IT solutions": { src: '/uploads/circuit-board.jpg', alt: 'Close-up of a circuit board with glowing traces' },
    Industries: { src: '/uploads/industry-team.jpg', alt: 'Industrial team on site wearing safety gear' },
    Insights: { src: '/uploads/business-meeting.jpg', alt: 'Business meeting with colleagues reviewing documents' },
    Support: { src: '/uploads/team-collaboration.jpg', alt: 'Diverse team collaborating together in a bright office' },
    Legal: { src: '/uploads/data-centre.jpg', alt: 'Data centre corridor with server cabinets' },
  },
  heroSlides,
  benefits,
  featuredCards,
  partnerStrip,
  partners,
  industriesStrip,
  stackGroups,
  successStory,
  blogRow,
  blogIndex,
  homeContact,
  testimonials,
  statsBand,
  certStrip,
  searchSuggestions,
  faqTeaser,
  awardsBand,
  noticeBar,
  deptSplit,
  valuesStrip,
  promo,
  navItems,
  footerColumns,
  footerLegal,
  pages,
}

