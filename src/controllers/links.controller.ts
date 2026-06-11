import { Request, Response, NextFunction } from 'express'
import * as linksService from '../services/link.service'

export const getAllLinks = (req: Request, res: Response, next: NextFunction) => {
  try {
    const links = linksService.findAllLinks()
    res.status(200).json({ data: links })
  } catch (err) {
    next(err)
  }
}

export const getLinkByCode = (req: Request, res: Response, next: NextFunction) => {
  try {
    const link = linksService.findLinkByCode(req.params.code)
    res.status(200).json({ data: link })
  } catch (err) {
    next(err)
  }
}

export const createLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, url } = req.body
    const link = linksService.createLink(code, url)
    res.status(201).json({ data: link, message: 'Link created' })
  } catch (err) {
    next(err)
  }
}

export const updateLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body
    if (!url) throw new Error('url is required')
    const link = linksService.updateLink(req.params.code, url)
    res.status(200).json({ data: link, message: 'Link updated' })
  } catch (err) {
    next(err)
  }
}

export const deleteLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    linksService.deleteLink(req.params.code)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export const redirectLink = (req: Request, res: Response, next: NextFunction) => {
  try {
    const link = linksService.findLinkByCode(req.params.code)
    res.redirect(link.url)
  } catch (err) {
    next(err)
  }
}

export const getMyVisits = (req: Request, res: Response) => {
  const visited = req.session.visitedLinks || []
  res.status(200).json({ data: visited, total: visited.length })
}