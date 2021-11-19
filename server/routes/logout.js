import redis from "../redisClient.js";


export default async (req, res) => {
    if (await redis.get("Sessions", req.sessionID)) {
       redis.del("Sessions", req.sessionID)
    }
    req.session.destroy();
    res.redirect('/');
}