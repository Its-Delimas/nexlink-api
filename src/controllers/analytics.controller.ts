import { Request, Response, NextFunction } from 'express'
import * as analyticsService from '../services/analytics.service'

export const getAllClicks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const clicks = analyticsService.findAllClicks()
    res.status(200).json({ data: clicks })
  } catch (err) {
    next(err)
  }
}

export const getClicksByCode = (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = analyticsService.findClicksByCode(req.params.code)
    res.status(200).json({ data: records, total: records.length })
  } catch (err) {
    next(err)
  }
}

export const recordClick = (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = analyticsService.recordClick(req.params.code)
    res.status(201).json({ data: record })
  } catch (err) {
    next(err)
  }
}