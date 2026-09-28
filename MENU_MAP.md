# Nexsate site map & navigation reference

Front-end demo built from the client documents in `logoandcontent/`
(`.docx-text/*.txt` are the extracted sources). Every line of page copy traces
back to a client document; anything not supplied is flagged `TODO(client)` in
the code rather than invented.

## 1. Header top-level items

| # | Label | Mega-menu anchor |
|---|-------|------------------|
| 1 | Our Company | `#company` |
| 2 | What We Do | `#it-solutions` |
| 3 | Who We Serve | `#industries` |
| 4 | Success Stories | `#insights` |
| 5 | Support | `#support` |

## 2. Homepage section ids (anchor targets)

| id | Section component |
|----|-------------------|
| `top` | HeroCarousel |
| `about` | Benefits (the four principles) |
| `company` | IntroBand (the "EnableIT. Transform. Empower." statement) |
| `it-solutions` | CardGrid (the six service cards) |
| `partners` | PartnerStrip (vendor wall — roster from `src/data/partners.js`) |
| `industries` | IndustriesStrip (four sectors + corporate-colour sweep button) |
| `capabilities` | StackSection (the four technology-stack groups) |
| `insights` | SuccessStorySection (the client case study) |
| `support` | PromoBanner (closing CTA) |

Homepage order: Hero -> benefits -> intro band -> services grid -> partners ->
industries -> stack -> success story -> promo -> footer.

Breadcrumbs on inner pages map eyebrow -> anchor via `SECTION_ANCHORS` in
`PageView.jsx` (Company / IT solutions / Industries / Insights / Support;
Legal -> `#top`).

## 3. Mega-menu tree (every leaf resolves to a page via `pageHref`)

**Our Company** (3 columns)
- About us: About Us / Our Mission / Core Values / Our People / Our Process
- What we bring together: Services & Solutions / Managed IT Services / Cloud Services / Cybersecurity
- Business services: Network Management / Backup & Disaster Recovery / Software Development, ERP & CRM Solutions

**What We Do** (3 columns)
- Core services: Managed IT Services / Cloud Services / Cybersecurity / Security
- Connect and protect: Network Management / Backup & Disaster Recovery
- Build and improve: Software Development, ERP & CRM Solutions / ERP Solutions / Automation / Digital Transformation / Gaining Efficiency

**Who We Serve** (2 columns)
- Industry focus: Banks & Insurance / Healthcare / Industrial & Manufacturing / Transportation & Logistics
- What we do for them: Managed IT Services / Network Management / Cybersecurity / Backup & Disaster Recovery

**Success Stories** (1 column)
- Client outcomes: IT alignment for a growing business

**Support** (2 columns)
- Help and support: Help and FAQ / Contact us / Change country
- Legal: Privacy Policy / Cookie policy / Terms & Conditions

## 4. The six services (doc "Services & Solutions")

Managed IT Services / Cloud Services / Cybersecurity / Network Management /
Backup & Disaster Recovery / Software Development, ERP & CRM Solutions — shown
as homepage cards **and** nav leaves, so the menu and the landing page agree.

## 5. Footer

- **Columns (5):** Contact (Talk to an expert / Help and FAQ / Change country),
  Services, More services, Industries, Company
- **Legal bar (4):** Privacy Policy / Cookie policy / Terms & Conditions / Contact us
- **Socials (3):** Facebook / LinkedIn / X — **unconfirmed**. These are
  conventional guesses; the client supplied no social URLs, so they are
  flagged `TODO(client)` in `Footer.jsx` and may 404.
- **Brand:** `NexsateLogo.jsx` renders the client-supplied NEXSATE wordmark
  (`public/brand/nexsate-wordmark.png`, cropped from the 1254x1254 source to
  1116x140) in the header **and** footer — on a light plate, because the
  artwork is blue-on-near-white and must stay legible over hero photography.
  The compact blue tile is retained as `public/favicon.svg`.

## 6. Page registry

`src/data/pages.js` merges the page arrays under `src/data/pages/`:

| file | pages | covers |
|------|-------|--------|
| `company.js` | 5 | About Us, Our Mission, Core Values, Our People, Our Process |
| `services.js` | 12 | Services & Solutions, the six services, ERP, Automation, Digital Transformation, Gaining Efficiency |
| `industries.js` | 4 | Banks & Insurance, Healthcare, Industrial & Manufacturing, Transportation & Logistics |
| `successStory.js` | 1 | The client case study, kept whole |
| `site.js` | 6 | Contact us, Change country, Help and FAQ, Privacy Policy, Cookie policy, Terms & Conditions |

**28 pages total.** Invariants: no duplicate slugs, every `related[]` resolves,
every section has a heading plus body/list/items content. Route: `#/` + slug,
rendered by `PageView.jsx`.

The earlier Kyndryl-derived placeholder sets (investors, news, sustainability,
generic who-we-are / what-we-do) were **removed** rather than kept, so no copy
the client did not supply remains on the site.


## 7. Theme tokens

`src/index.css` `@theme` keeps the historical `shell-*` class names but the
values now mirror the live nexsate.com blue/cyan scheme:

| token | value | use |
|-------|-------|-----|
| `--color-shell-red` | `#0693e3` | corporate cyan-blue: buttons, links, accents |
| `--color-shell-red-dark` | `#010ed0` | deep royal blue: hover, sweep gradient end |
| `--color-shell-green` | `#0693e3` | CTA pills |
| `--color-shell-yellow` | `#4aeadc` | turquoise highlight — dark surfaces only |
| `--color-shell-cyan` | `#00a1e0` | secondary cyan: tiles, borders, gradients |
| `--color-shell-black` | `#070e40` | navy hero / footer bands |

Values were read off the live site (its 135-degree brand gradient starts at
`rgb(6,147,227)`; the turquoise highlight appears in its accent gradients).
`shell-yellow` is only ever used over navy, so the turquoise stays legible.

`.btn-sweep` adds the doc-requested corporate-colour hover animation (blue
fill wipes left->right, arrow nudges forward).

## 8. Partner roster

`src/data/partners.js` is the single source of truth for vendors. Each entry is
`{ name, area, status }`, where `status` is `partner` (agreement held today) or
`upcoming` (agreement in progress). The PartnerStrip renders the `upcoming`
entries with an "Agreement in progress" flag rather than dropping them.

## 9. Verification

Run these after any content or navigation change:

```
node scripts/check-syntax.mjs     # bracket balance across the data files
node scripts/validate-pages.mjs   # registry schema, nav/footer/CTA resolution
node scripts/check-links.mjs      # every link resolves; no orphan pages
node scripts/smoke.mjs            # renders <App /> and all 28 pages
npx vite build                    # production build
```

`smoke.mjs` compares copy against tag-stripped, entity-decoded text, so
ampersands in titles ("Backup & Disaster Recovery") match correctly.