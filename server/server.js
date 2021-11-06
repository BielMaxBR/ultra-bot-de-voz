import express from "express"
import sessions from 'express-session'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
dotenv.config()

var app = express()

app.use(sessions({
    secret: "senhasecretaqueninguemdeveriasaber",
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.MAXAGE) },
    resave: false
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// testes
var db = {}

app.get('/', (req, res) => {
    var session = req.session
    if (session && db[req.sessionID]) {
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    } else {
        res.sendFile('/client/index.html', { root: "./" })
    }
})

app.get('/login', (req,res) => {
    if (db[req.sessionId]) {
        // login direto
        res.redirect('/');
    }
    else {
        res.redirect(process.env.LOGINURL)
    }
})

app.get('/logout',(req,res) => {
    if (db[req.sessionID]) {
        delete db[req.sessionID]
    }
    req.session.destroy();
    res.redirect('/');
})

app.get('/createSession', async (req, res) => {
    const {code} = req.query
    if (code) {
        try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: process.env.CLIENTID,
					client_secret: process.env.CLIENTSECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: process.env.REDIRECTURI,
					scope: 'identify guilds',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})

			const oauthData = await oauthResult.json()

            if (oauthData.access_token) {
                db[req.sessionID] = oauthData.access_token
            }
		} catch (error) {
			console.error(error)
		}
    }

    res.redirect('/')
})

export default app