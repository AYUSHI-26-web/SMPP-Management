import { motion } from 'framer-motion'
import Icon from '../../components/Icon'
import PageCard from '../../components/PageCard'
import { getDashboardMetrics } from '../../services/dashboardService'

const toneClass = {
  cyan: 'bg-cyan-100 text-cyan-700',
  purple: 'bg-violet-100 text-violet-700',
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-600',
}

function DashboardPage() {
  return (
    <motion.div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      {getDashboardMetrics().map((metric) => (
        <PageCard key={metric.label}>
          <span className={`grid h-14 w-14 place-items-center rounded-lg ${toneClass[metric.tone]}`}>
            <Icon type={metric.icon} className="h-7 w-7" />
          </span>
          <p className="mt-5 text-2xl font-semibold">{metric.value}</p>
          <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
        </PageCard>
      ))}
    </motion.div>
  )
}

export default DashboardPage


