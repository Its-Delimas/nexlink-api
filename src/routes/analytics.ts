import { Router, Request, Response, NextFunction } from 'express'
import { getAllClicks,getClickByCodes,recordClick } from '../controllers/analytics.controller'
import { AppError } from '../errors/AppError'

const router = Router()

router.get('/', getAllClicks)
router.get('/:code', getClickByCodes)
router.post('/:code/click', recordClick)

export default router