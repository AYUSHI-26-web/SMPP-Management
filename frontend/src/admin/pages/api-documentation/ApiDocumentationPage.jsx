import { motion } from 'framer-motion'
import PageCard from '../../components/PageCard'
import { getApiDocumentationCards } from '../../services/apiDocumentationService'

function ApiDocumentationPage() {
  return (
    <motion.div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      {getApiDocumentationCards().map((card) => (
        <PageCard key={card.label}>
          <p className="text-xs font-semibold text-slate-500">{card.label}</p>
          <p className="mt-3 text-xl font-semibold text-slate-950">{card.value}</p>
          <p className="mt-3 text-xs leading-5 text-slate-600">{card.detail}</p>
        </PageCard>
      ))}
    </motion.div>
  )
}

export default ApiDocumentationPage


