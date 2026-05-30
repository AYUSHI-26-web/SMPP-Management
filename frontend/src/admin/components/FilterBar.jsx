import { motion } from 'framer-motion'
import Icon from './Icon'

function FilterBar({ searchPlaceholder = 'Search here', actionLabel = 'Add New', onAction }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="focus-glow flex h-11 min-w-72 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-xs text-slate-500">
        <Icon type="search" className="h-5 w-5 text-slate-500" />
        <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-500" placeholder={searchPlaceholder} type="search" />
      </label>
      <motion.button className="premium-ripple inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700 hover:shadow-md hover:shadow-red-100" type="button" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
        <Icon type="filter" className="h-4 w-4" />
        Filters
      </motion.button>
      <motion.button className="premium-ripple inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-xs font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-200" type="button" onClick={onAction} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
        <Icon type="plusCircle" className="h-4 w-4" />
        {actionLabel}
      </motion.button>
    </div>
  )
}

export default FilterBar
