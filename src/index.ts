import './db'
import bodyParser from 'body-parser'
import express from 'express'
import { config } from 'dotenv'
import router from './routes'
config()
const { PORT } = process.env

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

app.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`)
})