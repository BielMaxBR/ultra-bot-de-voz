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

app.get('/', (req, res) => {
    var session = req.session;
    if (session.userid) {
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    } else
        res.sendFile('html/index.html', { root: "./" })
})

app.get('/login', (req,res) => {
    var session = req.session;
    if (session.userid) {
        // login direto
        res.send('calma calma')
    }
    else {
        res.redirect(process.env.LOGINURL)
    }
})

app.get('/createSession', async (req, res) => {
    const {code} = req.query
    console.log(code)
    if (code) {
        try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: process.env.CLIENTID,
					client_secret: process.env.CLIENTSECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${process.env.PORT || 3000}/createSession`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();
    
			console.log(oauthData);
		} catch (error) {
			console.error(error);
		}
    }

    res.redirect('/')
})

export default app