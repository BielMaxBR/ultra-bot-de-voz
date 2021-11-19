import redis from "../redisClient.js"


export default async (req, res) => {
    if (req.sessionID && await redis.get("Sessions", req.sessionID)) {
        res.redirect('/game')
    } else {
        res.sendFile('./index.html', { root: "./client" })
    }
}