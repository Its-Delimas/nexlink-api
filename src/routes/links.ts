import { Router,Request,Response, NextFunction} from "express"
import { getAllLinks,getLinkByCode,createLink,updateLink,deleteLink } from "../controllers/links.controller"
import { validateLink } from "../middleware/validateLink"
import { authenticate } from "../middleware/authenticate"

const router = Router()

router.get('/',getAllLinks)
router.get('/:code',getLinkByCode)
router.post('/',authenticate,validateLink,createLink)
router.patch('/:code',authenticate,updateLink)
router.delete('/:code',authenticate,deleteLink)

export default router