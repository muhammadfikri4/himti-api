import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { dbconect } from './config'
import { ENV } from './libs'
import routes from './routes'

const app = express()
const port = ENV.PORT || 8000
dotenv.config()
dbconect()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "../src/assets/images")));
// app.use(upload.single("image"))
app.use(routes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app