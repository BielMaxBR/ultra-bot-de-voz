import fetch from 'node-fetch'
import redis from '../redisClient.js'

export default async (req, res) => {
    const { code } = req.query
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
                await redis.set("Sessions", req.sessionID, oauthData.access_token)
                console.log(await redis.set("Sessions", req.sessionID, oauthData.access_token))
            }
        } catch (error) {
            console.error(error)
        }
    }

    res.redirect('/')
}