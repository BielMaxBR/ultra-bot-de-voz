import { Router } from "express";
import createSession from "./routes/createSession.js";
import game from "./routes/game.js";
import login from "./routes/login.js";
import logout from "./routes/logout.js";
import root from "./routes/root.js";

const router = Router()

router.get('/', root)
router.get('/game', game)
router.get('/login', login)
router.get('/logout', logout)
router.get('/createSession', createSession)


export default router