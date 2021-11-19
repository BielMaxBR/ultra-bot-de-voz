import redis from '../redisClient.js';
import dotenv from 'dotenv'
dotenv.config()

export default async (req, res) => {
    console.log(await redis.get("Sessions", req.sessionID))
    if (await redis.get("Sessions", req.sessionID)) {
        // login direto
        res.redirect('/');
        console.log("logado")
    }
    else {
        res.redirect(process.env.LOGINURL)
    }
}