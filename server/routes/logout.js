import redis from "../redisClient.js";


export default async (req, res) => {
    if (await redis.get("Sessions", req.sessionId)) {
       redis.del("Sessions", req.sessionId)
    }
    req.session.destroy();
    res.redirect('/');
}