import { motion } from 'framer-motion'

function PageCard({ children, className = '' }) {
  return (
    <motion.section
      className={`animated-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-red-100 sm:p-6 ${className}`}
      whileHover={{ y: -4, boxShadow: '0 18px 34px rgba(148, 163, 184, 0.22)' }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      {children}
    </motion.section>
  )
}

export default PageCard
