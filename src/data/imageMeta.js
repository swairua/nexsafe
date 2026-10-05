// Central image registry — every image the site serves, with a human
// description, its canonical location(s) in the content store, and whether it
// can be replaced from the admin Media tab.
//
// All photography is local (public/uploads/*); brand art is in public/brand/*
// and social glyphs in public/social/*. Nothing loads from an image CDN at
// runtime — see scripts/localize-images.mjs.
export const IMAGE_META = {
  '/uploads/hero-network-servers.jpg': {
    description: 'Server racks glowing blue inside a modern data centre — homepage hero background.',
    locations: ['Home > Hero slides > #1 "We take care of your IT"', 'Home > Service cards > Network Management'],
    replaceable: true,
  },
  '/uploads/hero-team-planning.jpg': {
    description: 'Colleagues planning around a table with laptops and notes — homepage hero background.',
    locations: ['Home > Hero slides > #2 "Simply enabling IT"'],
    replaceable: true,
  },
  '/uploads/team-collaboration.jpg': {
    description: 'Diverse team collaborating and giving thumbs up in a bright office.',
    locations: ['Home > Hero slides > #3 Industry focus', 'Home > Intro cards > Why partner with us', 'Category images > Support'],
    replaceable: true,
  },
  '/uploads/boardroom-meeting.jpg': {
    description: 'Team meeting around a boardroom table — meeting room with presentation screen.',
    locations: ['Home > Intro cards > How we can help'],
    replaceable: true,
  },
  '/uploads/client-smiling.jpg': {
    description: 'Smiling client portrait — friendly professional headshot.',
    locations: ['Home > Intro cards > Client success stories'],
    replaceable: true,
  },
  '/uploads/team-handshake.jpg': {
    description: 'Two professionals shaking hands — partnership and agreement.',
    locations: ['Category images > Company'],
    replaceable: true,
  },
  '/uploads/circuit-board.jpg': {
    description: 'Close-up of a circuit board with glowing traces — technology detail.',
    locations: ['Home > Service cards > Software Development', 'Category images > IT solutions'],
    replaceable: true,
  },
  '/uploads/industry-team.jpg': {
    description: 'Industrial team on site wearing safety gear — manufacturing context.',
    locations: ['Category images > Industries'],
    replaceable: true,
  },
  '/uploads/business-meeting.jpg': {
    description: 'Business meeting with colleagues reviewing documents — professional discussion.',
    locations: ['Home > Success story image', 'Category images > Insights'],
    replaceable: true,
  },
  '/uploads/data-centre.jpg': {
    description: 'Data centre corridor with server cabinets — infrastructure and backup theme.',
    locations: ['Home > Service cards > Cloud Services', 'Home > Service cards > Backup & Disaster Recovery', 'Category images > Legal'],
    replaceable: true,
  },
  '/uploads/service-managed-it.jpg': {
    description: 'IT technician supporting a workstation — managed IT support theme.',
    locations: ['Home > Service cards > Managed IT Services'],
    replaceable: true,
  },
  '/uploads/cybersecurity.jpg': {
    description: 'Padlock and security overlay on a laptop — cybersecurity theme.',
    locations: ['Home > Service cards > Cybersecurity'],
    replaceable: true,
  },
  '/uploads/office-space.jpg': {
    description: 'Modern open-plan office space with desks and daylight — closing CTA background.',
    locations: ['Home > Promo banner'],
    replaceable: true,
  },
  '/uploads/industry-manufacturing-hero.jpg': {
    description: 'Production floor of a manufacturing plant — Industrial & Manufacturing page hero.',
    locations: ['Pages > Industrial & Manufacturing > hero image'],
    replaceable: true,
  },
  '/uploads/industry-transportation-hero.jpg': {
    description: 'Freight yard and trucks at a logistics terminal — Transportation & Logistics page hero.',
    locations: ['Pages > Transportation & Logistics > hero image'],
    replaceable: true,
  },
  '/uploads/industry-healthcare-hero.jpg': {
    description: 'Clinician using a tablet during a patient appointment — Healthcare page hero.',
    locations: ['Pages > Healthcare > hero image'],
    replaceable: true,
  },
  '/uploads/industry-banks-hero.jpg': {
    description: 'Advisor reviewing financial documents at a desk — Banking, Finance & Insurance page hero.',
    locations: ['Pages > Banking, Finance & Insurance > hero image'],
    replaceable: true,
  },
  '/uploads/solutions-hero.jpg': {
    description: 'Technology team working together at a long desk in a modern office — Services & Solutions page hero.',
    locations: ['Pages > Services & Solutions > hero image'],
    replaceable: true,
  },
  '/uploads/contact-hero.jpg': {
    description: 'Support consultant on a call in a modern office — Contact page hero.',
    locations: ['Pages > Contact > hero image'],
    replaceable: true,
  },
  '/uploads/about-philosophy.jpg': {
    description: 'Colleagues talking through a plan at a table — About page hero image.',
    locations: ['Pages > About Us > hero image'],
    replaceable: true,
  },
  '/uploads/about-experience.jpg': {
    description: 'Team member working at a laptop in a bright office — About page gallery.',
    locations: ['Pages > About Us > gallery'],
    replaceable: true,
  },
  '/uploads/about-together.jpg': {
    description: 'Colleagues collaborating around a desk — About page gallery.',
    locations: ['Pages > About Us > gallery'],
    replaceable: true,
  },
  '/uploads/award-google.png': {
    description: 'Google Premier Partner badge — About page awards row.',
    locations: ['Pages > About Us > awards'],
    replaceable: true,
  },
  '/uploads/award-clutch-top-1000.png': {
    description: 'Clutch Top 1000 badge — About page awards row.',
    locations: ['Pages > About Us > awards'],
    replaceable: true,
  },
  '/uploads/award-forbes-2022.png': {
    description: 'Forbes 2022 badge — About page awards row.',
    locations: ['Pages > About Us > awards'],
    replaceable: true,
  },
  '/uploads/award-clutch-top.png': {
    description: 'Clutch Top badge — About page awards row.',
    locations: ['Pages > About Us > awards'],
    replaceable: true,
  },
  '/uploads/award-msp-ny-2022.png': {
    description: 'NY NYC managed service providers 2022 badge — About page awards row.',
    locations: ['Pages > About Us > awards'],
    replaceable: true,
  },
  '/uploads/bacl-logo.png': {
    description: 'BACL certification logo carried over from nexsate.com.',
    locations: ['Carried over from the previous site (not currently placed on a page)'],
    replaceable: true,
  },
  '/uploads/shape-form.svg': {
    description: 'Decorative form shape carried over from nexsate.com (not currently placed on a page).',
    locations: ['Carried over from the previous site (not currently placed on a page)'],
    replaceable: true,
  },
  '/uploads/logo-aws.svg': {
    description: 'Amazon Web Services brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Amazon Web Services (Cloud & hosting platforms)'],
    replaceable: true,
  },
  '/uploads/logo-azure.svg': {
    description: 'Microsoft Azure brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Microsoft Azure (Cloud & hosting platforms)'],
    replaceable: true,
  },
  '/uploads/logo-google-cloud.svg': {
    description: 'Google Cloud brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Google Cloud (Cloud & hosting platforms)'],
    replaceable: true,
  },
  '/uploads/logo-digitalocean.svg': {
    description: 'Digital Ocean brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Digital Ocean (Cloud & hosting platforms)'],
    replaceable: true,
  },
  '/uploads/logo-rackspace.svg': {
    description: 'RackSpace brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > RackSpace (Cloud & hosting platforms)'],
    replaceable: true,
  },
  '/uploads/logo-m365.svg': {
    description: 'Microsoft 365 brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Microsoft 365 (Collaboration & productivity)'],
    replaceable: true,
  },
  '/uploads/logo-teams.svg': {
    description: 'Teams brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Teams (Collaboration & productivity)'],
    replaceable: true,
  },
  '/uploads/logo-exchange.svg': {
    description: 'Exchange Online brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Exchange Online (Collaboration & productivity)'],
    replaceable: true,
  },
  '/uploads/logo-sharepoint.svg': {
    description: 'SharePoint brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > SharePoint (Collaboration & productivity)'],
    replaceable: true,
  },
  '/uploads/logo-onedrive.svg': {
    description: 'OneDrive brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > OneDrive (Collaboration & productivity)'],
    replaceable: true,
  },
  '/uploads/logo-office.svg': {
    description: 'Office Apps brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Office Apps (Collaboration & productivity)'],
    replaceable: true,
  },
  '/uploads/logo-defender.svg': {
    description: 'Microsoft Defender brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Microsoft Defender (Security & endpoint protection)'],
    replaceable: true,
  },
  '/uploads/logo-crowdstrike.svg': {
    description: 'CrowdStrike brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > CrowdStrike (Security & endpoint protection)'],
    replaceable: true,
  },
  '/uploads/logo-sophos.svg': {
    description: 'Sophos brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Sophos (Security & endpoint protection)'],
    replaceable: true,
  },
  '/uploads/logo-sentinelone.svg': {
    description: 'SentinelOne brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > SentinelOne (Security & endpoint protection)'],
    replaceable: true,
  },
  '/uploads/logo-bitdefender.svg': {
    description: 'Bitdefender brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Bitdefender (Security & endpoint protection)'],
    replaceable: true,
  },
  '/uploads/logo-trendmicro.svg': {
    description: 'Trend Micro Apex One brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Trend Micro Apex One (Security & endpoint protection)'],
    replaceable: true,
  },
  '/uploads/logo-cisco.svg': {
    description: 'Cisco brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Cisco (Network & connectivity)'],
    replaceable: true,
  },
  '/uploads/logo-fortinet.svg': {
    description: 'Fortinet brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Fortinet (Network & connectivity)'],
    replaceable: true,
  },
  '/uploads/logo-ubiquiti.svg': {
    description: 'Ubiquiti brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Ubiquiti (Network & connectivity)'],
    replaceable: true,
  },
  '/uploads/logo-dell.svg': {
    description: 'Dell brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > Dell (Network & connectivity)'],
    replaceable: true,
  },
  '/uploads/logo-watchguard.svg': {
    description: 'WatchGuard brand mark - homepage vendor wall.',
    locations: ['Home > Using trusted technology > WatchGuard (Network & connectivity)'],
    replaceable: true,
  },
  '/brand/nexsate-wordmark.png': {
    description: 'Nexsate blue wordmark on a transparent background — header and footer logo.',
    locations: ['Site settings > Logo (header, footer)'],
    replaceable: true,
  },
  '/brand/nexsate-og.png': {
    description: '1200x630 social share card: the Nexsate wordmark on a light plate above the EnableIT. Transform. Empower. tagline.',
    locations: ['Site metadata (og:image, twitter:image)'],
    replaceable: true,
  },
  '/favicon.svg': {
    description: 'Browser tab icon — the leading "N" of the Nexsate wordmark, in white on the brand gradient tile.',
    locations: ['Browser tab / bookmark (favicon)'],
    replaceable: false,
  },
  '/apple-touch-icon.png': {
    description: 'iOS home-screen icon — the Nexsate "N" on the brand gradient tile.',
    locations: ['iOS home screen (apple-touch-icon)'],
    replaceable: false,
  },
  '/social/facebook.png': {
    description: 'Facebook glyph — footer social channel icon.',
    locations: ['Social channels > Facebook icon (optional override)'],
    replaceable: true,
  },
  '/social/linkedin.png': {
    description: 'LinkedIn glyph — footer social channel icon.',
    locations: ['Social channels > LinkedIn icon (optional override)'],
    replaceable: true,
  },
  '/social/x.png': {
    description: 'X glyph — footer social channel icon.',
    locations: ['Social channels > X icon (optional override)'],
    replaceable: true,
  },
}

/** Human description for an image path, or "" when unregistered. */
export function imageDescription(src) {
  const m = IMAGE_META[src]
  return m ? m.description : ''
}

/** Where an image is used, as a list of "Section > field" labels. */
export function imageLocations(src) {
  const m = IMAGE_META[src]
  return m && Array.isArray(m.locations) ? m.locations : []
}
