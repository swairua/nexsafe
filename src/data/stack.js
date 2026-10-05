// Technology stack - the four platform groups and the named vendors listed
// in the client-supplied Home Page document. These are platforms Nexsate uses
// and supports; the document does not claim partnership status for any of
// them, so none is presented as a certified partner.
//
// Each vendor now carries `logo`: a real brand mark downloaded from the
// vendor's own site / Wikimedia Commons / simple-icons into public/uploads
// (see scripts/localize-images.mjs). The homepage vendor wall renders these
// as a left-to-right marquee; the letter badge in each tile is the fallback
// if an image ever fails to load.
const L = (file) => `/uploads/logo-${file}.svg`

export const stackGroups = [
  {
    id: 'cloud-hosting',
    title: 'Cloud & hosting platforms',
    text: 'Trusted cloud and hosting platforms that support secure access, reliable infrastructure, data availability, and scalable business operations.',
    vendors: [
      { name: 'Amazon Web Services', logo: L('aws') },
      { name: 'Microsoft Azure', logo: L('azure') },
      { name: 'Google Cloud', logo: L('google-cloud') },
      { name: 'Salesforce', logo: L('salesforce') },
      { name: 'Digital Ocean', logo: L('digitalocean') },
      { name: 'RackSpace', logo: L('rackspace') },
    ],
  },
  {
    id: 'collaboration',
    title: 'Collaboration & productivity',
    text: 'Tools for email, meetings, file sharing, teamwork, and document collaboration, helping employees stay connected and productive from anywhere.',
    vendors: [
      { name: 'Microsoft 365', logo: L('m365') },
      { name: 'Teams', logo: L('teams') },
      { name: 'Exchange Online', logo: L('exchange') },
      { name: 'SharePoint', logo: L('sharepoint') },
      { name: 'OneDrive', logo: L('onedrive') },
      { name: 'Office Apps', logo: L('office') },
    ],
  },
  {
    id: 'security',
    title: 'Security & endpoint protection',
    text: 'Platforms we use and support for endpoint security, identity protection, device management, firewall security, and threat monitoring.',
    vendors: [
      { name: 'Microsoft Defender', logo: L('defender') },
      { name: 'CrowdStrike', logo: L('crowdstrike') },
      { name: 'Sophos', logo: L('sophos') },
      { name: 'SentinelOne', logo: L('sentinelone') },
      { name: 'Bitdefender', logo: L('bitdefender') },
      { name: 'Trend Micro Apex One', logo: L('trendmicro') },
    ],
  },
  {
    id: 'network',
    title: 'Network & connectivity',
    text: 'Networking and connectivity platforms for firewalls, routers, switches, Wi-Fi, structured cabling, fibre connectivity, and secure business network access.',
    vendors: [
      { name: 'Cisco', logo: L('cisco') },
      { name: 'Fortinet', logo: L('fortinet') },
      { name: 'Sophos', logo: L('sophos') },
      { name: 'Ubiquiti', logo: L('ubiquiti') },
      { name: 'Dell', logo: L('dell') },
      { name: 'WatchGuard', logo: L('watchguard') },
    ],
  },
]
