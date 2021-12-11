import redis from "../redisClient.js"


export default async (req, res) => {
    console.log(req.sessionID)
    
    if (req.sessionID && await redis.get("Sessions", req.sessionID)) {
        res.redirect('/game')
    } else {
        res.sendFile('./index.html', { root: "./client" })
    }
}