import { motion } from 'framer-motion'
import Sidebar from './Sidebar'

function AdminLayout({ activeSection, walletId, title = 'Control Center', children }) {
  return (
    <main className="relative flex min-h-screen gap-7 bg-gradient-to-br from-white via-slate-50 to-red-50/20 p-3 text-slate-950 sm:p-4">
      <span className="premium-particle right-[8%] top-16 h-20 w-20" />
      <span className="premium-particle bottom-20 left-[34%] h-12 w-12 [animation-delay:1.8s]" />
      <span className="premium-particle right-[30%] top-[42%] h-8 w-8 [animation-delay:3s]" />
      <Sidebar activeSection={activeSection} walletId={walletId} />

      <section className="relative z-10 min-w-0 flex-1 px-0 py-2 sm:px-2 lg:ml-[318px]">
        <motion.h1 className="text-3xl font-semibold tracking-tight text-slate-950" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {title}
        </motion.h1>
        <motion.div className="page-motion" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34, ease: 'easeOut' }}>
          {children}
        </motion.div>
      </section>
    </main>
  )
}

export default AdminLayout
