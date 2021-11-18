import redis from "../redisClient.js"


export default async (req, res) => {
    var session = req.session
    console.log("a")
    if (session && await redis.get("Sessions", req.sessionId)) {
        //res.send("Welcome User <a href=\'/logout'>click to logout</a>");
        res.redirect('/html/index.html')
    } else {
        res.sendFile('/index.html', { root: "./client" })
    }
}