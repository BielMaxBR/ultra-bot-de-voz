import redis from "../redisClient.js"


export default async (req, res) => {
    console.log(`login pelo /game: ${await redis.get("Sessions", req.sessionID)}`)

    if (req.sessionID && await redis.get("Sessions", req.sessionID)) {
        res.sendFile('game.html', { root: "./client/game" })
    } else {
        res.redirect('/')
    }

}