import { motion } from 'framer-motion'

const controlCenterTabs = ['Team Management', 'Roles Management', 'Organization Information']
const teamMembers = [
  {
    initials: 'A',
    name: 'Ayushi Srivastava',
    email: 'ayushisri306@gmail.com',
    role: 'Ayushi-Default-Admin',
    createdOn: '23/05/2026, 02:50:14 pm',
    services: ['ALL'],
    wallets: 'ALL',
    primary: true,
  },
  {
    initials: 'G',
    name: 'Gauransh Kumar',
    email: 'ayushisri2616@gmail.com',
    role: 'Ayushi-Default-Admin',
    createdOn: '23/05/2026, 03:28:03 pm',
    services: ['RCS', 'SMS'],
    wallets: 'ALL',
    primary: false,
  },
]

function ControlCenterPage({ Icon, liftMotion }) {
  return (
    <motion.section className="mt-7" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <div className="relative overflow-hidden rounded-xl border border-red-100 bg-white text-sm font-medium text-slate-950 shadow-lg shadow-slate-200/50">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-red-50 via-red-50/50 to-transparent" />
        <div className="pointer-events-none absolute -bottom-7 right-0 h-16 w-2/5 rounded-tl-full border-t-2 border-red-100 bg-red-50/30" />
        {controlCenterTabs.map((tab, index) => (
          <button
            key={tab}
            className={`relative min-w-0 px-7 py-5 text-left transition hover:bg-red-50 sm:min-w-52 ${index === 0 ? 'border-b-2 border-red-600 bg-red-50/70 text-red-700' : ''}`}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600">
              <Icon type="profile" className="h-5 w-5" />
            </span>
            <span>
              <h3 className="text-lg font-medium">Team Members</h3>
              <p className="mt-1 text-xs text-slate-500">Manage and view your team members</p>
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex h-12 min-w-72 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-xs text-slate-500 shadow-sm">
              <Icon type="search" className="h-5 w-5 text-slate-950" />
              <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-500" placeholder="Search by Name" type="search" />
            </label>
            <motion.button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 text-xs font-medium text-red-700 shadow-sm" type="button" {...liftMotion}>
              <Icon type="filter" className="h-4 w-4" />
              Filters
            </motion.button>
            <motion.button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-xs font-medium text-white shadow-lg shadow-red-200" type="button" {...liftMotion}>
              <Icon type="plusCircle" className="h-4 w-4" />
              Add New
            </motion.button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full min-w-[1120px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-red-50/60 text-slate-950">
                <th className="border-r border-red-100 px-5 py-4 font-medium">Name</th>
                <th className="border-r border-red-100 px-5 py-4 font-medium">Roles Name</th>
                <th className="border-r border-red-100 px-5 py-4 font-medium">Create On</th>
                <th className="border-r border-red-100 px-5 py-4 font-medium">Assigned Services</th>
                <th className="border-r border-red-100 px-5 py-4 font-medium">Wallets</th>
                <th className="px-5 py-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.email} className="border-b border-slate-100 bg-white text-slate-950 last:border-b-0">
                  <td className="border-r border-slate-100 px-5 py-5">
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-red-50 text-base font-medium text-red-600">{member.initials}</span>
                      <span>
                        <span className="block text-sm font-medium">{member.name}</span>
                        <span className="mt-1 block text-xs text-slate-500">{member.email}</span>
                      </span>
                    </div>
                  </td>
                  <td className="border-r border-slate-100 px-5 py-5 text-sm">{member.role}</td>
                  <td className="border-r border-slate-100 px-5 py-5">
                    <div className="flex items-center gap-3">
                      <Icon type="calendar" className="h-4 w-4 text-red-600" />
                      <span className="leading-5">
                        <span className="block">{member.createdOn.split(', ')[0]}</span>
                        <span className="block text-slate-500">{member.createdOn.split(', ')[1]}</span>
                      </span>
                    </div>
                  </td>
                  <td className="border-r border-slate-100 px-5 py-5">
                    <div className="flex flex-wrap gap-2">
                      {member.services.map((service) => (
                        <span key={service} className="rounded-md bg-red-50 px-3 py-2 text-[10px] font-medium text-red-700">
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="border-r border-slate-100 px-5 py-5 font-medium text-slate-500">{member.wallets}</td>
                  <td className="px-5 py-5">
                    <div className="flex justify-center gap-2">
                      <motion.button
                        className={`grid h-10 w-10 place-items-center rounded-lg border transition ${member.primary ? 'border-red-600 bg-red-600 text-white shadow-lg shadow-red-100' : 'border-slate-300 bg-white text-slate-950 hover:bg-red-50 hover:text-red-700'}`}
                        type="button"
                        aria-label={member.primary ? `Primary member ${member.name}` : `Edit ${member.name}`}
                        {...liftMotion}
                      >
                        <Icon type={member.primary ? 'star' : 'edit'} className="h-4 w-4" />
                      </motion.button>
                      <motion.button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 bg-white text-slate-950 transition hover:bg-red-50 hover:text-red-700" type="button" aria-label={`View ${member.name}`} {...liftMotion}>
                        <Icon type="eye" className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Showing 1 to 2 of 2 results</span>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white text-slate-400" type="button" aria-label="Previous page">
              <Icon type="chevron" className="h-4 w-4 rotate-90" />
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-md bg-red-600 font-medium text-white shadow-md shadow-red-100" type="button">
              1
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white text-slate-500" type="button" aria-label="Next page">
              <Icon type="chevron" className="h-4 w-4 -rotate-90" />
            </button>
            <button className="ml-3 inline-flex h-9 items-center gap-6 rounded-md border border-slate-200 bg-white px-4 font-medium text-slate-600" type="button">
              10 / page
              <Icon type="chevron" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-xl border border-red-100 bg-white p-6 shadow-lg shadow-slate-200/50">
        <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-2/3 bg-gradient-to-tl from-red-500/80 via-red-100/60 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-1/2 rounded-tl-full border-t-4 border-red-300/70" />
        <div className="relative flex items-center gap-5">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-red-600 text-white shadow-xl shadow-red-200">
            <Icon type="shield" className="h-9 w-9" />
          </span>
          <span>
            <span className="block text-sm font-medium text-red-600">Secure. Reliable. Connected.</span>
            <span className="mt-2 block max-w-sm text-xs leading-5 text-slate-500">Manage your teams and permissions effortlessly.</span>
          </span>
        </div>
      </div>
    </motion.section>
  )
}

export default ControlCenterPage
