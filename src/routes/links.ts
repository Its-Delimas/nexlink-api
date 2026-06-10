import { Router} from "express"
import { getAllLinks,getLinkByCode,createLink,updateLink,deleteLink, getMyVisits, redirectLink } from "../controllers/links.controller"
import { validateLink } from "../middleware/validateLink"
import { authenticate } from "../middleware/authenticate"
import { trackVisit } from "../middleware/trackVisits"

const router = Router()

router.get('/my-visits',getMyVisits)
router.get('/',getAllLinks)
router.get('/:code',getLinkByCode)
router.get('/:code/r',trackVisit,redirectLink)
router.post('/',authenticate,validateLink,createLink)
router.patch('/:code',authenticate,updateLink)
router.delete('/:code',authenticate,deleteLink)

export default router