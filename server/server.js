import connectRedis from "connect-redis"
import cookieParser from 'cookie-parser'
import { tinyws } from "tinyws"
import sessions from "express-session"
import express from "express"
import http from "http"

import dotenv from 'dotenv'
dotenv.config()

import router from "./router.js";
import {redisClient} from "./redisClient.js"
import wss from "./websockets/wss.js";

const app = express()

const server = http.createServer(app)
const RedisStore = connectRedis(sessions)

app.use(cookieParser())
app.use(sessions({
    store: new RedisStore({ client: redisClient }),
    secret: "senhasecretaqueninguemdeveriasaber",
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.MAXAGE) },
    resave: false
})
)

app.use(tinyws())
app.use('/ws', async (req, res) => {
    if (req.ws) {
        const ws = await req.ws()

        wss(ws, req)
    } else {
        res.send('porque vc ta aqui?')
    }
})
app.use(express.json())
app.use("/assets", express.static('./client/game'))
app.use(express.urlencoded({ extended: true }))
app.use(router)

export { app as default, server }