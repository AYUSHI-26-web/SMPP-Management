import express from 'express'
import apiRoutes from './routes/apiRoutes.js'

const app = express()
const PORT = Number(process.env.PORT || 5050)
const HOST = process.env.HOST || '127.0.0.1'

app.use(express.json())
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }

  next()
})

app.use('/api', apiRoutes)

const server = app.listen(PORT, HOST, (error) => {
  if (error) {
    console.error(`Failed to start SMPP backend: ${error.message}`)
    process.exit(1)
  }

  console.log(`SMPP backend listening on http://${HOST}:${PORT}`)
})

server.on('error', (error) => {
  console.error(`SMPP backend server error: ${error.message}`)
  process.exit(1)
})
