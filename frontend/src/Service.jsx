import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import telecomLogo from './assets/telecom.jpeg'
import ChangePasswordPage from './pages/customer/ChangePasswordPage'
import ControlCenterPage from './pages/customer/ControlCenterPage'
import ProfileDetailsPage from './pages/customer/ProfileDetailsPage'
import ProfileEditPage from './pages/customer/ProfileEditPage'

const navItems = ['Dashboard', 'Services', 'Wallet', 'Rate Card', 'Reports', 'Settings', 'Control Center', 'API & Documentation']
const demoPages = {
  Services: [
    { label: 'SMS Gateway', value: 'Active', detail: 'Transactional and promotional SMS routes are ready.' },
    { label: 'WhatsApp API', value: 'Pending', detail: 'Business verification demo status is pending.' },
  ],
  Wallet: [
    { label: 'Current Balance', value: 'Rs. 99.98', detail: 'Unified prepaid wallet balance.' },
    { label: 'Last Recharge', value: 'Rs. 500.00', detail: 'Demo recharge added on 22 May 2026.' },
    { label: 'Low Balance Alert', value: 'Rs. 50.00', detail: 'Alert will trigger below this amount.' },
  ],
  'Rate Card': [
    { label: 'Domestic SMS', value: 'Rs. 0.18', detail: 'Demo base rate per submitted SMS.' },
    { label: 'DLT Scrub', value: 'Rs. 0.02', detail: 'Sample compliance processing charge.' },
  ],
  Reports: [
    { label: 'Today Sent', value: '1', detail: 'Demo submitted traffic for today.' },
    { label: 'Delivery Rate', value: '100%', detail: 'All accepted demo messages delivered.' },
    { label: 'Failed Count', value: '0', detail: 'No failed demo messages in selected range.' },
  ],
  Settings: [
    { label: 'Sender ID', value: 'ZOSTO', detail: 'Default demo sender configured.' },
    { label: 'Timezone', value: 'Asia/Kolkata', detail: 'Reports and billing use this timezone.' },
    { label: 'Notifications', value: 'Enabled', detail: 'Wallet and delivery alerts are active.' },
  ],
  'Control Center': [
    { label: 'API Access', value: 'Allowed', detail: 'Demo account can access API services.' },
    { label: 'Route Priority', value: 'Standard', detail: 'Default routing priority is selected.' },
    { label: 'Account Status', value: 'Active', detail: 'Demo customer account is live.' },
  ],
  'API & Documentation': [
    { label: 'API Key', value: 'demo_****_012', detail: 'Masked demo key for frontend preview.' },
    { label: 'Webhook URL', value: 'Configured', detail: 'Delivery status callback endpoint is set.' },
    { label: 'Docs Version', value: 'v1.0', detail: 'SMS and wallet API examples are available.' },
  ],
}
const metrics = [
  { label: 'Submitted', value: '1', tone: 'cyan', icon: 'send', spark: 'M2 34 C10 22 17 35 25 22 S42 31 50 15 S68 20 78 10' },
  { label: 'Sent', value: '1', tone: 'purple', icon: 'paper', spark: 'M2 34 C11 30 16 39 24 27 S38 5 50 17 S62 39 78 25' },
  { label: 'Delivered', value: '1', tone: 'green', icon: 'double', spark: 'M2 35 C11 20 18 35 28 22 S43 4 55 18 S67 26 78 18' },
  { label: 'Failed', value: '0', tone: 'red', icon: 'x', spark: 'M2 30 C12 25 18 34 27 23 S42 31 51 24 S66 31 78 28' },
]
const serviceCards = [
  { name: 'SMS', description: 'Manage and view your SMS service accounts', icon: 'mail' },
]
const serviceAccounts = {
  SMS: [
    {
      name: 'AYUSHIDEM',
      connectionType: 'Transactional',
      chargingMode: 'Delivery',
      createdOn: '23/05/2026, 02:57:10 pm',
      billingStartDate: '31/05/2027, 02:57:10 pm',
      status: 'Active',
    },
  ],
}
const walletTransactions = [
  {
    date: '23/05/2026, 04:39:36 pm',
    serviceAccount: 'ayushidem',
    status: 'Debit',
    description: 'DEBIT CAMPAIGN sms req, campId:{7968821} batchId:{3982284}',
    transactionId: '198e71a6-8196-41ee-b9',
    amount: 'Rs.0.0170',
  },
  {
    date: '23/05/2026, 02:58:50 pm',
    serviceAccount: 'N/A',
    status: 'Credit',
    description: 'demo',
    transactionId: '7ab7b9a1-a6d2-4f8d-bb76c41212ac5a338227',
    amount: 'Rs.100.0000',
  },
]
const ratePlans = [
  { srNo: '2', planType: 'Unified', updatedOn: '23/05/2026, 04:47:45 pm', status: 'Partially Active' },
  { srNo: '1', planType: 'Expired', updatedOn: '23/05/2026, 04:47:45 pm', status: 'Inactive' },
  { srNo: '0', planType: 'Expired', updatedOn: '23/05/2026, 02:53:38 pm', status: 'Inactive' },
]

const liftMotion = {
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 320, damping: 22 },
}

function RunningBorder({ rounded = 'rounded-xl', color = 'via-red-500' }) {
  const line = `absolute bg-gradient-to-r from-transparent ${color} to-transparent opacity-80 blur-[0.25px]`

  return (
    <div className={`pointer-events-none absolute inset-0 ${rounded} overflow-hidden`}>
      <motion.span className={`${line} left-0 top-0 h-px w-1/3`} animate={{ x: ['-120%', '360%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
      <motion.span className={`${line} right-0 top-0 h-1/3 w-px rotate-90`} animate={{ y: ['-120%', '360%'] }} transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'linear' }} />
      <motion.span className={`${line} bottom-0 right-0 h-px w-1/3 rotate-180`} animate={{ x: ['120%', '-360%'] }} transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'linear' }} />
      <motion.span className={`${line} bottom-0 left-0 h-1/3 w-px -rotate-90`} animate={{ y: ['120%', '-360%'] }} transition={{ duration: 4, delay: 3, repeat: Infinity, ease: 'linear' }} />
      <div className={`absolute inset-0 ${rounded} ring-1 ring-red-100/80`} />
    </div>
  )
}

function Icon({ type, className = 'h-5 w-5' }) {
  const paths = {
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    headset: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h3v5H4z" />
        <path d="M17 14h3v5h-3z" />
        <path d="M20 19c0 2-2 3-5 3h-2" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    back: <path d="M19 12H5m6-6-6 6 6 6" />,
    copy: (
      <>
        <path d="M8 8h10v12H8z" />
        <path d="M6 16H4V4h10v2" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 12a8 8 0 0 1-14 5" />
        <path d="M4 12a8 8 0 0 1 14-5" />
        <path d="M18 3v4h-4" />
        <path d="M6 21v-4h4" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 8h16" />
        <path d="M5 5h14v16H5z" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    archive: (
      <>
        <path d="M6 3h12l2 4H4z" />
        <path d="M5 7h14v14H5z" />
        <path d="M9 12h6" />
      </>
    ),
    arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: (
      <>
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    filter: (
      <>
        <path d="M4 5h16l-6 7v5l-4 2v-7z" />
      </>
    ),
    plusCircle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </>
    ),
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    trend: (
      <>
        <path d="m4 16 5-5 4 4 7-8" />
        <path d="M15 7h5v5" />
      </>
    ),
    mail: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    chat: (
      <>
        <path d="M4 5h16v11H8l-4 4z" />
        <path d="M8 9h8" />
      </>
    ),
    send: <path d="m3 11 18-8-8 18-2-8z" />,
    paper: (
      <>
        <path d="m3 11 18-8-8 18-2-8z" />
        <path d="m11 13 5-5" />
      </>
    ),
    double: (
      <>
        <path d="m4 12 3 3 5-6" />
        <path d="m12 12 3 3 5-6" />
      </>
    ),
    x: (
      <>
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 7h16v11H4z" />
        <path d="M16 11h4v4h-4a2 2 0 0 1 0-4Z" />
      </>
    ),
    card: (
      <>
        <path d="M4 6h16v12H4z" />
        <path d="M4 10h16" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
    service: (
      <>
        <path d="m12 3 8 4-8 4-8-4z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 17 8 4 8-4" />
      </>
    ),
    reports: (
      <>
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-8" />
      </>
    ),
    settings: (
      <>
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="M4 12h2m12 0h2M12 4v2m0 12v2m-5.7-2.3 1.4-1.4m8.6-8.6 1.4-1.4m0 11.4-1.4-1.4M7.7 7.7 6.3 6.3" />
      </>
    ),
    code: (
      <>
        <path d="m9 18-6-6 6-6" />
        <path d="m15 6 6 6-6 6" />
      </>
    ),
    profile: (
      <>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    phone: (
      <>
        <path d="M7 4h10v16H7z" />
        <path d="M11 17h2" />
      </>
    ),
    building: (
      <>
        <path d="M4 21h16" />
        <path d="M6 21V5h12v16" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-5 7-11a7 7 0 1 0-14 0c0 6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
      </>
    ),
    image: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m4 15 4-4 4 4 3-3 5 5" />
        <circle cx="9" cy="9" r="1.5" />
      </>
    ),
    lock: (
      <>
        <path d="M7 10V8a5 5 0 0 1 10 0v2" />
        <path d="M6 10h12v10H6z" />
      </>
    ),
    signout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M14 5h5v14h-5" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-none stroke-current stroke-2`}>
      {paths[type]}
    </svg>
  )
}

function navIcon(item) {
  return {
    Dashboard: 'home',
    Services: 'service',
    Wallet: 'wallet',
    'Rate Card': 'card',
    Reports: 'reports',
    Settings: 'settings',
    'Control Center': 'shield',
    'API & Documentation': 'code',
  }[item]
}

function metricTone(tone) {
  return {
    cyan: 'bg-cyan-100 text-cyan-700',
    purple: 'bg-violet-100 text-violet-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-600',
  }[tone]
}

function sparkTone(tone) {
  return {
    cyan: 'stroke-blue-600',
    purple: 'stroke-violet-700',
    green: 'stroke-green-600',
    red: 'stroke-rose-500',
  }[tone]
}

function CustomerDashboard() {
  const navigate = useNavigate()
  const { walletId = 'Zosto-UW-012', service = 'dashboard', serviceType, controlPage, memberAction, memberId } = useParams()
  const normalizedServiceType = serviceType?.toUpperCase()
  const isServiceDetails = Boolean(serviceAccounts[normalizedServiceType])
  const routeSection = {
    dashboard: 'Dashboard',
    services: 'Services',
    wallet: 'Wallet',
    'rate-card': 'Rate Card',
    reports: 'Reports',
    settings: 'Settings',
    'control-center': 'Control Center',
    'api-&-documentation': 'API & Documentation',
  }[controlPage ? 'control-center' : service] || 'Dashboard'
  const [activeSection, setActiveSection] = useState(isServiceDetails ? 'Services' : routeSection)
  const [walletPage, setWalletPage] = useState('usage')
  const [rateCardView, setRateCardView] = useState('list')
  const [profileView, setProfileView] = useState('details')
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const isDashboard = activeSection === 'Dashboard'
  const isServices = activeSection === 'Services'
  const isWallet = activeSection === 'Wallet'
  const isRateCard = activeSection === 'Rate Card'
  const isReports = activeSection === 'Reports'
  const isControlCenter = activeSection === 'Control Center'
  const isProfilePage = activeSection === 'My Profile'
  const selectedService = isServiceDetails ? normalizedServiceType : null
  const selectedAccounts = selectedService ? serviceAccounts[selectedService] : []
  const activeDetails = demoPages[activeSection] || []
  const openProfileEdit = () => {
    setActiveSection('My Profile')
    setProfileView('edit')
  }

  return (
    <main className="relative flex min-h-screen gap-7 bg-gradient-to-br from-white via-slate-50 to-red-50/20 p-3 text-slate-950 sm:p-4">
      <span className="premium-particle right-[8%] top-16 h-20 w-20" />
      <span className="premium-particle bottom-20 left-[34%] h-12 w-12 [animation-delay:1.8s]" />
      <span className="premium-particle right-[32%] top-[46%] h-8 w-8 [animation-delay:3s]" />
      <aside className="fixed bottom-3 left-3 top-3 z-20 hidden w-[290px] shrink-0 overflow-y-auto rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-200/80 sm:left-4 sm:top-4 sm:bottom-4 lg:flex lg:flex-col">
        <motion.div className="border-b border-slate-200 pb-6" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
          <img src={telecomLogo} alt="Zosto Telecom" className="h-16 w-48 object-contain" />
        </motion.div>

        <div className="relative mt-6">
          <motion.button
            className="flex w-full items-center gap-3 rounded-xl bg-white text-left transition hover:bg-red-50/40"
            type="button"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileOpen((current) => !current)}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          >
            <span className="premium-pulse-ring relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red-50 text-base font-medium text-red-700 ring-1 ring-red-100">
              AS
              <span className="premium-status absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">Ayushi Srivastava</span>
              <span className="block truncate text-xs text-slate-500">Zosto Telecom Admin</span>
              <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-medium text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Online
              </span>
            </span>
            <span className={`text-slate-700 transition ${isProfileOpen ? 'rotate-180' : ''}`}>
              <Icon type="chevron" className="h-4 w-4" />
            </span>
          </motion.button>

          {isProfileOpen && (
            <motion.div
              className="absolute left-6 top-[74px] z-30 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white text-xs shadow-2xl shadow-slate-400/30"
              role="menu"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              <div className="bg-slate-200 px-4 py-3 text-slate-800">
                This account is managed by <span className="font-medium">Ayushi</span>
              </div>
              {[
                ['profile', 'My Profile'],
                ['lock', 'Change Password'],
              ].map(([icon, label]) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-700 transition hover:bg-slate-50"
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    if (label === 'My Profile') {
                      setActiveSection('My Profile')
                      setProfileView('details')
                      setIsProfileOpen(false)
                    } else if (label === 'Change Password') {
                      setActiveSection('My Profile')
                      setProfileView('change-password')
                      setIsProfileOpen(false)
                    }
                  }}
                >
                  <span className="text-red-700">
                    <Icon type={icon} className="h-4 w-4" />
                  </span>
                  {label}
                </button>
              ))}
              <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-700 transition hover:bg-slate-50" type="button" role="menuitem" onClick={() => navigate('/')}>
                <span className="text-red-700">
                  <Icon type="signout" className="h-4 w-4" />
                </span>
                Sign out
              </button>
            </motion.div>
          )}
        </div>

        <nav className="mt-8 space-y-3">
          {navItems.map((item) => (
            <div key={item}>
              <motion.button
                onClick={() => {
                  setActiveSection(item)
                  if (item !== 'Rate Card') {
                    setRateCardView('list')
                  }
                  navigate(item === 'Control Center' ? `/customer/${walletId}/control-center/team-management` : `/customer/${walletId}/dashboard/${item.toLowerCase().replaceAll(' ', '-')}`)
                }}
                className={`premium-ripple group relative flex w-full items-center gap-4 rounded-lg px-5 py-4 text-left text-sm font-medium transition duration-300 ${
                  item === activeSection ? 'premium-active-gradient bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-xl shadow-red-500/25' : 'text-slate-700 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:shadow-red-100/70'
                }`}
                type="button"
                whileHover={{ x: 4, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              >
                <span className="transition duration-300 group-hover:translate-x-1 group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.45)]">
                  <Icon type={navIcon(item)} className="h-5 w-5" />
                </span>
                <span className="flex-1">{item}</span>
                {item === 'Wallet' && <Icon type="chevron" className={`h-4 w-4 transition ${isWallet ? 'rotate-180' : ''}`} />}
              </motion.button>
              {item === 'Wallet' && isWallet && (
                <div className="ml-10 mt-2 space-y-2">
                  <button
                    className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      walletPage === 'usage' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
                    }`}
                    type="button"
                    onClick={() => setWalletPage('usage')}
                  >
                    <span className="h-px w-5 bg-current" />
                    Wallet Usage
                  </button>
                  <button
                    className={`flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                      walletPage === 'fund-transfer' ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
                    }`}
                    type="button"
                    onClick={() => setWalletPage('fund-transfer')}
                  >
                    <span className="h-px w-5 bg-current" />
                    Wallet Fund Transfer
                  </button>
                </div>
              )}
            </div>
          ))}
        </nav>

      </aside>

      <section className="relative z-10 min-w-0 flex-1 px-0 py-2 sm:px-2 lg:ml-[318px]">
        <motion.div className={`${(isWallet && walletPage === 'fund-transfer') || (isRateCard && rateCardView === 'details') || isProfilePage || isControlCenter ? 'hidden' : 'grid'} gap-5 xl:grid-cols-[350px_minmax(0,1fr)]`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <motion.div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/70" {...liftMotion}>
            <div className="flex items-center gap-3">
              <motion.button
                className="grid h-12 w-12 place-items-center rounded-lg bg-slate-100 text-slate-900 transition hover:bg-red-100 hover:text-red-700"
                onClick={() => navigate('/select-wallet')}
                type="button"
                aria-label="Back to wallet selection"
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon type="back" className="h-4 w-4" />
              </motion.button>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-600">Select Wallet</p>
                <h1 className="truncate text-sm font-medium uppercase">{walletId}</h1>
                <p className="mt-1 flex items-center gap-2 text-[10px] font-medium text-slate-600">
                  SV Customer ID: SV1090103738
                  <Icon type="copy" className="h-3 w-3" />
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5 text-slate-950 sm:grid-cols-3">
            {[
              ['wallet', 'Available Balance', '₹99.98', 'from-rose-50 via-red-50 to-pink-100', 'from-rose-500 to-red-600'],
              ['card', 'Wallet Type', 'Prepaid', 'border-l-violet-600 bg-violet-50/30', 'bg-violet-50 text-violet-700'],
              ['shield', 'Wallet Mode', 'Unified', 'border-l-blue-500 bg-sky-50/30', 'bg-sky-50 text-blue-600'],
            ].map(([icon, label, value, tileTone, iconTone], index) => (
              <motion.div key={label} className={`flex min-h-[124px] items-center gap-5 rounded-xl border border-slate-200 border-l-4 ${index === 0 ? 'border-l-red-500 bg-red-50/40' : tileTone} bg-white p-6 shadow-xl shadow-slate-200/70`} {...liftMotion} transition={{ ...liftMotion.transition, delay: index * 0.04 }}>
                <motion.span className={`grid h-14 w-14 shrink-0 place-items-center rounded-lg ${index === 0 ? 'bg-red-50 text-red-600' : iconTone} shadow-lg shadow-slate-200`} whileHover={{ rotate: -8, scale: 1.08 }}>
                  <Icon type={icon} className="h-7 w-7" />
                </motion.span>
                <span>
                  <span className="block text-xs font-medium text-slate-600">{label}</span>
                  <span className="mt-2 block text-xl font-medium">{index === 0 ? 'Rs.99.98' : value}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {!isRateCard && !isProfilePage && (
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {isServiceDetails ? null : isWallet ? (
            <div>
              <h2 className="text-2xl font-medium">{walletPage === 'fund-transfer' ? 'My Wallets' : 'Wallet Usage'}</h2>
            </div>
          ) : isControlCenter ? (
            <div>
              <h2 className="text-2xl font-medium">Control Center</h2>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-600">
                <Icon type="trend" className="h-6 w-6" />
              </span>
              <h2 className="text-lg font-medium">{isDashboard ? 'Performance Overview' : activeSection}</h2>
            </div>
          )}
          {isWallet && walletPage === 'usage' ? (
            <motion.button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-red-600/20" type="button" {...liftMotion}>
              <Icon type="archive" className="h-5 w-5" />
              Archive Reports
            </motion.button>
          ) : isWallet && walletPage === 'fund-transfer' ? (
            <motion.button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-red-600/20" type="button" {...liftMotion}>
              <Icon type="external" className="h-5 w-5" />
              Wallet Fund Transfer
            </motion.button>
          ) : !isServices && !isServiceDetails && !isReports && !isControlCenter && (
            <div className="flex flex-wrap gap-3">
              <motion.button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-700 shadow-sm" type="button" {...liftMotion}>
                <Icon type="refresh" className="h-4 w-4" />
                Refresh
              </motion.button>
              <motion.button className="inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 text-xs font-medium shadow-sm" type="button" {...liftMotion}>
                <Icon type="calendar" className="h-4 w-4" />
                May 19, 2026 - May 25, 2026
                <Icon type="chevron" className="h-4 w-4" />
              </motion.button>
              <motion.button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-xs font-medium text-white shadow-lg shadow-red-600/20" type="button" {...liftMotion}>
                <Icon type="download" className="h-4 w-4" />
                Export Data
              </motion.button>
            </div>
          )}
        </div>
        )}

        {isProfilePage && profileView === 'change-password' ? (
          <ChangePasswordPage Icon={Icon} onCancel={() => setProfileView('details')} onUpdate={() => setProfileView('details')} />
        ) : isProfilePage && profileView === 'edit' ? (
          <ProfileEditPage Icon={Icon} onCancel={() => setProfileView('details')} onUpdate={() => setProfileView('details')} />
        ) : isProfilePage ? (
          <ProfileDetailsPage Icon={Icon} liftMotion={liftMotion} onEdit={openProfileEdit} />
        ) : isServiceDetails ? (
          <motion.section className="mt-8" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <button className="text-base font-medium text-red-600 underline-offset-4 hover:underline" type="button" onClick={() => navigate(`/customer/${walletId}/dashboard/services`)}>
                  Services
                </button>
                <span className="text-xl text-slate-400">/</span>
                <span className="text-base font-medium text-slate-950">{selectedService}</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex h-14 min-w-80 items-center gap-4 rounded-lg border border-slate-200 bg-white px-5 text-sm text-slate-500 shadow-sm">
                  <Icon type="search" className="h-6 w-6 text-slate-950" />
                  <input className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-500" placeholder="Search by account name..." type="search" />
                </label>
                <motion.button className="relative inline-flex h-14 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-7 text-sm font-medium text-slate-900 shadow-sm" type="button" {...liftMotion}>
                  <Icon type="filter" className="h-5 w-5" />
                  Filters
                  <span className="absolute right-5 top-2 h-2.5 w-2.5 rounded-full bg-red-600" />
                </motion.button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
              <table className="w-full min-w-[1050px] border-separate border-spacing-y-0 text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/90 text-[11px] font-medium text-slate-950">
                    <th className="rounded-l-lg px-5 py-5">Service Account Name</th>
                    <th className="px-5 py-4">Connection Type</th>
                    <th className="px-5 py-4">Charging Mode</th>
                    <th className="px-5 py-4">Created On</th>
                    <th className="px-5 py-4">Billing Start Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="rounded-r-lg px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAccounts.map((account) => (
                    <tr key={account.name} className="bg-white text-slate-950 shadow-sm">
                      <td className="rounded-l-lg border-y border-l border-slate-100 px-5 py-8">
                        <div className="flex items-center gap-5">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-red-50 text-base font-medium text-red-600">A</span>
                          <span>
                            <span className="block text-sm font-medium">{account.name}</span>
                            <span className="mt-1.5 block text-[11px] font-medium text-slate-500">{selectedService} Service Account</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <span className="rounded-md bg-slate-950 px-3 py-2 text-[10px] font-medium text-white">{account.connectionType}</span>
                      </td>
                      <td className="px-5 py-5 text-sm">{account.chargingMode}</td>
                      <td className="whitespace-pre-line px-5 py-5 text-sm leading-6">{account.createdOn.replace(', ', '\n')}</td>
                      <td className="whitespace-pre-line px-5 py-5 text-sm leading-6">{account.billingStartDate.replace(', ', '\n')}</td>
                      <td className="px-5 py-5">
                        <span className="inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-xs font-medium text-green-800">
                          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                          {account.status}
                        </span>
                      </td>
                      <td className="rounded-r-lg border-y border-r border-slate-100 px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <motion.button className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:bg-red-50 hover:text-red-700" type="button" aria-label={`View ${account.name}`} {...liftMotion}>
                            <Icon type="eye" className="h-5 w-5" />
                          </motion.button>
                          <motion.button className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm transition hover:bg-red-50 hover:text-red-700" type="button" aria-label={`Open ${account.name}`} {...liftMotion}>
                            <Icon type="external" className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        ) : isRateCard && rateCardView === 'details' ? (
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
            <div className="grid gap-5 xl:grid-cols-[500px_minmax(0,1fr)]">
              <motion.div className="relative overflow-hidden rounded-lg bg-white p-4" {...liftMotion}>
                <div className="flex items-center gap-3">
                  <motion.button
                    className="grid h-12 w-12 place-items-center rounded-lg bg-slate-200 text-slate-900 transition hover:bg-red-100 hover:text-red-700"
                    onClick={() => navigate('/select-wallet')}
                    type="button"
                    aria-label="Back to wallet selection"
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon type="back" className="h-4 w-4" />
                  </motion.button>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-600">Select Wallet</p>
                    <h1 className="truncate text-base font-medium uppercase">{walletId}</h1>
                    <p className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-600">
                      SV Customer ID: SV1090103738
                      <Icon type="copy" className="h-3 w-3" />
                    </p>
                  </div>
                  <Icon type="chevron" className="ml-auto h-5 w-5" />
                </div>
              </motion.div>

              <div className="grid gap-0 overflow-hidden rounded-lg bg-slate-950 text-white sm:grid-cols-3">
                {[
                  ['Available Wallet Balance', 'Rs.99.98'],
                  ['Wallet Type', 'Prepaid'],
                  ['Wallet Mode', 'Unified'],
                ].map(([label, value]) => (
                  <div key={label} className="px-5 py-5">
                    <p className="text-xs font-medium">{label}</p>
                    <p className="mt-2 text-lg font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3 text-sm">
                <button className="text-red-700 underline-offset-4 hover:underline" type="button" onClick={() => setRateCardView('list')}>
                  Rate Cards
                </button>
                <span className="text-slate-500">/</span>
                <span className="text-lg font-medium text-slate-950">Version 2</span>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-slate-100 p-6">
              <div className="flex items-center justify-between border-b border-slate-300 pb-5">
                <h2 className="text-lg font-medium">SMS</h2>
                <span className="inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-xs font-medium text-green-800">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  Active
                </span>
              </div>

              <div className="mt-5 rounded-lg bg-white p-6">
                <h3 className="text-lg font-medium text-purple-700">One Time Billing</h3>
                <div className="mt-4 grid gap-6 border-t border-slate-200 pt-5 sm:grid-cols-3">
                  {[
                    ['OTC', 'Rs.0'],
                    ['Advance Charges', 'Rs.0'],
                    ['Security Deposit', 'Rs.0'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-sm font-medium text-slate-600">{label} ⓘ</p>
                      <p className="mt-1 text-lg font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-white p-6">
                <h3 className="text-lg font-medium text-purple-700">Transactional Billing ⓘ</h3>
                <div className="mt-4 grid gap-6 border-t border-slate-200 pt-5 sm:grid-cols-2 xl:grid-cols-6">
                  {[
                    ['Charging Mode', 'delivery'],
                    ['DLT Rate', 'Rs.0.007'],
                    ['Other Charge Rate', 'Rs.0'],
                    ['OTP Unit Price', 'Rs.0.01'],
                    ['Promo Unit Price', 'Rs.0.01'],
                    ['Trans Unit Price', 'Rs.0.01'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-sm font-medium text-slate-600">{label} ⓘ</p>
                      <p className="mt-1 text-lg font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        ) : isRateCard ? (
          <motion.section className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full min-w-[900px] border-separate border-spacing-y-1 text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="rounded-l-lg px-5 py-5 font-medium">Sr.No</th>
                    <th className="px-5 py-5 font-medium">Plan Type</th>
                    <th className="px-5 py-5 font-medium">Updated On</th>
                    <th className="px-5 py-5 font-medium">Status</th>
                    <th className="rounded-r-lg px-5 py-5 text-center font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ratePlans.map((plan) => (
                    <tr key={`${plan.srNo}-${plan.updatedOn}`} className="bg-slate-50 text-slate-950">
                      <td className="rounded-l-lg px-5 py-6">{plan.srNo}</td>
                      <td className="px-5 py-6">{plan.planType}</td>
                      <td className="px-5 py-6">{plan.updatedOn}</td>
                      <td className="px-5 py-6">
                        <span className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium ${plan.status === 'Partially Active' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-800'}`}>
                          <span className={`h-2.5 w-2.5 rounded-full ${plan.status === 'Partially Active' ? 'bg-amber-500' : 'bg-red-500'}`} />
                          {plan.status}
                        </span>
                      </td>
                      <td className="rounded-r-lg px-5 py-6 text-center">
                        <motion.button className="mx-auto grid h-11 w-11 place-items-center rounded-lg border border-slate-900 bg-white text-slate-950 transition hover:bg-red-50 hover:text-red-700" type="button" aria-label={`View plan ${plan.srNo}`} onClick={() => setRateCardView('details')} {...liftMotion}>
                          <Icon type="eye" className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        ) : isWallet && walletPage === 'fund-transfer' ? (
          <motion.section className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full min-w-[980px] border-separate border-spacing-y-1 text-left text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="rounded-l-lg px-5 py-5 font-medium">Wallet Name</th>
                    <th className="px-5 py-5 font-medium">Wallet Type</th>
                    <th className="px-5 py-5 font-medium">Wallet Mode</th>
                    <th className="px-5 py-5 font-medium">Services</th>
                    <th className="px-5 py-5 font-medium">Available Balance</th>
                    <th className="rounded-r-lg px-5 py-5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-slate-50 text-slate-950">
                    <td className="rounded-l-lg px-5 py-6">Zosto-UW-012</td>
                    <td className="px-5 py-6 uppercase">Prepaid</td>
                    <td className="px-5 py-6 uppercase">UW</td>
                    <td className="px-5 py-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-md bg-violet-100 px-3 py-2 text-xs font-medium text-violet-700">SMS</span>
                      </div>
                    </td>
                    <td className="px-5 py-6">Rs.99.98</td>
                    <td className="rounded-r-lg px-5 py-6">
                      <span className="inline-flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-xs font-medium text-green-800">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>
        ) : isWallet ? (
          <motion.section className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
            <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="text-xs font-medium text-slate-950">Last 100</span>
                <button className="flex h-10 min-w-56 items-center justify-between border border-slate-300 bg-white px-3 text-xs font-medium text-slate-600" type="button">
                  Select Transaction Type
                  <Icon type="chevron" className="h-4 w-4 text-slate-500" />
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-base text-slate-950">
                <p>
                  <span className="text-slate-700">Total Credit</span>
                  <span className="ml-3 font-medium">Rs.100.0000</span>
                </p>
                <p>
                  <span className="text-slate-700">Total Debit</span>
                  <span className="ml-3 font-medium">Rs.0.0170</span>
                </p>
              </div>
            </div>

            <div className="mt-5 max-w-6xl overflow-x-auto rounded-lg border border-slate-100 bg-white shadow-xl shadow-slate-200/60">
              <table className="w-full min-w-[980px] border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-950">
                    <th className="border-r border-slate-200 px-3 py-3 font-medium">Date</th>
                    <th className="border-r border-slate-200 px-3 py-3 font-medium">Service Account</th>
                    <th className="border-r border-slate-200 px-3 py-3 font-medium">Status</th>
                    <th className="border-r border-slate-200 px-3 py-3 font-medium">Description</th>
                    <th className="border-r border-slate-200 px-3 py-3 font-medium">Transaction ID</th>
                    <th className="px-3 py-3 text-center font-medium">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {walletTransactions.map((transaction) => (
                    <tr key={transaction.transactionId} className="border-b border-slate-100 bg-white text-slate-950 last:border-b-0">
                      <td className="border-r border-slate-200 px-3 py-3 align-top">{transaction.date}</td>
                      <td className="border-r border-slate-200 px-3 py-3 align-top">{transaction.serviceAccount}</td>
                      <td className="border-r border-slate-200 px-3 py-3 align-top">
                        <span className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11px] font-medium ${transaction.status === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          <span className={`h-2 w-2 rounded-full ${transaction.status === 'Credit' ? 'bg-green-500' : 'bg-red-500'}`} />
                          {transaction.status}
                        </span>
                      </td>
                      <td className="max-w-xs border-r border-slate-200 px-3 py-3 align-top leading-5">{transaction.description}</td>
                      <td className="max-w-60 border-r border-slate-200 px-3 py-3 align-top leading-5">{transaction.transactionId}</td>
                      <td className="px-3 py-3 text-center align-top">{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        ) : isDashboard ? (
          <>
            <div className="mt-6 flex rounded-lg border border-red-100 bg-red-50/70 p-1 shadow-inner shadow-red-100/50">
              <motion.button className="inline-flex items-center gap-2 border-b-2 border-red-600 px-6 py-3 text-xs font-medium text-red-700" type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Icon type="mail" className="h-5 w-5" />
                SMS
              </motion.button>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.06 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 42px rgba(148, 163, 184, 0.32)' }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div className={`grid h-16 w-16 place-items-center rounded-full ${metricTone(metric.tone)}`} whileHover={{ rotate: 8, scale: 1.08 }}>
                    <Icon type={metric.icon} className="h-8 w-8" />
                  </motion.div>
                  <p className="mt-5 text-xl font-medium">{metric.value}</p>
                  <p className="mt-1 text-xs text-slate-600">{metric.label}</p>
                  <motion.svg viewBox="0 0 80 44" aria-hidden="true" className="absolute bottom-6 right-5 h-12 w-24" whileHover={{ scale: 1.08, x: 3 }}>
                    <path d={metric.spark} className={`${sparkTone(metric.tone)} fill-none stroke-[2.5]`} strokeLinecap="round" />
                  </motion.svg>
                </motion.article>
              ))}
            </div>

            <motion.section className="mt-7 grid min-h-56 place-items-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-200/50" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36, delay: 0.18 }} whileHover={{ y: -4 }}>
              <div>
                <motion.span className="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-red-50 text-red-600" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
                  <Icon type="trend" className="h-8 w-8" />
                </motion.span>
                <h3 className="mt-6 text-sm font-medium">Detailed analytics and trends will appear here.</h3>
                <p className="mt-3 text-xs text-slate-500">Use the filters above to customize your view.</p>
              </div>
            </motion.section>
          </>
        ) : isServices ? (
          <div className="mt-6 grid max-w-4xl gap-4 xl:grid-cols-2">
            {serviceCards.map((service, index) => (
              <motion.article
                key={service.name}
                className="relative min-h-[230px] overflow-hidden rounded-xl border border-red-100 bg-white p-5 shadow-lg shadow-slate-200/60"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: index * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 22px 46px rgba(148, 163, 184, 0.32)' }}
                whileTap={{ scale: 0.99 }}
              >
                <RunningBorder />
                <svg viewBox="0 0 120 90" aria-hidden="true" className="pointer-events-none absolute right-5 top-5 h-16 w-24 text-red-200">
                  <path d="M35 30h48v42H35z" className="fill-red-50 stroke-current stroke-2" />
                  <path d="m35 33 24 20 24-20" className="fill-none stroke-current stroke-2" />
                  <path d="M73 14h28v24H73z" className="fill-red-50 stroke-current stroke-2" />
                  <path d="M80 24h14M80 30h8" className="fill-none stroke-current stroke-2" />
                  <path d="M22 52h23M22 60h14" className="fill-none stroke-current stroke-2" />
                  <circle cx="28" cy="24" r="5" className="fill-red-100" />
                  <circle cx="98" cy="55" r="4" className="fill-red-100" />
                </svg>
                <div className="relative flex items-center gap-4">
                  <motion.span className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-700 ring-1 ring-red-100" whileHover={{ rotate: -8, scale: 1.08 }}>
                    <Icon type={service.icon} className="h-6 w-6" />
                  </motion.span>
                  <div>
                    <h3 className="text-base font-medium">{service.name}</h3>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-700">
                      Active
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">Available Service Accounts</p>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-red-600 text-[10px] font-medium text-white shadow-md shadow-red-200">1</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-slate-600">{service.description}</p>
                  <motion.button
                    className="mt-4 flex w-full items-center justify-between rounded-lg bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                    type="button"
                    onClick={() => navigate(`/customer/${walletId}/services/${service.name}`)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                    <Icon type="arrowRight" className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : isReports ? (
          <div className="mt-6 grid max-w-4xl gap-4 xl:grid-cols-2">
            {serviceCards.map((service, index) => (
              <motion.article
                key={`report-${service.name}`}
                className="relative min-h-[230px] overflow-hidden rounded-xl border border-red-100 bg-white p-5 shadow-lg shadow-slate-200/60"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: index * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 22px 46px rgba(148, 163, 184, 0.32)' }}
                whileTap={{ scale: 0.99 }}
              >
                <RunningBorder />
                <svg viewBox="0 0 120 90" aria-hidden="true" className="pointer-events-none absolute right-5 top-5 h-16 w-24 text-red-200">
                  <path d="M24 66h72" className="fill-none stroke-current stroke-2" />
                  <path d="M34 60V38" className="fill-none stroke-current stroke-4" />
                  <path d="M54 60V26" className="fill-none stroke-current stroke-4" />
                  <path d="M74 60V44" className="fill-none stroke-current stroke-4" />
                  <path d="M30 28h52" className="fill-none stroke-current stroke-2" />
                  <circle cx="92" cy="28" r="5" className="fill-red-100" />
                  <circle cx="24" cy="42" r="4" className="fill-red-100" />
                </svg>
                <div className="relative flex items-center gap-4">
                  <motion.span className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-700 ring-1 ring-red-100" whileHover={{ rotate: -8, scale: 1.08 }}>
                    <Icon type={service.icon} className="h-6 w-6" />
                  </motion.span>
                  <div>
                    <h3 className="text-base font-medium">{service.name}</h3>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-700">
                      Active
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">Available Reports</p>
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-red-600 text-[10px] font-medium text-white shadow-md shadow-red-200">1</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-slate-600">View and download your {service.name} delivery reports</p>
                  <motion.button
                    className="mt-4 flex w-full items-center justify-between rounded-lg bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                    type="button"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Reports
                    <Icon type="arrowRight" className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : isControlCenter ? (
          <ControlCenterPage Icon={Icon} liftMotion={liftMotion} walletId={walletId} controlPage={controlPage} memberAction={memberAction} memberId={memberId} />
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {activeDetails.map((detail, index) => (
              <motion.article key={detail.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: index * 0.05 }} whileHover={{ y: -5 }}>
                <p className="text-xs font-medium text-slate-500">{detail.label}</p>
                <p className="mt-3 text-xl font-medium text-slate-950">{detail.value}</p>
                <p className="mt-3 text-xs leading-5 text-slate-600">{detail.detail}</p>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default CustomerDashboard


