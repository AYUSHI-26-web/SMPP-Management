import { getKannelStatus as fetchKannelStatus, fetchKannelStatusRaw } from '../models/kannelStatusModel.js'

function health(_request, response) {
  response.json({
    ok: true,
    service: 'smpp-management-backend',
    time: new Date().toISOString(),
  })
}

async function getKannelStatus(request, response) {
  try {
    const forceRefresh = request.query.force === '1' || request.query.force === 'true'
    const result = await fetchKannelStatus(forceRefresh)

    response.json(result)
  } catch (error) {
    response.status(502).json({
      ok: false,
      error: error.message || 'Unable to fetch Kannel status',
      time: new Date().toISOString(),
    })
  }
}

async function getKannelStatusRaw(request, response) {
  try {
    const { body, fetchedAt } = await fetchKannelStatusRaw(true)

    response.type('text/plain')
    response.setHeader('X-Kannel-Fetched-At', fetchedAt)
    response.send(body)
  } catch (error) {
    response.status(502).json({
      ok: false,
      error: error.message || 'Unable to fetch raw Kannel status',
      time: new Date().toISOString(),
    })
  }
}

export default {
  health,
  getKannelStatus,
  getKannelStatusRaw,
}
