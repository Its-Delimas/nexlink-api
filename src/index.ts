import express,{Request,Response} from "express"
import linksRouter from './routes/links'

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/links',linksRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http;//localhost:${PORT}`)
})