import express,{Request,Response} from "express"

const app = express()
const PORT = 3000

app.use(express.json())

//mock db - in memory store
let links = [
    {id:'1',code:'abc123',url:'https.//google.com'},
    {id:'2',code:'xyz789',url:'https://github.com'}
]

//GET all links
app.get('links',(req:Request,res:Response)=>{
    res.status(200).json({data:links})
})
//GET single links
app.get('/links/:code',(req:Request,res:Response)=>{
    const link = links.find(l=>l.code===req.params.code)
    if(!link){
        res.status(404).json({error:'Not Found',message:'No link with that code'})
        return
    }
    res.status(200).json({data:link})
})

//POST create a link
app.post('/links',(req:Request,res:Response)=>{
    const {code,url} = req.body
    if(!code||!url){
        res.status(400).json({error:'Bad Request',message:'code and url are required'})
        return
    }
    const newLink = {id:String(links.length+1),code,url}
    links.push(newLink)

    res.status(201).json({data:newLink,message:'Link created'})
})

//DELETE a link
app.delete('/links/:code',(req:Request,res:Response)=>{
    const index = links.findIndex(l=>l.code === req.params.code)
    if(index===1){
        res.status(404).json({error:'Not Found',message:'No link with that code'})
        return
    }
    links.splice(index,1)
    res.status(204).send()
})

app.listen(PORT,()=>{
    console.log(`Server is running on http;//localhost:${PORT}`)
})