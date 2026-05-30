import { Router } from 'express'
import statusController from '../controllers/statusController.js'

const router = Router()

const { health, getKannelStatus, getKannelStatusRaw } = statusController

router.get('/health', health)
router.get('/kannel/status', getKannelStatus)
router.get('/kannel/status/raw', getKannelStatusRaw)

export default router
