import { motion } from 'framer-motion'

function ProfileDetailsPage({ Icon, liftMotion, onEdit }) {
  return (
    <motion.section className="mx-auto max-w-7xl pt-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-red-950 p-7 text-white shadow-xl shadow-red-100/80">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -right-24 top-8 h-48 w-96 rounded-full border border-white/60" />
          <div className="absolute bottom-0 right-0 h-24 w-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:10px_10px]" />
        </div>
        
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full border-2 border-white bg-red-100 text-red-300 shadow-lg shadow-red-950/20">
            <Icon type="profile" className="h-20 w-20" />
            <button className="absolute -bottom-2 right-0 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-white text-red-600 shadow-md transition hover:bg-red-50" type="button" aria-label="Edit profile" onClick={onEdit}>
              <Icon type="edit" className="h-4 w-4" />
            </button>
          </span>
          <div>
            <h1 className="text-xl font-medium">Ayushi Srivastava</h1>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-red-950/20 px-3 py-1.5 text-xs">
              <span className="text-amber-300">★</span>
              Zosto Telecom Admin
            </span>
            <p className="mt-3 flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              Online
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <InfoCard
          Icon={Icon}
          title="Contact Information"
          titleIcon="profile"
          rows={[
            ['profile', 'SV Customer ID', 'SV1090103738', 'text-slate-950', true],
            ['mail', 'Email Id', 'ayushisri306@gmail.com', 'text-red-700', true],
            ['phone', 'Mobile Number', '+916307956675', 'text-slate-950', true],
          ]}
        />
        <InfoCard
          Icon={Icon}
          title="Information"
          titleIcon="building"
          rows={[
            ['building', 'Organization Name', 'Ayushi', 'text-slate-950'],
            ['location', 'Location', 'India', 'text-slate-950'],
          ]}
        />
      </div>
    </motion.section>
  )
}

function InfoCard({ Icon, title, titleIcon, rows }) {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/70">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600">
          <Icon type={titleIcon} className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-medium text-slate-950">{title}</h2>
      </div>
      <div className="mt-4 h-px bg-slate-200">
        <div className="h-px w-14 bg-red-500" />
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map(([icon, label, value, color, arrow]) => (
          <div key={label} className="flex items-center gap-4 py-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-50 text-red-600">
              <Icon type={icon} className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-medium text-slate-500">{label}</p>
              <p className={`mt-1 text-sm font-medium ${color}`}>{value}</p>
            </div>
            {arrow && <Icon type="chevron" className="ml-auto h-4 w-4 -rotate-90 text-slate-500" />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProfileDetailsPage
