import { motion } from 'framer-motion'
import DataTable from '../../components/DataTable'
import StatusBadge from '../../components/StatusBadge'
import { getRatePlans } from '../../services/rateCardService'

function RateCardPage() {
  return (
    <motion.div className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <DataTable
        columns={['Sr.No', 'Plan Type', 'Updated On', 'Status']}
        rows={getRatePlans()}
        renderRow={(plan) => (
          <tr key={`${plan.srNo}-${plan.status}`} className="border-b border-slate-100 bg-white text-slate-950 last:border-b-0">
            <td className="px-5 py-5">{plan.srNo}</td>
            <td className="px-5 py-5">{plan.planType}</td>
            <td className="px-5 py-5">{plan.updatedOn}</td>
            <td className="px-5 py-5">
              <StatusBadge status={plan.status} />
            </td>
          </tr>
        )}
      />
    </motion.div>
  )
}

export default RateCardPage


