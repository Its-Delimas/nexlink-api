import { Click } from '../models/types'
import { AppError } from '../errors/AppError'

let clicks: Click[] = []

export const findAllClicks = (): Click[] => {
  return clicks
}

export const findClicksByCode = (code: string): Click[] => {
  const records = clicks.filter(c => c.code === code)
  if (!records.length) throw new AppError('No analytics for that code', 404)
  return records
}

export const recordClick = (code: string): Click => {
  const record: Click = {
    id: String(clicks.length + 1),
    code,
    clickedAt: new Date().toISOString()
  }
  clicks.push(record)
  return record
}
