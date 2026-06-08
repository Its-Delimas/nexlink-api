import { Router,Request,Response} from "express"
import { validateLink } from "../middleware/validateLink"

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
router.get('/:code',(req:Request,res:Response)=>{
    const link = links.find(l=>l.code===req.params.code)
    if(!link){
        res.status(404).json({error:'Not Found',message:'No link with that code'})
        return
    }
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
router.patch('/:code',(req:Request,res:Response)=>{
    const link = links.find(l=>l.code===req.params.code)
    if(!link){
        res.status(404).json({error:'Not found',message:'No link with that code'})
        return
    }
    const {url} = req.body
    if(!url){
        res.status(400).json({error:'Bad request',message:'url is required'})
        return
    }
    link.url = url
    res.status(200).json({data:link,message:'Link updated'})
})

//DELETE
router.delete('/:code',(req:Request,res:Response)=>{
    const index = links.findIndex(l=>l.code===req.params.code)
    if(index===-1){
        res.status(404).json({error:'Not found',message:'No link with that code'})
        return
    }
    links.splice(index,1)
    res.status(204).send()
})

export default router