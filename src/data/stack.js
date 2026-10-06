// Technology stack - the four platform groups and the named vendors listed
// in the client-supplied Home Page document. These are platforms Nexsate uses
// and supports; the document claims no partnership status for any of them,
// so none is presented as a partner and no copy implies endorsement.
//
// Each vendor deliberately ships with NO `logo`: brand marks stay off the
// site until an admin uploads the vendor's own file (Content > Home >
// Partners > Logo, stored under public/uploads). The homepage technology
// strip renders a placeholder slot until then and the chips below stay
// text-only — nothing on the site can present an unauthorized or altered
// mark by default.
// AUDIT NOTE: serving a vendor's mark implies a capability claim that should
// be covered by an agreement or approval — remove any vendor that lacks one.

export const stackGroups = [
  {
    id: 'cloud-hosting',
    title: 'Cloud & hosting platforms',
    text: 'Trusted cloud and hosting platforms that support secure access, reliable infrastructure, data availability, and scalable business operations.',
    vendors: [
      { name: 'Amazon Web Services', logo: '/uploads/stack-icons/amazon-web-services.svg' },
      { name: 'Microsoft Azure', logo: '/uploads/stack-icons/microsoft-azure.svg' },
      { name: 'Google Cloud', logo: '/uploads/stack-icons/google-cloud.svg' },
      { name: 'Salesforce', logo: '/uploads/stack-icons/salesforce.svg' },
      { name: 'Digital Ocean', logo: '/uploads/stack-icons/digital-ocean.svg' },
      { name: 'RackSpace', logo: '/uploads/stack-icons/rackspace.svg' },
    ],
  },
  {
    id: 'collaboration',
    title: 'Collaboration & productivity',
    text: 'Tools for email, meetings, file sharing, teamwork, and document collaboration, helping employees stay connected and productive from anywhere.',
    vendors: [
      { name: 'Microsoft 365', logo: '/uploads/stack-icons/microsoft-365.svg' },
      { name: 'Teams', logo: '/uploads/stack-icons/teams.svg' },
      { name: 'Exchange Online', logo: '/uploads/stack-icons/exchange-online.svg' },
      { name: 'SharePoint', logo: '/uploads/stack-icons/sharepoint.svg' },
      { name: 'OneDrive', logo: '/uploads/stack-icons/onedrive.svg' },
      { name: 'Office Apps', logo: '/uploads/stack-icons/office-apps.svg' },
    ],
  },
  {
    id: 'security',
    title: 'Security & endpoint protection',
    text: 'Platforms we use and support for endpoint security, identity protection, device management, firewall security, and threat monitoring.',
    vendors: [
      { name: 'Microsoft Defender', logo: '/uploads/stack-icons/microsoft-defender.svg' },
      { name: 'CrowdStrike', logo: '/uploads/stack-icons/crowdstrike.svg' },
      { name: 'Sophos', logo: '/uploads/stack-icons/sophos.svg' },
      { name: 'SentinelOne', logo: '/uploads/stack-icons/sentinelone.svg' },
      { name: 'Bitdefender', logo: '/uploads/stack-icons/bitdefender.svg' },
      { name: 'Trend Micro Apex One', logo: '/uploads/stack-icons/trend-micro-apex-one.svg' },
    ],
  },
  {
    id: 'network',
    title: 'Network & connectivity',
    text: 'Networking and connectivity platforms for firewalls, routers, switches, Wi-Fi, structured cabling, fibre connectivity, and secure business network access.',
    vendors: [
      { name: 'Cisco', logo: '/uploads/stack-icons/cisco.svg' },
      { name: 'Fortinet', logo: '/uploads/stack-icons/fortinet.svg' },
      { name: 'Sophos', logo: '/uploads/stack-icons/sophos.svg' },
      { name: 'Ubiquiti', logo: '/uploads/stack-icons/ubiquiti.svg' },
      { name: 'Dell', logo: '/uploads/stack-icons/dell.svg' },
      { name: 'WatchGuard', logo: '/uploads/stack-icons/watchguard.svg' },
    ],
  },
]
