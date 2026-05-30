import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage'
import LoginPage from './pages/user/LoginPage'
import WalletSelectPage from './pages/user/WalletSelectPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/select-wallet" element={<WalletSelectPage />} />
      <Route path="/admin/session-logs" element={<AdminDashboardPage />} />
      <Route path="/admin" element={<Navigate to="/admin/session-logs" replace />} />
      <Route path="/customer/:walletId/dashboard/:service" element={<CustomerDashboardPage />} />
      <Route path="/customer/:walletId/control-center/:controlPage/:memberAction/:memberId" element={<CustomerDashboardPage />} />
      <Route path="/customer/:walletId/control-center/:controlPage/:memberAction" element={<CustomerDashboardPage />} />
      <Route path="/customer/:walletId/control-center/:controlPage" element={<CustomerDashboardPage />} />
      <Route path="/customer/:walletId/services/:serviceType" element={<CustomerDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
