import { useParams } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import ApiDocumentationPage from './pages/api-documentation/ApiDocumentationPage'
import ControlCenterRouterPage from './pages/control-center/ControlCenterRouterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import RateCardPage from './pages/rate-card/RateCardPage'
import ReportsPage from './pages/reports/ReportsPage'
import ServicesPage from './pages/services/ServicesPage'
import SettingsPage from './pages/settings/SettingsPage'
import UsersPage from './pages/users/UsersPage'
import WalletFundTransferPage from './pages/wallet/WalletFundTransferPage'
import WalletUsagePage from './pages/wallet/WalletUsagePage'

const pageConfig = {
  dashboard: { title: 'Dashboard', section: 'Dashboard', component: DashboardPage },
  services: { title: 'Services', section: 'Services', component: ServicesPage },
  wallet: { title: 'Wallet', section: 'Wallet', component: WalletUsagePage },
  'wallet/fund-transfer': { title: 'Wallet Fund Transfer', section: 'Wallet', component: WalletFundTransferPage },
  'rate-card': { title: 'Rate Card', section: 'Rate Card', component: RateCardPage },
  reports: { title: 'Reports', section: 'Reports', component: ReportsPage },
  users: { title: 'Users', section: 'Users', component: UsersPage },
  settings: { title: 'Settings', section: 'Settings', component: SettingsPage },
  'api-&-documentation': { title: 'API & Documentation', section: 'API & Documentation', component: ApiDocumentationPage },
}

function AdminPanel() {
  const { walletId = 'Zosto-UW-012', service = 'dashboard', walletSubPage, controlPage, memberAction, memberId } = useParams()

  if (controlPage) {
    return (
      <AdminLayout activeSection="Control Center" walletId={walletId} title="Control Center">
        <ControlCenterRouterPage walletId={walletId} controlPage={controlPage} memberAction={memberAction} memberId={memberId} />
      </AdminLayout>
    )
  }

  const pageKey = walletSubPage ? `${service}/${walletSubPage}` : service
  const config = pageConfig[pageKey] || pageConfig.dashboard
  const Page = config.component

  return (
    <AdminLayout activeSection={config.section} walletId={walletId} title={config.title}>
      <Page walletId={walletId} />
    </AdminLayout>
  )
}

export default AdminPanel
