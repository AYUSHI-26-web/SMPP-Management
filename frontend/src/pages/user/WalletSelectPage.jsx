import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import telecomLogo from '../../assets/telecom.jpeg'

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19a1 1 0 0 1 1 1v12.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 4 17.5v-10Z" />
      <path d="M4 8h14.5A1.5 1.5 0 0 1 20 9.5V12h-4.5a2 2 0 0 0 0 4H20" />
      <path d="M16 14h.01" />
    </svg>
  )
}

function ReceiptIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <path d="M7 4h10v16l-2-1.2L13 20l-2-1.2L9 20l-2-1.2V4Z" />
      <path d="M9.5 8h5" />
      <path d="M9.5 12h5" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10 w-10 fill-none stroke-current stroke-[1.6]">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}

function AccountMenuIcon({ type }) {
  const paths = {
    profile: (
      <>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
      {paths[type]}
    </svg>
  )
}

function AnimatedBorder({ rounded = 'rounded-xl', delay = 0, strong = false }) {
  const glow = `absolute bg-gradient-to-r from-transparent via-red-500 to-transparent ${
    strong ? 'opacity-100 blur-[0.25px]' : 'opacity-70 blur-[0.5px]'
  }`

  return (
    <div className={`pointer-events-none absolute inset-0 ${rounded} overflow-hidden`}>
      <motion.span
        className={`${glow} left-0 top-0 h-px w-1/3`}
        animate={{ x: ['-120%', '360%'] }}
        transition={{ duration: 4.8, delay, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className={`${glow} right-0 top-0 h-1/3 w-px rotate-90`}
        animate={{ y: ['-120%', '360%'] }}
        transition={{ duration: 4.8, delay: delay + 1.2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className={`${glow} bottom-0 right-0 h-px w-1/3 rotate-180`}
        animate={{ x: ['120%', '-360%'] }}
        transition={{ duration: 4.8, delay: delay + 2.4, repeat: Infinity, ease: 'linear' }}
      />
      <motion.span
        className={`${glow} bottom-0 left-0 h-1/3 w-px -rotate-90`}
        animate={{ y: ['120%', '-360%'] }}
        transition={{ duration: 4.8, delay: delay + 3.6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className={`absolute inset-0 ${rounded} ${strong ? 'ring-2 ring-red-300/90' : 'ring-1 ring-red-200/80'}`}
        animate={{
          boxShadow: strong
            ? ['0 0 10px rgba(220, 38, 38, 0.18)', '0 0 28px rgba(220, 38, 38, 0.32)', '0 0 10px rgba(220, 38, 38, 0.18)']
            : ['0 0 0 rgba(220, 38, 38, 0)', '0 0 18px rgba(220, 38, 38, 0.14)', '0 0 0 rgba(220, 38, 38, 0)'],
        }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function WalletSelect() {
  const navigate = useNavigate()
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    const blinkSteps = [
      window.setTimeout(() => setIsHelpOpen(true), 800),
      window.setTimeout(() => setIsHelpOpen(false), 2200),
      window.setTimeout(() => setIsHelpOpen(true), 3600),
      window.setTimeout(() => setIsHelpOpen(false), 5000),
      window.setTimeout(() => setIsHelpOpen(true), 6400),
    ]

    return () => blinkSteps.forEach((timer) => window.clearTimeout(timer))
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-slate-50 to-red-50/35 text-slate-950">
      <motion.div
        className="pointer-events-none absolute -right-28 top-36 h-72 w-72 rounded-full bg-red-200/35 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 18, 0], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-20 left-10 h-80 w-80 rounded-full bg-red-100/45 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, -18, 0], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.header
        className="relative z-40 flex min-h-20 items-center justify-between gap-5 border-b border-white/70 bg-white/80 px-5 py-3 shadow-lg shadow-slate-200/40 backdrop-blur-xl sm:px-8"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <a href="/" className="inline-flex" aria-label="Zosto Telecom home">
          <motion.img
            src={telecomLogo}
            alt="Zosto Telecom"
            className="h-10 w-40 rounded-md object-contain sm:h-12 sm:w-48"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </a>

        <div className="relative">
          <motion.button
            className="flex items-center gap-3 rounded-full border border-transparent bg-white/55 px-2 py-1.5 text-left shadow-sm shadow-slate-200/50 transition hover:border-red-100 hover:bg-red-50/80 hover:shadow-md hover:shadow-red-100/70"
            type="button"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            onClick={() => setIsProfileOpen((current) => !current)}
            whileHover={{ y: -1, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-inner">
              <UserIcon />
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-black leading-5 text-slate-950">Ayushi Srivastava</span>
              <span className="block text-xs font-semibold leading-4 text-slate-500">Zosto Telecom Admin</span>
            </span>
            <span className={`transition ${isProfileOpen ? 'rotate-180' : ''}`}>
              <ChevronDownIcon />
            </span>
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                className="absolute right-0 top-[calc(100%+8px)] z-30 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white text-sm shadow-2xl shadow-slate-400/30"
                role="menu"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18 }}
              >
                <div className="bg-slate-200 px-4 py-3 text-slate-800">
                  This account is managed by <span className="font-black">Ayushi</span>
                </div>
                <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-700 transition hover:bg-slate-50" type="button" role="menuitem">
                  <span className="text-red-700">
                    <AccountMenuIcon type="profile" />
                  </span>
                  My Profile
                </button>
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-slate-700 transition hover:bg-slate-50"
                  type="button"
                  role="menuitem"
                  onClick={() => navigate('/')}
                >
                  <span className="text-red-700">
                    <AccountMenuIcon type="signout" />
                  </span>
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <section className="relative z-10 mx-auto flex w-full max-w-[1720px] flex-col items-stretch px-5 py-6 sm:px-8 lg:px-16 xl:px-20 2xl:px-24">
        <motion.div
          className="relative flex min-h-24 w-full items-center gap-4 overflow-hidden rounded-lg border border-red-100 bg-gradient-to-r from-red-50 via-red-50 to-white px-7 py-4 text-red-950 shadow-lg shadow-red-950/5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            animate={{ x: ['0%', '280%'] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute -right-10 top-1/2 h-28 w-72 -translate-y-1/2 rounded-full bg-red-200/35 blur-2xl"
            animate={{ x: [0, -18, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <AnimatedBorder delay={0.2} />
          <motion.span
            className="relative text-3xl"
            aria-hidden="true"
            animate={{ rotate: [0, 8, -4, 0], y: [0, -2, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            👋
          </motion.span>
          <div className="relative">
            <h1 className="text-lg font-black">
              Welcome, <span className="text-red-700">Ayushi!</span>
            </h1>
            <p className="mt-1 text-sm text-slate-700">Select a wallet to continue</p>
          </div>
        </motion.div>

        <motion.article
          className="relative mt-5 w-full max-w-[520px] self-start overflow-hidden rounded-lg border border-red-200/90 bg-white/95 p-5 shadow-xl shadow-red-100/70 backdrop-blur"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(148, 163, 184, 0.28)' }}
        >
          <AnimatedBorder delay={0.8} strong />
          <h2 className="text-lg font-black tracking-tight">Zosto-UW-012</h2>

          <div className="mt-4 flex gap-2">
            <span className="rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 ring-1 ring-red-100">SMS</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-b border-slate-200 pb-3.5">
            <div className="flex items-center gap-3 text-sm font-bold">
              <WalletIcon />
              <span>Unified Wallet</span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700 ring-1 ring-red-100">
              <ReceiptIcon />
              Prepaid
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Current Balance</p>
              <p className="mt-1 text-base font-black">₹99.98</p>
            </div>
            <motion.button
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-red-600/35 focus:outline-none focus:ring-4 focus:ring-red-100"
              onClick={() => navigate('/customer/Zosto-UW-012/dashboard/sms')}
              type="button"
              animate={{
                boxShadow: [
                  '0 10px 24px rgba(220, 38, 38, 0.24)',
                  '0 14px 34px rgba(220, 38, 38, 0.42)',
                  '0 10px 24px rgba(220, 38, 38, 0.24)',
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Open
            </motion.button>
          </div>
        </motion.article>
      </section>

      <motion.div
        className="fixed bottom-6 right-5 z-20 flex items-end gap-3 sm:right-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22 }}
      >
        <AnimatePresence>
          {isHelpOpen && (
            <motion.div
              className="relative rounded-xl bg-slate-950 px-7 py-3 text-center text-sm font-bold leading-5 text-white shadow-2xl shadow-slate-950/20"
              initial={{ opacity: 0, x: 16, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.94 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <span className="absolute -right-1.5 bottom-5 h-3 w-3 rotate-45 bg-slate-950" />
              <button
                className="absolute right-2 top-1.5 grid h-5 w-5 place-items-center rounded-full text-base leading-none text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                type="button"
                aria-label="Close message"
                onClick={() => setIsHelpOpen(false)}
              >
                ×
              </button>
              Hello! Good to see you.
              <br />
              I am here to help you.
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className="grid h-16 w-16 place-items-center rounded-full bg-red-600 text-2xl text-white shadow-2xl shadow-red-700/30 transition hover:-translate-y-1 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
          type="button"
          aria-label="Open support chat"
          aria-expanded={isHelpOpen}
          onClick={() => setIsHelpOpen((current) => !current)}
          animate={{ scale: [1, 1.05, 1], boxShadow: ['0 18px 36px rgba(220, 38, 38, 0.28)', '0 22px 48px rgba(220, 38, 38, 0.45)', '0 18px 36px rgba(220, 38, 38, 0.28)'] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          ✦
        </motion.button>
      </motion.div>
    </main>
  )
}

export default WalletSelect
