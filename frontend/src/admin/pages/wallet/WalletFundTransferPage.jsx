import { motion } from 'framer-motion'
import DataTable from '../../components/DataTable'
import StatusBadge from '../../components/StatusBadge'

function WalletFundTransferPage() {
  const wallets = [{ name: 'Zosto-UW-012', type: 'Prepaid', mode: 'UW', services: 'SMS', balance: 'Rs.99.98', status: 'Active' }]

  return (
    <motion.div className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <DataTable
        columns={['Wallet Name', 'Wallet Type', 'Wallet Mode', 'Services', 'Available Balance', 'Status']}
        rows={wallets}
        renderRow={(wallet) => (
          <tr key={wallet.name} className="border-b border-slate-100 bg-white text-slate-950 last:border-b-0">
            <td className="px-5 py-5">{wallet.name}</td>
            <td className="px-5 py-5 uppercase">{wallet.type}</td>
            <td className="px-5 py-5 uppercase">{wallet.mode}</td>
            <td className="px-5 py-5">{wallet.services}</td>
            <td className="px-5 py-5">{wallet.balance}</td>
            <td className="px-5 py-5">
              <StatusBadge status={wallet.status} />
            </td>
          </tr>
        )}
      />
    </motion.div>
  )
}

export default WalletFundTransferPage


