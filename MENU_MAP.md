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
| `partners` | PartnerStrip (auto-scrolling technology marquee — logo slots show the admin-uploaded mark per vendor, placeholder until then; roster from `src/data/partners.js`) |
| `industries` | IndustriesStrip (four sectors + corporate-colour sweep button) |
| `capabilities` | StackSection (the four technology-stack groups) |
| `insights` | InsightsSection (resource-library grid) |
| `support` | PromoBanner (closing CTA) |

Homepage order: Hero -> benefits -> intro band -> services grid -> industries ->
technology strip (partners) -> proof (stats/certs/awards) -> stack ->
insights -> promo -> footer.

Breadcrumbs on inner pages map eyebrow -> anchor via `SECTION_ANCHORS` in
`PageView.jsx` (Company / IT solutions / Industries / Insights / Support;
Legal -> `#top`).

## 3. Mega-menu tree (every leaf resolves to a page via `pageHref`)

**Our Company** (3 columns)
- About us: About Us (`#/about-us`, titled "Commitment to delivering excellence")
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
- Help and support: Help and FAQ / Contact us
- Legal: Privacy Policy / Cookie policy / Terms & Conditions

## 4. The six services (doc "Services & Solutions")

Managed IT Services / Cloud Services / Cybersecurity / Network Management /
Backup & Disaster Recovery / Software Development, ERP & CRM Solutions — shown
as homepage cards **and** nav leaves, so the menu and the landing page agree.

## 5. Footer

- **Columns (5):** Contact (Talk to an expert / Help and FAQ),
  Services, More services, Industries, Company
- **Legal bar (4):** Privacy Policy / Cookie policy / Terms & Conditions / Contact us
- **Socials (3):** Facebook / LinkedIn / X — **unconfirmed**. These are
  conventional guesses; the client supplied no social URLs, so they are
  flagged `TODO(client)` in `Footer.jsx` and may 404.
- **Brand:** `NexsateLogo.jsx` renders the client-supplied NEXSATE wordmark
  (`public/brand/nexsate-wordmark.png`, cropped from the 1254x1254 source to
  1116x140) in the header **and** footer — on a light plate, because the
  artwork is blue-on-near-white and must stay legible over hero photography.
- **Favicon / social card:** both are derived from that same wordmark by
  `scripts/build-brand-assets.py` (`npm run brand:build`), never hand-drawn.
  The script first converts the artwork from a flattened RGB PNG (its
  transparency checkerboard is baked into the pixels) into a real alpha
  channel, then emits:
  - `public/favicon.svg` — the leading **N** in white on the brand gradient
    tile, vector-traced from the glyph (crisp at 16px; a 1116x140 wordmark is
    unusable as a tab icon);
  - `public/apple-touch-icon.png` — the same N rasterised at 180x180, opaque
    because iOS renders transparency as black;
  - `public/brand/nexsate-og.png` — a 1200x630 `og:image` / `twitter:image`
    card with the wordmark over the live tagline.

  It replaces `public/brand/nexsate-banner.png`, a 600x150 (4:1) strip still
  carrying the retired "Managed IT / Software / Telecommunications" lockup —
  too short for a 1.91:1 card and off-brand. Re-run the script after any
  replacement artwork.

## 6. Page registry

`src/data/pages.js` merges the page arrays under `src/data/pages/`:

| file | pages | covers |
|------|-------|--------|
| `company.js` | 1 | About Us ("Commitment to delivering excellence") |
| `services.js` | 12 | Services & Solutions, the six services, ERP, Automation, Digital Transformation, Gaining Efficiency |
| `industries.js` | 4 | Banks & Insurance, Healthcare, Industrial & Manufacturing, Transportation & Logistics |
| `successStory.js` | 1 | The client case study, kept whole |
| `site.js` | 5 | Contact, FAQ, Privacy Policy, Cookie policy, Terms & Conditions |

**23 pages total.** Invariants: no duplicate slugs, every `related[]` resolves,
every section has a heading plus body/list/items content, every `items[].href`
resolves, and every page image/gallery/logo points at a local `/uploads/` file.
Route: `#/` + slug, rendered by `PageView.jsx`.

### Ported from nexsate.com (redesign)

Four pages were rewritten from the live site, wording and imagery included:

| route | source | notes |
|-------|--------|-------|
| `#/services-solutions` | `/solutions/` | Hero image + the 8 service cards as `items`; each card keeps a "Learn more" link to the matching page here. Telecommunication and IT Consulting & Advisory have no counterpart page, so they carry no link. |
| `#/about-us` | `/about/` | Titled "Commitment to delivering excellence" (the source h1). Hero photo, two-photo gallery and the five award badges, all downloaded to `public/uploads/`. |
| `#/contact-us` | `/contact/` | "Contact" / "We're here to help", the call-email-consult rows, "Our locations", plus the contact details in **Site settings** (1-825-570-4550, service@nexsate.com, 1253 91 St. SW Edmonton, AB T6X 1E9). |
| `#/help-and-faq` | `/faq/` | "FAQ" with the seven source questions; list answers are kept as lists. |
| `#/banks-insurance` | `/industries/banks-insurance/` | Titled "Banking, Finance & Insurance" (the source h1). Source's repeated "Financial workflows require…" paragraph is kept as published. |
| `#/healthcare` | `/industries/healthcare/` | Source heading is singular: "Technology Behind Better Patient Experience". |
| `#/industrial-manufacturing` | `/industries/industry-manufacturing/` | Titled "Industry Manufacturing" (the source h1). Source's "ensuring you're your systems" typo is kept as published. |
| `#/transportation-logistics` | `/industries/transportation-logistics/` | Source has 7 service items (no cybersecurity card); its 3rd closing paragraph is restored. |

Each of the four industry pages carries its own hero background image
(`public/uploads/industry-*-hero.jpg`, 2558×688), downloaded from the source.

The source's services heading on the healthcare and banks pages is a
copy-paste error ("Our IT services for manufacturers"), so those two name their
own sector instead. Nav and footer labels are unchanged because `pageHref()`
derives the slug from the label — the page *titles* now match the source h1s
while the menu keeps "Banks & Insurance" / "Industrial & Manufacturing".

Two source links were deliberately **not** carried over because no page here
routes to them (they would be dead links): the About page's "Learn more"
(→ `/why-us/`) and "Meet the team" (→ Team page).

`Our Mission`, `Core Values`, `Our People` and `Our Process` were **removed**:
their content is on the single About page, so keeping them duplicated copy and
four orphan routes. The nav and footer Company columns now list About Us only.

**Kept despite looking thin:** the two Security pages overlap by ~40% but come
from two separate supplied documents (`Security.docx`, `Cybersecurity.docx`).
The legal pages are site-utility copy the client did not supply, but a real site
needs them.


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

**Open gap — two sectors awaiting client documents.** The Home Page document
names six sectors, but only four have a dedicated "Industry Focus" document
(488–600 words each), so only those four have pages:

| sector | source document | page |
|--------|-----------------|------|
| Industrial & Manufacturing | `Industry Focus - Industrial & Manufacturing.docx` (488 w) | yes |
| Transportation & Logistics | `Industry Focus - Transport and Logistics.docx` (600 w) | yes |
| Healthcare | `Industry Focus - Healthcare.docx` (544 w) | yes |
| Financial Services | `Industry Focus - Banks & Insurance.docx` (553 w) | yes |
| **Professional Services** | **none** | **no** |
| **Non-Profit** | **none** | **no** |

Across all 18 supplied documents those last two are named exactly once, in the
homepage's comma-separated sector list, with no supporting narrative. Writing
pages for them would mean inventing every sector-specific claim — the same
failure mode as the deleted Kyndryl placeholder pages — so they are omitted
rather than fabricated. `TODO(client)` in `src/data/content.js` records the
request, and `validate-pages.mjs` asserts the shortfall so it cannot be quietly
dropped from view at review time.

## 8. Partner roster

`src/data/partners.js` is the single source of truth for vendors. Each entry is
`{ name, area, status }`, where `status` is `partner` (agreement held today) or
`upcoming` (agreement in progress). The PartnerStrip renders the `upcoming`
entries with an "Agreement in progress" flag rather than dropping them.

## 9. Content store, admin portal & local images

`admin.html` → `src/admin/` is the editor for the whole site. It signs in
against `api/auth.php` (session + CSRF) and reads/writes `api/content.php`,
backed by SQLite (`api/data/nexsate.sqlite`). `src/data/siteContent.js` is both
the SPA fallback and the seed that populates an empty database; `api/db.php`
backfills keys (and nested fields) added to the seed later, so an existing
install picks up new admin sections without losing saved edits.

### Signing in

Run the backend and the front-end, then open the admin entry point:

```
php -S localhost:8000 -t .      # PHP + SQLite API
npm run dev                     # Vite dev server (proxies /api -> :8000)
```

| | |
|---|---|
| Admin portal | `http://localhost:5173/admin.html` |
| Public site | `http://localhost:5173/` |
| API directly | `http://localhost:8000/api/content.php` |
| Username | `admin` |
| Password | whatever was last set with `npm run admin:password` (shipped default is `nexsate-admin`) |

The password lives as a bcrypt hash in the `admins` table; `nx_default_admin()`
in `api/config.php` only seeds a database that does not exist yet. To change it:

```
npm run admin:password -- admin "a-longer-new-password"
# or: php scripts/set-admin-password.php admin "a-longer-new-password"
```

Passwords under 8 characters are refused unless you pass `--force` (a `--min=N`
flag raises the bar instead). `scripts/.htaccess` denies web access to that tool

## 11. Deploying to Render

Render has **no native PHP runtime** (only Node, Python, Ruby, Go, Rust,
Elixir), so the API ships as a Docker image. `Dockerfile` is a two-stage build:
Vite builds the SPA, then a `php:8.3-cli` stage serves everything through one
origin via `router.php`:

| Request | Served by |
|---------|-----------|
| `/api/{auth,content,media,messages}.php` | the PHP + SQLite API |
| `/uploads/*` | files from `NX_UPLOAD_DIR` |
| `/brand/*`, `/social/*`, `/assets/*`, `/favicon.svg`, `/apple-touch-icon.png` | `dist/` |
| anything else | `dist/index.html` (hash-routed SPA) |

`router.php` allow-lists the API scripts (`config.php`, `db.php`,
`helpers.php` are libraries — hitting them directly only produced a PHP fatal
error that leaked absolute paths) and 404s `/api/data`, `/api/seed.json`,
`.git`, `node_modules` and `scripts`.

`render.yaml` defines one Docker web service with a **persistent disk** at
`/data`. The disk is not optional: `NX_DATA_DIR` (SQLite) and `NX_UPLOAD_DIR`
(uploads) both live there, so without it every deploy would revert the site to
the `api/seed.json` defaults and lose uploaded images. `api/config.php` reads
all four paths from the environment with local defaults, so the same tree runs
unmodified under XAMPP and on Render.

```
First deploy: New > Blueprint (picks up render.yaml) — requires a paid plan,
because free instances cannot mount a persistent disk.
```

The admin password on a fresh production database is still the shipped
`nexsate-admin` default, so run `npm run admin:password` (or
`php scripts/set-admin-password.php`) against the deployed instance before
sharing the URL.

Local equivalent of the production process:

```
npm run build
php -S localhost:8000 -t . router.php    # same router the container uses
```
and the other scripts.

### Dev server gotcha: "URI malformed" overlay

Vite's static middleware lets a `URIError` escape out of `decodeURI()`, so any request
path carrying an invalid percent escape (a bare `%`) crashes the page with a full-screen
dev-server overlay. Two layers keep that from happening:

- `vite.config.js` registers `nexsate-malformed-uri-guard`, which answers such requests
  with a plain `400` plus a warning in the Vite log. Guarded path: `/a%.png`.
- `src/admin/FieldEditor.jsx` matches image fields on the **leaf** key only and only
  renders an `<img>` for a value that really looks like an image URL, so nested CSS such
  as `heroSlides[0].gradient` stays a text field instead of becoming `<img src>`.

`npm run verify` asserts both halves (see `scripts/smoke-admin.mjs`).

Deploying from a sub-folder (e.g. `/nexsate/`) needs Vite's `base` and
`UPLOAD_URL` in `api/config.php` set to match, otherwise `/api` and `/uploads`
resolve against the domain root.

Content tabs and the keys they drive:

| Admin tab | key | Rendered by |
|-----------|-----|-------------|
| Site settings | `settings` | header CTA/domain/logo, footer, contact details, tab title |
| Section anchors | `sectionIds` | every homepage section `id` (the nav's scroll targets) |
| Breadcrumb anchors | `categoryAnchors` | `PageView` breadcrumb eyebrow links |
| UI / screen-reader labels | `uiLabels` | aria labels and the mega-menu "Explore …" link |
| Social channels | `socialLinks` | footer channel row (add/remove/reorder; blank `icon` = built-in glyph) |
| Navigation menu | `navItems` | header, mega menu, mobile drawer, in-page pills |
| Home - * | `heroSlides`, `introBand`, `introCards`, `benefits`, `featuredCards`, `servicesSection`, `partnerStrip`, `partners`, `industriesStrip`, `stackGroups`, `stackSection`, `successStory`, `promo` | homepage sections |
| Category images | `categoryImages` | deep-page header/prose imagery |
| Connect / contact block | `pageConnect` | dark CTA band on every deep page |
| Page labels | `pageLabels` | breadcrumb "Home", "Explore more", "Read more", "Back to top" |
| 404 page | `notFound` | unknown-route view |
| Cookie banner | `cookieBanner` | first-visit consent bar |
| Contact form | `contactForm` | contact page form + contact-detail labels |
| Footer columns / legal | `footerColumns`, `footerLegal` | footer link columns and legal bar |
| Pages | `pages` | every `#/<slug>` page (one page at a time) |

**Images are local.** Photography lives in `public/uploads/` and the data layer
stores `/uploads/<file>` paths, so nothing loads from an image CDN at runtime.
`scripts/localize-images.mjs` (npm `images:localize`) downloads any remote image
a data file references and rewrites the reference in place;
`scripts/apply-image-map.php` applies the same mapping to URLs already stored in
the database. Admins can replace any image via the field's **Pick** button
(Media tab), which stores new files in `public/uploads/` too.

## 10. Verification

Run these after any content or navigation change:

```
npm run verify                    # all five checks below, in order
node scripts/check-syntax.mjs     # bracket balance across the data files
node scripts/validate-pages.mjs   # registry schema, nav/footer/CTA resolution
node scripts/check-links.mjs      # every link resolves; no orphan pages
node scripts/smoke.mjs            # renders <App /> and all 23 pages
node scripts/smoke-admin.mjs      # every admin section renders; no remote images
npx vite build                    # production build
```

`smoke.mjs` compares copy against tag-stripped, entity-decoded text, so
ampersands in titles ("Backup & Disaster Recovery") match correctly.