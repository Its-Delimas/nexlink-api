import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import linksRouter from './routes/links'
import analyticsRouter from './routes/analytics'
import authRouter from './routes/auth'
import { logger } from './middleware/logger'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}))

app.use(logger)

app.use('/auth', authRouter)
app.use('/links', linksRouter)
app.use('/analytics', analyticsRouter)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))