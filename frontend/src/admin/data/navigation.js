export const navItems = [
  { label: 'Dashboard', route: 'dashboard', icon: 'home' },
  { label: 'Services', route: 'services', icon: 'service' },
  {
    label: 'Wallet',
    route: 'wallet',
    icon: 'wallet',
    children: [
      { label: 'Wallet Usage', route: 'wallet' },
      { label: 'Wallet Fund Transfer', route: 'wallet/fund-transfer' },
    ],
  },
  { label: 'Rate Card', route: 'rate-card', icon: 'card' },
  { label: 'Reports', route: 'reports', icon: 'reports' },
  { label: 'Users', route: 'users', icon: 'profile' },
  { label: 'Settings', route: 'settings', icon: 'settings' },
  { label: 'Control Center', route: 'control-center/team-management', icon: 'shield' },
  { label: 'API & Documentation', route: 'api-&-documentation', icon: 'code' },
]
