# Nexsate site map &amp; navigation reference

Front-end demo rotated to the `Our Company.docx` brief: the doc-defined menu
tree, Nexsate homepage copy, and the corporate **navy / blue** palette with
Facebook, LinkedIn and X social channels.

## 1. Header top-level items (order asserted by `smoke.mjs`)

| # | Label | Mega-menu anchor | Doc section |
|---|-------|------------------|-------------|
| 1 | Our Company | `#company` | About Us / Who We Are |
| 2 | What We Do | `#it-solutions` | What We Do + IT Solutions home menu |
| 3 | Who We Serve | `#industries` | What We Do → Who We Serve |
| 4 | Insights | `#insights` | Our Work / blog |
| 5 | Support | `#support` | Support &amp; legal |

## 2. Homepage section ids (anchor targets)

| id | Section component |
|----|-------------------|
| `top` | HeroCarousel |
| `company` | IntroBand (Our Company statement) |
| `about` | IntroBand grid (in-page anchor) |
| `it-solutions` | CardGrid (the seven services) |
| `pictures` | PicturesRow (pictures straight after services) |
| `industries` | IndustriesStrip (six sectors + corporate-colour sweep button) |
| `who-we-serve` | ImageTextSplit #1 |
| `technology-stack` | ImageTextSplit #2 (replaces the old "Why nexsate" block) |
| `capabilities` | StatsStrip |
| `insights` | NewsRow (blog) |
| `support` | PromoBanner |

Homepage order: Hero → IntroBand → **services grid** → **pictures** →
industries → splits → stats → blog → promo → footer.

Breadcrumbs on inner pages map eyebrow → anchor via `SECTION_ANCHORS` in
`PageView.jsx` (Company / IT solutions / Industries / Insights / Support;
Legal &amp; nexsate.com → `#top`).

## 3. Mega-menu tree (every leaf resolves to a page via `pageHref`)

**Our Company** (4 columns) — Our Company · Our Work · People and Impact ·
Our People | Our Philosophy · Why choose us · Our Story · Our Partners |
Corporate Responsibility · Communities Impact · Innovation &amp; Research ·
Careers | About nexsate · Mission, vision and values · Leadership team ·
Awards and recognition

**What We Do** (4 columns) — What We Do · Our Services · Managed IT services ·
Cloud Services | Cybersecurity · Networking · Software Integration · Software
development | Data protection &amp; disaster recovery · Data protection ·
Compliance and standards | How we Work · Technology Stack · Onboarding and
migration · Service level agreements · Pricing and plans

**Who We Serve** (4 columns) — Who We Serve · Banking · Capital markets ·
Insurance | Enterprise technology · Manufacturing · Logistics · Retail |
Healthcare · Higher education · Government · Energy and utilities |
Our Expertise · Customer Success · IT Solutions · IT strategy consulting

**Insights** (4 columns) — Case studies (3) | IT blog (5) | Resources
(IT blog · Case studies · Email alerts) | Media (Media contacts · Image library)

**Support** (3 columns) — Help and FAQ · Support centre · Service status |
Contact us · Report an issue with our website · Change country | Privacy
policy · Cookie policy · Terms of use

## 4. The seven services (doc "IT Solutions home menu")

Managed IT services · Cloud Services · Cybersecurity · Networking · Software
Integration · Software development · Data protection &amp; disaster recovery —
all shown as homepage cards **and** as nav leaves, so the menu and the landing
page agree.

## 5. Footer

- **Columns (5):** Contact (Beverley Rd, Brooklyn, New York 1226 US · P: +
  (0712) 819 79 555 · M: info@nexsate.com — all link to Contact us) · IT
  Services (IT services, Managed IT services, IT support, Software integration,
  Cloud Services, Cybersecurity, Software development) · Industries (Banking,
  Capital markets, Enterprise technology, Manufacturing, Healthcare, Higher
  education) · Company (About nexsate, Leadership team, IT blog, Case studies,
  Locations, Careers) · Support (Support forum, Help and FAQ, Contact us,
  Pricing and plans)
- **Legal bar (7):** Privacy policy · Cookie policy · Terms of use ·
  Accessibility · Data protection · Phishing and scam alerts · Contact us
- **Socials (3):** Facebook · LinkedIn · X — `@nexsate` handles (placeholders)
- **Brand:** `NexsateLogo.jsx` + `public/favicon.svg` in navy→blue gradient;
  social source art kept in `public/social/`, brand art in `public/brand/`.

## 6. Page registry

`src/data/pages.js` merges seven arrays — whoWeArePages (15), whatWeDoPages
(18), sustainabilityPages (16), newsPages (18), investorPages (10),
utilityPages (9), docPages (17) = **103 pages**.
Invariants: `slug === slugify(title)`, no duplicate slugs, `related[]` all valid.
Route: `#/` + slug, rendered by `PageView.jsx`.
New doc pages live in `src/data/pages/docPages.js` (Our Company, Our Work,
People and Impact, Our Philosophy, Our People, How we Work, Who We Serve,
Customer Success, Our Expertise, Our Partners, What We Do, Innovation &amp;
Research, Communities Impact, Corporate Responsibility, Our Services,
Technology Stack, IT Solutions).

## 7. Theme tokens

`src/index.css` `@theme` keeps the historical `shell-*` class names but the
values are now corporate navy/blue:

| token | value | use |
|-------|-------|-----|
| `--color-shell-red` | `#0a7ffa` | buttons, links, accents |
| `--color-shell-red-dark` | `#0b45f5` | hover |
| `--color-shell-green` | `#0a7ffa` | CTA pills |
| `--color-shell-yellow` | `#3aa0ff` | accents on dark surfaces |
| `--color-shell-black` | `#070e40` | navy hero / footer bands |

`.btn-sweep` adds the doc-requested corporate-colour hover animation (blue
fill wipes left→right, arrow nudges forward).

## 8. Validation commands

```powershell
node scripts\check-syntax.mjs    # syntax gate over data + scripts
node scripts\validate-pages.mjs  # routes, anchors, related refs, label↔page coverage
node scripts\smoke.mjs           # SSR render assertions for homepage + inner page
npm run build                    # production build
```

