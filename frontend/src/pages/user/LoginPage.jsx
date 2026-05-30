import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import loginImg from '../../assets/login.png'
import telecomLogo from '../../assets/telecom.jpeg'

const floatingIcons = [
  { label: 'SMS', className: 'left-[10%] top-[30%]', color: 'bg-red-500', delay: 0 },
  { label: 'WA', className: 'right-[18%] top-[24%]', color: 'bg-green-500', delay: 0.4 },
  { label: 'API', className: 'left-[18%] bottom-[22%]', color: 'bg-red-600', delay: 0.8 },
  { label: 'OTP', className: 'right-[14%] bottom-[26%]', color: 'bg-white/95 text-red-600', delay: 1.2 },
  { label: 'CALL', className: 'left-[46%] bottom-[12%]', color: 'bg-red-700', delay: 1.6 },
]

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M7 10h10v10H7z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

function EyeIcon({ hidden }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      {hidden ? (
        <>
          <path d="m4 4 16 16" />
          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
          <path d="M8.3 6.7C5.8 8 4 10.2 3 12c1.7 3.1 5 6 9 6 1.2 0 2.3-.3 3.3-.7" />
          <path d="M13.8 6.2C17 6.8 19.5 9.2 21 12c-.5 1-1.3 2-2.2 2.9" />
        </>
      ) : (
        <>
          <path d="M3 12c1.7-3.1 5-6 9-6s7.3 2.9 9 6c-1.7 3.1-5 6-9 6s-7.3-2.9-9-6Z" />
          <path d="M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
        </>
      )}
    </svg>
  )
}

function Logo({ className = '' }) {
  return (
    <a href="/" className={`inline-flex ${className}`} aria-label="Zosto Telecom home">
      <img src={telecomLogo} alt="Zosto Telecom" className="h-12 w-44 rounded-md object-contain sm:h-14 sm:w-52" />
    </a>
  )
}

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('ayushisri306@gmail.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [loginMode, setLoginMode] = useState('customer')

  function handleSubmit(event) {
    event.preventDefault()
    navigate(loginMode === 'admin' ? '/admin/session-logs' : '/select-wallet')
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-neutral-950 lg:grid lg:h-screen lg:grid-cols-2">
      <section className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-400 px-5 py-6 text-white sm:px-8 lg:h-screen lg:min-h-0 lg:px-10">
        <motion.div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-white/15 blur-sm"
          animate={{ x: [0, 32, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-[-90px] h-80 w-80 rounded-full bg-red-950/20"
          animate={{ x: [0, -28, 0], y: [0, -18, 0], scale: [1, 0.94, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[52%] top-[18%] h-24 w-24 rounded-full bg-white/10"
          animate={{ y: [0, 22, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Logo className="relative z-20" />

        <div className="relative z-10 mx-auto mt-8 flex max-w-2xl flex-col items-center lg:mt-9">
          <div className="relative w-full">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="relative grid aspect-square w-[min(74vw,52vh,420px)] place-items-center rounded-full bg-white/95 p-5 shadow-2xl shadow-red-950/25">
                <div className="absolute inset-[-28px] rounded-full border border-white/25" />
                <img src={loginImg} alt="" className="h-full w-full rounded-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              className="mx-auto mt-2 max-w-md text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Smart Communication</h1>
              <p className="mt-2 text-sm leading-6 text-red-50 sm:text-base">
                Bulk SMS, WhatsApp API, voice calls, and automated telecom tools in one clean workspace.
              </p>
            </motion.div>

            {floatingIcons.map((icon) => (
              <motion.span
                key={icon.label}
                className={`absolute z-20 grid h-14 w-14 place-items-center rounded-2xl text-xs font-black shadow-xl shadow-red-950/25 ${icon.className} ${icon.color}`}
                animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 3.4, delay: icon.delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                {icon.label}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-red-50 to-white px-5 py-10 sm:px-8 lg:h-screen lg:min-h-0 lg:px-12">
        <div className="absolute -right-24 top-28 h-72 w-72 rounded-full bg-red-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-red-100/70 blur-3xl" />

        <motion.form
          className="relative z-10 w-full max-w-lg rounded-[1.75rem] border border-white/70 bg-white/65 p-5 shadow-2xl shadow-red-950/10 backdrop-blur-xl sm:p-7"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >

          
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-600">Welcome back</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-neutral-750 sm:text-2xl">Login to your account</h2>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-red-100 bg-red-50/70 p-1">
            {[
              ['customer', 'Customer'],
              ['admin', 'Admin'],
            ].map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                className={`h-11 rounded-xl text-sm font-black transition ${
                  loginMode === mode ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-red-700 hover:bg-white/80'
                }`}
                onClick={() => setLoginMode(mode)}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-sm font-semibold text-neutral-800" htmlFor="email">
            Email ID <span className="text-red-600">*</span>
          </label>
          <div className="mt-2 flex h-14 items-center gap-4 rounded-2xl border border-red-200 bg-white/75 px-5 text-red-600 shadow-sm transition focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-100">
            <MailIcon />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full border-0 bg-transparent text-base font-semibold text-neutral-950 outline-none placeholder:text-neutral-400"
            />
          </div>

          <label className="mt-5 block text-sm font-semibold text-neutral-800" htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="mt-2 flex h-14 items-center gap-4 rounded-2xl border border-red-200 bg-white/75 px-5 text-red-600 shadow-sm transition focus-within:border-red-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-100">
            <LockIcon />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full border-0 bg-transparent text-base font-semibold text-neutral-950 outline-none placeholder:text-neutral-400"
            />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-red-600 transition hover:bg-red-100"
              onClick={() => setShowPassword((isVisible) => !isVisible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon hidden={showPassword} />
            </button>
          </div>

          <a href="/forgot-password" className="mt-5 block text-right font-semibold text-red-600 transition hover:text-red-800">
            Forgot Password?
          </a>

          <motion.button
            type="submit"
            className="mt-7 h-14 w-full rounded-2xl bg-red-600 text-base font-black text-white shadow-xl shadow-red-600/25 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>

          <p className="mt-8 text-center text-sm text-neutral-600">
            Copyright &copy; Zosto Telecom. All Rights Reserved |
            <a href="/privacy-policy" className="font-bold text-red-600 hover:text-red-800">
              {' '}
              Privacy Policy
            </a>
          </p>
        </motion.form>
      </section>
    </main>
  )
}

export default Login
