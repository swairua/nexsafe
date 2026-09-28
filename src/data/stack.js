// Technology stack — the four platform groups and the named vendors listed
// in the client-supplied Home Page document. These are platforms Nexsate uses
// and supports; the document does not claim partnership status for any of
// them, so none is presented as a certified partner.
export const stackGroups = [
  {
    id: 'cloud-hosting',
    title: 'Cloud & hosting platforms',
    text: 'Trusted cloud and hosting platforms that support secure access, reliable infrastructure, data availability, and scalable business operations.',
    vendors: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Digital Ocean', 'RackSpace'],
  },
  {
    id: 'collaboration',
    title: 'Collaboration & productivity',
    text: 'Tools for email, meetings, file sharing, teamwork, and document collaboration, helping employees stay connected and productive from anywhere.',
    vendors: ['Microsoft 365', 'Teams', 'Exchange Online', 'SharePoint', 'OneDrive', 'Office Apps'],
  },
  {
    id: 'security',
    title: 'Security & endpoint protection',
    text: 'Platforms we use and support for endpoint security, identity protection, device management, firewall security, and threat monitoring.',
    vendors: ['Microsoft Defender', 'CrowdStrike', 'Sophos', 'SentinelOne', 'Bitdefender', 'Trend Micro Apex One'],
  },
  {
    id: 'network',
    title: 'Network & connectivity',
    text: 'Networking and connectivity platforms for firewalls, routers, switches, Wi-Fi, structured cabling, fibre connectivity, and secure business network access.',
    vendors: ['Cisco', 'Fortinet', 'Sophos', 'Ubiquiti', 'Dell', 'WatchGuard'],
  },
]

/** Flat, de-duplicated vendor list for the homepage vendor wall. */
export const stackVendors = [
  ...new Set(stackGroups.flatMap((g) => g.vendors)),
]
