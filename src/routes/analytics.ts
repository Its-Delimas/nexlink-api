import { Router, Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

const router = Router()

let clicks: { id: string; code: string; clickedAt: string }[] = []

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ data: clicks })
})

router.get('/:code', (req: Request, res: Response, next: NextFunction) => {
  const records = clicks.filter(c => c.code === req.params.code)
  if (!records.length) return next(new AppError('No analytics for that code', 404))
  res.status(200).json({ data: records, total: records.length })
})

router.post('/:code/click', (req: Request, res: Response) => {
  const record = {
    id: String(clicks.length + 1),
    code: req.params.code,
    clickedAt: new Date().toISOString()
  }
  clicks.push(record)
  res.status(201).json({ data: record })
})

export default router