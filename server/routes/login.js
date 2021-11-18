import redis from '../redisClient.js';
import dotenv from 'dotenv'
dotenv.config()

export default async (req, res) => {
    console.log(redis.get("Sessions", req.sessionId))
    if (await redis.get("Sessions", req.sessionId)) {
        // login direto
        res.redirect('/');
        console.log("logado")
    }
    else {
        res.redirect(process.env.LOGINURL)
    }
}