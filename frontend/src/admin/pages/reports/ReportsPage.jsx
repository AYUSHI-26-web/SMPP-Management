import { motion } from 'framer-motion'
import Icon from '../../components/Icon'
import PageCard from '../../components/PageCard'
import { getReportServices } from '../../services/reportsService'

function ReportsPage() {
  return (
    <motion.div className="mt-7 grid max-w-4xl gap-4 xl:grid-cols-2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      {getReportServices().map((service) => (
        <PageCard key={service.name}>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-lg bg-red-50 text-red-700">
              <Icon type={service.icon} className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <p className="mt-1 text-xs text-slate-500">View and download your {service.name} delivery reports</p>
            </div>
          </div>
        </PageCard>
      ))}
    </motion.div>
  )
}

export default ReportsPage


