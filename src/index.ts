import express,{Request,Response} from "express"

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.json({message:"NexLink API is running"})
})

//Query string - fetch all links with optional filters
app.get('/links',(req:Request,res:Response)=>{
    const {limit, active} = req.query
    res.json({
        message:'Fetching all links',
        limit: limit ? Number(limit):10,
        active:active==='true'
    })
})

//Route params ` fetch singlelink by its short code
app.get('/links/:code',(req:Request,res:Response)=>{
    const {code} = req.params
    res.json({message:"Fetching link",code})
})


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})