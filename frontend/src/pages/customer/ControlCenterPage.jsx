import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const controlCenterTabs = ['Team Management', 'Roles Management', 'Organization Information']
const controlCenterTabRoutes = {
  'Team Management': 'team-management',
  'Roles Management': 'roles-management',
  'Organization Information': 'organization-information',
}
const teamMembers = [
  {
    id: '5da7881a-1579-47f8-a1ab-c43add45f29e',
    initials: 'A',
    name: 'Ayushi Srivastava',
    email: 'ayushisri306@gmail.com',
    mobile: '916307956675',
    role: 'Ayushi-Default-Admin',
    createdOn: '23/05/2026, 02:50:14 pm',
    services: ['ALL'],
    wallets: 'ALL',
    status: 'Active',
    location: 'India',
    serviceAccount: 'ayushidem',
    primary: true,
  },
  {
    id: '8f8e14d5-8bc4-4c88-a8c5-5b02c621f632',
    initials: 'G',
    name: 'Gauransh Kumar',
    email: 'ayushisri2616@gmail.com',
    mobile: '916307956676',
    role: 'Ayushi-Default-Admin',
    createdOn: '23/05/2026, 03:28:03 pm',
    services: ['RCS', 'SMS'],
    wallets: 'ALL',
    status: 'Active',
    location: 'India',
    serviceAccount: 'ayushidem',
    primary: false,
  },
]
const roles = [
  {
    id: 'ayushi-default-admin',
    name: 'Ayushi-Default-Admin',
    users: 2,
    permissions: '74/74',
    status: 'Active',
    primary: true,
  },
]
const rolePermissionGroups = ['Dashboard', 'Own services', 'Wallet usage management', 'Own rate/plans', 'Own service account reports']

const pageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.36, ease: 'easeOut' },
}

const rowMotion = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({ opacity: 1, y: 0, transition: { delay: index * 0.07, duration: 0.28, ease: 'easeOut' } }),
}

const cardHover = {
  whileHover: { y: -4, boxShadow: '0 18px 34px rgba(148, 163, 184, 0.22)' },
  transition: { type: 'spring', stiffness: 320, damping: 24 },
}

function StatusPill({ status }) {
  return (
    <span className="premium-status inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      {status}
    </span>
  )
}

function ControlTabs({ activePage = 'team-management', walletId = 'Zosto-UW-012' }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-2 text-sm font-medium text-slate-600 shadow-sm">
      {controlCenterTabs.map((tab) => {
        const route = controlCenterTabRoutes[tab]
        const isActive = route === activePage

        return (
          <motion.button
            key={tab}
            className={`premium-ripple relative min-h-12 rounded-lg px-5 text-left transition sm:min-w-52 ${isActive ? 'text-white' : 'hover:bg-slate-50 hover:text-slate-950'}`}
            type="button"
            onClick={() => navigate(`/customer/${walletId}/control-center/${route}`)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          >
            {isActive && <motion.span className="absolute inset-0 rounded-lg bg-red-600 shadow-md shadow-red-100" layoutId="control-center-active-tab" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            <span className="relative z-10">{tab}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

function InfoPanel({ title, children }) {
  return (
    <motion.div className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-lg shadow-slate-200/50 backdrop-blur transition-shadow" {...cardHover}>
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
      <div className="mt-4 border-t border-slate-200 pt-4">{children}</div>
    </motion.div>
  )
}

function MemberOverview({ Icon, liftMotion, member, walletId, activePage }) {
  return (
    <motion.section className="relative mt-7 space-y-5 overflow-hidden rounded-3xl px-1 pb-2" {...pageMotion}>
      <span className="premium-particle right-10 top-24 h-16 w-16" />
      <span className="premium-particle bottom-24 left-10 h-10 w-10 [animation-delay:1.4s]" />
      <span className="pointer-events-none absolute right-20 top-40 h-28 w-28 rounded-full border border-red-100/80 bg-red-50/40" />
      <span className="pointer-events-none absolute -right-10 top-64 h-40 w-40 rounded-full border border-red-100/70" />
      <span className="pointer-events-none absolute left-12 top-72 h-16 w-16 rotate-45 rounded-2xl border border-red-100/80 bg-white/30" />
      <span className="premium-line-accent right-28 top-52 w-56 rotate-[-16deg]" />
      <span className="premium-line-accent left-24 bottom-28 w-44 rotate-[18deg]" />
      <ControlTabs activePage={activePage} walletId={walletId} />

      <div className="flex items-center gap-2 text-xs font-semibold">
        <a className="text-red-700 hover:text-red-800" href={`/customer/${walletId}/control-center/team-management`}>
          Team Members
        </a>
        <Icon type="chevron" className="h-4 w-4 -rotate-90 text-slate-400" />
        <span className="text-slate-950">Overview</span>
      </div>

      <motion.div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-2xl shadow-slate-200/70 backdrop-blur" {...cardHover}>
        <div className="premium-profile-banner relative h-36 overflow-hidden">
          <span className="absolute left-8 top-8 h-16 w-16 rotate-45 rounded-2xl border border-white/20" />
          <span className="absolute right-14 top-9 h-20 w-20 rounded-full border border-white/20" />
          <span className="absolute right-28 bottom-8 h-2 w-2 rounded-full bg-white/80" />
          <span className="absolute left-48 top-8 h-1.5 w-1.5 rounded-full bg-white/70" />
        </div>
        <div className="relative z-10 px-6 pb-7 sm:px-8">
          <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
              <span className="premium-pulse-ring relative grid h-28 w-28 shrink-0 place-items-center rounded-full border-4 border-white bg-slate-100 text-4xl font-semibold text-red-600 shadow-xl shadow-slate-300/60">
                {member.initials}
              </span>
              <div className="min-w-0 pb-3">
                <h2 className="truncate text-2xl font-semibold tracking-tight text-slate-950">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">{member.role}</p>
              </div>
            </div>
            <div className="pb-3">
              <StatusPill status={member.status} />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <InfoPanel title="Contact Info">
              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3">
                  <Icon type="mail" className="mt-0.5 h-4 w-4 text-red-600" />
                  <span>
                    <span className="block font-medium text-slate-500">Email Id</span>
                    <span className="mt-1 block font-semibold text-red-700">{member.email}</span>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon type="phone" className="mt-0.5 h-4 w-4 text-red-600" />
                  <span>
                    <span className="block font-medium text-slate-500">Mobile Number</span>
                    <span className="mt-1 block font-semibold text-slate-950">{member.mobile}</span>
                  </span>
                </div>
              </div>
            </InfoPanel>

            <InfoPanel title="Information">
              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3">
                  <Icon type="location" className="mt-0.5 h-4 w-4 text-red-600" />
                  <span>
                    <span className="block font-medium text-slate-500">Location</span>
                    <span className="mt-1 block font-semibold text-slate-950">{member.location}</span>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon type="calendar" className="mt-0.5 h-4 w-4 text-red-600" />
                  <span>
                    <span className="block font-medium text-slate-500">Registered On</span>
                    <span className="mt-1 block font-semibold text-slate-950">{member.createdOn}</span>
                  </span>
                </div>
              </div>
            </InfoPanel>
          </div>

          <div className="mt-7 border-t border-slate-200/80 pt-5">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-950">
              <span className="premium-status grid h-6 w-6 place-items-center rounded-full border-2 border-emerald-500 text-emerald-600">
                <Icon type="shield" className="h-3.5 w-3.5" />
              </span>
              Email / Mobile - 2 Step Verification
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200/80 pt-5">
            <h3 className="text-sm font-semibold text-slate-950">Access Control List</h3>
            <div className="mt-5 grid gap-5 text-xs sm:grid-cols-3">
              <div>
                <p className="font-medium text-slate-500">Roles</p>
                <p className="mt-1 font-semibold text-slate-950">{member.role}</p>
              </div>
              <div>
                <p className="font-medium text-slate-500">Primary Role</p>
                <p className="mt-1 font-semibold text-slate-950">{member.role}</p>
              </div>
              <div>
                <p className="font-medium text-slate-500">Wallets</p>
                <p className="mt-1 font-semibold text-slate-950">{member.wallets}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium text-slate-500">Service Accounts</p>
            <div className="mt-2 overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-lg shadow-slate-200/50 backdrop-blur">
              <div className="bg-slate-100/80 px-5">
                <button className="border-b-2 border-red-600 px-4 py-3 text-xs font-semibold text-red-700" type="button">
                  SMS
                </button>
                <button className="px-4 py-3 text-xs font-semibold text-slate-600" type="button">
                  RCS
                </button>
              </div>
              <div className="overflow-x-auto bg-white/70 p-4">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead>
                    <tr className="rounded-lg bg-slate-50 text-slate-600">
                      <th className="px-4 py-3 font-semibold">Wallet</th>
                      <th className="px-4 py-3 font-semibold">Service Account Name</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr className="border-t border-slate-100 text-slate-950" custom={0} initial="hidden" animate="visible" variants={rowMotion}>
                      <td className="px-4 py-4 font-semibold">{walletId}</td>
                      <td className="px-4 py-4 font-semibold">{member.serviceAccount}</td>
                      <td className="px-4 py-4">
                        <StatusPill status={member.status} />
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <button className="premium-ripple inline-flex items-center gap-1 rounded-md px-2 py-1 transition hover:text-red-700" type="button">
                    <Icon type="chevron" className="h-4 w-4 rotate-90" />
                    Previous
                  </button>
                  <motion.button className="premium-ripple grid h-8 w-8 place-items-center rounded-md bg-red-600 font-semibold text-white shadow-md shadow-red-100" type="button" {...liftMotion}>
                    1
                  </motion.button>
                  <button className="premium-ripple inline-flex items-center gap-1 rounded-md px-2 py-1 transition hover:text-red-700" type="button">
                    Next
                    <Icon type="chevron" className="h-4 w-4 -rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

function FormSection({ title, children }) {
  return (
    <motion.section className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6" {...cardHover}>
      <h3 className="text-base font-semibold text-slate-950">{title}</h3>
      <div className="mt-5 border-t border-slate-200 pt-5">{children}</div>
    </motion.section>
  )
}

function FormField({ label, required, icon, Icon, type = 'text', placeholder, value, readOnly }) {
  return (
    <label className="block text-xs font-semibold text-slate-700">
      {label}
      {required && <span className="text-red-600"> *</span>}
      <span className="mt-2 flex h-12 items-center gap-3 border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 transition focus-within:border-red-300 focus-within:ring-4 focus-within:ring-red-50">
        {icon && <Icon type={icon} className="h-4 w-4 text-red-600" />}
        <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" defaultValue={value} placeholder={placeholder} readOnly={readOnly} type={type} />
        {type === 'password' && <Icon type="eye" className="h-4 w-4 text-slate-500" />}
      </span>
    </label>
  )
}

function CheckLine({ label, checked = true }) {
  return (
    <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-950">
      <input className="h-4 w-4 accent-red-600" defaultChecked={checked} type="checkbox" />
      {label}
    </label>
  )
}

function TeamMemberFormPage({ Icon, liftMotion, member, mode, walletId, activePage }) {
  const navigate = useNavigate()
  const isEdit = mode === 'edit'
  const [firstName = '', lastName = ''] = isEdit ? member.name.split(' ') : []
  const backToList = () => navigate(`/customer/${walletId}/control-center/team-management`)

  return (
    <motion.form
      className="relative mt-7 space-y-5 overflow-hidden"
      {...pageMotion}
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <span className="premium-particle right-8 top-24 h-14 w-14" />
      <span className="premium-particle bottom-28 left-8 h-9 w-9 [animation-delay:1.2s]" />
      <ControlTabs activePage={activePage} walletId={walletId} />

      <div className="flex items-center gap-2 border-b border-slate-200 pb-4 text-xs font-semibold">
        <button className="text-red-700 hover:text-red-800" type="button" onClick={backToList}>
          Team Members
        </button>
        <Icon type="chevron" className="h-4 w-4 -rotate-90 text-slate-400" />
        <span className="text-slate-950">{isEdit ? 'Edit Team Member' : 'Add Team Member'}</span>
      </div>

      <div className="mx-auto max-w-6xl space-y-5">
        <FormSection title="Basic Information">
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-700">Avatar</p>
              <div className="mt-2 flex items-center gap-5">
                <span className="grid h-20 w-20 place-items-center rounded-lg border border-slate-300 bg-white text-slate-400">
                  <Icon type="image" className="h-9 w-9" />
                </span>
                <motion.button className="premium-ripple rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700" type="button" {...liftMotion}>
                  Upload new image
                </motion.button>
              </div>
              <p className="mt-3 text-xs font-medium text-slate-500">Only JPG or PNG, max 200KB, 800x800px.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField Icon={Icon} label="First Name" required placeholder="First Name" value={firstName} />
              <FormField Icon={Icon} label="Last Name" required placeholder="Last Name" value={lastName} />
              <FormField Icon={Icon} label="Email ID" required placeholder="Enter business email ID" readOnly={isEdit} value={member.email} />
              <FormField Icon={Icon} icon="phone" label="Mobile Number" required placeholder="Enter mobile number here" value={member.mobile} />
              {!isEdit && (
                <>
                  <FormField Icon={Icon} icon="lock" label="Password" required placeholder="Enter new password" type="password" />
                  <FormField Icon={Icon} icon="lock" label="Confirm Password" required placeholder="Confirm Password" type="password" />
                </>
              )}
              <FormField Icon={Icon} label="Location" placeholder="Enter location here" value={isEdit ? member.location : ''} />
              <label className="block text-xs font-semibold text-slate-700">
                Country
                <span className="mt-2 flex h-12 items-center justify-between border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950">
                  India
                  <Icon type="chevron" className="h-4 w-4 text-slate-400" />
                </span>
              </label>
            </div>

            {isEdit && (
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <motion.button className="premium-ripple h-11 min-w-32 rounded-lg border border-slate-700 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700" type="button" onClick={backToList} {...liftMotion}>
                  Cancel
                </motion.button>
                <motion.button className="premium-ripple h-11 min-w-36 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-200" type="submit" {...liftMotion}>
                  Update Changes
                </motion.button>
              </div>
            )}
          </div>
        </FormSection>

        {isEdit && (
          <FormSection title="Change Password">
            <div className="grid gap-5 md:grid-cols-2">
              <FormField Icon={Icon} icon="lock" label="New Password" required placeholder="Enter new password" type="password" />
              <FormField Icon={Icon} icon="lock" label="Re-confirm Password" required placeholder="Re-confirm Password" type="password" />
            </div>
            <div className="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-5">
              <motion.button className="premium-ripple h-10 min-w-28 rounded-lg border border-slate-700 bg-white px-5 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700" type="button" onClick={backToList} {...liftMotion}>
                Cancel
              </motion.button>
              <motion.button className="premium-ripple h-10 min-w-36 rounded-lg bg-red-600 px-5 text-xs font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700" type="submit" {...liftMotion}>
                Update Password
              </motion.button>
            </div>
          </FormSection>
        )}

        <FormSection title="Email / Mobile - 2 Step Verification">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-5">
              <CheckLine label="Mobile" />
              <CheckLine label="Email" />
            </div>
            <CheckLine label="Enabled All" />
          </div>
        </FormSection>

        <FormSection title="Access Control List">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-700">
              Roles <span className="text-red-600">*</span>
              <span className="mt-2 flex h-12 items-center justify-between border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950">
                {isEdit ? member.role : 'Enter role name or select below'}
                <Icon type="chevron" className="h-4 w-4 text-slate-400" />
              </span>
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Primary Role <span className="text-red-600">*</span>
              <span className="mt-2 flex h-12 items-center justify-between border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950">
                {isEdit ? member.role : 'Enter role name or select below'}
                <Icon type="chevron" className="h-4 w-4 text-slate-400" />
              </span>
            </label>
          </div>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-base font-semibold text-slate-950">Wallets <span className="text-red-600">*</span></h4>
              <div className="mt-3">
                <CheckLine label="Select All" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-950">Service Accounts <span className="text-red-600">*</span></h4>
              <div className="mt-3">
                <CheckLine label="Select All" checked={isEdit ? false : true} />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3 border-t border-slate-200 pt-5">
            <motion.button className="premium-ripple h-11 min-w-32 rounded-lg border border-slate-700 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700" type="button" onClick={backToList} {...liftMotion}>
              Cancel
            </motion.button>
            <motion.button className="premium-ripple h-11 min-w-36 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-200" type="submit" {...liftMotion}>
              {isEdit ? 'Update Changes' : 'Add New'}
            </motion.button>
          </div>
        </FormSection>
      </div>
    </motion.form>
  )
}

function RoleManagementPage({ Icon, liftMotion, walletId, activePage }) {
  const navigate = useNavigate()

  return (
    <motion.section className="relative mt-7 space-y-5 overflow-hidden" {...pageMotion}>
      <span className="premium-particle right-8 top-16 h-14 w-14" />
      <span className="premium-particle bottom-16 left-6 h-9 w-9 [animation-delay:1.1s]" />
      <ControlTabs activePage={activePage} walletId={walletId} />

      <motion.div className="rounded-xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6" {...cardHover}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Role Management</h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex h-11 min-w-72 items-center gap-3 border border-slate-200 bg-white px-4 text-xs text-slate-500 transition focus-within:border-red-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-50">
              <Icon type="search" className="h-5 w-5 text-slate-950" />
              <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-500" placeholder="Search here" type="search" />
            </label>
            <motion.button className="premium-ripple inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-200 px-5 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-md hover:shadow-red-100" type="button" {...liftMotion}>
              <Icon type="filter" className="h-4 w-4" />
              Filters
            </motion.button>
            <motion.button className="premium-ripple inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-xs font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-200" type="button" onClick={() => navigate(`/customer/${walletId}/control-center/roles-management/add`)} {...liftMotion}>
              <Icon type="plusCircle" className="h-4 w-4" />
              Add New
            </motion.button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-950">
                <th className="rounded-l-lg px-5 py-4 font-semibold">Role Name</th>
                <th className="px-5 py-4 font-semibold">Users</th>
                <th className="px-5 py-4 font-semibold">Permissions</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="rounded-r-lg px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <motion.tr key={role.id} className="bg-slate-50 text-slate-950 shadow-sm shadow-slate-100 transition hover:bg-white hover:shadow-md" custom={index} initial="hidden" animate="visible" variants={rowMotion}>
                  <td className="rounded-l-lg px-5 py-5 text-base font-semibold">{role.name}</td>
                  <td className="px-5 py-5 text-sm font-semibold text-red-700">{role.users}</td>
                  <td className="px-5 py-5 text-sm font-semibold">{role.permissions}</td>
                  <td className="px-5 py-5">
                    <StatusPill status={role.status} />
                  </td>
                  <td className="rounded-r-lg px-5 py-5">
                    <div className="flex justify-center gap-2">
                      <motion.button className="premium-ripple grid h-10 w-10 place-items-center rounded-lg border border-red-600 bg-red-600 text-white shadow-md shadow-red-100 transition hover:shadow-lg hover:shadow-red-200" type="button" aria-label={`Primary role ${role.name}`} {...liftMotion}>
                        <Icon type="star" className="h-4 w-4" />
                      </motion.button>
                      <motion.button className="premium-ripple grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-md hover:shadow-red-100" type="button" aria-label={`View role ${role.name}`} {...liftMotion}>
                        <Icon type="eye" className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.section>
  )
}

function AddRolePage({ Icon, liftMotion, walletId, activePage }) {
  const navigate = useNavigate()

  return (
    <motion.form
      className="relative mt-7 space-y-5 overflow-hidden"
      {...pageMotion}
      onSubmit={(event) => {
        event.preventDefault()
      }}
    >
      <span className="premium-particle right-8 top-24 h-14 w-14" />
      <span className="premium-particle bottom-28 left-8 h-9 w-9 [animation-delay:1.2s]" />
      <ControlTabs activePage={activePage} walletId={walletId} />

      <motion.div className="rounded-xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6" {...cardHover}>
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">Add a New Role</h3>
        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="mx-auto max-w-6xl space-y-6">
            <label className="block text-xs font-semibold text-slate-700">
              Role Name<span className="text-red-600">*</span>
              <input className="mt-2 h-12 w-full border border-slate-300 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-4 focus:ring-red-50" placeholder="Enter role name" type="text" />
            </label>

            <label className="block text-xs font-semibold text-slate-700">
              <span className="flex items-center justify-between gap-3">
                <span>Description<span className="text-red-600">*</span></span>
                <span className="text-sm font-semibold text-slate-950">0 / 120</span>
              </span>
              <textarea className="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-4 focus:ring-red-50" maxLength={120} placeholder="Enter role description" />
            </label>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-semibold text-slate-950">Role Permissions</h3>
              <div className="mt-5 space-y-3">
                {rolePermissionGroups.map((permission, index) => (
                  <motion.button
                    key={permission}
                    className="premium-ripple flex h-14 w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-5 text-left text-sm font-semibold text-slate-950 transition hover:border-red-200 hover:bg-red-50/50 hover:text-red-700"
                    type="button"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={rowMotion}
                    {...liftMotion}
                  >
                    {permission}
                    <Icon type="chevron" className="h-4 w-4 text-slate-700" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <motion.button className="premium-ripple h-11 min-w-32 rounded-lg border border-slate-700 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700" type="button" onClick={() => navigate(`/customer/${walletId}/control-center/roles-management`)} {...liftMotion}>
                Cancel
              </motion.button>
              <motion.button className="premium-ripple h-11 min-w-36 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-200" type="submit" {...liftMotion}>
                Add New
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.form>
  )
}

function ControlCenterPage({ Icon, liftMotion, walletId = 'Zosto-UW-012', controlPage = 'team-management', memberAction, memberId }) {
  const navigate = useNavigate()
  const activePage = controlPage || 'team-management'
  const activeMembers = teamMembers.length
  const assignedServices = new Set(teamMembers.flatMap((member) => member.services)).size
  const selectedMember = teamMembers.find((member) => member.id === memberId)

  if (memberAction === 'view' && memberId) {
    return <MemberOverview Icon={Icon} liftMotion={liftMotion} member={selectedMember || teamMembers[0]} walletId={walletId} activePage={activePage} />
  }

  if (memberAction === 'edit' && memberId) {
    return <TeamMemberFormPage Icon={Icon} liftMotion={liftMotion} member={selectedMember || teamMembers[0]} mode="edit" walletId={walletId} activePage={activePage} />
  }

  if (memberAction === 'add' && activePage === 'roles-management') {
    return <AddRolePage Icon={Icon} liftMotion={liftMotion} walletId={walletId} activePage={activePage} />
  }

  if (memberAction === 'add') {
    return <TeamMemberFormPage Icon={Icon} liftMotion={liftMotion} member={{ email: '', mobile: '', name: '', location: '', role: '' }} mode="add" walletId={walletId} activePage={activePage} />
  }

  if (activePage === 'roles-management') {
    return <RoleManagementPage Icon={Icon} liftMotion={liftMotion} walletId={walletId} activePage={activePage} />
  }

  return (
    <motion.section className="relative mt-7 space-y-5 overflow-hidden" {...pageMotion}>
      <span className="premium-particle right-8 top-16 h-14 w-14" />
      <span className="premium-particle bottom-16 left-6 h-9 w-9 [animation-delay:1.1s]" />
      <ControlTabs activePage={activePage} walletId={walletId} />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Team members', value: activeMembers, icon: 'profile' },
          { label: 'Assigned services', value: assignedServices, icon: 'filter' },
          { label: 'Wallet access', value: 'All', icon: 'shield' },
        ].map((item) => (
          <motion.div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow" {...cardHover}>
            <div className="flex items-center justify-between gap-4">
              <span>
                <span className="block text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</span>
                <span className="mt-2 block text-2xl font-semibold text-slate-950">{item.value}</span>
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-red-600">
                <Icon type={item.icon} className="h-5 w-5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" {...cardHover}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600">
              <Icon type="profile" className="h-5 w-5" />
            </span>
            <span>
              <h3 className="text-lg font-semibold text-slate-950">Team Members</h3>
              <p className="mt-1 text-xs text-slate-500">Manage and view your team members</p>
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex h-11 min-w-72 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-xs text-slate-500 transition focus-within:border-red-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-50">
              <Icon type="search" className="h-5 w-5 text-slate-500" />
              <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-500" placeholder="Search by Name" type="search" />
            </label>
            <motion.button className="premium-ripple inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-700 hover:shadow-md hover:shadow-red-100" type="button" {...liftMotion}>
              <Icon type="filter" className="h-4 w-4" />
              Filters
            </motion.button>
            <motion.button className="premium-ripple inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-xs font-semibold text-white shadow-md shadow-red-100 transition hover:bg-red-700 hover:shadow-lg hover:shadow-red-200" type="button" onClick={() => navigate(`/customer/${walletId}/control-center/team-management/add`)} {...liftMotion}>
              <Icon type="plusCircle" className="h-4 w-4" />
              Add New
            </motion.button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[1000px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Roles Name</th>
                <th className="px-5 py-4 font-semibold">Create On</th>
                <th className="px-5 py-4 font-semibold">Assigned Services</th>
                <th className="px-5 py-4 font-semibold">Wallets</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <motion.tr key={member.email} className="border-b border-slate-100 bg-white text-slate-950 transition last:border-b-0 hover:bg-slate-50/70" custom={index} initial="hidden" animate="visible" variants={rowMotion}>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-red-50 text-base font-semibold text-red-600">{member.initials}</span>
                      <span>
                        <span className="block text-sm font-semibold">{member.name}</span>
                        <span className="mt-1 block text-xs text-slate-500">{member.email}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm">{member.role}</td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <Icon type="calendar" className="h-4 w-4 text-red-600" />
                      <span className="leading-5">
                        <span className="block">{member.createdOn.split(', ')[0]}</span>
                        <span className="block text-slate-500">{member.createdOn.split(', ')[1]}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-wrap gap-2">
                      {member.services.map((service) => (
                        <span key={service} className="rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-semibold text-red-700">
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-5 font-semibold text-slate-500">{member.wallets}</td>
                  <td className="px-5 py-5">
                    <StatusPill status={member.status} />
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex justify-center gap-2">
                      <motion.button
                        className={`premium-ripple grid h-10 w-10 place-items-center rounded-lg border transition hover:shadow-md hover:shadow-red-100 ${member.primary ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-100' : 'border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700'}`}
                        type="button"
                        aria-label={member.primary ? `Primary member ${member.name}` : `Edit ${member.name}`}
                        onClick={() => {
                          if (!member.primary) {
                            navigate(`/customer/${walletId}/control-center/team-management/edit/${member.id}`)
                          }
                        }}
                        {...liftMotion}
                      >
                        <Icon type={member.primary ? 'star' : 'edit'} className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="premium-ripple grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 hover:shadow-md hover:shadow-red-100"
                        type="button"
                        aria-label={`View ${member.name}`}
                        onClick={() => navigate(`/customer/${walletId}/control-center/team-management/view/${member.id}`)}
                        {...liftMotion}
                      >
                        <Icon type="eye" className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Showing 1 to 2 of 2 results</span>
          <div className="flex items-center gap-2">
            <button className="premium-ripple grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white text-slate-400" type="button" aria-label="Previous page">
              <Icon type="chevron" className="h-4 w-4 rotate-90" />
            </button>
            <button className="premium-ripple grid h-9 w-9 place-items-center rounded-md bg-red-600 font-semibold text-white shadow-md shadow-red-100" type="button">
              1
            </button>
            <button className="premium-ripple grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-white text-slate-500" type="button" aria-label="Next page">
              <Icon type="chevron" className="h-4 w-4 -rotate-90" />
            </button>
            <button className="premium-ripple ml-3 inline-flex h-9 items-center gap-6 rounded-md border border-slate-200 bg-white px-4 font-medium text-slate-600" type="button">
              10 / page
              <Icon type="chevron" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div className="premium-wave relative overflow-hidden rounded-xl border border-red-100 bg-red-50/60 p-5 shadow-sm" {...cardHover}>
        <div className="relative flex items-center gap-5">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-red-600 text-white shadow-md shadow-red-100">
            <Icon type="shield" className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-red-700">Secure. Reliable. Connected.</span>
            <span className="mt-2 block max-w-sm text-xs leading-5 text-slate-500">Manage your teams and permissions effortlessly.</span>
          </span>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default ControlCenterPage
