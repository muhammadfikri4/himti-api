import dotenv from 'dotenv'
import express from 'express'
import { dbconect } from './config'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 5000
dotenv.config()
app.use(express.json())
dbconect()

app.use(routes)

app.listen(port, () => {
    console.log("Run at port 3000🚀")
})

export default app