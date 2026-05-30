const KANNEL_BASE_URL = process.env.KANNEL_BASE_URL || 'http://13.202.105.105:13000'
const KANNEL_STATUS_PASSWORD = process.env.KANNEL_STATUS_PASSWORD || 'status123'
const KANNEL_TIMEOUT_MS = Number(process.env.KANNEL_TIMEOUT_MS || 12000)
const CACHE_TTL_MS = Number(process.env.KANNEL_CACHE_TTL_MS || 5000)
const cache = new Map()

export async function getKannelStatus(forceRefresh = false) {
  const { body, url, contentType, fetchedAt, fromCache } = await fetchKannelStatusRaw(forceRefresh)
  const parsed = parseTextStatus(body)

  return {
    ok: true,
    source: 'text',
    endpoint: redactPassword(url),
    contentType,
    fetchedAt,
    fromCache,
    ...parsed,
  }
}

export async function fetchKannelStatusRaw(forceRefresh = false) {
  const url = buildKannelUrl()
  const cacheKey = url
  const cached = cache.get(cacheKey)

  if (!forceRefresh && cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return {
      ...cached.payload,
      fromCache: true,
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), KANNEL_TIMEOUT_MS)

  try {
    const upstreamResponse = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'text/plain,*/*;q=0.8',
      },
    })
    const body = await upstreamResponse.text()

    if (!upstreamResponse.ok) {
      throw new Error(`Kannel returned HTTP ${upstreamResponse.status}: ${body.slice(0, 180)}`)
    }

    const payload = {
      body,
      url,
      contentType: upstreamResponse.headers.get('content-type') || '',
      fetchedAt: new Date().toISOString(),
      fromCache: false,
    }

    cache.set(cacheKey, {
      cachedAt: Date.now(),
      payload,
    })

    return payload
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Kannel request timed out after ${KANNEL_TIMEOUT_MS}ms`)
    }

    throw error
  } finally {
    clearTimeout(timeout)
  }
}

function buildKannelUrl() {
  const url = new URL('/status', KANNEL_BASE_URL)
  url.searchParams.set('password', KANNEL_STATUS_PASSWORD)

  return url.toString()
}

function parseTextStatus(text) {
  const version = text.split(/\n\s*Status:/)[0]?.trim() || ''
  const statusText = matchValue(text, /^Status:\s*(.+)$/m)
  const wdpMatch = text.match(/^WDP:\s*received\s+(\d+)\s+\((\d+)\s+queued\),\s+sent\s+(\d+)\s+\((\d+)\s+queued\)/m)
  const smsMatch = text.match(/^SMS:\s*received\s+(\d+)\s+\((\d+)\s+queued\),\s+sent\s+(\d+)\s+\((\d+)\s+queued\),\s+store size\s+(-?\d+)/m)
  const smsRateMatch = text.match(/^SMS:\s*inbound\s+\(([^)]*)\)\s+msg\/sec,\s+outbound\s+\(([^)]*)\)\s+msg\/sec/m)
  const dlrMatch = text.match(/^DLR:\s*received\s+(\d+),\s+sent\s+(\d+)/m)
  const dlrRateMatch = text.match(/^DLR:\s*inbound\s+\(([^)]*)\)\s+msg\/sec,\s+outbound\s+\(([^)]*)\)\s+msg\/sec/m)
  const dlrQueueMatch = text.match(/^DLR:\s*(\d+)\s+queued,\s+using\s+(.+?)\s+storage/m)
  const smscs = text
    .split('\n')
    .filter((line) => /^\s+\S+\[[^\]]+\]\s+.+\(.+\)/.test(line))
    .map(parseTextSmsc)
    .filter(Boolean)

  return normalizeParsedStatus({
    version,
    statusText,
    wdp: {
      received: { total: toNumber(wdpMatch?.[1]), queued: toNumber(wdpMatch?.[2]) },
      sent: { total: toNumber(wdpMatch?.[3]), queued: toNumber(wdpMatch?.[4]) },
    },
    sms: {
      received: { total: toNumber(smsMatch?.[1]), queued: toNumber(smsMatch?.[2]) },
      sent: { total: toNumber(smsMatch?.[3]), queued: toNumber(smsMatch?.[4]) },
      storeSize: toNumber(smsMatch?.[5]),
      inbound: parseRateTriplet(smsRateMatch?.[1]),
      outbound: parseRateTriplet(smsRateMatch?.[2]),
    },
    dlr: {
      received: { total: toNumber(dlrMatch?.[1]), queued: 0 },
      sent: { total: toNumber(dlrMatch?.[2]), queued: 0 },
      inbound: parseRateTriplet(dlrRateMatch?.[1]),
      outbound: parseRateTriplet(dlrRateMatch?.[2]),
      queued: toNumber(dlrQueueMatch?.[1]),
      storage: dlrQueueMatch?.[2] || '',
    },
    boxes: /No boxes connected/i.test(text) ? 0 : undefined,
    smscs,
    expectedSmscCount: smscs.length,
  })
}

function parseTextSmsc(line) {
  const match = line.match(/^\s*(\S+)\[([^\]]+)\]\s+(.+?)\s+\((.+)\)\s*$/)

  if (!match) {
    return null
  }

  const details = match[4]
  const received = details.match(/rcvd:\s*sms\s+(\d+)\s+\(([^)]*)\)\s+\/\s+dlr\s+(\d+)\s+\(([^)]*)\)/)
  const sent = details.match(/sent:\s*sms\s+(\d+)\s+\(([^)]*)\)\s+\/\s+dlr\s+(\d+)\s+\(([^)]*)\)/)

  return normalizeSmsc({
    adminId: match[1],
    id: match[2],
    name: match[3],
    statusText: details.split(',')[0]?.trim() || '',
    failed: toNumber(matchValue(details, /failed\s+(\d+)/)),
    queued: toNumber(matchValue(details, /queued\s+(\d+)\s+msgs/)),
    sms: {
      received: toNumber(received?.[1]),
      sent: toNumber(sent?.[1]),
      inbound: parseRateTriplet(received?.[2]),
      outbound: parseRateTriplet(sent?.[2]),
    },
    dlr: {
      received: toNumber(received?.[3]),
      sent: toNumber(sent?.[3]),
      inbound: parseRateTriplet(received?.[4]),
      outbound: parseRateTriplet(sent?.[4]),
    },
  })
}

function normalizeParsedStatus(parsed) {
  const status = parseGatewayStatus(parsed.statusText)
  const versionInfo = parseVersionInfo(parsed.version)
  const smscs = parsed.smscs.map((smsc, index) => ({
    ...smsc,
    rowId: `${smsc.id || smsc.adminId || 'smsc'}-${index}`,
  }))
  const summary = {
    totalSmscs: parsed.expectedSmscCount || smscs.length,
    onlineSmscs: smscs.filter((smsc) => smsc.state === 'online').length,
    offlineSmscs: smscs.filter((smsc) => smsc.state !== 'online').length,
    warningSmscs: smscs.filter((smsc) => smsc.health === 'warning').length,
    queuedMessages: smscs.reduce((total, smsc) => total + smsc.queued, 0),
    failedMessages: smscs.reduce((total, smsc) => total + smsc.failed, 0),
    smsReceived: parsed.sms.received.total,
    smsSent: parsed.sms.sent.total,
    dlrReceived: parsed.dlr.received.total,
    dlrSent: parsed.dlr.sent.total,
    connectedBoxes: parsed.boxes ?? 0,
  }

  return {
    gateway: {
      ...status,
      version: versionInfo.version,
      compiler: versionInfo.compiler,
      hostname: versionInfo.hostname,
      ipAddress: versionInfo.ipAddress,
      details: parsed.version,
    },
    metrics: {
      wdp: parsed.wdp,
      sms: parsed.sms,
      dlr: parsed.dlr,
    },
    summary,
    smscs,
  }
}

function normalizeSmsc(smsc) {
  const endpoint = parseSmscName(smsc.name)
  const stateInfo = parseConnectionStatus(smsc.statusText)
  const queued = toNumber(smsc.queued)
  const failed = toNumber(smsc.failed)
  const health = stateInfo.state !== 'online' ? 'offline' : queued > 0 || failed > 0 ? 'warning' : 'online'

  return {
    adminId: smsc.adminId,
    id: smsc.id,
    name: smsc.name,
    protocol: endpoint.protocol,
    host: endpoint.host,
    port: endpoint.port,
    account: endpoint.account,
    route: endpoint.route,
    state: stateInfo.state,
    statusText: smsc.statusText,
    uptimeSeconds: stateInfo.uptimeSeconds,
    uptime: stateInfo.uptime,
    failed,
    queued,
    health,
    sms: smsc.sms,
    dlr: smsc.dlr,
  }
}

function parseGatewayStatus(statusText = '') {
  const [state = 'unknown', uptimePart = ''] = statusText.split(',').map((part) => part.trim())
  const uptime = uptimePart.replace(/^uptime\s+/i, '')

  return {
    state: state || 'unknown',
    statusText,
    uptime,
    uptimeSeconds: parseDurationToSeconds(uptime),
  }
}

function parseConnectionStatus(statusText = '') {
  const state = statusText.split(/\s+/)[0]?.toLowerCase() || 'unknown'
  const seconds = toNumber(matchValue(statusText, /(\d+)s/))

  return {
    state,
    uptimeSeconds: seconds,
    uptime: seconds ? formatDuration(seconds) : statusText,
  }
}

function parseVersionInfo(version = '') {
  return {
    version: matchValue(version, /version\s+`([^']+)'/) || '',
    compiler: matchValue(version, /^Compiler\s+`([^']+)'/m) || '',
    hostname: matchValue(version, /Hostname\s+([^,]+),\s+IP\s+[0-9.]+/) || '',
    ipAddress: matchValue(version, /Hostname\s+[^,]+,\s+IP\s+([0-9]+(?:\.[0-9]+){3})/) || '',
  }
}

function parseSmscName(name = '') {
  const cleanName = name.trim().replace(/:$/, '')
  const parts = cleanName.split(':')
  const account = parts[3] || ''

  return {
    protocol: parts[0] || '',
    host: parts[1] || '',
    port: parts[2]?.split('/')[0] || '',
    account,
    route: getRouteFromAccount(account),
  }
}

function getRouteFromAccount(account = '') {
  const lowerAccount = account.toLowerCase()

  if (lowerAccount.includes('smtp')) {
    return 'smtp'
  }

  if (lowerAccount.includes('tra') || lowerAccount.includes('trans')) {
    return 'transactional'
  }

  return 'unknown'
}

function parseRateTriplet(value = '') {
  const [current = 0, oneMinute = 0, fiveMinutes = 0] = value
    .split(',')
    .map((part) => Number(part.trim()))
    .map((part) => (Number.isFinite(part) ? part : 0))

  return {
    current,
    oneMinute,
    fiveMinutes,
    raw: value,
  }
}

function matchValue(source = '', expression) {
  return source.match(expression)?.[1]?.trim() || ''
}

function toNumber(value) {
  const numeric = Number(value)

  return Number.isFinite(numeric) ? numeric : 0
}

function parseDurationToSeconds(duration = '') {
  const match = duration.match(/(?:(\d+)d)?\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+)s)?/)

  if (!match) {
    return 0
  }

  return toNumber(match[1]) * 86400 + toNumber(match[2]) * 3600 + toNumber(match[3]) * 60 + toNumber(match[4])
}

function formatDuration(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
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

function redactPassword(url) {
  const parsedUrl = new URL(url)
  parsedUrl.searchParams.set('password', '***')

  return parsedUrl.toString()
}
