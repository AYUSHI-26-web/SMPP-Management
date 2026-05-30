import { motion } from 'framer-motion'
import DataTable from '../../components/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { getWalletTransactions } from '../../services/walletService'

function WalletUsagePage() {
  const transactions = getWalletTransactions()

  return (
    <motion.div className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <DataTable
        columns={['Date', 'Service Account', 'Status', 'Description', 'Transaction ID', 'Amount (INR)']}
        rows={transactions}
        minWidth="min-w-[980px]"
        renderRow={(transaction) => (
          <tr key={transaction.transactionId} className="border-b border-slate-100 bg-white text-slate-950 last:border-b-0">
            <td className="px-5 py-4 align-top">{transaction.date}</td>
            <td className="px-5 py-4 align-top">{transaction.serviceAccount}</td>
            <td className="px-5 py-4 align-top">
              <StatusBadge status={transaction.status} />
            </td>
            <td className="max-w-xs px-5 py-4 align-top leading-5">{transaction.description}</td>
            <td className="px-5 py-4 align-top">{transaction.transactionId}</td>
            <td className="px-5 py-4 align-top">{transaction.amount}</td>
          </tr>
        )}
      />
    </motion.div>
  )
}

export default WalletUsagePage


