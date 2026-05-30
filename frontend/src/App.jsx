import { Navigate, Route, Routes } from 'react-router-dom'
import CustomerDashboardPage from './pages/CustomerDashboardPage'
import LoginPage from './pages/LoginPage'
import WalletSelectPage from './pages/WalletSelectPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/select-wallet" element={<WalletSelectPage />} />
      <Route path="/customer/:walletId/dashboard/:service" element={<CustomerDashboardPage />} />
      <Route path="/customer/:walletId/control-center/:controlPage" element={<CustomerDashboardPage />} />
      <Route path="/customer/:walletId/services/:serviceType" element={<CustomerDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
