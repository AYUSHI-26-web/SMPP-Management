import { motion } from 'framer-motion'

function ChangePasswordPage({ Icon, onCancel, onUpdate }) {
  return (
    <motion.section className="mx-auto max-w-7xl pt-6" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <div className="mb-6 flex items-center gap-4">
        <button className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100" type="button" aria-label="Back" onClick={onCancel}>
          <Icon type="back" className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Change Password</h1>
          <p className="mt-1.5 text-xs font-medium text-slate-500">For your security, please choose a strong password</p>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-red-100 bg-white shadow-2xl shadow-slate-200/80">
        <div className="relative px-6 py-7 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-48 w-72 rounded-bl-full bg-gradient-to-bl from-red-100 via-red-50 to-transparent lg:block" />
          <div className="pointer-events-none absolute right-16 top-10 hidden text-red-400 lg:grid">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white shadow-2xl shadow-red-100">
              <Icon type="lock" className="h-12 w-12" />
            </span>
          </div>

          <div className="relative max-w-5xl">
            <PasswordInput Icon={Icon} label="Current Password" placeholder="Enter current password" className="lg:max-w-4xl" />

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <PasswordInput Icon={Icon} label="New Password" placeholder="Enter new password" hasInfo />
              <PasswordInput Icon={Icon} label="Re-confirm Password" placeholder="Re-confirm Password" />
            </div>

            <div className="mt-7 flex flex-col gap-4 rounded-lg border border-red-200 bg-red-50/30 p-5 sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-red-600 shadow-sm">
                <Icon type="shield" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-800">Password must be at least 8 characters long and include:</p>
                <div className="mt-4 grid gap-3 text-[11px] font-medium text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                  {['Uppercase letter', 'Lowercase letter', 'Number', 'Special character'].map((rule) => (
                    <span key={rule} className="inline-flex items-center gap-2">
                      <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-red-500 text-[9px] font-bold leading-none text-red-600">✓</span>
                      {rule}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
              <button className="h-12 rounded-lg border border-slate-300 bg-white px-10 text-xs font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50" type="button" onClick={onCancel}>
                Cancel
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-10 text-xs font-semibold text-white shadow-xl shadow-red-100 transition hover:bg-red-700" type="button" onClick={onUpdate}>
                <Icon type="lock" className="h-4 w-4" />
                Update Password
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.section>
  )
}

function PasswordInput({ Icon, label, placeholder, hasInfo, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800">
        {label} <span className="text-red-600">*</span>
        {hasInfo && <span className="grid h-4 w-4 place-items-center rounded-full border border-slate-500 text-[10px] leading-none text-slate-600">i</span>}
      </span>
      <span className="mt-3 flex h-14 items-center gap-4 rounded-lg border border-red-200 bg-white px-5 shadow-sm shadow-slate-100 transition focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-50">
        <Icon type="lock" className="h-4 w-4 shrink-0 text-red-600" />
        <input className="min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-950 outline-none placeholder:text-slate-400" type="password" placeholder={placeholder} />
        <button className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-red-600 transition hover:bg-red-50" type="button" aria-label={`Show ${label.toLowerCase()}`}>
          <Icon type="eye" className="h-4 w-4" />
        </button>
      </span>
    </label>
  )
}

export default ChangePasswordPage
