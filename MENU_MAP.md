# nexsate.com — site map & navigation reference

Front-end demo: the Shell.com layout, rotated to nexsate.com IT-services content
(managed IT, cloud, cyber security, industries, insights). Design/structure unchanged;
content, palette and brand are new.

## 1. Header top-level items (order asserted by `smoke.mjs`)

| # | Label | Mega-menu anchor |
|---|-------|------------------|
| 1 | Company | `#company` |
| 2 | IT solutions | `#it-solutions` |
| 3 | Industries | `#industries` |
| 4 | Insights | `#insights` |
| 5 | Support | `#support` |

## 2. Homepage section ids (anchor targets)

| id | Section component |
|----|-------------------|
| `top` | HeroCarousel |
| `about` | IntroBand |
| `company` | CardGrid |
| `industries` | ImageTextSplit #1 (id from `content.js`) |
| `why-nexsate` | ImageTextSplit #2 (id from `content.js`) |
| `it-solutions` | StatsStrip |
| `insights` | NewsRow |
| `support` | PromoBanner |

Breadcrumbs on inner pages map eyebrow → anchor via `SECTION_ANCHORS` in `PageView.jsx`
(Company / IT solutions / Industries / Insights / Support; Legal & nexsate.com → `#top`).

## 3. Mega-menu tree (every leaf resolves to a page via `pageHref`)

**Company** (3 columns)
- About us: About nexsate · Mission, vision and values · Why choose us · Our story
- People: Leadership team · Careers · Diversity and inclusion
- Locations and contact: Locations · Contact us · Report an issue with our website

**IT solutions** (4 columns)
- IT services: IT services · Managed IT · IT support · IT consultancy
- Cloud and software: Cloud computing · Custom software · Backup and recovery · Network management
- Security: Cyber security · Data protection · Compliance and standards
- How we work: Onboarding and migration · Service level agreements · Pricing and plans

**Industries** (4 columns)
- Financial services: Banking · Capital markets · Insurance
- Enterprise: Enterprise technology · Manufacturing · Logistics
- Public sector: Healthcare · Higher education · Government
- Other sectors: Retail · Energy and utilities · Media and entertainment

**Insights** (4 columns)
- Case studies: Cloud migration saves money for health insurer · Remote support centre for semiconductor provider · Subscription licensing unlocks spike in IT orders
- IT blog: Partnering with IT provider helps erie manufacturing company thrive in 21st century · Improving lives with technology – HSE lighthouse project · Dynamics 365: a game changer for dairygold operations · Tips to make your workforce a security front line · 4 ways compsec pros protect their computers
- Resources: IT blog · Case studies · Email alerts
- Media: Media contacts · Image library

**Support** (3 columns)
- Help and support: Help and FAQ · Support centre · Service status
- Contact: Contact us · Report an issue with our website · Change country
- Legal: Privacy policy · Cookie policy · Terms of use

## 4. Footer

- **Columns (5):** Contact (Beverley Rd, Brooklyn, New York 1226 US · P: + (0712) 819 79 555 · M: info@nexsate.com — all link to Contact us) · IT Services (IT services, Managed IT, IT support, IT consultancy, Cloud computing, Cyber security, Custom software) · Industries (Banking, Capital markets, Enterprise technology, Manufacturing, Healthcare, Higher education) · Company (About nexsate, Leadership team, IT blog, Case studies, Locations, Careers) · Support (Support forum, Help and FAQ, Contact us, Pricing and plans)
- **Legal bar (7):** Privacy policy · Cookie policy · Terms of use · Accessibility · Data protection · Phishing and scam alerts · Contact us
- **Socials:** LinkedIn / X / Instagram / Facebook / YouTube — `@nexsate` handles (placeholders)

## 5. Page registry

`src/data/pages.js` merges six arrays — whoWeArePages (15), whatWeDoPages (18),
sustainabilityPages (16), newsPages (18), investorPages (10), utilityPages (9) = **86 pages**.
Invariants: `slug === slugify(title)`, no duplicate slugs, `related[]` all valid.
Route: `#/` + slug, rendered by `PageView.jsx`.

## 6. Validation commands

```powershell
node scripts\check-syntax.mjs    # syntax gate over data + scripts
node scripts\validate-pages.mjs  # routes, anchors, related refs, label↔page coverage
node scripts\smoke.mjs           # SSR render assertions for homepage + inner page
npm run build                    # production build
```
