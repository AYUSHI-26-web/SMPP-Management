import { motion } from 'framer-motion'
import PageCard from '../../components/PageCard'
import { getSettingsCards } from '../../services/settingsService'

function SettingsPage() {
  return (
    <motion.div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      {getSettingsCards().map((setting) => (
        <PageCard key={setting.label}>
          <p className="text-xs font-semibold text-slate-500">{setting.label}</p>
          <p className="mt-3 text-xl font-semibold text-slate-950">{setting.value}</p>
          <p className="mt-3 text-xs leading-5 text-slate-600">{setting.detail}</p>
        </PageCard>
      ))}
    </motion.div>
  )
}

export default SettingsPage


