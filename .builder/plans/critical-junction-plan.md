# Plan: Redesign Homepage Contact Form Area to Match Design

## Overview
Redesign the homepage contact section (`HomeContact.jsx` / `ContactForm.jsx`) to precisely match the attached screenshot:
1. **Split-tone background**: Dark charcoal (`#191C21`) top banner transitioning to a soft ice-blue (`#E6EEF8`) lower section.
2. **Left column content**:
   - Dark eyebrow pill: `CONTACT US`
   - Hero heading: `Partner with Us for Comprehensive IT` in bold white font
   - Description copy: *"We're happy to answer any questions you may have and help you determine which of our services best fit your needs."*
   - Phone link: *"Call us at: 1-825-570-4550"*
   - Benefits section: *"Your benefits:"* with a 2-column grid of checkmark items:
     - Client-oriented
     - Results-driven
     - Independent
     - Problem-solving
     Each bullet rendered with a solid cyan/royal-blue circular checkmark icon.
3. **Right column elevated consultation card**:
   - Floating white card with rounded corners (`rounded-2xl`), deep drop shadow (`shadow-2xl`), and subtle border overlapping the dark and light background sections.
   - Centered title: *"Schedule a Free Consultation"* with a decorative downward arrow guiding into the form.
   - Form fields laid out exactly as shown:
     - Row 1: `First name` & `Last name` side-by-side (2 columns)
     - Row 2: `Company / Organization`
     - Row 3: `Company email` (`type="email"`)
     - Row 4: `Phone` (`type="tel"`)
     - Row 5: `How Can We Help You?` dropdown with `"Select Option"` default and custom chevron
     - Row 6: `Message` textarea with placeholder *"To better assist you, please describe how we can..."*
     - Row 7: Privacy Policy consent checkbox
     - Row 8: Prominent styled submit button with loading state (`Sending...`) and success/error feedback banners.

---

## Detailed Implementation Steps

### 1. Update Content Defaults (`src/data/content.js` & `src/data/siteContent.js`)
- Update `homeContact` in `src/data/content.js` and `src/data/siteContent.js` to provide:
  - `tag: "CONTACT US"`
  - `title: "Partner with Us for Comprehensive IT"`
  - `text: "We're happy to answer any questions you may have and help you determine which of our services best fit your needs."`
  - `phone: "1-825-570-4550"`
  - `phoneLabel: "Call us at:"`
  - `benefitsTitle: "Your benefits:"`
  - `benefits: ["Client-oriented", "Results-driven", "Independent", "Problem-solving"]`
- Update `contactForm` copy in `src/data/siteContent.js` to ensure matching placeholders:
  - `title: "Schedule a Free Consultation"`
  - `messagePlaceholder: "To better assist you, please describe how we can..."`
  - `options: ["Select Option", "Managed Services", "IT Consulting & Advisory", "Cyber Security", "Web Development", "Mobile Development", "Cloud Services", "Other"]`
- Regenerate seed file (`node api/seed.mjs`) to keep seeds in sync.

### 2. Refactor `ContactForm.jsx` to Support Card Variant
- Enhance `ContactForm.jsx` to support a `variant="card"` prop (used on homepage):
  - When `variant="card"`:
    - Renders the elevated white card wrapper with `bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-9 border border-slate-100`.
    - Centered heading *"Schedule a Free Consultation"*.
    - Subtle divider with the centered downward curved hand-drawn/styled arrow SVG pointing towards the inputs.
    - Fields:
      - First Name & Last Name (2 columns on sm+).
      - Company / Organization (full width).
      - Company email (full width).
      - Phone (full width).
      - How Can We Help You? (select with custom dropdown chevron).
      - Message (textarea with placeholder *"To better assist you, please describe how we can..."*).
      - Privacy Policy consent checkbox.
      - Full-width submit button styled in brand cyan-blue (`bg-shell-red hover:bg-shell-red-dark text-white font-semibold py-3 rounded-lg shadow-sm transition-all`).
  - Preserves standard default layout for `/contact-us` or when `variant` is not `"card"`, ensuring full backwards compatibility with `PageView.jsx`.

### 3. Redesign `HomeContact.jsx`
- Replace existing simple white container with the split-tone responsive layout:
  - Outer `<section>` with soft ice-blue background (`bg-[#E6EEF8]`).
  - Absolute top dark banner overlay (`bg-[#181B22]`) sized to cover the upper ~280px–300px on desktop so the dark section embraces the eyebrow badge, headline, and top of the consultation card.
  - Left column:
    - Top dark zone:
      - Dark translucent badge: `CONTACT US` with subtle border (`border-white/20 bg-white/10 text-white`).
      - Headline: `Partner with Us for Comprehensive IT` in bold white font (`text-3xl sm:text-4xl lg:text-[42px] leading-tight font-extrabold text-white`).
    - Bottom light zone:
      - Description text in `text-slate-700 sm:text-lg leading-relaxed`.
      - Clickable phone link: `Call us at: 1-825-570-4550`.
      - Benefits section:
        - `Your benefits:` heading.
        - 2-column grid of checkmark items with vibrant royal/cyan blue circle icons containing white checkmarks.
  - Right column:
    - Embeds `<ContactForm variant="card" />`, cleanly overlapping across the dark/light split on desktop.
    - Responsive behavior on mobile: stacks gracefully so heading is on dark, text, benefits, and form card flow seamlessly into the light blue background.

### 4. Verification & Testing
- Run syntax and link integrity tests (`node scripts/check-syntax.mjs`, `node scripts/validate-pages.mjs`, `node scripts/check-links.mjs`).
- Test homepage in browser across desktop (1280px+), tablet (768px-1024px), and mobile (375px-480px).
- Verify form validation (required fields, consent checkbox, email formatting) and successful form submission to `api/messages.php`.
- Verify `/contact-us` route remains unaffected and functional.
