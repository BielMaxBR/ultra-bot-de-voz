import express from "express"
import cookieParser from 'cookie-parser'
import sessions from "express-session"
import http from "http"
import router from "./router.js"

import dotenv from 'dotenv'
dotenv.config()

var app = express()

var server = http.createServer(app)

const sessionParser = sessions({
    secret: "senhasecretaqueninguemdeveriasaber",
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.MAXAGE) },
    resave: false
})


app.use(sessionParser)

app.use(router)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./client"))


export { app as default, server }