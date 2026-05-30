import { motion } from 'framer-motion'

function ProfileEditPage({ Icon, onCancel, onUpdate }) {
  return (
    <motion.section className="mx-auto max-w-7xl pt-6" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
        <div className="flex items-center justify-between border-b border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 px-6 py-5">
          <div>
            <h1 className="text-base font-semibold text-slate-950">Basic Information</h1>
            <div className="mt-4 h-0.5 w-20 rounded-full bg-red-600" />
          </div>
          <Icon type="profile" className="h-10 w-10 text-red-300" />
        </div>

        <div className="px-6 py-7 sm:px-8">
          <div>
            <label className="text-xs font-semibold text-blue-600">Avatar</label>
            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative h-24 w-24 shrink-0">
                <div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-red-100 via-red-300 to-red-500 text-white shadow-xl shadow-red-100">
                  <Icon type="profile" className="h-14 w-14" />
                </div>
                <button className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-white text-slate-700 shadow-lg shadow-slate-200 transition hover:text-red-600" type="button" aria-label="Change avatar">
                  <Icon type="edit" className="h-4 w-4" />
                </button>
              </div>

              <button className="flex min-h-24 w-full max-w-56 items-center justify-center gap-4 rounded-md border border-dashed border-red-300 bg-red-50/30 px-5 text-left transition hover:border-red-500 hover:bg-red-50" type="button">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-red-500 shadow-sm">
                  <Icon type="image" className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-slate-950">Upload new image</span>
                  <span className="mt-1 block text-[11px] font-medium leading-5 text-slate-500">JPG, PNG up to 200KB</span>
                  <span className="block text-[11px] font-medium leading-5 text-slate-500">800x800px recommended</span>
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-x-8 gap-y-6 lg:grid-cols-2">
            <TextInput Icon={Icon} icon="profile" label="First Name" required defaultValue="Ayushi" />
            <TextInput Icon={Icon} icon="profile" label="Last Name" required defaultValue="Srivastava" />
            <TextInput Icon={Icon} icon="mail" label="Email ID" required defaultValue="ayushisri306@gmail.com" readOnly />
            <TextInput Icon={Icon} icon="phone" label="Mobile Number" required hasInfo defaultValue="+91 63079 56675" />
          </div>

          <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button className="h-12 rounded-lg border border-slate-300 bg-white px-10 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" type="button" onClick={onCancel}>
              Cancel
            </button>
            <button className="inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-red-600 px-10 text-sm font-semibold text-white shadow-xl shadow-red-100 transition hover:bg-red-700" type="button" onClick={onUpdate}>
              Update Changes
              <Icon type="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </motion.section>
  )
}

function TextInput({ Icon, icon, label, required, hasInfo, defaultValue, readOnly }) {
  return (
    <label className="block">
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
        {label}{required && <span className="text-red-600">*</span>}
        {hasInfo && <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-slate-400 text-[9px] leading-none text-slate-500">i</span>}
      </span>
      <span className={`mt-3 flex h-14 items-center gap-4 rounded-lg border border-slate-300 px-4 shadow-sm shadow-slate-100 transition focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-50 ${readOnly ? 'bg-slate-50' : 'bg-white'}`}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-red-50 text-red-500">
          <Icon type={icon} className="h-4 w-4" />
        </span>
        <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-950 outline-none" defaultValue={defaultValue} readOnly={readOnly} />
      </span>
    </label>
  )
}

export default ProfileEditPage
