import express,{Request,Response,NextFunction} from "express"
import linksRouter from './routes/links'
import { logger } from "./middleware/logger"
import { errorHandler } from "./middleware/errorHandler"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(logger)

app.use('/links',linksRouter)

//must be last
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on http;//localhost:${PORT}`)
})