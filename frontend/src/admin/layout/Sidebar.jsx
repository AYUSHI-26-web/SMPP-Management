import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import telecomLogo from '../../assets/telecom.jpeg'
import { navItems } from '../data/navigation'
import Icon from '../components/Icon'

function Sidebar({ activeSection, walletId }) {
  const navigate = useNavigate()

  return (
    <aside className="fixed bottom-3 left-3 top-3 z-20 hidden w-[290px] shrink-0 overflow-y-auto rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-200/80 sm:bottom-4 sm:left-4 sm:top-4 lg:flex lg:flex-col">
      <motion.div className="border-b border-slate-200 pb-6" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
        <img src={telecomLogo} alt="Zosto Telecom" className="h-16 w-48 object-contain" />
      </motion.div>

      <div className="mt-6 flex items-center gap-3">
        <span className="premium-pulse-ring relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red-50 text-base font-medium text-red-700 ring-1 ring-red-100">
          AS
          <span className="premium-status absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium">Ayushi Srivastava</span>
          <span className="block truncate text-xs text-slate-500">Zosto Telecom Admin</span>
          <span className="mt-2 inline-flex items-center gap-2 text-[11px] font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            Online
          </span>
        </span>
      </div>

      <nav className="mt-8 space-y-3">
        {navItems.map((item) => {
          const isActive = item.label === activeSection

          return (
            <motion.button
              key={item.label}
              className={`premium-ripple group flex w-full items-center gap-4 rounded-lg px-5 py-4 text-left text-sm font-medium transition duration-300 ${
                isActive ? 'premium-active-gradient bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white shadow-xl shadow-red-500/25' : 'text-slate-700 hover:bg-red-50 hover:text-red-700 hover:shadow-lg hover:shadow-red-100/70'
              }`}
              type="button"
              onClick={() => navigate(item.label === 'Control Center' ? `/customer/${walletId}/control-center/team-management` : `/customer/${walletId}/dashboard/${item.route}`)}
              whileHover={{ x: 4, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            >
              <span className="transition duration-300 group-hover:translate-x-1">
                <Icon type={item.icon} className="h-5 w-5" />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.children && <Icon type="chevron" className="h-4 w-4" />}
            </motion.button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
