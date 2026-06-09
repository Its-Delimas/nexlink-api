import { Router,Request,Response, NextFunction} from "express"
import { getAllLinks,getLinkByCode,createLink,updateLink,deleteLink } from "../controllers/links.controller"
import { validateLink } from "../middleware/validateLink"

const router = Router()

router.get('/',getAllLinks)
router.get('/:code',getLinkByCode)
router.post('/',validateLink,createLink)
router.patch('/:code',updateLink)
router.delete('/:code',deleteLink)

export default router