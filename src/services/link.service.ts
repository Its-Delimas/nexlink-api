import { Link } from '../models/types'
import { AppError } from '../errors/AppError'

let links: Link[] = [
  { id: '1', code: 'abc123', url: 'https://google.com' },
  { id: '2', code: 'xyz789', url: 'https://github.com' }
]

export const findAllLinks = (): Link[] => {
  return links
}

export const findLinkByCode = (code: string): Link => {
  const link = links.find(l => l.code === code)
  if (!link) throw new AppError('No link with that code', 404)
  return link
}

export const createLink = (code: string, url: string): Link => {
  const exists = links.find(l => l.code === code)
  if (exists) throw new AppError('Code already in use', 409)

  const newLink: Link = { id: String(links.length + 1), code, url }
  links.push(newLink)
  return newLink
}

export const updateLink = (code: string, url: string): Link => {
  const link = links.find(l => l.code === code)
  if (!link) throw new AppError('No link with that code', 404)
  link.url = url
  return link
}

export const deleteLink = (code: string): void => {
  const index = links.findIndex(l => l.code === code)
  if (index === -1) throw new AppError('No link with that code', 404)
  links.splice(index, 1)
}