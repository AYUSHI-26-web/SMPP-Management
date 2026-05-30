function StatusBadge({ status }) {
  const isActive = status === 'Active' || status === 'Credit'

  return (
    <span className={`premium-status inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
      <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {status}
    </span>
  )
}

export default StatusBadge
