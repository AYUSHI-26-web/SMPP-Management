import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import telecomLogo from '../../assets/telecom.jpeg'

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'online', label: 'Online' },
  { value: 'warning', label: 'Warning' },
  { value: 'offline', label: 'Offline' },
]
const queueOptions = [
  { value: 'all', label: 'All Queues' },
  { value: 'queued', label: 'Queued' },
  { value: 'empty', label: 'Empty Queue' },
]
const failureOptions = [
  { value: 'all', label: 'All Failures' },
  { value: 'failed', label: 'Has Failed' },
  { value: 'clean', label: 'No Failed' },
]
const sortOptions = [
  { value: 'id', label: 'Sort: SMSC ID' },
  { value: 'status', label: 'Sort: Status' },
  { value: 'uptime', label: 'Sort: Uptime' },
  { value: 'queued', label: 'Sort: Queue' },
  { value: 'failed', label: 'Sort: Failed' },
  { value: 'sent', label: 'Sort: SMS Sent' },
]
const initialFilters = {
  query: '',
  status: 'all',
  route: 'all',
  queue: 'all',
  failure: 'all',
  sortBy: 'id',
}

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
    refresh: (
      <>
        <path d="M20 12a8 8 0 0 1-14 5" />
        <path d="M4 12a8 8 0 0 1 14-5" />
        <path d="M18 3v4h-4" />
        <path d="M6 21v-4h4" />
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
    server: (
      <>
        <path d="M5 4h14v6H5z" />
        <path d="M5 14h14v6H5z" />
        <path d="M8 7h.01" />
        <path d="M8 17h.01" />
      </>
    ),
    activity: (
      <>
        <path d="M4 13h4l3-8 4 14 3-6h2" />
      </>
    ),
    message: (
      <>
        <path d="M4 5h16v11H8l-4 4z" />
        <path d="M8 9h8" />
      </>
    ),
    alert: (
      <>
        <path d="M12 3 2 21h20z" />
        <path d="M12 9v5" />
        <path d="M12 17h.01" />
      </>
    ),
    filter: (
      <>
        <path d="M4 5h16l-6 7v5l-4 2v-7z" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-none stroke-current stroke-2`}>
      {paths[type]}
    </svg>
  )
}

function AdminDashboardPage() {
  const navigate = useNavigate()
  const [statusData, setStatusData] = useState(null)
  const [filters, setFilters] = useState(initialFilters)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [liveNow, setLiveNow] = useState(() => Date.now())

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/kannel/status?force=${refreshKey > 0 ? '1' : '0'}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(payload?.error || `Backend returned HTTP ${response.status}`)
        }

        return payload
      })
      .then((payload) => {
        setStatusData(payload)
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unable to load Kannel status')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [refreshKey])

  useEffect(() => {
    if (!autoRefresh) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setLoading(true)
      setError('')
      setRefreshKey((current) => current + 1)
    }, 30000)

    return () => window.clearInterval(timer)
  }, [autoRefresh])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLiveNow(Date.now())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const connections = useMemo(() => statusData?.smscs || [], [statusData])
  const routeOptions = useMemo(() => {
    const routes = [...new Set(connections.map((connection) => connection.route).filter(Boolean))]

    return [
      { value: 'all', label: 'All Routes' },
      ...routes.map((route) => ({
        value: route,
        label: getRouteLabel(route),
      })),
    ]
  }, [connections])

  const filteredConnections = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    return [...connections]
      .filter((connection) => {
        const matchesQuery = !query || getConnectionSearchText(connection).includes(query)
        const matchesStatus =
          filters.status === 'all' ||
          (filters.status === 'online' && connection.health === 'online') ||
          (filters.status === 'warning' && connection.health === 'warning') ||
          (filters.status === 'offline' && connection.health === 'offline')
        const matchesRoute = filters.route === 'all' || connection.route === filters.route
        const matchesQueue =
          filters.queue === 'all' ||
          (filters.queue === 'queued' && connection.queued > 0) ||
          (filters.queue === 'empty' && connection.queued === 0)
        const matchesFailure =
          filters.failure === 'all' ||
          (filters.failure === 'failed' && connection.failed > 0) ||
          (filters.failure === 'clean' && connection.failed === 0)

        return matchesQuery && matchesStatus && matchesRoute && matchesQueue && matchesFailure
      })
      .sort((first, second) => compareConnections(first, second, filters.sortBy))
  }, [connections, filters])

  const summaryCards = getSummaryCards(statusData, liveNow)
  const isInitialLoading = loading && !statusData

  function updateFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function refreshStatus() {
    setLoading(true)
    setError('')
    setRefreshKey((current) => current + 1)
  }

  function exportConnections() {
    exportCsv(filteredConnections)
  }

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
        <header className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/70 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600">
              <Icon type="server" className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">Admin Dashboard</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight">Kannel Session Logs</h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {statusData?.gateway?.hostname || 'Gateway'} {statusData?.gateway?.ipAddress ? `(${statusData.gateway.ipAddress})` : ''}
              </p>
              <p className="mt-1 text-xs font-black text-red-600">Live time {formatLiveClock(liveNow)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex h-11 items-center rounded-lg border border-red-100 bg-red-50 px-4 text-xs font-black text-red-700 shadow-sm">
              Kannel API
            </span>
            <label className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 shadow-sm">
              <input className="h-4 w-4 accent-red-600" type="checkbox" checked={autoRefresh} onChange={(event) => setAutoRefresh(event.target.checked)} />
              Auto refresh
            </label>
            <button className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 shadow-sm transition hover:border-red-200 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={refreshStatus} disabled={loading}>
              <Icon type="refresh" className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-red-600 px-4 text-xs font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={exportConnections} disabled={!filteredConnections.length}>
              <Icon type="download" className="h-4 w-4" />
              Export
            </button>
          </div>
        </header>

        {error && (
          <section className="mt-5 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800 shadow-sm">
            {error}
          </section>
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <motion.div key={card.label} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/60" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}>
              <div className="flex items-start justify-between gap-4">
                <span>
                  <span className="block text-xs font-black uppercase text-slate-500">{card.label}</span>
                  <span className="mt-2 block text-2xl font-black tracking-tight text-slate-950">{card.value}</span>
                </span>
                <span className={`grid h-11 w-11 place-items-center rounded-lg ${card.tone}`}>
                  <Icon type={card.icon} className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{card.detail}</p>
            </motion.div>
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-red-50 text-red-600">
                  <Icon type="filter" className="h-5 w-5" />
                </span>
                <span>
                  <h2 className="text-lg font-black">Gateway Filters</h2>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Showing {filteredConnections.length} of {connections.length} SMSC sessions
                    {loading && statusData ? ' while refreshing' : ''}
                  </p>
                </span>
              </div>
            </div>
            <button className="h-11 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 transition hover:border-red-200 hover:text-red-700" type="button" onClick={() => setFilters(initialFilters)}>
              Clear Filters
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <label className="flex h-12 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-500 xl:col-span-2">
              <Icon type="search" className="h-5 w-5 text-slate-700" />
              <input className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500" placeholder="Search ID, host, account" type="search" value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} />
            </label>
            <FilterSelect value={filters.status} onChange={(value) => updateFilter('status', value)} options={statusOptions} label="Status filter" />
            <FilterSelect value={filters.route} onChange={(value) => updateFilter('route', value)} options={routeOptions} label="Route filter" />
            <FilterSelect value={filters.queue} onChange={(value) => updateFilter('queue', value)} options={queueOptions} label="Queue filter" />
            <FilterSelect value={filters.failure} onChange={(value) => updateFilter('failure', value)} options={failureOptions} label="Failure filter" />
            <FilterSelect value={filters.sortBy} onChange={(value) => updateFilter('sortBy', value)} options={sortOptions} label="Sort connections" extraClassName="md:col-span-2 xl:col-span-1" />
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black">SMSC Connections</h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Last fetched {formatDateTime(statusData?.fetchedAt)} from Kannel API
                {statusData?.fromCache ? ' (cache)' : ''}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-black">
              <span className="rounded-md bg-slate-100 px-3 py-2 text-slate-700">Kannel {statusData?.gateway?.version || '-'}</span>
              <span className="rounded-md bg-red-50 px-3 py-2 text-red-700">{statusData?.endpoint || 'Backend not connected'}</span>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[1180px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="bg-slate-100 text-xs font-black text-slate-700">
                  <th className="rounded-l-lg px-5 py-4">SMSC ID</th>
                  <th className="px-5 py-4">Endpoint</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Uptime</th>
                  <th className="px-5 py-4">SMS R/S</th>
                  <th className="px-5 py-4">DLR R/S</th>
                  <th className="px-5 py-4">Rates</th>
                  <th className="px-5 py-4">Queued</th>
                  <th className="rounded-r-lg px-5 py-4">Failed</th>
                </tr>
              </thead>
              <tbody>
                {isInitialLoading && (
                  <tr>
                    <td className="rounded-lg bg-white px-5 py-10 text-center font-black text-slate-500 shadow-sm ring-1 ring-slate-100" colSpan="9">
                      Loading Kannel status...
                    </td>
                  </tr>
                )}

                {!isInitialLoading &&
                  filteredConnections.map((connection) => (
                    <tr key={connection.rowId} className="bg-white shadow-sm ring-1 ring-slate-100">
                      <td className="rounded-l-lg px-5 py-5">
                        <span className="block font-black text-slate-950">{connection.id || connection.adminId}</span>
                        <span className="mt-1 block text-xs font-semibold text-slate-500">{getRouteLabel(connection.route)}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="block font-black text-slate-950">{connection.protocol || 'SMPP'} {connection.host}:{connection.port}</span>
                        <span className="mt-1 block text-xs font-semibold text-slate-500">{connection.account || connection.name}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black ${statusStyle(connection.health)}`}>
                          <span className={`h-2.5 w-2.5 rounded-full ${statusDotStyle(connection.health)}`} />
                          {connection.state}
                        </span>
                      </td>
                      <td className="px-5 py-5 font-semibold text-slate-700">{formatLiveDuration(connection.uptimeSeconds, statusData?.fetchedAt, liveNow) || connection.uptime || '-'}</td>
                      <td className="px-5 py-5 font-semibold text-slate-700">
                        {formatNumber(connection.sms?.received)} / {formatNumber(connection.sms?.sent)}
                      </td>
                      <td className="px-5 py-5 font-semibold text-slate-700">
                        {formatNumber(connection.dlr?.received)} / {formatNumber(connection.dlr?.sent)}
                      </td>
                      <td className="px-5 py-5">
                        <span className="block text-xs font-bold text-slate-950">In {connection.sms?.inbound?.raw || '0.00,0.00,0.00'}</span>
                        <span className="mt-1 block text-xs font-semibold text-slate-500">Out {connection.sms?.outbound?.raw || '0.00,0.00,0.00'}</span>
                      </td>
                      <td className="px-5 py-5 font-black text-slate-950">{formatNumber(connection.queued)}</td>
                      <td className="rounded-r-lg px-5 py-5 font-black text-slate-950">{formatNumber(connection.failed)}</td>
                    </tr>
                  ))}

                {!isInitialLoading && !filteredConnections.length && (
                  <tr>
                    <td className="rounded-lg bg-white px-5 py-10 text-center font-black text-slate-500 shadow-sm ring-1 ring-slate-100" colSpan="9">
                      No SMSC sessions match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}

function FilterSelect({ value, onChange, options, label, extraClassName = '' }) {
  return (
    <select className={`h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-50 ${extraClassName}`} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

function getSummaryCards(statusData, liveNow) {
  const summary = statusData?.summary
  const gateway = statusData?.gateway
  const liveGatewayUptime = formatLiveDuration(gateway?.uptimeSeconds, statusData?.fetchedAt, liveNow)

  return [
    {
      label: 'Gateway Status',
      value: gateway?.state || '-',
      detail: liveGatewayUptime ? `Uptime ${liveGatewayUptime}` : 'Waiting for backend response',
      icon: 'activity',
      tone: gateway?.state === 'running' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700',
    },
    {
      label: 'SMSC Online',
      value: summary ? `${formatNumber(summary.onlineSmscs)}/${formatNumber(summary.totalSmscs)}` : '-',
      detail: `${formatNumber(summary?.warningSmscs)} warning, ${formatNumber(summary?.offlineSmscs)} offline`,
      icon: 'server',
      tone: 'bg-red-50 text-red-700',
    },
    {
      label: 'SMS Traffic',
      value: summary ? formatNumber(summary.smsSent) : '-',
      detail: `${formatNumber(summary?.smsReceived)} received, ${formatNumber(summary?.smsSent)} sent`,
      icon: 'message',
      tone: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Queue / Failed',
      value: summary ? `${formatNumber(summary.queuedMessages)} / ${formatNumber(summary.failedMessages)}` : '-',
      detail: `${formatNumber(summary?.connectedBoxes)} boxes connected`,
      icon: summary?.failedMessages || summary?.queuedMessages ? 'alert' : 'check',
      tone: summary?.failedMessages || summary?.queuedMessages ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700',
    },
  ]
}

function getConnectionSearchText(connection) {
  return [
    connection.id,
    connection.adminId,
    connection.name,
    connection.protocol,
    connection.host,
    connection.port,
    connection.account,
    connection.route,
    connection.state,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function compareConnections(first, second, sortBy) {
  if (sortBy === 'status') {
    return first.health.localeCompare(second.health) || (first.id || '').localeCompare(second.id || '')
  }

  if (sortBy === 'uptime') {
    return second.uptimeSeconds - first.uptimeSeconds
  }

  if (sortBy === 'queued') {
    return second.queued - first.queued
  }

  if (sortBy === 'failed') {
    return second.failed - first.failed
  }

  if (sortBy === 'sent') {
    return (second.sms?.sent || 0) - (first.sms?.sent || 0)
  }

  return (first.id || '').localeCompare(second.id || '')
}

function exportCsv(connections) {
  const headers = ['SMSC ID', 'Admin ID', 'Route', 'Protocol', 'Host', 'Port', 'Account', 'State', 'Uptime', 'SMS Received', 'SMS Sent', 'DLR Received', 'DLR Sent', 'Queued', 'Failed']
  const rows = connections.map((connection) => [
    connection.id,
    connection.adminId,
    getRouteLabel(connection.route),
    connection.protocol,
    connection.host,
    connection.port,
    connection.account,
    connection.state,
    connection.uptime,
    connection.sms?.received || 0,
    connection.sms?.sent || 0,
    connection.dlr?.received || 0,
    connection.dlr?.sent || 0,
    connection.queued,
    connection.failed,
  ])
  const csv = [headers, ...rows].map((row) => row.map(escapeCsvCell).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `kannel-smsc-sessions-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function escapeCsvCell(value) {
  const text = String(value ?? '')

  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`
  }

  return text
}

function statusStyle(health) {
  if (health === 'online') {
    return 'bg-green-100 text-green-800'
  }

  if (health === 'warning') {
    return 'bg-amber-100 text-amber-800'
  }

  return 'bg-red-100 text-red-800'
}

function statusDotStyle(health) {
  if (health === 'online') {
    return 'bg-green-500'
  }

  if (health === 'warning') {
    return 'bg-amber-500'
  }

  return 'bg-red-500'
}

function getRouteLabel(route) {
  if (route === 'transactional') {
    return 'Transactional'
  }

  if (route === 'smtp') {
    return 'SMTP'
  }

  return route ? route.charAt(0).toUpperCase() + route.slice(1) : 'Unknown'
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN').format(Number(value) || 0)
}

function formatDateTime(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(value))
}

function formatLiveClock(timestamp) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(timestamp))
}

function formatLiveDuration(baseSeconds, fetchedAt, liveNow) {
  if (!Number.isFinite(Number(baseSeconds))) {
    return ''
  }

  const fetchedTime = fetchedAt ? new Date(fetchedAt).getTime() : liveNow
  const elapsedSeconds = Math.max(0, Math.floor((liveNow - fetchedTime) / 1000))

  return formatDuration(Number(baseSeconds) + elapsedSeconds)
}

function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0)
  const days = Math.floor(safeSeconds / 86400)
  const hours = Math.floor((safeSeconds % 86400) / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60
  const parts = []

  if (days) {
    parts.push(`${days}d`)
  }

  if (hours || days) {
    parts.push(`${hours}h`)
  }

  if (minutes || hours || days) {
    parts.push(`${minutes}m`)
  }

  parts.push(`${seconds}s`)

  return parts.join(' ')
}

export default AdminDashboardPage
