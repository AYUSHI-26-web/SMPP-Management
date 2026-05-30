import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import telecomLogo from '../../assets/telecom.jpeg'

const sessionLogs = [
  {
    id: 'SES-10924',
    user: 'Ayushi Srivastava',
    email: 'ayushisri306@gmail.com',
    role: 'Customer Admin',
    loginTime: '30/05/2026, 10:14:22 am',
    logoutTime: '30/05/2026, 11:02:09 am',
    ipAddress: '103.88.44.21',
    status: 'Completed',
  },
  {
    id: 'SES-10923',
    user: 'Support Desk',
    email: 'support@zostotelecom.com',
    role: 'Admin',
    loginTime: '30/05/2026, 09:48:10 am',
    logoutTime: 'Active now',
    ipAddress: '103.88.44.18',
    status: 'Active',
  },
  {
    id: 'SES-10922',
    user: 'Ayushi Srivastava',
    email: 'ayushisri306@gmail.com',
    role: 'Customer Admin',
    loginTime: '29/05/2026, 05:31:44 pm',
    logoutTime: '29/05/2026, 06:12:55 pm',
    ipAddress: '103.88.44.21',
    status: 'Completed',
  },
  {
    id: 'SES-10921',
    user: 'System Review',
    email: 'review@zostotelecom.com',
    role: 'Admin',
    loginTime: '29/05/2026, 03:06:18 pm',
    logoutTime: '29/05/2026, 03:28:31 pm',
    ipAddress: '103.88.44.12',
    status: 'Completed',
  },
]

function Icon({ type, className = 'h-5 w-5' }) {
  const paths = {
    logs: (
      <>
        <path d="M7 4h10v16H7z" />
        <path d="M10 8h4" />
        <path d="M10 12h4" />
        <path d="M10 16h3" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M4 8h16" />
        <path d="M5 5h14v16H5z" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    signout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M14 5h5v14h-5" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-none stroke-current stroke-2`}>
      {paths[type]}
    </svg>
  )
}

function statusStyle(status) {
  return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-700'
}

function AdminDashboardPage() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen gap-7 bg-gradient-to-br from-white via-slate-50 to-red-50/25 p-3 text-slate-950 sm:p-4">
      <aside className="sticky top-3 hidden h-[calc(100vh-24px)] w-[290px] shrink-0 overflow-y-auto rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-200/80 lg:flex lg:flex-col">
        <motion.div className="border-b border-slate-200 pb-6" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
          <img src={telecomLogo} alt="Zosto Telecom" className="h-16 w-48 object-contain" />
        </motion.div>

        <div className="mt-6 flex items-center gap-3 rounded-xl bg-red-50 p-3 text-red-800 ring-1 ring-red-100">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-sm font-black shadow-sm">AD</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black">Admin Panel</span>
            <span className="block truncate text-xs font-semibold text-red-700/80">Zosto Telecom</span>
          </span>
        </div>

        <nav className="mt-8 space-y-3">
          <button className="flex w-full items-center gap-4 rounded-lg bg-red-600 px-5 py-4 text-left text-sm font-black text-white shadow-xl shadow-red-500/25" type="button">
            <Icon type="logs" className="h-5 w-5" />
            <span className="flex-1">Session Logs</span>
          </button>
        </nav>

        <button className="mt-auto flex w-full items-center gap-3 rounded-lg px-5 py-4 text-left text-sm font-black text-slate-700 transition hover:bg-red-50 hover:text-red-700" type="button" onClick={() => navigate('/')}>
          <Icon type="signout" className="h-5 w-5" />
          Sign out
        </button>
      </aside>

      <section className="min-w-0 flex-1 px-0 py-2 sm:px-2">
        <header className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/70 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600">
              <Icon type="logs" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">Admin Dashboard</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight">Session Logs</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 shadow-sm" type="button">
              <Icon type="calendar" className="h-4 w-4" />
              May 29, 2026 - May 30, 2026
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-red-600 px-4 text-xs font-black text-white shadow-lg shadow-red-600/20" type="button">
              <Icon type="download" className="h-4 w-4" />
              Export
            </button>
          </div>
        </header>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-black">Recent Sessions</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">Frontend preview data for admin session activity.</p>
            </div>
            <label className="flex h-12 w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-500 md:max-w-sm">
              <Icon type="search" className="h-5 w-5 text-slate-700" />
              <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500" placeholder="Search sessions" type="search" />
            </label>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[1020px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-xs font-black text-slate-700">
                  <th className="rounded-l-lg px-5 py-4">Session ID</th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Login Time</th>
                  <th className="px-5 py-4">Logout Time</th>
                  <th className="px-5 py-4">IP Address</th>
                  <th className="rounded-r-lg px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {sessionLogs.map((log) => (
                  <tr key={log.id} className="bg-white shadow-sm ring-1 ring-slate-100">
                    <td className="rounded-l-lg px-5 py-5 font-black text-slate-950">{log.id}</td>
                    <td className="px-5 py-5">
                      <span className="block font-black text-slate-950">{log.user}</span>
                      <span className="mt-1 block text-xs font-semibold text-slate-500">{log.email}</span>
                    </td>
                    <td className="px-5 py-5 font-semibold">{log.role}</td>
                    <td className="px-5 py-5 font-semibold text-slate-700">{log.loginTime}</td>
                    <td className="px-5 py-5 font-semibold text-slate-700">{log.logoutTime}</td>
                    <td className="px-5 py-5 font-semibold text-slate-700">{log.ipAddress}</td>
                    <td className="rounded-r-lg px-5 py-5">
                      <span className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black ${statusStyle(log.status)}`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${log.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}

export default AdminDashboardPage
