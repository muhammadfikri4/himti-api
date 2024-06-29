import bodyParser from 'body-parser'
// import { dbconnect } from 'config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 8000
dotenv.config()
// dbconnect()
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
    credentials: true,
    preflightContinue: false
}));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}🚀`)
})

export default app