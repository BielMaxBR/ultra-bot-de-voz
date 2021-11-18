import express from "express"
import cookieParser from 'cookie-parser'
import sessions from "express-session"
import http from "http"
import wss from "./websockets/wss.js";
import { tinyws } from "tinyws"

import dotenv from 'dotenv'
import router from "./router.js";
dotenv.config()

const app = express()

const server = http.createServer(app)

const sessionParser = sessions({
    secret: "senhasecretaqueninguemdeveriasaber",
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.MAXAGE) },
    resave: false
})

app.use(sessionParser)
app.use(tinyws())
app.use('/ws', async (req, res) => {
    if (req.ws) {
        const ws = await req.ws()

        wss(ws, req)
    } else {
        res.send('porque vc ta aqui?')
    }
})
app.use(router)
app.use(cookieParser())
app.use(express.json())
app.use(express.static("./client"))
app.use(express.urlencoded({ extended: true }))


export { app as default, server }