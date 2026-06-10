import { Request, Response, NextFunction } from 'express'

export const trackVisit = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.visitedLinks) {
    req.session.visitedLinks = []
  }

  const code  = req.params.code

  if (!req.session.visitedLinks.includes(`${code}`)) {
    req.session.visitedLinks.push(`${code}`)
  }

  next()
}