import { Router,Request,Response, NextFunction} from "express"
import { validateLink } from "../middleware/validateLink"
import { AppError } from "../errors/AppError"

const router = Router()

let links = [
    {id:'1',code:'abc123',url:'https://google.com'},
    {id:'2',code:'xyz789',url:'https://github.com'}
]

//GET all
router.get('/',(req:Request,res:Response)=>{
    res.status(201).json({data:links})
})

//GET one
router.get('/:code',(req:Request,res:Response,next:NextFunction)=>{
    const link = links.find(l=>l.code===req.params.code)
    if(!link) return next(new AppError('No link with that code',404))
    res.status(200).json({data:link})
})

//POST create
router.post('/',validateLink,(req:Request,res:Response)=>{
    const {code, url} = req.body
    const newLink = {id:String(links.length+1),code,url}
    links.push(newLink)
    res.status(201).json({data:newLink,message:'Link created'})
})

//PATCH update
router.patch('/:code',(req:Request,res:Response,next:NextFunction)=>{
    const link = links.find(l=>l.code===req.params.code)
    if(!link) return next(new AppError('No link with that code',404))
    const {url} = req.body
    if(!url) return next(new AppError('url is required',400))
    link.url = url
    res.status(200).json({data:link,message:'Link updated'})
})

//DELETE
router.delete('/:code',(req:Request,res:Response,next:NextFunction)=>{
    const index = links.findIndex(l=>l.code===req.params.code)
    if(index===-1) return next(new AppError('No link with that code',404))
    links.splice(index,1)
    res.status(204).send()
})

export default router